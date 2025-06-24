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

// 🖼️ Optionnel : sert les images locales (pas dans ton cas Docker)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ✅ Route spéciale pour servir les images depuis le menu-service
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
  '/orders': 'http://order-service:5003/orders',
  '/menus': 'http://menu-service:5004',
  '/users': 'http://user-service:5002',
  '/payments': 'http://payment-service:5005',
  '/delivery': 'http://delivery-service:5006',
  '/analytics': 'http://analytics-service:5007',
  '/components': 'http://component-service:5008'
};

// first middleware: authentication
app.use('/api', async (req, res, next) => {

  console.log("Request received :", req.path);
  if (req.path!='/register' && req.path!='/login') {
    try {
      console.log("entre al if /register y /login");
      const auth = await axios.post('http://auth-service:5001/authenticate', {}, {
        headers: { Authorization: req.headers.authorization }
      });
      console.log("After autentication:", req.user);
      req.user = auth.data.payload
      
      // replace `user_id<>` and `restaurant_id<>` in URL with token values
      if (req.user) {
        const { user_id, restaurant_id } = req.user;
        console.log("user_id value: ", user_id);
        console.log("restaurant_id value: ", restaurant_id);
        
        //To solve changes with the <>
        let updatedPath = req.path;
        if (updatedPath.includes('%3C') || updatedPath.includes('%3E')) {
          updatedPath = decodeURIComponent(updatedPath);
        }

        req.url = updatedPath
          .replace('/user_id<>', `/${user_id}`)
          .replace('/restaurant_id<>', `/${restaurant_id}`);
      }
      console.log("path before next",req.path);
      console.log("url before next",req.url);
      next()
      
    } catch {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
      try {
        console.log("req path is: ",req.path);
        const log_reg = await axios({
        method: req.method,
        url: `http://auth-service:5001${req.path}`,
        headers: req.headers,
        data: req.body,
        responseType: req.method === 'GET' ? 'stream' : 'json'
      });
      return res.status(log_reg.status).json(log_reg.data);
    } catch {
      return res.status(401).json({ error: 'route to login/register not found' });
    }
  }
});

// routing middleware
app.use('/api', async(req, res) => {
  
  console.log("Valid request :", req.path);
  //console.log(Object.keys(serviceProxyMap))
  const servicePath = Object.keys(serviceProxyMap).find(path => req.path.startsWith(path));
  console.log("service path: ",servicePath);
  if (!servicePath) {
    return res.status(404).json({ error: 'Service not found' });
  }
  const targetBaseUrl = serviceProxyMap[servicePath];
  const targetUrl = `${targetBaseUrl}${req.path.replace(servicePath, '')}`;
  //const targetUrl = `${targetBaseUrl}${servicePath}`;
  console.log("path before try: ", targetUrl);
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