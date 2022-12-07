import React from "react";
import '../components/style.css'
import '../App.css'
import parking from '../components/image/parkingMobile.png';

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