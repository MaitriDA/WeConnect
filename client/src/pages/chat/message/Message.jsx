import React,{useState,useEffect, useContext} from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './Message.css';
import {format} from "timeago.js"

const Message = ({msg}) => {
  const {user}=useContext(AuthContext);
  const [own,setOwn]=useState(false);

  useEffect(()=>{
    if(msg.sender===user._id){
      setOwn(true)
    }
  },[])
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{msg.msg}</p>
      </div>
      <div className="messageBottom">{format(msg.createdAt)}</div>
    </div>
  )
}

export default Message
