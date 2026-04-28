const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const cors = require("cors");
// when we try to connect this with front end application cors error will throw
// so overcome that, we need to setup cors


const app = express();

app.use(cors({
    origin: "http://localhost:5173", //---this is the port of our front end application
    credentials: true, //---this is for allowing the cookie to be sent in the request
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

connectDB()
    .then(() => {
        console.log('Database connection established')
        app.listen(3000, () => {
            console.log('Server on')
        })
    })
    .catch((err) => console.log(err))