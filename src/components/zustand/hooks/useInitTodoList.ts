import { useEffect, useState } from 'react';
import { useTodoListStore } from '../state/todoListStore';

export const useInitTodoList = () => {
  const setTodoList = useTodoListStore(store => store.setTodoList);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const res = async () => {
      setLoading(true);

      const data = await f<TodoListExtData>('https://dummyjson.com/todos');
      setTodoList(
        data.todos.map(item => ({
          id: item.id.toString(),
          description: item.todo,
          completed: item.completed,
          inEditState: false,
        }))
      );

      setLoading(false);
    };
    res();
  }, [setTodoList]);

  return { loading };
};

type TodoListExtData = {
  todos: Array<{
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
  }>;
};

async function f<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();
  return data as T;
}
