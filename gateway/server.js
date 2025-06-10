// gateway/server.js
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app   = express();
const port  = process.env.PORT || 8000;

// Proxy vers chaque service selon les variables d'env
app.use('/auth',     createProxyMiddleware({ target: process.env.AUTH_URL,     changeOrigin: true }));
app.use('/users',    createProxyMiddleware({ target: process.env.USER_URL,     changeOrigin: true }));
app.use('/orders',   createProxyMiddleware({ target: process.env.ORDER_URL,    changeOrigin: true }));
app.use('/menus',    createProxyMiddleware({ target: process.env.MENU_URL,     changeOrigin: true }));
app.use('/payments', createProxyMiddleware({ target: process.env.PAYMENT_URL,  changeOrigin: true }));
app.use('/deliveries',createProxyMiddleware({ target: process.env.DELIVERY_URL, changeOrigin: true }));
app.use('/analytics',createProxyMiddleware({ target: process.env.ANALYTICS_URL,changeOrigin: true }));
app.use('/components',createProxyMiddleware({ target: process.env.COMPONENT_URL,changeOrigin: true }));

app.get('/health', (req, res) => {
  res.send('Gateway is up and running');
});

// Server start
app.listen(port, () => {
  console.log(`🚀 API Gateway listening on port ${port}`);
});
