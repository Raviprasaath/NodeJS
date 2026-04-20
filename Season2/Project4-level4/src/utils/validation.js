const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not valid");
    }
}

const validateEditProfile = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ]

    const isAllowed = Object.keys(req.body).every(filed => allowedEditFields.includes(filed));

    return isAllowed;
}

module.exports = {
    validateSignupData, validateEditProfile
};