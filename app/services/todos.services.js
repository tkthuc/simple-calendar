let Todos =  require('../models/todos');


const getTodos = async ({username, startDate, endDate}) => {
    try{
        return await Todos.find({
            username: username,
            date: {
               $gte: new Date(startDate),
               $lte: new Date(endDate)
            }
        });
    }catch(err) {
        throw err;
    }
}

const createTodo = async (todos) => {
    let Todo = new Todos();
    Todo.username = todos.username;
    Todo.date = new Date(todos.date);
    Todo.text = todos.text; 
    try {
        return await Todo.save( err => {
            if(err) {
                throw err; 
            }else {
                return Todo;
            }
        })
    }catch(err) {
        throw err;
    }
}

module.exports = {
    getTodos,
    createTodo,
}