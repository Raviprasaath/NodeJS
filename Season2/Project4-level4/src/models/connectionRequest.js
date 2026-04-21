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

const connectionRequest = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
)

module.exports = connectionRequest;