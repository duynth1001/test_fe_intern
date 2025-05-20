import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AddTodoForm from './features/todos/AddTodoForm';
import TodoList from './features/todos/TodoList';
import { FiSun, FiMoon } from 'react-icons/fi';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return JSON.parse(savedMode);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class and save to localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Provider store={store}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center min-h-screen py-8 px-4">
          <div className={`w-full max-w-md rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            
            {/* Header with dark mode toggle */}
            <div className="flex justify-between items-center mb-6">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Todo App
              </h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>

            <AddTodoForm darkMode={darkMode} />
            <TodoList darkMode={darkMode} />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;