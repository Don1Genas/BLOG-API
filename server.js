const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const { application } = require('express');
const mongoConfig = require('../toDoApp-api/config/mongoConfig');

const mongoConfig = require('./config/blogConfig');

const app = express();
const PORT = 4005;




application.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    mongoConfig()
})
