const express = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('../model/userSchema')

const router = express.Router()

//User Login
router.post('/', [
    check("email", "Please provide a valid email!").isEmail(),
    check("password", "Check your password!").notEmpty()
], async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)
    //Check for validation errors
    if(!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        // Find the user with the provided email
        const user = await UserModel.findOne({email: userData.email})

        if(!user){
            return res.json('User not found!')
        }

        //Compare plain text password to the hashed password
        const isMatch = await bcrypt.compare(userData.password, user.password)

        if(!isMatch){
            return res.json("Password is not a match!")
        }

        //Create  a New JWT Token

        const payload = {
            id: user._id,
            email: user.email
        }

        const SECRET_KEY = 'THIS_CANNOT_BE_DUPLICATED'

        const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1 day"})

        res.status(201).json({
            user: user,
            token: TOKEN
        })

    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error!')
    }

})

module.exports = router