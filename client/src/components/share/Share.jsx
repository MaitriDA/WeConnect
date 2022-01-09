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

const Share = () => {
    const URL=process.env.REACT_APP_URL;
    const description=useRef();
    const {user}=useContext(AuthContext);
    const [file,setFile]=useState(null);

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
    }
    const postUpload=async(url)=>{
        try{
            const postDetail={userId:user._id,description:description.current.value,image:url}
            const res=await axios.post(URL+`post`,postDetail);
            console.log(res);
        }catch(err){
            console.log(err);
        }
        console.log("Post created")
    }
    return (
        <div className="share-container">
            <div className="share-wrapper">
                <div className="share-top">
                    <textarea placeholder="What's in your mind.." className="share-input" rows={4} ref={description}/>
                </div>
                <hr className="share-hr" />
                <div className="share-button">
                    <div className="share-options">
                            <label htmlFor="fileInput" className="share-option">
                            <PermMediaIcon htmlColor="tomato" className="share-icon"/>
                            <span className="share-option-text">Photo/Video</span>

                            </label>
                            <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                        <div className="share-option">
                            <LabelIcon htmlColor="blue" className="share-icon"/>
                            <span className="share-option-text">Tags</span>
                        </div>
                        <div className="share-option">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className="share-icon"/>
                            <span className="share-option-text">Emoji</span>
                        </div>
                        <div className="share-option">
                            <LocationOnIcon htmlColor="green" className="share-icon"/>
                            <span className="share-option-text">Location</span>
                        </div>
                    </div>
                    <button className="share-option-button" onClick={()=>createPost()}>POST</button>
                </div>
            </div>
            
        </div>
    )
}

export default Share
