const express = require("express");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");

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
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // create a JWT token
            const token = await user.getJWT();
            // Add the token to cookie and send the response back to the user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            });

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

app.post("/sendConnectionRequest", userAuth, async (req, res) => {

    // sending a connection request
    res.send("sending connection request");
})

connectDB()
    .then(() => {
        console.log('Database connection established')
        app.listen(3000, () => {
            console.log('Server on')
        })
    })
    .catch((err) => console.log(err))