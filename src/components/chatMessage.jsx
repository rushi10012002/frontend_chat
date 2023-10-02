'use client'
import { createConversationMessage, createConversationMessageFile, getConversationMessages } from '@/services/api/chat'
import { BASE_URL } from '@/services/endPoint'
import moment from 'moment/moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from './wrapper'

function ChatMessage({ selectedUser, setLoading }) {
    const [loginUser, setLoginUser] = useState({})
    const { socket, setUserLoginData } = useContext(userContext)

    const [messageList, setMessageList] = useState([])
    const [inputMsg, setInputMsg] = useState("");
    const messageContainerRef = useRef(null);
    const handleMessageInputFile = async (e) => {

        const localData = localStorage.getItem("user");
        const loginUser = await JSON.parse(localData)
        // const formData = {
        //     message: e.target.files[0],
        //     type: "file",
        //     conversationId: selectedUser.conversationId,
        //     senderId: loginUser._id
        // }
        const formData = new FormData();
        formData.append("images", e.target.files[0])
        formData.append("message", e.target.files[0].name)
        formData.append("type", "file")
        formData.append("conversationId", selectedUser.conversationId)
        formData.append("senderId", loginUser._id)
        createConversationMessageFile(formData).then((res) => {
            console.log(res.data);
            socket.current.emit("send-message", {
                message: e.target.files[0].name,
                type: "file",
                conversationId: selectedUser.conversationId,
                senderId: loginUser._id,
                receiver: selectedUser._id,
                imageUrl: res.data.data.imageUrl
            })
            setMessageList([...messageList, {
                message: e.target.files[0].name,
                type: "file",
                conversationId: selectedUser.conversationId,
                senderId: loginUser._id,
                // receiver: selectedUser._id,
                imageUrl: res.data.data.imageUrl
            }])
            setInputMsg("")
            scrollToBottom();
        })



    }
    const handleMessageInput = async (e) => {

        if (e.code == "Enter") {
            const localData = localStorage.getItem("user");
            const loginUser = await JSON.parse(localData)
            const formData = {
                message: inputMsg,
                type: typeof e.target.value,
                conversationId: selectedUser.conversationId,
                senderId: loginUser._id
            }
            createConversationMessage(formData).then((res) => {
                console.log(res.data);
            })

            socket.current.emit("send-message", {
                message: inputMsg,
                type: typeof e.target.value,
                conversationId: selectedUser.conversationId,
                senderId: loginUser._id,
                receiver: selectedUser._id
            })
            setMessageList([...messageList, {
                message: inputMsg,
                type: typeof e.target.value,
                conversationId: selectedUser.conversationId,
                senderId: loginUser._id
            }])
            setInputMsg("")
            scrollToBottom();
        }

    }
    const fetchGetMessage = async () => {
        setLoading(true)
        const localData = localStorage.getItem("user");
        const loginUser = await JSON.parse(localData)
        setLoginUser(loginUser)
        getConversationMessages(selectedUser.conversationId).then((res) => {
            setMessageList(res.data.data)
            scrollToBottom();
            setLoading(false)
        })
    }
    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    useEffect(() => {
        fetchGetMessage()
    }, [selectedUser])
    useEffect(() => {
        if (socket.current) {
            socket.current.on("receive-message", (response) => {
                const list = [...messageList]
                list.push({
                    message: response.message,
                    type: response.type,
                    conversationId: response.conversationId,
                    senderId: response.senderId,
                    imageUrl: response.imageUrl

                })
                setMessageList(list)

            })
        }
        scrollToBottom();
    }, [messageList])

    return (
        <div className='container-fluid-message-list'>
            <div className="chat-header py-3">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", color: "white" }}>
                    <img className='user-image-header' src={BASE_URL + "/" + selectedUser.imageUrl} alt="" />
                    <h6 style={{ textTransform: "capitalize", fontWeight: "800", marginLeft: ".8rem", fontSize: "24px" }}>{selectedUser.userName} (<small className='text-light'>{selectedUser.email}</small>)</h6>
                    {/* {selectedUser.conversationId} */}
                </div>
            </div>
            <div className="message">
                <div className="message-list">
                    <div id="message-lista">
                        {
                            messageList.map((msg, i) => {
                                if (msg.senderId == loginUser._id) {
                                    return (
                                        <div className="row my-4" key={i}>
                                            <div className="col-lg-6 col-10 offset-lg-3 offset-1">
                                                <div className="message-send">
                                                    {msg.type == "file" ? <>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <img className='message-image' src={BASE_URL + "/" + msg.imageUrl} alt="" />
                                                                <small className='text-dark'>{msg.message}</small>
                                                            </div>
                                                        </div>
                                                    </> : msg.message} <br />
                                                    <div style={{ float: "right" }}><small className='text-dark'>{moment(msg.created_at).startOf('second').fromNow()}</small></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="row my-4" key={i}>
                                            <div className="col-lg-6 col-10 offset-lg-3 offset-1">
                                                <div className="message-receive">
                                                    {msg.type == "file" ? <>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <img className='message-image' src={BASE_URL + "/" + msg.imageUrl} alt="" />
                                                                <small className='text-dark'>{msg.message}</small>
                                                            </div>
                                                        </div>
                                                    </> : msg.message}  <br />
                                                    <div style={{ float: "right" }}><small className='text-dark'>{moment(msg.created_at).startOf('second').fromNow()}</small></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    <div ref={messageContainerRef} />





                </div>
                <div className="input-message-box">
                    <div className="row">
                        <div className="col-10 offset-1" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", height: "7vh" }}>
                            <div className="btn btn-light " style={{ marginRight: ".3rem" }}> 📄 </div>
                            <input type="file" onChange={(e) => {
                                handleMessageInputFile(e)
                            }} />
                            <input value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} onKeyUp={handleMessageInput} type="text" placeholder='enter the message' className='form-control ' />
                            <div className="btn btn-light " style={{ marginLeft: ".3rem" }}> ▶️ </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChatMessage