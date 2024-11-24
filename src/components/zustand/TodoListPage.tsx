import React, { useMemo, useState } from 'react';
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
import { useTodoListStore } from './state/todoListStore';
import { TodoListFilterState } from '../types/TodoListFilterState';
import { useInitTodoList } from './hooks/useInitTodoList';

interface Props {}

export const TodoListPage: React.FC<Props> = () => {
  const { loading } = useInitTodoList();

  const todoList = useTodoListStore(store => store.todoLists);
  const filterState = useTodoListStore(store => store.todoListFilter);
  const setFilterState = useTodoListStore(store => store.updateTodoListFilter);

  const filteredTodoList = useMemo(() => {
    switch (filterState) {
      case 'all':
        return todoList;
      case 'complete':
        return todoList.filter(item => item.completed);
      case 'incomplete':
        return todoList.filter(item => !item.completed);
    }
  }, [todoList, filterState]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

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
            value={filterState}
            onChange={e =>
              setFilterState(
                e.target.value as TodoListFilterState['filterState']
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
      {filteredTodoList.map(item => (
        <ListItem {...item} key={item.id} />
      ))}
    </div>
  );
};

const AddTodoItem: React.FC = () => {
  const addItem = useTodoListStore(store => store.addItem);

  const [text, setText] = useState<string>('');

  const onAddClick = () => {
    addItem(text);
    setText('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <TextField
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add todo item"
      />
      <IconButton onClick={onAddClick} disabled={false}>
        <AddIcon />
      </IconButton>
    </div>
  );
};
