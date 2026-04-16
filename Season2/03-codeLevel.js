/*

for validation - email
there is a npm i validator package is there

in this package there are many methods for validation

isEmail() - for email validation
isUrl() - for url validation

Whenever user is signup we have to do 3 things
1.validation
2.Encryption of password
3. Creating a account



for encrypting a password there is a npm package 
npm i bcrypt

user enter password and this bcrypt we need to compare.










--- COOKIES ---
whenever we are logging in we are going to get a jwt token
that token is storing in the cookies (backend)
so if user is checking the profile, order, or other pages cookies will validate first
then it will continue, cookies had a expire time

npm i cookie-parser


so first while log in cookies need to set
when password correct
res.cookie("token", "ksdfhkdaasdbasdafwedbcs");


taking cookies back from the server is followed

const cookieParser = require("cookie-parser");
app.use(cookieParser)

app.get("/profile", async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.send("cookies posted")
})

now in console it will come
if cookie is not there it will return null/empty object





JWT token
JSON Wen Token
token divided into 3 parts
header, payload, signature


npm i jsonwebtoken

const jwt = require("jsonwebtoken");

const token = await jwt.sign({ _id: user._id }, "Ravi@1234")

so here we are storing id secretly, and thr second argument is password which only stored in server

res.cookie("token", token);


//---that's it
in the profile will take this jwt
app.get("/profile", async (req, res) => {
    const cookies = req.cookies;

    const { token } = cookies;
    const isValidToken = await jwt.verify(token, "Ravi@1234")
    console.log(isValidToken._id)
    res.send("cookies posted")
})





*/