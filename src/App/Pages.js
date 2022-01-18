import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
};

export const pageSlice = createSlice({
  name: "pageNumber",
  initialState,
  reducers: {
    increment: (state) => {
      if(state.value>=2){
        state.value =2;
      }else{
        state.value += 1;
      }
    },
    decrement: (state) => {
      if(state.value<=1){
        state.value =1;
      }else{
        state.value -= 1;
      }
    },
  },
});
export const { increment, decrement } = pageSlice.actions;

export default pageSlice.reducer;
