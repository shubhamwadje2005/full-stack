const { createTodo, readTodo, updateTodo, deleteTodo } = require("../controllers/todo.controller.js")

const router = require("express").Router()

router
    .get("/", readTodo)
    .post("/create", createTodo)
    .patch("/modify/:todoid", updateTodo)
    .delete("/remove/:todoid", deleteTodo)

module.exports = router