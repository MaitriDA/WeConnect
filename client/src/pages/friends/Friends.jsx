import React, { useContext,useEffect,useState } from 'react'
import LeftSidebar from '../../components/left-sidebar/LeftSidebar'
import './Friends.css';
import { Users } from '../../data';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import FriendCard from './FriendCard';

const Friends = () => {
    const URL=process.env.REACT_APP_URL;
    const [friends,setFriends]=useState([]);
    const [suggestions,setSuggestions]=useState([]);
    const {user}=useContext(AuthContext);

    const fetchFriends=async()=>{
        try{
            const res=await axios.get(URL+`user/${user._id}/friends`);
            setFriends(res.data);
            console.log(res.data);
        }catch(err){
            console.log(err);
        }
    }

    const fetchSuggestions=async()=>{
        try{
            const res=await axios.get(URL+`user/${user._id}/suggestion`);
            setSuggestions(res.data);
        }catch(err){
            console.log(err);
        }
    }
    const handleUnFollow=async (id)=>{
        console.log(id)
        try{
            const res=await axios.put(URL+`user/${id}/unfollow`,{userId:user._id});
            console.log(res);
            fetchFriends();
            fetchSuggestions();
        }catch(err){
            console.log(err);
        }
    }
    const handleFollow=async (id)=>{
        console.log(id)
        try{
            const res=await axios.put(URL+`user/${id}/follow`,{userId:user._id});
            console.log(res);
            fetchSuggestions();
            fetchFriends();
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchFriends(); 
        fetchSuggestions();
    },[])
    return (
        <div>
            <div className="friends-container">
                <div className="friends-wrapper">
                    <LeftSidebar/>
                    <div className="friends-center">
                        <h3>Your Friends</h3>
                        {friends.map(f=>(
                            <div className="friend-single" key={f._id}>
                                <img src={f.profilePicture} alt="" className="friend-image" />
                                <div className="friend-username">{f.username}</div>
                                <button className="friend-unfollow" onClick={()=>handleUnFollow(f._id)}>UnFollow</button>

                            </div>
                        ))}
                    </div>
                    <div className="friends-right">
                        <h4>Suggestions...</h4>
                    {suggestions.map(s=>(
                        <div className="suggestion-single" key={s._id}>
                            <img src={s.profilePicture} alt="" className="suggestion-image" />
                            <div className="suggestion-username">{s.username}</div>
                            <button className="suggestion-follow" onClick={()=>handleFollow(s._id)}>Follow</button>
                        </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends
