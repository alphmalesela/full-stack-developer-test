const express = require('express');
const app = express();
require('dotenv').config()
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const nosqlRoutes = require('./routes/nosql');
const wsRoutes = require('./routes/websocket');
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/nosql', nosqlRoutes);
app.use('/ws', wsRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});