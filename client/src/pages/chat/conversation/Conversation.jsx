import React, { useState,useEffect, useContext } from 'react';
import './Conversation.css';
import {AuthContext} from '../../../context/AuthContext';
import axios from "axios";

const Conversation = (c) => {
    const {user}=useContext(AuthContext);
    const [friend,setFriend]=useState();
    const URL = process.env.REACT_APP_URL;
    const getFriendDetail=async(id)=>{
        const res=await axios.get(URL+`user/${id}`);
        setFriend(res.data);
    }
    useEffect(()=>{
        if(c.conversation.member[0]!==user._id){
            getFriendDetail(c.conversation.member[0]);
        }
        else{
            getFriendDetail(c.conversation.member[1]);
        }
    },[])
    return (
        <div>

            {friend?<div className="conversation">
                <img
                className="conversationImg"
                src={friend.profilePicture}
                alt=""
            />
            <span className="conversationName">{friend.username}</span>
            </div>:<div></div>}
        </div>
            
        
    )
}

export default Conversation
