// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

module.exports = app;
