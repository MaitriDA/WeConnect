import React, { useContext,useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Dialog from '@material-ui/core/Dialog';
import './Profile.css';
import axios from "axios";
import storage from '../../firebase/config';

const ProfileEdit = () => {
    const URL = process.env.REACT_APP_URL;
    const history = useHistory();
    const {user}=useContext(AuthContext);
    const [profileFile,setProfileFile]=useState();
    const [coverFile,setCoverFile]=useState();
    const [updatedUser,setUpdatedUser]=useState();

    const handelUpdate=async()=>{
        if(profileFile){
            const uploadTask = storage.ref(`profile/${user._id}`).put(profileFile);
            uploadTask.on("state_changed",snapshot => {},
                error => {console.log(error);},
                () => {storage.ref("profile").child(user._id).getDownloadURL().then(url => {
                    console.log(url);
                    updateProfileImage("profilePicture",url);
                });
            });
        }
        if(coverFile){
            const uploadTask = storage.ref(`cover/${user._id}`).put(coverFile);
            uploadTask.on("state_changed",snapshot => {},
                error => {console.log(error);},
                () => {storage.ref("cover").child(user._id).getDownloadURL().then(url => {
                    console.log("coverPicture",url);
                    updateProfileImage("coverPicture",url);
                });
            });
        }
        try{
            const userData={
                userId:user._id,
                description:updatedUser.description,
                city:updatedUser.city,
                country:updatedUser.country
            }
            const res=await axios.put(URL+`user/${user._id}`,userData);
            console.log(res);
        }catch(err){
            console.log(err);
        }
        history.push(`/profile/${user._id}`)
        console.log(updatedUser);   
    }

    const updateProfileImage=async(imageType,url)=>{
        try{
            var userData;
            if(imageType==="profilePicture"){
                userData={
                    userId:user._id,
                    profilePicture:url
                }
            }
            else{
                userData={
                    userId:user._id,
                    coverPicture:url
                }
            }
            const res=await axios.put(URL+`user/${user._id}`,userData);
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }
    const handleCancel=()=>{
        history.push(`/profile/${user._id}`) 
    }

    const onValueChange=(e)=>{
        setUpdatedUser({...updatedUser,[e.target.name]:e.target.value})
    }

    const onValueChangeProfile=(e)=>{
        setProfileFile(e.target.files[0]);
    }
    const onValueChangeCover=(e)=>{
        setCoverFile(e.target.files[0]);
    }
    const fetchUser = async () => {
        try {
            const res = await axios.get(URL + `user/${user._id}`);
            setUpdatedUser(res.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <div>
            <Dialog open={true} onClose={handleCancel} >
                <div className="profile-edit-container">
                    <h4 className="profile-edit-heading">Edit Profile</h4>
                    
                    <div className="input-fields-container">
                        <label>Description</label>
                        <input type="text" className="input-fields" name="description" onChange={(e)=>onValueChange(e)}/>
                    </div>
                    <div className="input-fields-container">
                        <label>City</label>
                        <input type="text"className="input-fields" name="city" onChange={(e)=>onValueChange(e)}/>
                    </div>
                    <div className="input-fields-container">
                        <label>Country</label>
                        <input type="text"className="input-fields" name="country" onChange={(e)=>onValueChange(e)} />
                    </div>
                    <div className="input-fields-container">
                        <label>Select Profile image</label>
                        <input type="file" name="profilePicture" onChange={(e)=>onValueChangeProfile(e)}/>
                    </div>
                    <div className="input-fields-container">
                        <label>Select Cover image</label>
                        <input type="file" name="coverPicture" onChange={(e)=>onValueChangeCover(e)}/>
                    </div>
                    <div className="profile-button-container">
                    <button onClick={handelUpdate} className="profile-edit">EDIT</button>
                    <button onClick={handleCancel} className="profile-edit">CANCEL</button>

                    </div>
                    

                </div>
            </Dialog>
        </div>
    )
}

export default ProfileEdit
