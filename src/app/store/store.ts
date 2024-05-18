import { timeReducer } from '@/entities/AddProcedureDialog';
import { priceReducer } from '@/entities/PriceList';
import { adminReducer } from '@/feature/AdminPanel';
import { userReducer } from '@/widgets/Profile';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        userReducer,
        adminReducer,
        priceReducer,
        timeReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;