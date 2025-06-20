const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

//  sert les images locales (pas dans ton cas Docker)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

//  Route spéciale pour servir les images depuis le menu-service
app.use('/api/menus/images', async (req, res) => {
  try {
    const imageUrl = `http://menu-service:5004/images${req.url}`;
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (err) {
    console.error('❌ Erreur lors de la récupération de l’image :', err.message);
    res.status(404).send('Image non trouvée');
  }
});

// 🌐 Mapeo de services dynamiques
const serviceProxyMap = {
  '/api/orders': 'http://order-service:5003/orders',
  '/api/menus': 'http://menu-service:5004',
  '/api/users': 'http://user-service:5002',
  '/api/payments': 'http://payment-service:5005',
  '/api/delivery': 'http://delivery-service:5006',
  '/api/analytics': 'http://analytics-service:5007',
  '/api/components': 'http://component-service:5008',
};

// 🔁 Middleware générique de proxy
app.use(async (req, res) => {
  console.log("➡️ Requête reçue :", req.path);

  const servicePath = Object.keys(serviceProxyMap).find(path => req.path.startsWith(path));
  if (!servicePath) {
    return res.status(404).json({ error: 'Service not found' });
  }

  const targetBaseUrl = serviceProxyMap[servicePath];
  const targetUrl = `${targetBaseUrl}${req.path.replace(servicePath, '')}`;

  try {
    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: req.headers,
      data: req.body,
      responseType: req.method === 'GET' ? 'stream' : 'json'
    });

    if (req.method === 'GET' && response.data.pipe) {
      response.data.pipe(res);
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error(`❌ Proxy error to ${targetUrl} →`, error.message);
    res.status(500).json({ error: 'Error forwarding the request' });
  }
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Gateway running dynamically on port ${PORT}`);
});
