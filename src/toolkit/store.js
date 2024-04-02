import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./createSlice/board_createSlice";
const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});

export default store;
