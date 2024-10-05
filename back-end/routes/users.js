const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { getUsers, saveUniqueUsers, writeDuplicate, completeDuplicates } = require('../data');

router.get('/all', async (req, res) => {
    try {
        const users = getUsers();
        res.json(users).status(200)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Could not fetch users' });
    }
})

router.get('/uniqueUsers', async (req, res) => {
    try {
        const users = getUsers();
        let uniqueUsers = []
        const seen = new Set();
        const mapUsers = new Map()

        for (const user of users) {
            const key = `${user.name}-${user.surname}`;
            if (!seen.has(key)) {
                const UUID = crypto.randomUUID()
                uniqueUsers.push({
                    id: UUID,
                    name: user.name,
                    surname: user.surname,
                    department: user.department,
                    designation: user.designation,
                })
                seen.add(key)
            } else {
                const key = `${user.name}-${user.surname}`;
                if (mapUsers.has(key)) {
                    const exisitng = mapUsers.get(key)
                    mapUsers.set(key, {
                        name: user.name,
                        surname: user.surname,
                        duplicates: exisitng.duplicates += 1
                    })
                } else {
                    mapUsers.set(key, {
                        name: user.name,
                        surname: user.surname,
                        duplicates: 1
                    })
                }
            }
        }
        saveUniqueUsers(uniqueUsers)
        mapUsers.forEach((user) => {
            writeDuplicate(user)
        });
        completeDuplicates()
        res.json({ messsage: "Unique users and duplicates saved" })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;