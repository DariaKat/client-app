import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { fetchListData } from "./fetchListData";

export interface IPriceList {
    _id: string;
    priceList: {
        name: string;
        price: string;
    }[]
 }

export interface ProfileState {
    loading: boolean;
    priceList: IPriceList | null;
    error: string | undefined;
  }

const initialState: ProfileState = {
    loading: false,
    priceList: null,
    error: undefined,
};

export const priceSlice = createSlice({
    name: "price",
    initialState,
    extraReducers: (builder) => { 
        builder.addCase(fetchListData.pending, (state) => {
            if (state) {
                state.loading = true;
            }
        });
        builder.addCase(fetchListData.fulfilled, (state, action) => {
            if (state) {
                state.loading = false;
                if (action.payload) {
                    //eslint-disable-next-line
                    //@ts-ignore
                    state.priceList = action.payload;
                }
            }
        });
        builder.addCase(fetchListData.rejected, (state, action) => {
            if (state) {
                state.loading = false;
                state.priceList = null;
                if (action.error) {
                    state.error = action.error.message;
                }
            }
        });
    },
    reducers: {
        getPriceList: (state, action: PayloadAction<Profile>) => {
            if (state && action.payload) {
                state = Object.assign(state, action.payload);
            }
        },
    },
});
  
export const { getPriceList } = priceSlice.actions;
    
export const priceSelector = (state: RootState) => state.priceReducer;
export default priceSlice.reducer;