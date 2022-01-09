import React,{useState,useEffect,useContext} from 'react'
import './Post.css';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Users
} from '../../data';
import axios from "axios";
import profile from '../../images/profile.png';
import Dialog from '@material-ui/core/Dialog';
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Post = ({post}) => {
    const URL=process.env.REACT_APP_URL;
    const {user}=useContext(AuthContext);
    const [like,setLike]=useState(post.likes.length);
    const [heart,setHeart]=useState(post.heart.length);
    const [commentOpen,setCommentOpen]=useState(false);
    const [comments,setComments]=useState(post.comment);
    const [comment,setComment]=useState("");
    const [postOwner,setPostOwner]=useState({});
    const [bookmark,setBookmark]=useState(false);
    const userData={"userId":user._id}
    
    const handleLike=async ()=>{
        const res=await axios.put(URL+`post/${post._id}/like`,userData)
        if(res.data==="Post liked"){
            setLike(like+1);
        }
        
    }
    const handleLove=async ()=>{
        const res=await axios.put(URL+`post/${post._id}/heart`,userData)
        console.log(res);
        if(res.data==="Post loved"){
            setHeart(heart+1);
        }
    }

    const handleCommentOpen = () => {
        setCommentOpen(true);
    };
    
    const handleCommentClose = () => {
        setCommentOpen(false);
    };
    
    const handleComment =async()=>{
        const newComment={
            username:user.username,
            comment:comment
        }
        const res=await axios.put(URL+`post/${post._id}/comment`,newComment)
        setComments([...comments,newComment])
        handleCommentClose();
    }
    const fetchPostOwner=async()=>{
        try{
            const res=await axios.get(URL+`user/${post.userId}`)
            setPostOwner(res.data);
        }catch(err){
            console.log(err);
        }
    }
    const handleBookmark=async()=>{
        const res=await axios.put(URL+`post/${post._id}/bookmark`,userData);
        setBookmark(!bookmark)
    }

    const checkBookMarkStatus=async()=>{
        const status=await axios.get(URL+`post/${user._id}/bookmarkcheck/${post._id}`);
        setBookmark(status.data);
    }
    useEffect(()=>{
        fetchPostOwner();
        checkBookMarkStatus();
    },[])
    return (
        <div className="post-container">
            <div className="post-wrapper">
                <div className="post-top">
                    <div className="post-top-left">
                        {postOwner.profilePicture ? (
                            <img src={postOwner.profilePicture} alt="" className="post-top-image" /> 
                        ):(
                            <img src={profile} alt="" className="post-top-image" /> 
                        )}
                        <Link to={`/profile/${postOwner._id}`} className="post-top-username-link">
                            <div className="post-top-username">{postOwner.username}</div>
                        </Link>
                    </div>
                    <div className="post-top-right">
                            <span className="post-top-date">{format(post.createdAt)}</span>
                        </div>
                </div>
                <div className="post-center">
                    <span className="post-center-text">{post.description}</span>
                    {post.image?<img src={post.image} alt="" className="post-center-postImg" />:<div></div>}
                    {/* <img src={post.photo} alt="" className="post-center-postImg" /> */}
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-left">
                        <img src="/assets/like.png" alt="" className="post-bottom-like" onClick={handleLike}/>
                        <img src="/assets/heart.png" alt="" className="post-bottom-like" onClick={handleLove}/>
                        <span className="post-bottom-like-counter">{like} people liked it!</span>
                    </div>

                    <div className="post-bottom-right">
                        <span className="post-bottom-comment" onClick={handleCommentOpen}>{comments.length} comments</span>
                        <Dialog open={commentOpen} onClose={handleCommentClose} className="post-comment-container">
                            
                            <div className="post-comment-wrapper">
                                <div className="post-comment-top">
                                    <span className="post-comment-title">Comment here...</span>
                                    <button className="post-comment-button" onClick={handleComment}>COMMENT</button>
                                </div>
                                <div className="post-comment-center">
                                    <textarea placeholder="What's in your mind.." className="post-comment-textarea" rows={2} onChange={e=>setComment(e.target.value)}/>
                                </div>
                                <div className="post-comment-bottom">
                                    {comments.map(c=>(
                                        <div className="post-comment-container" key={Math.random()}>
                                            <span className="post-comment-username">{c.username} : </span>
                                            <span className="post-comment-comment">{c.comment}</span>
                                        </div>

                                    ))}
                                        
                                </div>

                            </div>
                            
                         </Dialog>
                        <div className="post-bottom" onClick={handleBookmark}>
                            {bookmark?<BookmarkIcon className="bookmarkColor"/>:<BookmarkBorderIcon/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
