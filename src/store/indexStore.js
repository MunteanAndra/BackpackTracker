import { configureStore } from '@reduxjs/toolkit';
import authentication from './Auth';

const store = configureStore({

    reducer: {authentication}

});

export default store;