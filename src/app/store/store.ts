import { adminReducer } from '@/feature/AdminPanel';
import { userReducer } from '@/widgets/Profile';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        userReducer,
        adminReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;