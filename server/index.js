const express = require("express")
const mongoose = require("mongoose")
// require("dotenv").config({ path: "./.env" })
require("dotenv").config({ path: "./.env" })
const cors = require("cors")

const app = express()
app.use(express.json())
// app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use("/api/todo", require("./routees/todo.routes.js"))
app.use("/api/auth", require("./routees/auth.routes.js"))

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongoDB conected")
    app.listen(process.env.PORT, console.log("Server Running...", process.env.PORT))
})

module.exports = app