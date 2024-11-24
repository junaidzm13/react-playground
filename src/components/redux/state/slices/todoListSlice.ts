import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoListItem } from '../../../types/TodoListItem';
import { v4 as uuidv4 } from 'uuid';

type TodoListState = {
  todoLists: Array<TodoListItem>;
};

const initialState: TodoListState = {
  todoLists: [],
};

export const todoListSlice = createSlice({
  name: 'todo-list',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TodoListItem['description']>) => {
      const newItem: TodoListItem = {
        id: uuidv4(),
        description: action.payload,
        completed: false,
        inEditState: false,
      };

      state.todoLists = [...state.todoLists, newItem];
    },
    deleteItem: (state, action: PayloadAction<TodoListItem['id']>) => {
      state.todoLists = state.todoLists.filter(
        item => item.id !== action.payload
      );
    },
    editItem: (state, action: PayloadAction<TodoListItem>) => {
      state.todoLists = state.todoLists.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { addItem, editItem, deleteItem } = todoListSlice.actions;

export const todoListReducer = todoListSlice.reducer;
