// create a store with the rootReducer and the initial state

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth";


export default configureStore({
    reducer: {
       auth: authSlice, 
    },
    
});