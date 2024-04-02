import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { boardActions } from '../../toolkit/actions/board_action';
import { boardReducers } from '../../toolkit/createSlice/board_createSlice';

const BoardWrite = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { num } = useParams();

  const [inputs, setInputs] = useState({
    subject: '',
    content: '',
    filename: null,
  });

  const { subject, content, filename } = inputs;
  const boardDetail = useSelector((state) => state.board.boardDetail);
  const pv = useSelector((state) =>
    state.board.pv ? state.board.pv : { currentPage: 1 }
  );

  const handleValueChange = (e) => {
    // let nextState={};
    // nextState[e.target.name]= e.target.value;
    // setInputs({...inputs, ...nextState});
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('content', content);
    formData.append('memberEmail', localStorage.getItem('memberEmail'));
    if (filename != null) formData.append('filename', filename);

    //답변글이면
    if (num !== undefined) {
      formData.append('num', boardDetail.num);
      formData.append('ref', boardDetail.ref);
      formData.append('re_step', boardDetail.re_step);
      formData.append('re_level', boardDetail.re_level);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('Authorization'),
        'Authorization-refresh': localStorage.getItem('Authorization-refresh'),
      },
    };

    await dispatch(boardActions.getBoardWrite(formData, config));

    setInputs({
      subject: '',
      content: '',
      filename: null,
    });

    navigator(`/board/list/${num ? pv.currentPage : 1}`);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th>글쓴이</th>
              <td>
                <input
                  type='text'
                  name='memberEmail'
                  readOnly
                  value={localStorage.getItem('memberEmail')}
                />
              </td>
            </tr>
            <tr>
              <th width='20%' align='center'>
                제목
              </th>
              <td>
                <input
                  type='text'
                  name='subject'
                  size='40'
                  placeholder={num !== undefined ? '답변' : null}
                  onChange={handleValueChange}
                />
              </td>
            </tr>
            <tr>
              <th width='20%' align='center'>
                내용
              </th>
              <td>
                <textarea
                  name='content'
                  cols='40'
                  rows='13'
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th width='20%' align='center'>
                첨부파일
              </th>
              <td>
                <input
                  type='file'
                  name='filename'
                  id='filepath'
                  onChange={handleFileChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Link className='btn btn-primary' to={`/board/list/1`}>
          리스트
        </Link>
        <input type='submit' className='btn btn-primary' value='등록' />
      </form>
    </>
  );
};

export default BoardWrite;
