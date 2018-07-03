var mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
    text: String,
    username: String,   
    date: Date,
    // true = checked 
    status: Boolean
});


module.exports = mongoose.model('Todos',todoSchema);