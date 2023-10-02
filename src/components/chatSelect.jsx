'use client'

import animationData from "../utils/asset/chatSelect.json"
import Lottie from 'lottie-react';
export default function ChatSelect() {

    return (
        <div className='container-fluid-loader' style={{ background: "transparent" }} id='your-animation-container-select'>
            <div className="content-box">
                <Lottie className='animationLoti' animationData={animationData} loop={true} />
            </div>
        </div>
    )
}

