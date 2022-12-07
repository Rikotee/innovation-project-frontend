import React from "react";
import '../components/style.css'
import '../App.css'
import qr from '../components/image/qr.png';

const Share = () => {

    return(
        <div>
            <h1>Share</h1>
          <image>
            <img className="share" src={qr} alt="qr code for sharing app" />
          </image>
        </div>
    )
}

export default Share;