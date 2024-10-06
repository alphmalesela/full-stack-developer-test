const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { mongodbConn } = require('./../constants')
const uri = mongodbConn;
const client = new MongoClient(uri);
const { readUniqueUsers } = require('../data');
const { toArray } = require('gsap');

router.get('/seedData', async (req, res) => {

    try {
        await client.connect();

        const uniqueUsers = readUniqueUsers();

        const database = client.db('Experiments');
        const users = database.collection('users');

        const result = await users.insertMany(uniqueUsers);

        const message = `${result.insertedCount} documents were inserted.`
        console.log(message);

        res.json({ message })

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }

})

//Engineering Department Reporting
router.get('/engDepReport', async (req, res) => {

    try {
        await client.connect();

        const database = client.db('Experiments');
        const users = database.collection('users');

        const results = await users.aggregate([
            {
                $match: {
                    designation: { $in: ["MECHANIC", "MECHANIC ASSISTANT"] },
                    $nor: [
                        { $and: [{ name: "MICHEAL" }, { surname: "PHALANE" }] }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 }
                }
            }
        ]).toArray()

        const total = results.length > 0 ? results[0].total : 0

        res.json({ total });

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }

})


module.exports = router;