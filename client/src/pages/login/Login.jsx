import axios from 'axios';
import React,{useContext, useRef, useState} from 'react';
import './Login.css';
import {AuthContext} from "../../context/AuthContext.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
    const URL=process.env.REACT_APP_URL;
    const [open, setOpen] = useState(false);
    const [msg,setMsg]=useState("Success");
    const [type,setType]=useState("success");
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext);

    const handleLogin=async (e)=>{
        e.preventDefault();
        dispatch({type:'LOGIN_START'});
        try{
            const res=await axios.post(URL+"auth/login",{email:email.current.value,password:password.current.value});
            console.log(res);
            if(res.data==="Invalid Credentials"){
                setMsg(res.data);
                setType("warning");
                setOpen(true);
            }else if(res.data==="User not found"){
                setMsg(res.data);
                setType("warning");
                setOpen(true);
            }else{
                dispatch({type:'LOGIN_SUCCESS',payload:res.data});
                user=res.data
                localStorage.setItem("user", JSON.stringify(user))
                setMsg("Login Successfull");
                setType("success");
                setOpen(true);
            }
        }catch(err){
            dispatch({type:'LOGIN_FAIL',payload:error});
            setMsg("Error")
            setType("error");
            setOpen(true);
        }
    }
    
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    };
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
                        <button className="login-button">LOGIN</button>
                        <Link to="/register" className='login-register-link'>
                            <button className="login-register">Create new Account</button>
                        </Link>
                    </form>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={type}>{msg}
                    </Alert>
                </Snackbar>
            </div>            
        </div>
    )
}

export default Login
