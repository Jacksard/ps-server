const express = require('express');
const connectDB = require('./db/db');

const app = express();

// ENV
require('dotenv').config();

// DB
connectDB();

app.get('/', (req, res) => {
  res.send('API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
