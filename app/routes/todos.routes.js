const router = require('express').Router();

const todoServices = require('../services/todos.services.js');

router.get('/:username', async (req,res,next) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const perPage = req.query.perPage;
    const page = req.query.page;
    try{
        const todos = await todoServices.getTodos( { username: req.params.username, startDate: startDate, endDate: endDate, perPage: perPage, page:page });
        res.send(todos);
    }catch(err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req,res,next) => {    
    let {username, date, text} = req.body;
    try {
      const todo = await todoServices.createTodo( { username, date, text });
      res.status(200).send(todo);
    } catch(err) {
      res.status(400).json(err);
    }
});


router.use((req,res,next) => {
    const date = req.query.date;
    next();
});

module.exports = router;