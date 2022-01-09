import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import LeftSidebar from '../../components/left-sidebar/LeftSidebar';
import Feed from '../../components/feed/Feed';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import cover from '../../images/cover.png';
import profile from '../../images/profile.png';
import {Link} from 'react-router-dom';

const Profile = () => {
    const URL = process.env.REACT_APP_URL;
    const { id } = useParams()
    const { user } = useContext(AuthContext);
    const [currUser, setCurrUser] = useState({});
    const [page,setPage]=useState({page:"profile",userId:id})

    const fetchUser = async () => {
        try {
            const res = await axios.get(URL + `user/${id}`);
            setCurrUser(res.data);
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
            <div className="profile-container">
                <LeftSidebar />
                <div className="profile-right">
                    <div className="profile-right-top">
                        <div className="profile-images">
                            {currUser.coverPicture?<img src={currUser.coverPicture} alt="" className="profile-cover-image"/>:<img src={cover} alt="" className="profile-cover-image"/>}
                            {currUser.profilePicture?<img src={currUser.profilePicture} alt="" className="profile-profile-image"/>:<img src={profile} alt="" className="profile-profile-image"/>}
                        </div>
                        <div className="profile-info">
                            <h4 className="profile-info-name">{currUser.username}</h4>
                            {currUser.description?<span className="profile-info-desc">{currUser.description}</span>:<span className="profile-info-desc">Click to add description</span>}
                            {currUser.city?<span className="profile-info-desc">{currUser.city}, {currUser.country}</span>:<span className="profile-info-desc">Click to add Location</span>}
                            {user._id===id?<Link to={`/profile/${user._id}/edit`}>
                                <button className="profile-edit">EDIT</button>
                            </Link>:<div></div>}
                        </div>
                    </div>
                    <div className="profile-right-bottom">
                        <Feed page={page} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
