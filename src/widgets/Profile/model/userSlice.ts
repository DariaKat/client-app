import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { fetchProfile } from "./fatchProfile";

export interface ProfileState {
    loading: boolean;
    profile: Profile | null;
    error: string | undefined;
  }

const initialState: ProfileState = {
    loading: false,
    profile: null,
    error: undefined,
};

export const userSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: (builder) => { 
        builder.addCase(fetchProfile.pending, (state) => {
            if (state) {
                state.loading = true;
            }
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            if (state) {
                state.loading = false;
                if (action.payload) {
                    //eslint-disable-next-line
                    //@ts-ignore
                    state.profile = action.payload;
                }
            }
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            if (state) {
                state.loading = false;
                state.profile = null;
                if (action.error) {
                    state.error = action.error.message;
                }
            }
        });
    },
    reducers: {
        getUser: (state, action: PayloadAction<Profile>) => {
            if (state && action.payload) {
                state = Object.assign(state, action.payload);
            }
        },
    },
});
  
export const { getUser } =
    userSlice.actions;
    
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;