import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { ListItem } from './ListItem';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addItem } from './state/slices/todoListSlice';
import { changeState } from './state/slices/todoListFilterSlice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './state/store';
import { TodoListItem } from '../types/TodoListItem';
import { TodoListFilterState } from '../types/TodoListFilterState';

interface Props {}

const todoListWithFilterSelector = createSelector(
  (state: RootState) => state.todoList.todoLists,
  (state: RootState) => state.todoListFilter.filterState,
  (
    todoList: Array<TodoListItem>,
    filter: TodoListFilterState['filterState']
  ) => {
    switch (filter) {
      case 'all':
        return todoList;
      case 'complete':
        return todoList.filter(item => item.completed);
      case 'incomplete':
        return todoList.filter(item => !item.completed);
    }
  }
);

export const TodoListPage: React.FC<Props> = () => {
  const todoList = useAppSelector(todoListWithFilterSelector);
  const selectValue = useAppSelector(state => state.todoListFilter.filterState);
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        padding: '2em',
      }}
    >
      <h1>Todo List</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5em' }}>
        <AddTodoItem />
        <FormControl style={{ width: '15em' }}>
          <InputLabel id="filter-select-label">Filter</InputLabel>
          <Select<TodoListFilterState['filterState']>
            id="filter-select"
            labelId="filter-select-label"
            value={selectValue}
            onChange={e =>
              dispatch(
                changeState({
                  filterState: e.target.value,
                } as TodoListFilterState)
              )
            }
            label="Filter"
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'complete'}>Completed</MenuItem>
            <MenuItem value={'incomplete'}>Not yet completed</MenuItem>
          </Select>
        </FormControl>
      </div>
      {todoList.map(item => (
        <ListItem {...item} key={item.id} />
      ))}
    </div>
  );
};

const AddTodoItem: React.FC = () => {
  const dispatch = useAppDispatch();

  const [text, setText] = useState<string>('');

  const onAddClick = () => {
    dispatch(addItem(text));
    setText('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <TextField
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add todo item"
      />
      <IconButton onClick={onAddClick} disabled={!text}>
        <AddIcon />
      </IconButton>
    </div>
  );
};
