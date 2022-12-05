import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import Login from './Pages/Login';
import Parking from './Pages/Parking';
import Restaurant from './Pages/Restaurant';
import Menu from './Pages/Menu';
import Share from './Pages/Share';
import Feedback from './Pages/Feedback';
import Admin from './Pages/Admin';
import AdminFeedback from './Pages/AdminFeedback';
import AdminEvent from './Pages/AdminEvent';
import AdminNews from './Pages/AdminNews';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import useToken from './components/useToken';
import styled, { css } from 'styled-components/macro'
import Button from './components/Button';
import LogOutButton from './components/LogOutButton';
import Navbar from './components/Navbar';
import * as FaIcons from 'react-icons/fa';
import Joyride from 'react-joyride';
import { useMediaPredicate } from "react-media-hook";

const Intro = styled.div`
  text-align: center;
`;

const LogOut = styled.div`
  text-align: right;
`;

const App = () => {
  const biggerThan600 = useMediaPredicate("(min-width: 600px)");
  const smallerThan600 = useMediaPredicate("(max-width: 600px)");
  const { token, setToken } = useToken();

    const [items, setItems] = useState([]);

    // get item from local storage to check if onboarding is shown already
    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('ob'));
      if (items) {
       setItems(items);
      }
    }, []);

  if(!token) {
    return <Login setToken={setToken} />
  };

// set item to local storage. Onboarding shown
localStorage.setItem('ob', true);

if(items===true){

  return (
    <div>
      {/* Logout button */}
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
                  <button className='btn-home'> Homepage </button>
                  <button className='btn-home-mobile'></button>
              </Link>
              <Link to="/parking">
                  <button className='btn-parking'> Parking </button>
                  <button className='btn-parking-mobile'></button>
              </Link>
              <Link to="/restaurant">
                  <button className='btn-restaurant'> Restaurant </button>
                  <button className='btn-restaurant-mobile'></button>
              </Link>
              <Navbar />
              <Routes>
                
                <Route path="/" exact component={Home} />
                <Route path='/restaurant' component={Restaurant} />
                <Route path='/feedback' component={Feedback} />
                <Route path='/share' component={Share} />
                <Route path='/admin' component={Admin} />
              </Routes>
              
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/parking" element={<Parking />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/share" element={<Share />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminfeedback" element={<AdminFeedback />} />
              <Route path="/adminevent" element={<AdminEvent />} />
              <Route path="/adminnews" element={<AdminNews />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
      </Router>
    </Intro>
    </div>
  );

}else{

    return (
    <div>
      {biggerThan600 && <Joyride
      styles={{
        tooltipContainer: {
            textAlign: "center"
          },
        buttonNext: {
            backgroundColor: "rgb(28, 69, 152)"
          },
        buttonBack: {
            marginRight: 10,
            color: "blue"
          }
      }}
          steps={ [
      {
        target: '.btn-home',
        content: 'Here you can find all widgets and interact with them',
        disableBeacon: true
      },
      {
        target: '.btn-parking',
        content: 'Locate your car using our parking feature',
        disableBeacon: true
      },
      {
        target: '.btn-restaurant',
        content: 'Find out the best places to eat near you with live traffic visibility',
        disableBeacon: true
      },
      {
        target: '.menu-bars',
        content: 'This is the menu where all the other features lie',
        disableBeacon: true
      },
      {
        target: '.not-checked-item',
        content: 'By checking boxes you can decide the content for your home screen',
        disableBeacon: true
      },
    ]}
    continuous = {true}
    showSkipButton={true}
    
        />}
      {smallerThan600 &&<Joyride
      styles={{
        tooltipContainer: {
            textAlign: "center"
          },
        buttonNext: {
            backgroundColor: "rgb(28, 69, 152)"
          },
        buttonBack: {
            marginRight: 10,
            color: "blue"
          }
      }}
          steps={ [
      {
        target: '.btn-home-mobile',
        content: 'Here you can find all widgets and interact with them',
        disableBeacon: true
      },
      {
        target: '.btn-parking-mobile',
        content: 'See real time parking spot availability using our parking feature',
        disableBeacon: true
      },
      {
        target: '.btn-restaurant-mobile',
        content: 'Find out the best places to eat near you with live traffic visibility',
        disableBeacon: true
      },
      {
        target: '.menu-bars',
        content: 'This is the menu where all the other features lie',
        disableBeacon: true
      },
      {
        target: '.not-checked-item',
        content: 'By checking boxes you can decide the content for your home screen',
        disableBeacon: true
      },
    ]}
    continuous = {true}
    showSkipButton={true}
    
        />}
      {/* Logout button */}
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
                  <button className='btn-home'> Homepage </button>
                  <button className='btn-home-mobile'></button>
              </Link>
              <Link to="/parking">
                  <button className='btn-parking'> Parking </button>
                  <button className='btn-parking-mobile'></button>
              </Link>
              <Link to="/restaurant">
                  <button className='btn-restaurant'> Restaurant </button>
                  <button className='btn-restaurant-mobile'></button>
              </Link>
              <Navbar />
              <Routes>
                
                <Route path="/" exact component={Home} />
                <Route path='/restaurant' component={Restaurant} />
                <Route path='/feedback' component={Feedback} />
                <Route path='/share' component={Share} />
                <Route path='/admin' component={Admin} />
              </Routes>
              
            </nav>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/parking" element={<Parking />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/share" element={<Share />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminfeedback" element={<AdminFeedback />} />
              <Route path="/adminevent" element={<AdminEvent />} />
              <Route path="/adminnews" element={<AdminNews />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
      </Router>
    </Intro>
    </div>
  );
}

};

export default App;