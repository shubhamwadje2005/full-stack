const { Register, Logout, Login } = require("../controllers/auth.controller.js")

const router = require("express").Router()

router
    .post("/signup", Register)
    .post("/signin", Login)
    .post("/singout", Logout)

module.exports = router

