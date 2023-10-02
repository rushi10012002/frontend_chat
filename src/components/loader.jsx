'use client'

import animationData from "../utils/asset/loder.json"
import Lottie from 'lottie-react';

export default function Loader() {

    return (
        <div className='container-fluid-loader' id='your-animation-container-loader'>
            <div className="content-box">
                <Lottie className='animationLoti' animationData={animationData} loop={true} />
            </div>
        </div>
    )
}

