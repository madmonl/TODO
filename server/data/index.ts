import { TODOS } from '../types';

const todo: TODOS = {
  1: {
    id: '1',
    name: 'Go to the park',
    deadline: 'Two days',
    status: 'todo',
    implementors: ['Liad']
  }
};

const inProgress: TODOS = {
  0: {
    id: '0',
    name: 'Be happy',
    deadline: 'Eternal',
    status: 'inProgress',
    implementors: ['Liad', 'Daniel']

  },
  2: {
    id: '2',
    name: 'Go to the Beach',
    deadline: 'Two Hours',
    status: 'inProgress',
    implementors: ['Liad', 'Itamar']

  },

};


const finished: TODOS = {};

module.exports = { todo, inProgress, finished };
