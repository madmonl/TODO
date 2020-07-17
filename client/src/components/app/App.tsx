import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '../loader/Loader';
import TodosBoard from '../todosBoard/TodosBoard';
import Header from '../header/Header';
import './App.css';

const App: React.FC = () => {
  const refetchIntervalMS = 20000;
  const { status, data, error } = useQuery(
    'todos',
    async () => {
      const { data } = await axios.get('/api/todos')
      return data
    },
    {
      refetchInterval: refetchIntervalMS
    }
  );

  if (status === 'error') {
    return <span>Error: {error?.message}</span>
  }

  return (
    <div className="app">
      <Header />
      {status === 'loading' && <Loading />}
      {data && <TodosBoard todos={data} />}
    </div>
  );
}

export default App;
