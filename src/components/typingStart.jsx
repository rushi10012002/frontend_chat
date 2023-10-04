'use client'

import animationData from "../utils/asset/typing.json"
import Lottie from 'lottie-react';

export default function TypingStart() {

    return (
        <Lottie className='animationTyping' animationData={animationData} loop={true} />
    )
}

