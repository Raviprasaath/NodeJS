const express = require('express');
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignore", "interested", "accepted", "rejected"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json("Invalid status");
        }

        // in the database we had all logged users id, incase if someone trying to put
        // new id which is not in the database, it will not allow to send request
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // while requesting, if user is already requested or if from receiver trying to give 
        // a request to sender, it will not allow
        const exitingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
                // { fromUserId, toUserId: fromUserId } -> instead of doing this here we can do in the schema using Pre
            ],
        });
        if (exitingConnectionRequest) {
            return res.status(400).json("Connection request already exists");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request sent successfully",
            data
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})


module.exports = requestRouter;