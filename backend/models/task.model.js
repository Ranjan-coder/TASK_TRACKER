const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, 'Title must be at least 3 characters long'], // optional validation
      maxlength: [20, 'Title cannot exceed 100 characters'] // optional validation
    },
    desc: {
      type: String,
      required: true,
      minlength: [10, 'Description must be at least 10 characters long'], // optional validation
      maxlength: [200, 'Description cannot exceed 500 characters'] // optional validation
    },
    important:{
        type : Boolean,
        default : false
    },
    complete:{
        type : Boolean,
        default : false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
