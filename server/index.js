const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/authRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));