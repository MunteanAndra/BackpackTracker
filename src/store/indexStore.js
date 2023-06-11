import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from "./Auth";

const store = configureStore({
    reducer: {authSlice}
});

export default store;