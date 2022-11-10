import React from "react";
import '../components/style.css'
import qr from '../components/image/qr.png';

const Share = () => {

    return(
        <div>
            <h1>Share</h1>
          <image>
            <img src={qr}  alt="Logo" />
          </image>
        </div>
    )
}

export default Share;