var mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
    text: String,
    username: String,
    // in MM-DD-YYYY format
    date: Date
});


module.exports = mongoose.model('Todos',todoSchema);