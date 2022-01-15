import React, { useState,useEffect,useContext} from 'react'
import "./Topbar.css";
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import profile from '../../images/profile.png';

const Topbar = () => {
    const {user}=useContext(AuthContext);
    const URL = process.env.REACT_APP_URL;
    const [currUser, setCurrUser] = useState({});

    const fetchUser = async () => {
        try {
            const res = await axios.get(URL + `user/${user._id}`);
            setCurrUser(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])
    return (
        <div className="topbar-container">
            <div className="topbar-left">
                
            </div>
            <div className="topbar-center">
                <Link to="/" className="topbar-link">
                    <span className="logo">WeConnect</span>
                </Link>
            </div>
            <div className="topbar-right">
                <Link to='/' className="topbar-right-link">
                    <div className="topbar-links">
                        <span className="topbar-link">Home</span>
                    </div>
                </Link>
                <div className="topbar-icons">
                    <Link to='/chat' className="topbar-right-link">
                        <div className="topbar-icon">
                            <ChatIcon/> 
                        </div>
                    </Link>
                </div>
                <Link to={`/profile/${user._id}`}>
                    {currUser.profilePicture?<img src={currUser.profilePicture} alt="" className="topbar-profile"/>:<img src={profile} alt="" className="topbar-profile"/>}
                    
                </Link>
            </div>
        </div>
    )
}

export default Topbar
