require("dotenv").config({path: "../.env"});

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())

// automatic routing of requests
require('./src/routes/auth.routes')(app);

// first thing that happens when the server starts
app.listen(port, () => {
  console.log(`✅ ${process.env.SERVICE_NAME || 'Service'} listening on port ${port}`);
});
