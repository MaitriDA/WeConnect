import axios from 'axios';
import React,{useContext, useRef} from 'react';
import './Login.css';
import {AuthContext} from "../../context/AuthContext.js";
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = () => {
    const URL=process.env.REACT_APP_URL;
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext);

    const handleLogin=async (e)=>{
        e.preventDefault();
        dispatch({type:'LOGIN_START'});
        try{
            const res=await axios.post(URL+"auth/login",{email:email.current.value,password:password.current.value});
            dispatch({type:'LOGIN_SUCCESS',payload:res.data});
            user=res.data
            localStorage.setItem("user", JSON.stringify(user))
        }catch(err){
            dispatch({type:'LOGIN_FAIL',payload:error})
        }
    }
    console.log(user);
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-left">
                    <h3 className="login-brandname">WeConnect</h3>
                    <span className="login-desc">Connect with friends and the world around you on WeConnect.</span>
                </div>
                <div className="login-right">
                    <form className="login-box" onSubmit={handleLogin}>
                        <span className="login-heading">LOGIN</span>
                        <input placeholder="Email" required type="email" className="login-input" ref={email}/>
                        <input placeholder="Password" minLength="6" required type="password" className="login-input" ref={password}/>
                        <button className="login-button">{isFetching ? "Loading...":"LOGIN"}</button>
                        {isFetching ? <button className="login-register-none">Create new Account</button>:<button className="login-register">Create new Account</button>}
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default Login
