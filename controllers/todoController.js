const Todo = require("../models/todo");

const addTodo = async (req, res) => {
  const {title} = req.body;
  const {userId} = req.params;
  console.log(userId)

  try {
    const todo = new Todo({ title, userId});
    await todo.save();
    res.status(200).json({
      success: true,
      message: "Todo added successfuly",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Todo.deleteOne({ _id: id });
    console.log(deleted)  
      if (deleted ) {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfuly",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error deleting todo",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateTodo = async (req, res) => {
  const {title} = req.body;
  const {userId} = req.params;
  try {
    const updated = await Todo.updateOne({userId: userId },{$set: {title : title}});
    if (updated > 0) {
      res.status(200).json({
        success: true,
        message: "Todo updated successfuly",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAll = async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await Todo.find({userId}).exec();
    if(todos){
      res.status(500).json({
        success: true,
        message: "Todos fetched",
        data: todos
      });
    }
    else{
      res.status(404).json({
        success: false,
        message: "Todos not found",
        });
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { addTodo, deleteTodo, updateTodo, getAll };
