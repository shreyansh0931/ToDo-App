const mongoose =require('mongoose');


const taskSchema = new mongoose.Schema({

    Description:{
        type: String,
        require: true
    },

    Category:{
        type: String,
        require: true
    },

    DueDate:{
        type: String,
        require: true
    }


});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;