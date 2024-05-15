import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { fetchProfiles } from "./fatchProfile";

export interface IPanel { 
    _id: string;
    name: string;
    role: string;
}

interface IObjectData { 
    data: IPanel[];
}

export interface ProfileState {
    loading: boolean;
    profiles: IObjectData | null;
    error: string | undefined;
  }

const initialState: ProfileState = {
    loading: false,
    profiles: null,
    error: undefined,
};

export const adminPanelSlice = createSlice({
    name: "adminPanel",
    initialState,
    extraReducers: (builder) => { 
        builder.addCase(fetchProfiles.pending, (state) => {
            if (state) {
                state.loading = true;
            }
        });
        builder.addCase(fetchProfiles.fulfilled, (state, action) => {
            if (state) {
                state.loading = false;
                if (action.payload) {
                    //eslint-disable-next-line
                    //@ts-ignore
                    state.profiles = action.payload;
                }
            }
        });
        builder.addCase(fetchProfiles.rejected, (state, action) => {
            if (state) {    
                state.loading = false;
                state.profiles = null;
                if (action.error) {
                    state.error = action.error.message;
                }
            }
        });
    },
    reducers: {
        getUsers: (state, action: PayloadAction<IObjectData>) => {
            if (state && action.payload) {
                state = Object.assign(state, action.payload);
            }
        },
    },
});
  
export const { getUsers } = adminPanelSlice.actions;
    
export const adminSelector = (state: RootState) => state.adminReducer;
export default adminPanelSlice.reducer;