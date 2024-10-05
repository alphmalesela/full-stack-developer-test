const express = require('express');
const router = express.Router();

const { getUsers } = require('../data');
router.get('/all', async (req, res) => {
    const users = getUsers();
    res.json(users).status(200)
})

module.exports = router;