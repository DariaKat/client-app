import { userReducer } from '@/widgets/Profile';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        userReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;