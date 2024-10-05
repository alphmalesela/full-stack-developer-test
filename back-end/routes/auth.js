const express = require('express');
const router = express.Router();
const axios = require('axios');
const { saveUsers } = require('../data');
const { limiter } = require('./../middleware/rate-limitter')

router.post('/login', limiter, async (req, res) => {
    const app = req.app
    try {
        const { username, password } = req.body;
        const data = {
            "action": "LOGIN",
            "username": username,
            "password": password
        }
        const response = await axios.post('https://challenge.sedilink.co.za:12022', data)
        console.log(response);
        const token = response.data.token
        app.locals.sedilinkAuthToken = token

        const users = response.data.users
        saveUsers(users)

        res.json({
            token: token
        }).status(200)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;