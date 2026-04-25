const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

// get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
        })

        res.json({
            message: "Data fetched Successfully",
            data: connectionRequest,
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

module.exports = userRouter;