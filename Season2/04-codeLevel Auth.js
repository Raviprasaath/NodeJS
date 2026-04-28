/**

this is normal code
app.post("/sendConnectionRequest", async(req, res) => {

    // sending a connection request
    res.send("sending connection request");
})


app.post("/sendConnectionRequest", userAuth, async(req, res) => {

    // sending a connection request
    res.send("sending connection request");
})

here by adding this userAuth it is become more safe, now if cookies 
not there it will throw error



-----------------------
in the jwt token we can add expire time


example: here expire mentioned as 0d -> means it will expire immediately -> login -> profile -> Error: jwt expired
const token = await jwt.sign({ _id: user._id }, "Ravi@1234", { expiresIn: '0d' })


-------------------------
similarly cookies also we can set expire time
in the express website search for cookie

res.cookie("token", token, { httpOnly: true });
--here it will pass only if the url is having http

res.cookie("token", {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
});



----------------------
Improvement/ Optimization
for example in the database we need to search something means
we can write the value it will do search, but if we write with index it is more fast

example
User.findOne({ email: 'ravi@gmail.com}) -> this is bad
User.findOne({ email: 'ravi@gmail.com}) -> this is more faster





-------------Need to study
Proper validation of data
$or $and -> query difference in mongodb
indexes in mongodb
why do we need to use indexes in mongodb
what is the advantage of using indexes in mongodb




in mongoDB important functions
.skip() & .limit()

.skip(0) & limit(10) => 1-10 users will took




 */