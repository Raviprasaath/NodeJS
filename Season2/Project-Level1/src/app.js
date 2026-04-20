const express = require("express");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


const connectDB = require("./config/database");
const User = require("./models/user");
const validateSignupData = require("./utils/validation");
const { userAuth } = require("./middlewares/auth")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    const { firstName, lastName, emailId, password } = new User(req.body);


    try {
        // validation
        validateSignupData(req);

        // Encryption
        const passwordBcrypt = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: passwordBcrypt
        })
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("Error creating user in POST : " + err.message);
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error('User not available');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {

            // create a JWT token
            const token = await jwt.sign({ _id: user._id }, "Ravi@1234")

            // Add the token to cookie and send the response back to the user
            res.cookie("token", token);

            res.send("Login Success")
        } else {
            throw new Error("Wrong Password ")
        }
    } catch (err) {
        res.status(400).send('Login failed: ' + err.message)
    }

})

app.get("/profile", userAuth, async (req, res) => {
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
        res.status(400).send("Error fetching user" + err.message);
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
        res.status(400).send("Error fetching details" + err.message);
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
        const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key))

        if (!isUpdateAllowed) {
            throw new Error("Invalid updates");
        }

        const user = await User.findByIdAndUpdate(id, data, { runValidators: true });
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Error updating user" + err.message);
    }
})

// delete
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("Error deleting user" + err.message);
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

