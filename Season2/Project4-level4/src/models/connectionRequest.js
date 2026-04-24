const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        // we are considering id so it is not string, it should be in this format only
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        // enum is basically we can define what we needed, so it will not allow other things
        // this ref is in the enum mongoose - custom error messages
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: '{value} is not supported'
        }
    }
},
    {
        timestamps: true,
    }
);

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself");
    }
    next;
})

const ConnectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
)

module.exports = ConnectionRequestModel;