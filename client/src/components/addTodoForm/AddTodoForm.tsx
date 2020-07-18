import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { queryCache, useMutation } from 'react-query';
import { TextField, Button, Typography } from '@material-ui/core';
import { saveTodo } from '../../queries/mutations';
import { TODO } from '../../types';
import newTodoSchema from '../../schemas/NewTodoSchema';
import './AddTodoForm.css';

export default function AddTodoForm({ open, setOpen }: { open: boolean, setOpen: Function }) {
  const [mutateTodo] = useMutation(saveTodo, {
    onSuccess: ({ data }: { data: TODO }) => {
      setOpen(false);
      queryCache.setQueryData('todos', (old: any) => {
        const newTodos = {
          ...old,
          [data.status]: {
            ...old[data.status],
            [data.id]: data
          }
        }

        return newTodos;
      })
    }
  });

  return (
    <Modal
      className="add-todo-modal"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Formik
        initialValues={{
          name: '',
          deadline: '',
          implementors: ''
        }}
        onSubmit={(newTodo) => {
          mutateTodo(newTodo);
        }}
        validationSchema={newTodoSchema}
      >
        <Form className="add-todo-form">
          <Typography variant="h5">Please fill in:</Typography>
          <Field
            id="name"
            as={TextField}
            name="name"
            label="name"
            placeholder="Choose Task name"
          />
          <ErrorMessage
            render={(msg) => <div className="error">{msg}</div>}
            name="name"
          />
          <Field
            id="deadline"
            as={TextField}
            name="deadline"
            label="deadline"
            placeholder="Choose Task deadline"
          />
          <ErrorMessage
            render={(msg) => <div className="error">{msg}</div>}
            name="deadline"
          />
          <Field
            id="implementors"
            as={TextField}
            name="implementors"
            label="implementors"
            placeholder="Choose implementors"
          />
          <ErrorMessage
            render={(msg) => <div className="error">{msg}</div>}
            name="implementors"
          />
          <Button
            className="button--submit"
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
            </Button>
        </Form>
      </Formik>
    </Modal>
  )
}