const express = require('express');
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation")

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("User does not exist");
        }
        res.send(user);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfile(req)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        console.log(loggedInUser);
        
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        console.log(loggedInUser);

        await loggedInUser.save();
        
        //  res.send("Edit Success") --> instead this we can send json
        res.json({
            message: `${loggedInUser.firstName}, your profile is updated successfully`,
            data: loggedInUser
        })
    } catch (error) {
        res.status(400).send('Error: ' + error.message);
    }
})

module.exports = profileRouter
