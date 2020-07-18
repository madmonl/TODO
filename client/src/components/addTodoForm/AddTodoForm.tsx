import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Formik, Field, Form } from 'formik';
import { queryCache, useMutation } from 'react-query';
import { TextField } from '@material-ui/core';
import { saveTodo } from '../../queries/mutations';
import { TODO } from '../../types';
import './AddTodoForm.css';

export default function AddTodoForm({ open, setOpen }: { open: boolean, setOpen: Function }) {
  const [mutateTodo] = useMutation(saveTodo, {
    onSuccess: ({ data }: { data: TODO }) => {
      setOpen(false);
      queryCache.setQueryData('todos', (old: any) => {
        alert(JSON.stringify(data));
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
      >
        <Form className="add-todo-form">
          <label htmlFor="name">Name:</label>
          <Field
            id="name"
            name="name"
            label="name"
            placeholder="Choose Task name"
          />

          <label htmlFor="deadline">Deadline:</label>
          <Field
            id="deadline"
            name="deadline"
            label="name"
            placeholder="Choose Task name"
          />
          <label htmlFor="implementors">Implementors:</label>
          <Field
            id="implementors"
            name="implementors"
            label="implementors"
            placeholder="Choose Task name"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </Modal>
  )
}