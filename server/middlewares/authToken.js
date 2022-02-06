const jwt = require("jsonwebtoken");

function authenticateToken (req, res, next) {

    const token = req.headers.token

    if (token === null) {
        return res.status(401).send({ message: 'Unauthorized'})
    } 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {

        if (err) {
            return res.status(403).send({ message: 'Forbidden'})
        } else {
            return res.status(200).send('Access grated')
        }
    })
}

module.exports = authenticateToken;