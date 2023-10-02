'use client'
import { useContext, useEffect, useState } from 'react';
import lottie from 'lottie-web';
import animationData from "../utils/asset/chat.json"
import ModalCom from './modal';
import { useRouter } from "next/navigation"
import Loader from './loader';
import { toast } from "react-toastify"
import { loginUser, resisterUser } from '@/services/api/user';
import { userContext } from './wrapper';
export default function Login() {
    const { socket, setOnlineUser, setUserLoginData } = useContext(userContext)
    const [userObj, setUserObj] = useState({
        email: "",
        password: ""
    })
    const [userResister, setUserResister] = useState({
        email: "",
        password: "",
        userName: "",
        image: ""
    })
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState(false)
    useEffect(() => {
        lottie.loadAnimation({
            container: document.getElementById("your-animation-container"),// Replace with your container ID
            animationData: animationData, // Path to your Lottie JSON fileentById('your-animation-container'),
            renderer: 'svg', // or 'canvas' or 'html'
            autoplay: true,
        });
    }, []);
    const closeModal = () => {
        setMode(false)
    }
    const openModal = () => {
        setMode(true)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        await loginUser(userObj).then((res) => {
            console.log(res.data);
            console.log(res.data.code === 0);
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
                setUserLoginData(res.data.data)

                // socket.current.on("online-user", (users) => {
                //     console.log(users);
                //     setOnlineUser(users)
                // })
                localStorage.setItem("user", JSON.stringify(res.data.data))
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                router.push("/chat")
                event.target.reset()
            }
            setLoading(false)
        })
    }
    const handleResister = async (event) => {
        event.preventDefault();

        setLoading(true)

        const formData = new FormData();
        formData.append("userName", userResister.userName)
        formData.append("email", userResister.email)
        formData.append("password", userResister.password)
        formData.append("images", userResister.image)
        await resisterUser(formData).then((res) => {
            console.log(res.data.data);
            if (res.data.code == 0) {
                toast.error(res.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            } else {
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                event.target.reset()
            }

            setLoading(false)
            closeModal()
        })

    }
    const handleOnChange = (e) => {
        setUserObj({ ...userObj, [e.target.name]: e.target.value })
    }
    const handleOnChangeResister = (e) => {
        setUserResister({ ...userResister, [e.target.name]: e.target.value })
    }
    return (
        <div className='Container-fluid'>
            <div className="main">
                <div className="content-box" id='your-animation-container'>
                </div>
                <div className="login-box">
                    <div className="login-container">
                        <div className="form-div">
                            <h1 className='heading'>login chat <br /> <span style={{ color: "#f8579f" }}>application</span> </h1>
                            <form onSubmit={handleSubmit}>
                                <div className='form-box'>
                                    <label htmlFor="userName" className='lable'>username:</label>
                                    <input onChange={handleOnChange} autoComplete='true' type="text" name='email' placeholder='enter the username ' />
                                </div>
                                <div className='form-box'>
                                    <label htmlFor="password" className='lable'>password :</label>
                                    <input onChange={handleOnChange} type="password" name='password' placeholder='enter the password' />
                                </div>
                                <div className='form-box-btn-group'>
                                    <button className='btn-dark' type='submit'>login</button>
                                    <button className='btn-info' type='button' onClick={openModal}>resister</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ModalCom
                width="600px" height="800px" mode={mode} closeModal={closeModal} close={closeModal} Component={<>
                    <div className="resister-container">
                        <div className="form-div">
                            <h4 className='heading  mt-0 pt-5 ' style={{ fontSize: "22px" }}>resister account in chat <br /> <span style={{ color: "#f8579f" }}>application</span> </h4>
                            <form onSubmit={handleResister} >
                                <div className='form-box mb-0 mt-0 py-2'>
                                    <label htmlFor="image" className='lable'>profile image:</label>
                                    <input type="file" name='image' onChange={(e) => {
                                        setUserResister({ ...userResister, image: e.target.files[0] })
                                    }} />
                                </div>
                                <div className='form-box mb-0 mt-0 py-2'>
                                    <label htmlFor="userName" className='lable'>username:</label>
                                    <input autoComplete='true' onChange={handleOnChangeResister} type="text" name='userName' placeholder='enter the username ' />
                                </div>
                                <div className='form-box'>
                                    <label htmlFor="userName" className='lable'>email:</label>
                                    <input autoComplete='true' onChange={handleOnChangeResister} type="email" name='email' placeholder='enter the email ' />
                                </div>
                                <div className='form-box'>
                                    <label htmlFor="userName" className='lable'>password :</label>
                                    <input type="password" name='password' onChange={handleOnChangeResister} placeholder='enter the password' />
                                </div>
                                <div className='form-box'>
                                    <label htmlFor="userName" className='lable'>Confirm password :</label>
                                    <input type="password" name='cpassword' placeholder='enter the confirm password' />
                                </div>
                                <div className='form-box-btn-group'>

                                    <button className='btn-info' type='submit' onClick={openModal}>resister</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </>}
            />
            {
                loading && <Loader />
            }
        </div>
    )
}

