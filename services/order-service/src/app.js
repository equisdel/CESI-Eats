const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error(err));

// Routes
app.use('/', userRoutes); // 

// Logger
app.use((req, res, next) => {
  console.log(`[Order-Service] ${req.method} ${req.url}`);
  next();
});

module.exports = app;
