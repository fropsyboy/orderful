const express = require('express');
const bodyParser = require('body-parser');
const converterRoutes = require('./routes/converterRoutes');
const { connectDB } = require('./utilities/dataabaseConfig');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// Routes
app.use('/api/converter', converterRoutes);

// Status endpoint
app.get(['/', '/status'], (req, res) => {
    res.json({ status: "Orderful Application is running"})
})

module.exports = app;
