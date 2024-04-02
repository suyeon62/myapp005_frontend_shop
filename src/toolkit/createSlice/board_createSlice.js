import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  boardList: [],
  pv: { currentPage: 1 },
  boardDetail: {},
  boardFile: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    getBoardList(state, action) {
      state.boardList = action.payload.data.boardList;
      state.pv = action.payload.data.pv;
    },
    getBoardDetail(state, action) {
      state.boardDetail = action.payload.data;
    },
  },
});

// board_action에서 사용함
//export const {getBoardList} = boardSlice.actions;
export const boardReducers = boardSlice.actions;

//store에서 사용함
export default boardSlice;
