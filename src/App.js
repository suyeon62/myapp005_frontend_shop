import { Route, Routes } from 'react-router-dom';
import './App.css';
import BaseLayout from './components/layout/BaseLayout';
import BoardList from './components/board/BoardList';
import Home from './components/Home';
import BoardWrite from './components/board/BoardWrite';
import BoardView from './components/board/BoardView';
import BoardUpdate from './components/board/BoardUpdate';
import JoinAdd from './components/members/JoinAdd';
import Login from './components/members/Login';
import Logout from './components/members/Logout';
import EditInfo from './components/members/EditInfo';
import MemberRemove from './components/members/MemberRemove';
import PrivateRoute from './access/PrivateRoute';
import { jwtDecode } from 'jwt-decode';
function App() {
  function getTokenExpirationDate(token) {
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return null;
    }

    const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
  }

  if (localStorage.getItem('Authorization')) {
    //const token = '여기에_당신의_JWT_토큰을_넣으세요';
    const token = localStorage.getItem('Authorization');
    const expirationDate = getTokenExpirationDate(token);
    console.log('토큰 만료 시간:', expirationDate);

    if (isTokenExpired(token)) {
      console.log('토큰이 만료되었습니다.');
    } else {
      console.log('토큰이 아직 유효합니다.');
    }
  }
  return (
    <div className='container'>
      <h1>My Shop</h1>
      <Routes>
        <Route path='/' element={<BaseLayout />}>
          <Route index element={<Home />} />

          <Route
            path='login'
            element={<PrivateRoute isAuth={false} RouteComponent={Login} />}
          />
          <Route
            path='joinadd'
            element={<PrivateRoute isAuth={false} RouteComponent={JoinAdd} />}
          />
          <Route
            path='logout'
            element={<PrivateRoute isAuth={true} RouteComponent={Logout} />}
          />
          <Route
            path='editinfo'
            element={<PrivateRoute isAuth={true} RouteComponent={EditInfo} />}
          />
          <Route
            path='memberremove'
            element={
              <PrivateRoute isAuth={true} RouteComponent={MemberRemove} />
            }
          />

          <Route path='board/list/:currentPage' element={<BoardList />} />

          <Route
            path='board/write'
            element={<PrivateRoute isAuth={true} RouteComponent={BoardWrite} />}
          />
          <Route
            path='board/write/:num'
            element={<PrivateRoute isAuth={true} RouteComponent={BoardWrite} />}
          />
          <Route
            path='board/view/:num'
            element={<PrivateRoute isAuth={true} RouteComponent={BoardView} />}
          />
          <Route
            path='board/update/:num'
            element={
              <PrivateRoute isAuth={true} RouteComponent={BoardUpdate} />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
