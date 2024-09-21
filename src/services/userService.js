const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const hashPassword = await bcrypt.hash(password, saltRounds)
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "Huynh"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        // fetch user by email
        const user = await User.findOne({ email: email});
        if (user) {
            // compare password
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Email/Password khong hop le"
                }
            } else {
                // create an access token
                return "create an access token"
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password khong hop le"
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService, loginService
}