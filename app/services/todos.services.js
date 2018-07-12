let Todos =  require('../models/todos');


const getTodos = async ({username, startDate, endDate, page, perPage}) => {

    if(page=== undefined) {
        page = 1;
    }
    perPage = perPage === undefined ? 10 : perPage;
    try{
        let todos = Todos.find({
            username: username,
            date: {
               $gte: new Date(startDate),
               $lte: new Date(endDate)
            }
        }).skip((page-1)*perPage).limit(parseInt(perPage)).exec();
        
        let totalPages = Todos.count();

        
        const values = await Promise.all([todos,totalPages]);

        return {
            totalPages: Math.ceil(values[1]/perPage),
            currentPage: page,
            recordsPerPage : perPage,
            todos: values[0]
        }
        

        
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