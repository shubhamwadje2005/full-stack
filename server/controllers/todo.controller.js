const Todo = require("../models/Todo.js")

exports.createTodo = async (req, res) => {
    try {
        await Todo.create(req.body)
        res.status(201).json({ message: "todo create Success", success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}

exports.readTodo = async (req, res) => {
    try {
        const result = await Todo.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}
exports.updateTodo = async (req, res) => {
    try {
        const { todoid } = req.params
        await Todo.findByIdAndUpdate(todoid, req.body)
        res.status(200).json({ message: "todo update Success", success: true, })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}
exports.deleteTodo = async (req, res) => {
    try {
        const { todoid } = req.params
        await Todo.findByIdAndDelete(todoid)
        res.status(200).json({ message: "todo delete Success", success: true, })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, success: false })
    }
}