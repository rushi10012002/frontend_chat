'use client'
import { useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from "../utils/asset/chatSelect.json"
export default function ChatSelect() {
    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById("your-animation-container-select"),// Replace with your container ID
            animationData: animationData, // Path to your Lottie JSON fileentById('your-animation-container'),
            renderer: 'svg', // or 'canvas' or 'html'
            autoplay: true,
        });
    }, []);
    return (
        <div className='container-fluid-loader' style={{ background: "transparent" }} id='your-animation-container-select'>

        </div>
    )
}

