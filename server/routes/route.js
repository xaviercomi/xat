const express = require('express');
const router = express.Router();
const Client = require('../models/clientSchema')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/authToken')

router.post('/register', (req, res) => {

    const { name, password } = req.body;

    const user = new Client({ name, password });

    user.save(err => {
        if (err) {
            res.status(500).send({ message: "Error user NOT registered" });
        } else {
            res.status(201).send({ message: "User registered" });
        }
    });

});

router.post('/login', (req, res) => {

    const {name, password} = req.body;

    Client.findOne({ name }, (err, user) => {
        if (err) {
            res.status(500).send('Error on login');
        } else if (!user) {
            res.status(404).send('User NOT find');
        } else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(400).send('Authenticate error');
                } else if (result) {
                    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
                    res.status(200).header('token', accessToken).json({token: accessToken});
                } else {    
                    res.status(401).send('name or password incorrect')
                }
            });
        }

    });

});

router.get('/index', auth, (req, res) => {

        if (res.ok) {
            return res.status(200).send({ message: 'Access granted!'});
        } else {
            return res.status(500).send({ message: 'token authenticate fail' })
        }
});

module.exports = router;