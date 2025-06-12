const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Logger
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});

// Dictionnaire des routes dynamiques
const serviceProxyMap = {
  '/api/orders': 'http://order-service:5003',
  '/api/users': 'http://user-service:5002',
  '/api/menu': 'http://menu-service:5004',
  '/api/payments': 'http://payment-service:5005',
  '/api/delivery': 'http://delivery-service:5006',
  '/api/analytics': 'http://analytics-service:5007',
  '/api/components': 'http://component-service:5008',
};

// Proxy dynamique
Object.entries(serviceProxyMap).forEach(([route, target]) => {
  app.use(route, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(route, ''), // retire le préfixe
  }));
});

app.listen(8000, () => {
  console.log('🚀 API Gateway listening on port 8000');
});