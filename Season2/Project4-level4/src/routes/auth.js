const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/user");

const { validateSignupData } = require("../utils/validation");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, emailId, password } = new User(req.body);

    try {
        // validation
        validateSignupData(req);

        // Encryption
        const passwordBcrypt = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: passwordBcrypt
        })
        const savedUser = await user.save();
        res.send({message: "User created successfully", data: savedUser});
    } catch (err) {
        res.status(400).send("Error creating user in POST : " + err.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error('User not available');
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // create a JWT token
            const token = await user.getJWT();
            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            });

            res.send(user);
        } else {
            throw new Error("Wrong Password ")
        }
    } catch (err) {
        res.status(400).send('Login failed: ' + err.message)
    }

})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Success");
});

module.exports = authRouter;
