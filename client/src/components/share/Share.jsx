import React,{useRef,useState} from 'react';
import './Share.css';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import LabelIcon from '@material-ui/icons/Label';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import storage from '../../firebase/config';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Share = () => {
    const URL=process.env.REACT_APP_URL;
    const description=useRef();
    const tags=useRef(null);
    const location=useRef(null);
    const {user}=useContext(AuthContext);
    const [file,setFile]=useState(null);
    const [tag,setTag]=useState(false);
    const [loc,setLoc]=useState(false);
    const [open, setOpen] = useState(false);
    const [msg,setMsg]=useState("Success");
    const [type,setType]=useState("success");

    const createPost=async()=>{
        if(file){
            const uploadTask = storage.ref(`post/${file.name}`).put(file);
            uploadTask.on("state_changed",snapshot => {},
                error => {console.log(error);},
                () => {storage.ref("post").child(file.name).getDownloadURL().then(url => {
                    console.log(url);
                    postUpload(url);
                });
            });
        }
        else{
            postUpload(null);
        }
    }
    const postUpload=async(url)=>{
        var postDetail={userId:"",description:"",image:"",tags:"",location:""}
        try{
            postDetail={userId:user._id,description:description.current.value,image:url}
            if(tags.current){
                postDetail.tags=tags.current.value
            }
            if(location.current){
                postDetail.location=location.current.value
            }
            const res=await axios.post(URL+`post`,postDetail);
            setOpen(true);
            setMsg(res.data);
        }catch(err){
            console.log(err);
            setOpen(true);
            setType("error")
            setMsg("Error")
        }
        setTag(false);
        setLoc(false);
    }

    const handleTags=()=>{
        setTag(true);
    }

    const handleLocation=()=>{
        setLoc(true);
    }

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpen(false);
    };
    return (
        <div className="share-container">
            <div className="share-wrapper">
                <div className="share-top">
                    <textarea placeholder="What's in your mind.." className="share-input" rows={4} ref={description}/>
                </div>
                <hr className="share-hr" />
                {tag?<div>
                    <textarea placeholder="#tags" className="share-input-tag" rows={2} ref={tags}/>
                </div>:<div></div>}
                {loc?<div>
                    <textarea placeholder="Location" className="share-input-tag" rows={1} ref={location}/>
                </div>:<div></div>}
                <div className="share-button">
                    <div className="share-options">
                            <label htmlFor="fileInput" className="share-option">
                            <PermMediaIcon htmlColor="tomato" className="share-icon"/>
                            <span className="share-option-text">Image</span>

                            </label>
                            <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                        <div className="share-option" onClick={handleTags}>
                            <LabelIcon htmlColor="blue" className="share-icon"/>
                            <span className="share-option-text">Tags</span>
                        </div>
                        <div className="share-option">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className="share-icon"/>
                            <span className="share-option-text">Emoji</span>
                        </div>
                        <div className="share-option" onClick={handleLocation}>
                            <LocationOnIcon htmlColor="green" className="share-icon"/>
                            <span className="share-option-text">Location</span>
                        </div>
                    </div>
                    <button className="share-option-button" onClick={()=>createPost()}>POST</button>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type}>{msg}</Alert>
            </Snackbar>
        </div>
    )
}

export default Share
