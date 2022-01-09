import React,{useContext, useEffect,useState} from 'react';
import './Feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';
import { Posts} from '../../data';
import { AuthContext } from '../../context/AuthContext';

const Feed = ({page}) => {
    const [posts,setPosts]=useState([]);
    const URL=process.env.REACT_APP_URL;
    const {user}=useContext(AuthContext);

    const fetchPosts=async()=>{
        if(page){
            if(page.page==="profile"){
                const res=await axios.get(URL+`post/${page.userId}/user`)
                setPosts(res.data); 
                console.log("Profile")
            }
            else if(page.page==="bookmark"){
                const res=await axios.get(URL+`post/${user._id}/bookmark`)
                setPosts(res.data); 
            }
        }
        else{
            const res=await axios.get(URL+`post/${user._id}/followings`)
            setPosts(res.data);
            console.log("Normal")
        }
    }
    useEffect(async()=>{     
        fetchPosts();
    },[])

    posts.sort(function(a,b){
        var dateA = new Date(a.updatedAt), dateB = new Date(b.updatedAt);
        return dateB - dateA
    })
    console.log(posts);
    return (
        <div className="feed-container">
            <div className="feed-wrapper">
                {page==="bookmark"?<div>{posts.map(p=>(
                    <Post post={p} key={p._id}/>
                ))}</div>:<div><Share/>{posts.map(p=>(
                    <Post post={p} key={p._id}/>
                ))}</div>}
                
            </div>
        </div>
    )
}

export default Feed
