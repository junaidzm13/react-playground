import { configureStore } from '@reduxjs/toolkit';
import { todoListReducer } from './slices/todoListSlice';
import { todoListFilterReducer } from './slices/todoListFilterSlice';

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
    todoListFilter: todoListFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
