const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8000;

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Mapeo dinámico de servicios
const serviceProxyMap = {
'/api/orders': 'http://order-service:5003/orders', // ✅ ajoute "/orders" ici
  '/api/menus': 'http://menu-service:5004',  // ✅ Corrigé ici
  '/api/users': 'http://user-service:5002',
  '/api/payments': 'http://payment-service:5005',
  '/api/delivery': 'http://delivery-service:5006',
  '/api/analytics': 'http://analytics-service:5007',
  '/api/components': 'http://component-service:5008',
};


// Middleware para proxy dinámico
app.use(async (req, res) => {
  console.log("request", req.path);
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
      // Para manejar respuestas de tipo stream, como imágenes
      response.data.pipe(res);
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
console.error(`❌ Proxy error to ${targetUrl} →`, error.message);
    res.status(500).json({ error: 'Error forwarding the request' });
  }
});

// Inicia el gateway
app.listen(PORT, () => {
  console.log(`🚀 Gateway running dynamically on port ${PORT}`);
});