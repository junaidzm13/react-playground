import { create } from 'zustand';
import { TodoListItem } from '../../types/TodoListItem';
import { v4 as uuidv4 } from 'uuid';
import { TodoListFilterState } from '../../types/TodoListFilterState';

type TodoListStoreState = {
  todoLists: Array<TodoListItem>;
  todoListFilter: TodoListFilterState['filterState'];
};

type TodoListStoreActions = {
  addItem: (text: TodoListItem['description']) => void;
  deleteItem: (id: TodoListItem['id']) => void;
  editItem: (item: TodoListItem) => void;
  updateTodoListFilter: (filter: TodoListFilterState['filterState']) => void;
  setTodoList: (todoList: Array<TodoListItem>) => void;
};

type TodoListStore = TodoListStoreState & TodoListStoreActions;

export const useTodoListStore = create<TodoListStore>()((set, get) => ({
  todoLists: [],
  todoListFilter: 'all',
  setTodoList: todoLists => set({ todoLists }),
  addItem: description =>
    set(state => ({
      todoLists: [
        ...state.todoLists,
        {
          description,
          id: uuidv4(),
          completed: false,
          inEditState: false,
        },
      ],
    })),
  deleteItem: id =>
    set(state => ({
      todoLists: state.todoLists.filter(item => item.id !== id),
    })),
  editItem: item =>
    set(state => ({
      todoLists: state.todoLists.map(i => (i.id === item.id ? item : i)),
    })),
  updateTodoListFilter: filter =>
    set({
      todoListFilter: filter,
    }),
}));
