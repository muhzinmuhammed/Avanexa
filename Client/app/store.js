import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../src/feature/userSlice";


export default configureStore({
  reducer: {
    user: userReducer,
   
  },
});