import { configureStore } from "@reduxjs/toolkit";
import getUsersReducer from "./users";
import pageReducer from './Pages'


export default configureStore({
  reducer: {
    users: getUsersReducer,
    pageNumber:pageReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
