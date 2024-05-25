const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
// mongoDB

// Middleware to parse JSON?
app.use(bodyParser.json());



mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));



const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log('Server running on port 3000');
});







