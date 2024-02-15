const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');

// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err));

const app = express();

app.use('/', require('./routes/authRoutes'));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));