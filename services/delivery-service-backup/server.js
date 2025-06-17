const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send(`✅ ${process.env.PORT} - ${process.env.SERVICE_NAME || 'Service'} is running`);
});

app.listen(port, () => {
  console.log(`✅ ${process.env.SERVICE_NAME || 'Service'} listening on port ${port}`);
});
