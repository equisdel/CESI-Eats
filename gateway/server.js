// gateway/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// 👉 1) parse le JSON pour cette route
app.use('/api/orders', bodyParser.json());

// 👉 2) proxy
app.use('/api/orders', createProxyMiddleware({
  target: 'http://order-service:5003',   // nom du service Docker
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    if (req.body && Object.keys(req.body).length) {
      const body = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(body));
      proxyReq.write(body);
      proxyReq.end();                    // ⚠️ termine le flux
    }
  }
}));

app.listen(8000, () => console.log('🚀 API Gateway listening on port 8000'));
