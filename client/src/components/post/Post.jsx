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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    const [open, setOpen] = useState(false);
    const [msg,setMsg]=useState("Success");
    const [type,setType]=useState("success");
    const userData={"userId":user._id}
    
    const handleLike=async ()=>{
        const res=await axios.put(URL+`post/${post._id}/like`,userData)
        if(res.data==="Post liked"){
            setLike(like+1);
            setMsg(res.data);
            setOpen(true);
        }
        else if(res.data==="Post already liked"){
            setMsg(res.data);
            setOpen(true);
            setType("warning")
        }
        else if(res.data==="You can't like your post"){
            setMsg(res.data);
            setOpen(true);
            setType("warning")
        }
        
    }
    const handleLove=async ()=>{
        const res=await axios.put(URL+`post/${post._id}/heart`,userData);
        if(res.data==="Post loved"){
            setHeart(heart+1);
            setMsg(res.data);
            setOpen(true);
        }
        else if(res.data==="Post already loved"){
            setMsg(res.data);
            setOpen(true);
            setType("warning")
        }
        else if(res.data==="You can't love your post"){
            setMsg(res.data);
            setOpen(true);
            setType("warning")
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

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    };

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
                            {post.location?<div>{post.location}</div>:<div></div>}
                        </div>
                </div>
                <div className="post-center">
                    <span className="post-center-text">{post.description}</span>
                    <div className="post-center-tags">{post.tags}</div>
                    {post.image?<img src={post.image} alt="" className="post-center-postImg" />:<div></div>}
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
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>{msg}</Alert>
            </Snackbar>
        </div>
    )
}

export default Post
