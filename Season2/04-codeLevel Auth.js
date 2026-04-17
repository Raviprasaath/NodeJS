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





 */