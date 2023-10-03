'use client'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"
export const userContext = createContext()

function Wrapper({ children }) {

    const [userLoginData, setUserLoginData] = useState({})
    const [onlineUser, setOnlineUser] = useState([])
    const socket = useRef(null)
    useEffect(() => {
        socket.current = io("https://chat-next.onrender.com");
        // socket.current = io("ws://localhost:8000");

    }, [])
    return (
        <userContext.Provider value={{ socket, onlineUser, setOnlineUser, setUserLoginData, userLoginData }}>
            {children}
        </userContext.Provider>
    )
}

export default Wrapper