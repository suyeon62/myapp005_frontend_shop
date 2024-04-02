import axios from 'axios';
import { boardReducers } from '../createSlice/board_createSlice';

function getBoardList(currentPage) {
  console.log(currentPage);
  return async (dispatch) => {
    const data = await axios
      .get(`/board/list/${currentPage}`)
      .then((response) => response.data);
    console.log(data);
    dispatch(boardReducers.getBoardList({ data }));
  };
}

//게시판 글쓰기
function getBoardWrite(formData, config) {
  return async () => {
    await axios
      .post(`/board/write`, formData, config)
      .then((response) => response.data);
  };
}

//상세페이지
function getBoardDetail(num, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`/board/view/${num}`, config)
      .then((response) => response.data);
    dispatch(boardReducers.getBoardDetail({ data }));
  };
}

//첨부파일 다운로드
function getBoardDownload(upload, config) {
  return async (dispatch) => {
    const data = await axios
      .get(`/board/contentdownload/${upload}`, config)
      .then((response) => response.data);
    // dispatch(boardActions.getBoardDownload(data));
    return data;
  };
}

//수정하기
function getBoardUpdate(formData, config) {
  return async () => {
    await axios
      .put(`/board/update`, formData, config)
      .then((response) => response.data);
  };
}

//삭제하기
function getBoardDelete(num, config) {
  return async () => {
    await axios
      .delete(`/board/delete/${num}`, config)
      .then((response) => response.data);
  };
}

export const boardActions = {
  getBoardList,
  getBoardWrite,
  getBoardDetail,
  getBoardDownload,
  getBoardUpdate,
  getBoardDelete,
};
