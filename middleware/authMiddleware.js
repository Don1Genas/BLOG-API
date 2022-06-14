const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //Get the token from the headers object
    const token = req.header('x-auth-token')

    //If No Token
    if(!token) {
        return res.json('No Token Access denied')
    }

    //If we have a token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        console.log(decoded);

        next()
    } catch (error) {
        console.log(error);
        res.status(400).json('Token not valid!')
    }
}