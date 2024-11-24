import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './components/redux/state/store';
import { TodoListPage as ReduxTodoListPage } from './components/redux/TodoListPage';
import { TodoListPage as ZustandTodoListPage } from './components/zustand/TodoListPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StarPage } from './components/star-system/StarPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/redux/todo-list'}
          element={
            <Provider store={store}>
              <ReduxTodoListPage />
            </Provider>
          }
        />
        <Route path={'/zustand/todo-list'} element={<ZustandTodoListPage />} />
        <Route path={'/star-system'} element={<StarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
