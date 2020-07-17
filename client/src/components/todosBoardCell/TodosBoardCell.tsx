import React from 'react';
import { TODOS, TODO } from '../../types';
import TodoCard from '../todoCard/TodoCard';

export default function TodosBoardCell({ cards }: { cards: TODOS }) {
  return (
    <>
      {Object.values(cards).map((todo: TODO) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </>
  )
}
