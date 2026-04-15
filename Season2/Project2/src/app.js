const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const validateSignupData = require("./utils/validation");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    
    
    // Encryption
    
    try {
        // validation
        validateSignupData(req);

        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("Error creating user in POST : "+ err.message);
    }
})

// get user by mail
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail });
        if (user.length === 0) {
            res.status(404).send("User not found");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("Error fetching user"+ err.message);
    }
})

// get all the users from database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            res.status(404).send("No users found");
        }
        res.send(users);
    } catch (err) {
        res.status(400).send("Error fetching details"+ err.message);
    }
})

// update
app.patch('/user', async (req, res) => {
    const data = req.body;
    const id = req.body.userId;

    const ALLOWED_UPDATES = [
        "userId",
        "age",
        "photoUrl",
        "skills",
        "about"
    ]
    
    try {
        const isUpdateAllowed = Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key))

        if (!isUpdateAllowed) {
            throw new Error("Invalid updates");
        }

        const user = await User.findByIdAndUpdate(id, data, { runValidators: true });
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Error updating user"+ err.message);
    }
})

// delete
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Error deleting user"+ err.message);
    }
})

connectDB()
    .then(() => {
        console.log('Database connection established')
        app.listen(3000, () => {
            console.log('Server on')
        })
    })
    .catch((err) => console.log(err))

