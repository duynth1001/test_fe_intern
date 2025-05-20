import React, { useState } from 'react';
import { useAppDispatch } from '../../app/store';
import { addTodo } from './todoSlice';
import { FiPlus } from 'react-icons/fi';

interface AddTodoFormProps {
  darkMode: boolean;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ darkMode }) => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`w-full py-3 pl-4 pr-12 rounded-lg focus:outline-none focus:ring-2 transition-all ${
            darkMode
              ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500'
              : 'bg-white text-gray-800 placeholder-gray-400 border border-gray-200 focus:ring-purple-300 shadow-sm'
          }`}
          placeholder="Add a new task..."
        />
        <button
          type="submit"
          className={`absolute right-2 p-2 rounded-full transition-colors ${
            darkMode
              ? 'text-purple-400 hover:text-purple-300'
              : 'text-purple-500 hover:text-purple-600'
          }`}
          aria-label="Add todo"
        >
          <FiPlus size={20} />
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;