import React, { useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { toggleTodo, deleteTodo, editTodo } from './todoSlice';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  darkMode: boolean;
  createdAt: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, darkMode ,createdAt}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id, newText: editText }));
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`group flex items-center justify-between p-3 rounded-lg mb-2 transition-all ${
        darkMode
          ? completed
            ? 'bg-gray-700/50'
            : 'bg-gray-700 hover:bg-gray-600'
          : completed
          ? 'bg-gray-100'
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <div className="flex items-center w-full">
        <button
          onClick={() => dispatch(toggleTodo(id))}
          className={`flex-shrink-0 rounded-full mr-3 flex items-center justify-center transition-colors
    ${completed ? 'w-8 h-8' : 'w-10 h-10'}
    ${
      completed
        ? darkMode
          ? 'bg-purple-500'
          : 'bg-gradient-to-r from-purple-400 to-pink-500'
        : darkMode
        ? 'border border-gray-500'
        : 'border border-gray-300'
    }`}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {completed && <FiCheck className="text-white" size={20} />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className={`flex-1 mr-2 px-2 py-1 rounded focus:outline-none focus:ring-1 ${
              darkMode
                ? 'bg-gray-600 text-white focus:ring-purple-500'
                : 'bg-white text-gray-800 border focus:ring-purple-300'
            }`}
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 transition-all ${
              completed
                ? darkMode
                  ? 'line-through text-gray-400'
                  : 'line-through text-gray-500'
                : darkMode
                ? 'text-gray-200'
                : 'text-gray-800'
            }`}
          >
            {text} 
          </span>
        )}
      </div>
        <br />
      <div className="flex items-center space-x-2 ml-2">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className={`p-1.5 rounded-full ${
                darkMode
                  ? 'text-green-400 hover:bg-gray-600'
                  : 'text-green-500 hover:bg-gray-100'
              }`}
              aria-label="Save changes"
            >
              <FiCheck size={16} />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(text);
              }}
              className={`p-1.5 rounded-full ${
                darkMode
                  ? 'text-red-400 hover:bg-gray-600'
                  : 'text-red-500 hover:bg-gray-100'
              }`}
              aria-label="Cancel editing"
            >
              <FiX size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className={`p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                darkMode
                  ? 'text-blue-400 hover:bg-gray-600'
                  : 'text-blue-500 hover:bg-gray-100'
              }`}
              aria-label="Edit todo"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={() => dispatch(deleteTodo(id))}
              className={`p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                darkMode
                  ? 'text-red-400 hover:bg-gray-600'
                  : 'text-red-500 hover:bg-gray-100'
              }`}
              aria-label="Delete todo"
            >
              <FiTrash2 size={16} />
            </button>
            <br />
            <br />
             <span className="text-xs text-gray-400 mt-1">
          {new Date(createdAt).toLocaleString()} 
        </span>
        <br />
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;