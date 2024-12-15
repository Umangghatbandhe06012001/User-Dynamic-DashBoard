import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import analyticsReducer from './slices/analyticsSlice';
import { useDispatch } from 'react-redux';
import authReducer from '../redux/slices/authenticationslice';

const store = configureStore({
  reducer: {
    authentication:authReducer,
    users: userReducer,
    analytics: analyticsReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;



