'use client'
import { useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from "../utils/asset/loder.json"
export default function Loader() {
    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById("your-animation-container-loader"),// Replace with your container ID
            animationData: animationData, // Path to your Lottie JSON fileentById('your-animation-container'),
            renderer: 'svg', // or 'canvas' or 'html'
            autoplay: true,
        });
    }, []);
    return (
        <div className='container-fluid-loader' id='your-animation-container-loader'>

        </div>
    )
}

