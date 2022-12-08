import React from 'react'
import '../components/style.css'
import '../App.css'
import res from '../components/image/restaurant.png';

//Restaurant screen for demonstration of what the feature could look like
const Restaurant = () => {

  return (

    <div>
        <h1>Restaurant</h1>
      <image>
      <img className="restaurantImg" src={res} alt="restaurants from above"/>
      </image>
    </div>
  );
};

export default Restaurant;