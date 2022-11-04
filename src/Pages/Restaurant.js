import React from 'react'
import '../components/style.css'
import res from '../components/image/res.png';

const Restaurant = () => {

  return (

    <div>
        <h1>Restaurant</h1>
      <image>
        <img src={res}  alt="Logo" />
      </image>
    </div>
  );
};

export default Restaurant;