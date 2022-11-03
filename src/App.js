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
import home from './components/image/home.svg';
import Navbar from './components/Navbar';

const Intro = styled.div`
  margin-top: 1em;
  text-align: center;
`;

const LogOut = styled.div`
  text-align: right;
`;

/* const btnCSS = css`
@media only screen and (max-width: 600px) {
  body {
    margin-top: 10em;
  }
}
`; */

const App = () => {
  const { token, setToken } = useToken();

  const buttons = ['Homepage', 'Parking', 'Restaurant', 'Menu'];

  //if(!token) {
  //  return <Login setToken={setToken} />
  //};

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
              }}>Logout</LogOutButton>
    </LogOut>

    <Intro>
          <Router>
            <nav className='navbarMenu'>
              <Link to="/">
                  <button className='btn-home'> {buttons[0]} </button>
                  <button className='btn-home-mobile'></button>
              </Link>
              <Link to="/parking">
                  <button className='btn-parking'> {buttons[1]} </button>
                  <button className='btn-parking-mobile'></button>
              </Link>
              <Link to="/restaurant">
                  <button className='btn-restaurant'> {buttons[2]} </button>
                  <button className='btn-restaurant-mobile'></button>
              </Link>
              <Link to="/menu">
                  <button className='btn-menu'> {buttons[3]} </button>
                  <button className='btn-menu-mobile'></button>
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