import React from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({ board }) => {
  return (
    <tr>
      <td>{board.num}</td>
      <td>
        {board.re_level > 0 && (
          <>
            <img
              alt='level'
              src='/images/level.gif'
              width={board.re_level * 20}
              height='15'
            />
            <img alt='re' src='/images/re.gif' />
          </>
        )}
        <Link to={`/board/view/${board.num}`}> {board.subject} </Link>
      </td>
      <td>{board.memberEmail}</td>
      <td>{board.readcount}</td>
    </tr>
  );
};

export default TableRow;
