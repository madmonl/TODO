import axios from 'axios';
import { TODO } from '../../types';

export async function editTodo({ prevStatus, todo }: { prevStatus: string, todo: TODO }) {
  const { data }: { data: TODO } = await axios.post(`/api/todo/${todo.id}`, { prevStatus, todo });
  return { prevStatus, data };
}

export async function saveTodo({ name, deadline, implementors }:
  { name: string, deadline: string, implementors: string }) {
  const todo = {
    name,
    deadline,
    implementors: implementors.split(', ')
  }
  const { data }: { data: TODO } = await axios.post('/api/todo/', { todo });
  return { data };
}
