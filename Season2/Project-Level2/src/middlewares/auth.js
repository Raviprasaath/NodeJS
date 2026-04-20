const jwt = require('jsonwebtoken');
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // Read the token from the req cookies
        const { token } = req.cookies;

        if (!token) {
            throw new Error("Token is not valid");
        }

        const decodedObj = await jwt.verify(token, "Ravi@1234");

        const { _id } = decodedObj;

        // Find the user
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        // in the profile api this middleware is going to call,
        // so there no need to do the findById again instead we can send from here byt req.user
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
}

module.exports = {
    userAuth
};