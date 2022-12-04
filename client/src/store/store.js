import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { authReducer } from './reducers/auth';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  },
});
