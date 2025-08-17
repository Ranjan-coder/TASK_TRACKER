const Task = require('../models/task.model')
const User = require('../models/user.model')


const CreateTask = async (req,res)=>{
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;
        const newTask = new Task({title:title,desc:desc})

        const saveTask = await newTask.save();
        const taskId = saveTask._id

        await User.findByIdAndUpdate(id,{ $push: { tasks:taskId._id }})

        res.status(200).json({message: "Task Created"})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error during task creation. Please try again later." });
    }
}

const GetAllTask = async (req,res)=>{
    try {

        // accessing user id from header 
        const { id } = req.headers;

        // populate will helps to show the task data , then we are sorting our data in descending order 
        // to show latest created task by help of options: {sort: {createdAt : -1}
        const userData = await User.findById(id).populate({
            path : "tasks",
            options: {sort: {createdAt : -1}
        }});
        res.status(200).json({data: userData})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while loading all tasks. Please try again later." });
    }

}


const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;

        // Check if the task exists
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Check if the user exists and if the task belongs to the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove task from the user's task list and delete the task
        await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
        await Task.findByIdAndDelete(id);

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while deleting tasks. Please try again later." });
    }
};



const UpdateTask = async (req,res)=>{

    try{

        const { id } = req.params
        const { title, desc } = req.body

        // Check if the task exists
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        const updatedTask = await Task.findByIdAndUpdate(id, {title: title, desc: desc})

        res.status(200).json({ message: "Task updated successfully", task : updatedTask });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while deleting tasks. Please try again later." });
    }

}

// task marked important
const ImportantTask = async (req,res) =>{
    try {

        const { id } = req.params

        // Find the task by id
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        const ImpTask = task.important
        await Task.findByIdAndUpdate(id, { important: !ImpTask })

        res.status(200).json({ message: "Task important successfully" });

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while task marked important/notimportant. Please try again later." });
    }
}

// task marked completed 
const CompleteTask = async(req,res) =>{
    try {

        const { id } = req.params

        const task = await Task.findById(id)
        if(!task){
            return res.status(400).json({message: " Task Not Found "})
        }

        const CompleteMark = task.complete 
        await Task.findByIdAndUpdate(id, { complete : !CompleteMark })

        res.status(200).json({message: "Task Complete marked successfully"})


        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while tasks marked complete/notcomplete. Please try again later." });
    }
}


// get important task 
const GetImpTask = async (req, res) => {
    try {
        const { id } = req.headers;

        // Populate the user's tasks where 'important' is true, sorted by createdAt in descending order
        const data = await User.findById(id).populate({
            path: "tasks", 
            match: { important: true },
            options: { sort: { createdAt: -1 } }  
        });

        const impTaskData = data.tasks; // List of important tasks
        res.status(200).json({ data: impTaskData });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while fetching important tasks. Please try again later." });
    }
};


// get complete task 

const GetCompleteTask = async(req,res) =>{
    try {

        const { id } = req.headers

        const data = await User.findById(id).populate({
            path: "tasks",
            match: { complete : true},
            options: { sort:{ createdAt : -1} }
        })

        const CompleteTask = data.tasks
        res.status(200).json({data: CompleteTask})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while fetching complete tasks. Please try again later." });
    }

}


// get incomplete tasks 

const GetIncompleteTask = async (req,res)=>{
    try {

        const { id } = req.headers

        const data = await User.findById(id).populate({
            path: "tasks",
            match: {complete : false},
            options: {sort: { createdAt: -1 }}
        })

        const incompleteTask = data.tasks
        res.status(200).json({data: incompleteTask})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error while fetching Incomplete tasks. Please try again later." });
    }
}


module.exports = {CreateTask,GetAllTask,DeleteTask,UpdateTask,ImportantTask,CompleteTask,GetImpTask,GetCompleteTask,GetIncompleteTask}