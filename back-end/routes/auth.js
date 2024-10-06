const express = require('express');
const router = express.Router();
const axios = require('axios');
const { saveUsers, saveToken } = require('../data');
const { limiter } = require('./../middleware/rate-limitter')

router.post('/login', limiter, async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = {
            "action": "LOGIN",
            "username": username,
            "password": password
        }
        const response = await axios.post('https://challenge.sedilink.co.za:12022', data)
        const token = response.data.token

        const users = response.data.users
        saveUsers(users)
        saveToken(token)

        res.json({
            token: token
        }).status(200)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;