import React,{useRef} from 'react';
import axios from 'axios';
import './Register.css';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const URL=process.env.REACT_APP_URL;
    const history=useHistory()
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const cpassword=useRef();
    const handleRegister=async(e)=>{
        e.preventDefault();
        if(password.current.value===cpassword.current.value){
            try{
                const res=await axios.post(URL+"auth/register",{username:username.current.value,email:email.current.value,password:password.current.value});
                console.log(res);
            }catch(err){
                console.log(err);
            }
        }
        else{
            console.log("Password doesn't match!!")
        }
    }
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
                        <button className="register-login">Login</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default Register
