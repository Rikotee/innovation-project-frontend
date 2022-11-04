import React from 'react'
import '../components/style.css'
import home from '../components/image/home.svg';

const Home = () => {

  return (

    <div>
      <h1>Homepage</h1>
        <image>
          <img src={home}  alt="Logo" />
        </image>
    </div>
  );
};

export default Home;