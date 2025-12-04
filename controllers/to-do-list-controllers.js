const ToDoModel  = require('../models/to-do-list-model');

exports.getalltodos = async(req, res) => {

    const list = await ToDoModel.find();
    if(list.length == 0){
       return res.status(400).json({
            message: "No To-Do items found"
        });
    }
    else{
        return res.status(200).json({
            message: "To-Do items retrieved successfully",
            data: list
        });
    }
}

exports.getSingleTodo = async(req, res) => {
    const {title} = req.params;
    const list = await ToDoModel.findOne({title});

     if (!list || list.length === 0) {
        return res.status(400).json({
            success: false,
            message: `No To-Do items found for ${title}`
        });
    }

    return res.status(200).json({
        success: true,
        message: "To-Do items retrieved successfully",
        data: list
    });
}

exports.addTodo = async(req, res) =>{
    let {data} = req.body;
    const newTitle = await ToDoModel.create(data);
    res.status(201).json({
        message: "New To-Do item added successfully",
        data: newTitle
    });
}

exports.updateTodo = async(req, res) => {
    const { title } = req.params;
    const { data } = req.body;
    const updatedToDo = await ToDoModel.findByIdAndUpdate(title, data, { new: true });

    if (!updatedToDo) {
        return res.status(404).json({
            message: "To-Do item not found"
        });
    }
    return res.status(200).json({
        message: "To-Do item updated successfully",
        data: updatedToDo
    });
}

exports.updateStatus = async(req, res) => {
    const {title} = req.params;
    const {status} = req.body;

    if (!title || !status) {
        return res.status(400).json({
            message: "title and status are required"
        });
    }

    const updatedToDo = await ToDoModel.findOneAndUpdate({title}, {status}, { new: true });

    if (!updatedToDo) {
        return res.status(404).json({
            message: "To-Do item not found"
        });
    }

    if(status == "completed"){
        return res.status(200).json({
            message : "This task is now completed",
            data: updatedToDo
        })
    }

    return res.status(200).json({
        message: "To-Do item updated successfully",
        data: updatedToDo
    });
}

exports.deleteTodo = async(req, res) => {
    const { title } = req.params;
    const deletedToDo = await ToDoModel.findOneAndDelete({ title });
    if (!deletedToDo) {
        return res.status(404).json({
            message: "To-Do item not found"
        });
    }
    return res.status(200).json({
        message: "To-Do item deleted successfully",
        data: deletedToDo
    });
}