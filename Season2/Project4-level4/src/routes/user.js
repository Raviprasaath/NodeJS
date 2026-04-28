const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName";

// get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            // }).populate("fromUserId", ["firstName", "lastName"]) //---without this array it will give all the data, but we have to show only the required data
        }).populate("fromUserId", "firstName lastName") //---another way of writing

        res.json({
            message: "Data fetched Successfully",
            data: connectionRequest,
        })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId toUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.fromUserId;
            }
            return row.fromUserId;
        });
        // so by doing this in the response we only got the data from fromUserId 
        res.json({ data })
        // res.json({data: connectionRequests})

    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    // user feed condition is  
    // user should see all the user cards except
    // 0. his own card
    // 1. his connections
    // 2. ignored people
    // 3. already sent the connection request

    const loggedInUser = req.user;

    // /feed/?page=1&limit=10
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    // if someone tries to put like 1L, so server will crash, so to control this
    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    // find all the connection request (sent + received)
    const connectionRequests = await ConnectionRequest.find({
        $or: [
            { fromUserId: loggedInUser._id },
            { toUserId: loggedInUser._id }
        ]
    }).select("fromUserId toUserId status")
    // .populate("fromUserId", "firstName").populate("toUserId", "firstName");

    // set is like a hash set, for example if we have this [A, B, C, D] -> When we try to add A again it will not allow, it is always unique.
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
    });

    // $nin ,$ne these are avail in mongoDB ref page under Comparison query section
    const users = await User.find({
        $and: [
            { _id: { $nin: Array.from(hideUsersFromFeed) } },
            { _id: { $ne: loggedInUser._id } }
        ]
    }).select("firstName lastName status about")
        .skip(skip)
        .limit(limit);

    console.log(hideUsersFromFeed);

    res.send(users);
})

module.exports = userRouter;