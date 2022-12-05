import React from 'react'
import '../components/style.css'
import '../App.css'
import res from '../components/image/restaurant.png';

const Restaurant = () => {

  return (

    <div>
        <h1>Restaurant</h1>
      <image>
      <img className="restaurantImg" src={res}/>
      </image>
    </div>
  );
};

export default Restaurant;