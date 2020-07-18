
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { TODOS, TODO } = require('./types');
const { todo, inProgress, finished } = require('./data')

const todos: typeof TODOS = {
  todo,
  inProgress,
  finished
};
let currId = 2;

const app = express();
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(bodyParser.json());

app.get('/api/todos', (_, res) => {
  console.log('hi')
  res.json(todos);
});

app.post('/api/todo/:id', (req, res) => {
  const { id }: { id: string } = req.params;
  const { prevStatus, todo }: { prevStatus: string, todo: typeof TODO } = req.body;
  delete todos[prevStatus][id];
  todos[todo.status][id] = todo;
  res.json(todo);
})

app.post('/api/todo/', (req, res) => {
  const { todo }: { todo: typeof TODO } = req.body;
  currId++;
  todos.todo[currId] = {
    ...todo,
    id: currId,
    status: 'todo'
  }

  res.json(todos.todo[currId]);
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`TODO app is listening on port ${port}`);