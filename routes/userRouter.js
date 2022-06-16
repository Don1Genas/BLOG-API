const express = require('express')
const UserModel = require('../model/userSchema')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const authMiddleware = require('../middleware/authMiddleware')
const jwt = require('jsonwebtoken')

//Create Router
const router = express.Router()

//GET USERS
router.get('/', authMiddleware, async (req, res) => {
    try {
        const blogs = await UserModel.find()
        res.status(200).json(blogs)
    } catch (error) {
        console.log(error);
    }

})

//Register and Create a New User
router.post('/', [
    check('username', "Username is required! ").notEmpty(),
    check('email', "Please use a valid email!").isEmail(),
    check("password", "Please enter a password").notEmpty(),
    check("password", "Please enter a password with at least six characters!").isLength({min:6})
], async (req, res) =>{
    const userData = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        //Check if there is a user's email is already in the DB
        const userExist = await UserModel.findOne({email: userData.email})
        //If user exist, then return a message
        if (userExist) {
            return res.json("User already exist!")
        }

        //=====Create a New User======
        //(1) Create the SALT
        const SALT = await bcrypt.genSalt(12)
        //(2) Use the SALT to create a hash with the user's password
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        //(3) Assign the hashed password to the userData
        userData.password = hashedPassword
        // Write the user to the DB
        const user = await UserModel.create(userData)

        //Create a New JWT Token

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
        res.status(400).json('Bad Request!!')
    }

})

module.exports = router