const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
    res.send('hello');
});

router.post('/register', function(req, res) {
    res.send('register');
});

module.exports = router;