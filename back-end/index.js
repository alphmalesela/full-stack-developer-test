const express = require('express');
const app = express();
require('dotenv').config()
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const nosqlRoutes = require('./routes/nosql');
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/nosql', nosqlRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});