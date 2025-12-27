// so here what exactly happens we are reading from the db the ,env file so first we will look for the dotenv
require('dotenv').config()
const mongoose = require("mongoose")

const DB_URL = process.env.MONGODB_URL

const connection  = mongoose.connect(DB_URL);

module.exports = {connection};
