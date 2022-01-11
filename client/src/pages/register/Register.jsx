import React,{useState,useRef} from 'react';
import axios from 'axios';
import './Register.css';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Link} from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Register = () => {
    const URL=process.env.REACT_APP_URL;
    const history=useHistory();
    const [open, setOpen] = useState(false);
    const [msg,setMsg]=useState("Success");
    const [type,setType]=useState("success");
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const cpassword=useRef();
    const handleRegister=async(e)=>{
        e.preventDefault();
        if(password.current.value===cpassword.current.value){
            try{
                const res=await axios.post(URL+"auth/register",{username:username.current.value,email:email.current.value,password:password.current.value});
                setMsg(res.data)
                if(res.data==="User Registered"){
                    setType("success");
                    history.push('/login');
                }
                else{
                    setType("warning");
                }
                handleClick();
            }catch(err){
                console.log(err);
                setMsg("Error")
                setType("error");
                handleClick();
            }
        }
        else{
            setMsg("Password Doesn't match!!")
            setType("warning");
            handleClick();
        }
    }

    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    };

    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="register-left">
                    <h3 className="register-brandname">WeConnect</h3>
                    <span className="register-desc">Connect with friends and the world around you on WeConnect.</span>
                </div>
                <div className="register-right">
                    <form className="register-box" onSubmit={handleRegister}>
                        <span className="register-heading">REGISTER</span>
                        <input placeholder="Name" required type="text" className="register-input" ref={username}/>
                        <input placeholder="Email"  required type="email" className="register-input" ref={email}/>
                        <input placeholder="Password" required minLength="6" type="password" className="register-input" ref={password}/>
                        <input placeholder="Confirm Password" required minLength="6" type="password" className="register-input" ref={cpassword}/>
                        <button className="register-button">Register</button>
                        <Link to="/login" className="register-login-link">
                            <button className="register-login">Login</button>
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

export default Register
