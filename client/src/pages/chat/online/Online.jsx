import React, { useEffect, useState,useContext } from 'react';
import './Online.css';
import axios from "axios";
import {AuthContext} from '../../../context/AuthContext.js';

const Online = (userId) => {
  const {user}=useContext(AuthContext);
  const URL = process.env.REACT_APP_URL;
  const [online, setOnline] = useState(null);
  const getUser = async () => {
    if(user._id!==userId.userId){
      try {
        console.log(userId.userId)
        const res = await axios.get(URL + `user/${userId.userId}`);
        setOnline(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("Error");
      }
    }
  }
  useEffect(() => {
    getUser();
  }, [])
  return (
    <div>
      {online?<div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={online.profilePicture}
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{online.username}</span>
      </div>
    </div>:<div></div>}
    </div>
  )
}

export default Online
