const express = require('express');
const router = express.Router();
const Client = require('../models/clientSchema')

router.post('/register', (req, res) => {

    const {name, password} = req.body;

    const user = new Client({ name, password });

    user.save(err => {
        if (err) {
            res.status(500).send({ message: "Error user NOT registered" });
        } else {
            res.status(200).send({ message: "User registered" });
        }
    });

});

router.post('/login', (req, res) => {

    const {name, password} = req.body;

    Client.findOne({ name }, (err, user) => {
        if (err) {
            res.status(500).send('Error on register');
        } else if (!user) {
            res.status(500).send('User NOT find')
        } else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(500).send('Authenticate error')
                } else if (result) {
                    res.status(200).send('Access granted')
                } else {
                    res.status(500).send('name or password incorrect')
                }
            });
        }

    });

});

module.exports = router;