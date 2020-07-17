const express = require('express');
const bodyParser = require('body-parser');
const { TODOS, TODO } = require('./types');
const { todo, inProgress, finished } = require('./data');
const todos = {
    todo,
    inProgress,
    finished
};
let currId = 2;
const app = express();
app.use(bodyParser.json());
app.get('/api/todos', (_, res) => {
    console.log('hi');
    res.json(todos);
});
app.post('/api/todo/:id', (req, res) => {
    console.log('id, prevStatus, newTodo');
    const { id } = req.params;
    const { prevStatus, newTodo } = req.body;
    delete todos[prevStatus][id];
    todos[newTodo.status][id] = newTodo;
    res.json(newTodo);
});
app.post('/api/todo/', (req, res) => {
    const { todo } = req.body;
    currId++;
    todos[todo.status][currId] = Object.assign(Object.assign({}, todo), { id: currId });
    res.json(todo);
});
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`TODO app is listening on port ${port}`);
//# sourceMappingURL=index.js.map