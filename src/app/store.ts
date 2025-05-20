// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todoSlice';
import type { TypedUseSelectorHook } from 'react-redux';
import { 
  useDispatch, 
  useSelector 
} from 'react-redux';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

// Định nghĩa các kiểu cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export các hook đã được typed
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;