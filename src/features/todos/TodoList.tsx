// features/todos/TodoList.tsx
import React from 'react';
import { useAppSelector } from '../../app/store';
import TodoItem from './TodoItem';

interface TodoListProps {
  darkMode: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ darkMode }) => {
  const todos = useAppSelector((state) => state.todos.todos);

  return (
    <div className="mt-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No todos yet. Add one above!</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              darkMode={darkMode}
              createdAt={todo.createdAt}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;