import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useMutation, queryCache } from 'react-query';
import { TODO } from '../../types';
import { changeStatus } from '../../queries/mutations';
import './TodoCard.css';

export default function TodoCard({ todo }: { todo: TODO }) {
  const { id, name, deadline, implementors, status } = todo;

  const [mutateTodo] = useMutation(changeStatus, {
    onSuccess: ({ data, prevStatus }: { data: TODO, prevStatus: string }) => (
      queryCache.setQueryData('todos', (old: any) => {
        const newTodos = {
          ...old,
          [data.status]: {
            ...old[data.status],
            [data.id]: data
          }
        }

        delete newTodos[prevStatus][data.id];
        return newTodos;
      }))
  });

  const handleChangeStatus = (direction: string) => {
    if (direction === 'forward' && status === 'todo') {
      mutateTodo({
        prevStatus: status,
        newTodo: { ...todo, status: 'inProgress' }
      })
    } else if (direction === 'forward' && status === 'inProgress') {
      mutateTodo({
        prevStatus: status,
        newTodo: { ...todo, status: 'finished' }
      })
    } else if (direction === 'backwards' && status === 'inProgress') {
      mutateTodo({
        prevStatus: status,
        newTodo: { ...todo, status: 'todo' }
      })
    } else if (direction === 'backwards' && status === 'finished') {
      mutateTodo({
        prevStatus: status,
        newTodo: { ...todo, status: 'inProgress' }
      })
    } else {
      throw new Error('Change status params are invalid');
    }
  }

  return (
    <Card className="card" variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>
          implementors: {implementors.join(', ')}
        </Typography>
        <Typography>
          deadline: {deadline}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ID: {id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={status === 'todo'}
          size="small"
          onClick={() => handleChangeStatus('backwards')}
        ><ArrowBackIcon /></Button>
        <Button
          disabled={status === 'finished'}
          size="small"
          onClick={() => handleChangeStatus('forward')}
        ><ArrowForwardIcon /></Button>
      </CardActions>
    </Card>
  );
}