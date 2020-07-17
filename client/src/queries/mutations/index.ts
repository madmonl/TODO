import axios from 'axios';
import { TODO } from '../../types';

export async function changeStatus({ prevStatus, newTodo }: { prevStatus: string, newTodo: TODO }) {
  const todo = await axios.post(`/api/todo/${newTodo.id}`, { prevStatus, newTodo });
  return { data: todo.data, prevStatus };
}
