var mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
    text: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    date: Date
});


module.exports = mongoose.model('Todos',todoSchema);