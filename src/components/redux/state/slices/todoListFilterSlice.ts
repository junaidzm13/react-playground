import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoListFilterState } from '../../../types/TodoListFilterState';

const initialState: TodoListFilterState = {
  filterState: 'all',
};

export const todoListFilterSlice = createSlice({
  name: 'todo-list-filter',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<TodoListFilterState>) => {
      state.filterState = action.payload.filterState;
    },
  },
});

export const { changeState } = todoListFilterSlice.actions;

export const todoListFilterReducer = todoListFilterSlice.reducer;
