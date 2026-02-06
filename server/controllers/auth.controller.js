const User = require("../models/User.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.Register = async (req, res) => {
    try {
        const { email, password, name } = req.body
        const result = await User.findOne({ email })
        if (result) {
            return res.status(409).json({ message: "email aleardy exist", success: true })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        // console.log(hashPasswor                                                                                
        // console.log(password)
        await User.create({ ...req.body, password: hashPassword })
        res.status(201).json({ message: "user register success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await User.findOne({ email })
        if (!result) {
            return res.status(401).json({ message: "email not found", success: true })
        }

        const verify = await bcrypt.compare(password, result.password)
        if (!verify) {
            return res.status(401).json({ message: "invalid password", success: true })
        }
        if (!result.isAction) {
            return res.status(401).json({ message: "account blocked by admin ", success: false })
        }
        const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY, { expiresIn: "1d" })

        res.cookie("ADMIN", token, {
            maxAge: 1000 * 60,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" // local => false and live => true
        })

        res.status(200).json({
            message: "user login success",
            result: { name: result.name, email: result.email },
            // token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}
exports.Logout = async (req, res) => {
    try {
        res.status(200).json({ message: "user logout success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}