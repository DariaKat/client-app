import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { fetchListTimeData } from "./fetchListTime";

export interface ITimeList {
    _id: string;
    segments: {
        date: string;
        times: string[];
    }[];
 }

export interface TimeState {
    loading: boolean;
    timeList: ITimeList | null;
    error: string | undefined;
  }

const initialState: TimeState = {
    loading: false,
    timeList: null,
    error: undefined,
};

export const timeSlice = createSlice({
    name: "listTime",
    initialState,
    extraReducers: (builder) => { 
        builder.addCase(fetchListTimeData.pending, (state) => {
            if (state) {
                state.loading = true;
            }
        });
        builder.addCase(fetchListTimeData.fulfilled, (state, action) => {
            if (state) {
                state.loading = false;
                if (action.payload) {
                    //eslint-disable-next-line
                    //@ts-ignore
                    state.timeList = action.payload;
                }
            }
        });
        builder.addCase(fetchListTimeData.rejected, (state, action) => {
            if (state) {
                state.loading = false;
                state.timeList = null;
                if (action.error) {
                    state.error = action.error.message;
                }
            }
        });
    },
    reducers: {
        getTimeList: (state, action: PayloadAction<Profile>) => {
            if (state && action.payload) {
                state = Object.assign(state, action.payload);
            }
        },
    },
});
  
export const { getTimeList } = timeSlice.actions;
    
export const timeSelector = (state: RootState) => state.timeReducer;
export default timeSlice.reducer;