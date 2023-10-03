'use client'
import { createConversation } from '@/services/api/chat'
import { UserListData } from '@/services/api/user'
import { BASE_URL } from '@/services/endPoint'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { userContext } from './wrapper'

function UserList({ setSelectedUser, selectedUser }) {
    const { userLoginData, onlineUser } = useContext(userContext)

    const [userList, setUserList] = useState([])
    useEffect(() => {
        UserListData().then((res) => {
            if (res.data.code === 0) {
                toast.error(res.data.message, {
                    color: "black",
                    className: "text-dark",
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                const filterData = res.data.data.filter(item => item._id != userLoginData._id)
                setUserList(filterData)
            }
        })
    }, [])
    const handleConversationSelect = async (item) => {
        const localData = localStorage.getItem("user");
        const loginUser = await JSON.parse(localData)
        // const participants = [
        //     { sender: loginUser._id, receiver: receiver },
        //     { sender: receiver, receiver: loginUser._id },
        //   ];
        const formData = {
            conversation: [loginUser._id, item._id],
            lastMessage: "",
            type: ""
        }
        console.log(formData);
        createConversation(formData).then((res) => {
            setSelectedUser({ ...item, conversationId: res.data.data._id })
        })


    }

    return (
        <div className="user-list-main pt-0 ">

            <div className="mt-2">
                {
                    userList.length > 0 ? userList.map((item, key) => <div key={key} onClick={() => {

                        handleConversationSelect(item)
                    }} className={selectedUser?._id == item._id ? 'user-box py-5 px-5 my-2 shadow active' : 'user-box py-5 px-5 my-2 shadow'}>
                        <div className='user-image-name'>

                            <img className='user-image' src={BASE_URL + "/" + item.imageUrl} alt="" />
                            <div className='w-100' style={{ marginLeft: ".7rem" }}> <h6 className='text-dark'>{item.userName}</h6>
                            </div>
                        </div>
                        <small className='text-dark'>
                            {onlineUser?.filter(items => items.userId == item._id).length == 1 ? <div className='online'>online</div> : <div className='offline'>
                                offline
                            </div>}
                        </small>

                        {/* <div className='text-time'>
                            02.30 pm
                        </div> */}
                    </div>) : <div className='user-not-avai'>
                        user not available
                    </div>
                }

            </div>


        </div>
    )
}

export default UserList;