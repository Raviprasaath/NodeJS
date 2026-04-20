require('dotenv').config();

const mongoose = require("mongoose");

const username = process.env.USERNAME_DB
const password = process.env.PASSWORD_DB

const url = `mongodb+srv://${username}:${password}@cluster0.qgbxiqb.mongodb.net/`

const connectDB = async () => {
    const data = await mongoose.connect(url);
    const result = await data.connection.db.listCollections().toArray();
}

module.exports = connectDB;