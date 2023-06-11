import { createSlice } from '@reduxjs/toolkit';

const defaultAuthState = {
    isAuthenticated: false
};

export const authSlice = createSlice({
    name: 'authentication',
    initialState: defaultAuthState,
    reducers: {
        loginFromRedux(state){
            state.isAuthenticated = true;
            localStorage.setItem("token", "1234567");
        },
        logoutFromRedux(state){
            state.isAuthenticated = false;
            localStorage.setItem("token", "");
        }
    },
});

export const {loginFromRedux,logoutFromRedux}= authSlice.actions;

export const authSelector = state =>
    state.isAuthenticated;

export default authSlice.reducer;