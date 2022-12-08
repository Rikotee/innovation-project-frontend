import React from "react";
import '../components/style.css'
import '../App.css'
import parking from '../components/image/parkingMobile.png';

//Parking screen for demonstration of what the feature could look like
const Parking = () => {

    return(
        <div>
            <h1>Parking</h1>
          <image>
            <img className="parkingImg" src={parking} alt="Parking spaces from above"/>
          </image>
        </div>
    )
}

export default Parking;