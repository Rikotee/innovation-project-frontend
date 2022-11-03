import React from 'react';
import './App.css';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import Login from './Pages/Login';
import Parking from './Pages/Parking';
import Restaurant from './Pages/Restaurant';
import Menu from './Pages/Menu';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import useToken from './components/useToken';
import styled, { css } from 'styled-components/macro'
import Button from './components/Button';
import LogOutButton from './components/LogOutButton';
import Navbar from './components/Navbar';


const Intro = styled.div`
  margin-top: 1em;
  text-align: center;
`;

const LogOut = styled.div`
  text-align: right;
`;

const btnCSS = css`
    
`;

const App = () => {
  const { token, setToken } = useToken();

  /*if(!token) {
    return <Login setToken={setToken} />
  };
*/
  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/restaurant' component={Restaurant} />
        </Routes>
      </Router>
          <LogOut>
            <LogOutButton onClick={() => {
              localStorage.clear();
              window.location.reload();
              }} css={btnCSS}>Logout</LogOutButton>
    </LogOut>
    <Intro>
          <Router>
            <nav>
              <Link to="/">
                  <Button css={btnCSS}> Homepage </Button>
              </Link>

              <Link to="/parking">
                  <Button css={btnCSS}> Parking </Button>
              </Link>

              <Link to="/restaurant">
                  <Button css={btnCSS}> Restaurant </Button>
              </Link>

              <Link to="/menu">
                  <Button css={btnCSS}> Menu </Button>
              </Link>
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/parking" element={<Parking />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
      </Router>
    </Intro>
    </div>
  );
};

export default App;