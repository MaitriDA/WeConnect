import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Friends.css';
import axios from "axios";

const FriendCard = ({friend}) => {
    const URL=process.env.REACT_APP_URL;
    const {user}=useContext(AuthContext);
    const handleUnFollow=async()=>{
        try{
            const res=await axios.put(URL+`user/${friend._id}/unfollow`,{userId:user._id});
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="friend-single">
            <img src={friend.profilePricture} alt="" className="friend-image" />
            <div className="friend-username">{friend.username}</div>
            <button className="friend-unfollow" onClick={handleUnFollow}>UnFollow</button>
        </div>
    )
}

export default FriendCard
