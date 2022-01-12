import React, { useContext,useEffect,useState } from 'react'
import LeftSidebar from '../../components/left-sidebar/LeftSidebar'
import './Friends.css';
import { Users } from '../../data';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Friends = () => {
    const URL=process.env.REACT_APP_URL;
    const [friends,setFriends]=useState([]);
    const [suggestions,setSuggestions]=useState([]);
    const {user}=useContext(AuthContext);

    const fetchFriends=async()=>{
        try{
            const res=await axios.get(URL+`user/${user._id}/friends`);
            setFriends(res.data);
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
    const createConversation=async(id)=>{
        const conv={
            senderId:user._id,
            receiverId:id
        }
        try{
            const res=await axios.post(URL+`conversation`,conv);
            console.log(res);
        }catch(err){
            console.log("Error");
        }
    }
    const handleUnFollow=async (id)=>{
        try{
            const res=await axios.put(URL+`user/${id}/unfollow`,{userId:user._id});
            fetchFriends();
            fetchSuggestions();
        }catch(err){
            console.log(err);
        }
    }
    const handleFollow=async (id)=>{
        try{
            const res=await axios.put(URL+`user/${id}/follow`,{userId:user._id});
            fetchSuggestions();
            fetchFriends();
        }catch(err){
            console.log(err);
        }
        try{
            const res=await axios.get(URL+`conversation/${user._id}`);
            const conv=res.data;
            var present=false;
            conv.map(f=>{
                const res=f.member.includes(id);
                if(res===true){
                    present=true;
                }
            })
            if(!present){
                createConversation(id);
            }
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
