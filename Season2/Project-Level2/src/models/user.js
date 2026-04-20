const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Enter valid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Enter valid password');
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error('Enter valid gender')
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Enter valid url');
            }
        }
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
})


userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Ravi@1234", { expiresIn: '1d' })
    return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser) {
    // in the app.js file this is written like bcrypt.compare(password, user.password)
    // but here this will not work, so slight changes did bcrypt.compare("password", this.password)
    const user = this;
    const passwordHash = user.password;
    
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;