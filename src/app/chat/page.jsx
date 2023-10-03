'use client'
import React, { useContext, useEffect, useState } from 'react'
import "../chat.module.css"
import ChatSelect from '@/components/chatSelect'
import UserList from '@/components/userList'
import ChatMessage from '@/components/chatMessage'
import { useRouter } from "next/navigation"
import Loader from '@/components/loader'
import { userContext } from '@/components/wrapper'
import { BASE_URL } from '@/services/endPoint'
function Chat() {
    const { userLoginData, socket, setUserLoginData, setOnlineUser, onlineUser } = useContext(userContext)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    useEffect(() => {
        if (socket.current && userLoginData) {
            socket.current.emit("add-user", userLoginData?._id)
            socket.current.on("active-users", (users) => {
                console.log(users);
                setOnlineUser(users)
            })
        }
    }, [userLoginData])

    useEffect(() => {
        const localData = localStorage.getItem("user");
        const loginUser = JSON.parse(localData);
        setUserLoginData(loginUser)
    }, [])

    return (
        <div className="container-fluid-chat ">
            <div className=" ">
                <div className="row bg-transparent chat-main " style={{ paddingLeft: "0px" }}>
                    <div className="col-lg-3 col-md-5 chat-user-list" style={{ position: "relative", paddingLeft: "0px", paddingRight: "0px" }}>
                        <div className='px-0 mx-0'>
                            <div className="login-user-data py-3 px-3 text-center">
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                    <img className='user-image-header' src={BASE_URL + "/" + userLoginData?.imageUrl} alt="" />
                                    <h6 style={{ textTransform: "capitalize", fontWeight: "800", marginLeft: ".8rem", fontSize: "18px", color: "black" }}>{userLoginData?.userName}</h6>
                                    <small style={{ textTransform: "capitalize", fontWeight: "800", marginLeft: ".8rem", color: "black" }}>{userLoginData?.email}</small>
                                </div>
                            </div>
                            <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                        </div>
                        <div className="login-user-data py-1 px-3 text-center" style={{ backgroundColor: "aliceblue" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textTransform: "uppercase", fontWeight: "600" }}>

                                <button className="btn w-100 text-white" onClick={() => {
                                    localStorage.removeItem("user")
                                    if (socket.current) {
                                        // socket.current.emit("disconnect")
                                        socket.current.emit("log-out", userLoginData._id)

                                        socket.current.on("active-users", (users) => {
                                            console.log(users);
                                            setOnlineUser(users)
                                        })
                                    }
                                    router.push("/")
                                }} style={{ backgroundColor: "#3c556d" }}>logout</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-7 chat-message" style={{ overflow: "hidden", position: "relative", paddingLeft: "0px", paddingRight: "0px" }}>
                        {
                            selectedUser == null ? <ChatSelect /> : <ChatMessage setLoading={setLoading} selectedUser={selectedUser} />
                        }
                    </div>
                </div>
            </div>
            {
                loading && <Loader />
            }
        </div>
    )
}

export default Chat