const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const JWT_KEY = process.env.JWT_KEY || "default_key";

const serviceProxyMap = {
  '/api/orders': 'http://order-service:5003',
  '/api/users': 'http://user-service:5002',
  '/api/menu': 'http://menu-service:5004',
  '/api/payments': 'http://payment-service:5005',
  '/api/delivery': 'http://delivery-service:5006',
  '/api/analytics': 'http://analytics-service:5007',
  '/api/components': 'http://component-service:5008',
};

//require('./src/routes/auth.routes')(app);

// all requests go through this endpoint: proxy
app.all('/', (req, res) => {
  // check for token in header
  console.log("ok")
});



/*
// Logger
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.url}`);
  next();
});


// Dictionnaire des routes dynamiques


// Proxy dynamique
Object.entries(serviceProxyMap).forEach(([route, target]) => {
  app.use(route, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, req) => path.replace(route, ''), // retire le préfixe
  }));
});
*/


app.listen(port, '0.0.0.0', () => {
  console.log('Gateway listening on port',port);
});