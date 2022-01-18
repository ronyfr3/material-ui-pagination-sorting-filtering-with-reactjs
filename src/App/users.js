import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./api";

const getUsersSlice = createSlice({
  name: "getUsers",
  initialState: {
    data: [],
    status: null,
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getUsers.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default getUsersSlice.reducer;
