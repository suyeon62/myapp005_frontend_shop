import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { boardActions } from '../../toolkit/actions/board_action';

const BoardUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { num } = useParams();

  const [inputs, setInputs] = useState({
    subject: '',
    content: '',
    filename: null,
  });

  const { subject, content, filename } = inputs;

  const boardDetail = useSelector((state) => state.board.boardDetail);
  const pv = useSelector((state) => state.board.pv);
  console.log('==currentPage : ', pv.currentPage);

  useEffect(() => {
    setInputs((prev) => {
      return { ...prev, ...boardDetail };
    });
  }, []);

  const handleValueChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
  };

  //수정버튼
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('num', num);
    formData.append('subject', subject);
    formData.append('content', content);

    if (filename != null) formData.append('filename', filename);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('Authorization'),
        'Authorization-refresh': localStorage.getItem('Authorization-refresh'),
      },
    };

    await dispatch(boardActions.getBoardUpdate(formData, config));

    setInputs({
      subject: '',
      content: '',
      filename: null,
    });

    navigate(`/board/list/${pv.currentPage}`);
  };

  //취소버튼
  const handleReset = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, ...boardDetail });
  };

  //뒤로버튼
  const handleBack = (e) => {
    e.preventDefault();
    // navigate(-1);  //router
    window.history.go(-1); //javascript
  };

  return (
    <>
      <form action=''>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <tbody>
            <tr>
              <th width='20%'>글쓴이</th>
              <td>{boardDetail.memberEmail}</td>
            </tr>
            <tr>
              <th width='20%'>등록일</th>
              <td>{boardDetail.reg_date}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td colSpan='3'>
                <input
                  type='text'
                  name='subject'
                  id='subject'
                  value={subject}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr>
              <th>내용</th>
              <td colSpan='3' style={{ whiteSpace: 'pre-line' }}>
                <textarea
                  name='content'
                  id='content'
                  cols='40'
                  rows='13'
                  value={content}
                  onChange={handleValueChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td colSpan='3'>
                <input
                  type='file'
                  name='filename'
                  id='filepath'
                  onChange={handleFileChange}
                />
                <span>
                  {boardDetail.upload &&
                    boardDetail.upload.substring(
                      boardDetail.upload.indexOf('_') + 1
                    )}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <button className='btn btn-primary' onClick={handleUpdate}>
          수정
        </button>
        <button className='btn btn-primary' onClick={handleReset}>
          취소
        </button>
        <button className='btn btn-primary' onClick={handleBack}>
          뒤로
        </button>
      </form>
    </>
  );
};

export default BoardUpdate;
