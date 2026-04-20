const express = require('express');

const { adminAuth, userAuth } = require('./middleware/auth')

const app = express();

//--we can write way
app.use("/admin", adminAuth);

app.get("/admin/dashboard", (req, res) => {
    res.send('Welcome to the admin dashboard!');
})

//--or we can write this way also so here middleware we can skip and added in the next call
app.get("/user/login", (req, res) => {
    res.send('Welcome to the user dashboard!');
})

app.get("/user/profile", userAuth, (req, res) => {
    res.send('Welcome to the user dashboard!');
})

app.use("/", (req, res) => {
    throw new Error("asdad");
})

//----Error handling middleware
app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("Something went wrong!");
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});