const express = require('express');
const app = express();
const crypto = require('crypto');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});