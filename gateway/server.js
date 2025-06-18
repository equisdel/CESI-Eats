const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8000;

// CORS configuration to allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Dynamic service mapping
const serviceProxyMap = {
  '/api/orders': 'http://order-service:5003',
  '/api/menu': 'http://menu-service:5004',
  '/api/users': 'http://user-service:5002',
  '/api/payments': 'http://payment-service:5005',
  '/api/delivery': 'http://delivery-service:5006',
  '/api/analytics': 'http://analytics-service:5007',
  '/api/components': 'http://component-service:5008',
};

// Middleware for dynamic proxying
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
      // To handle stream responses, such as images
      response.data.pipe(res);
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error(`Error proxying to ${targetUrl}:`, error.message);
    res.status(500).json({ error: 'Error forwarding the request' });
  }
});

// Start the gateway
app.listen(PORT, () => {
  console.log(`🚀 Gateway running dynamically on port ${PORT}`);
});
