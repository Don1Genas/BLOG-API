const express = require('express');
require('dotenv').config(); // init dotenv
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const mongoConfig = require('./config/blogConfig');
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const blogRouter = require('./routes/blogRouter')

const app = express();
const PORT = process.env.PORT || 4005;

//Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

//Routers
app.use('/users', userRouter)
app.use('/blogs', blogRouter)
app.use('/auth', authRouter)

// Root route for the App
app.get('/', (req, res) => {
    res.status(200).json('WELCOME TO MY BLOG API!!')
})


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoConfig()
})
