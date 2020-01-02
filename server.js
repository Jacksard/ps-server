const express = require('express');
const connectDB = require('./db/db');

const app = express();

// ENV
require('dotenv').config();

// DB
connectDB();

// Init middleware for req body
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API');
});

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/schedule', require('./routes/api/schedule'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
