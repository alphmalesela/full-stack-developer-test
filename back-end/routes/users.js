const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { getUsers, saveUniqueUsers, readUniqueUsers, writeDuplicate, completeDuplicates, getToken } = require('../data');
const axios = require('axios');
const https = require('https');

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
        res.json(uniqueUsers).status(200)
    } catch (error) {
        console.log(error)
        res.json({ error: "Something went wrong" })
    }
})

router.post('/uniqueUsers', async (req, res) => {
    try {
        const token = getToken();
        const uniqueUsers = readUniqueUsers();

        for (var i = 0; i < uniqueUsers.length; i++) {
            let user = uniqueUsers[i]
            const data = {
                "action": "ADDUSER",
                "id": user.id,
                "name": user.name,
                "surname": user.surname,
                "department": user.department,
                "designation": user.designation,
                "token": token
            }

            let retries = 0
            while (retries < 2) {
                try {
                    const response = await axios.post('https://challenge.sedilink.co.za:12022', data)
                    console.log(response)
                } catch (error) {
                    //Check if error is user exists; otherwise check if we should retry if we haven't already
                    if (error.status === 505 && error.response.data === "User Already Exists") {
                        console.error(error.response.data)
                    } else {
                        retries++
                        if (retries > 1) {
                            console.log("Failed after retrying")
                            console.error(error.response)
                        }
                    }
                }
            }
        }
        res.json({ message: "Done posting unique users" })
    } catch (error) {
        console.log(error)
        res.json({ error: "Something went wrong" })
    }
})

router.get('/dynamicUsers', async (req, res) => {
    try {
        let { designation } = req.query;

        let users = getUsers();

        if (designation.toLowerCase() !== "all") {
            users = users.filter(user =>
                user.designation.toLowerCase() === designation.toLowerCase()
            );
        }

        const response = users
        res.json(response);
    } catch (error) {
        console.log(error)
        res.json({ error: "Something went wrong" })
    }
})

module.exports = router;