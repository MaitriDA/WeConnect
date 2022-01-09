import React from 'react';
import './LeftSidebar.css';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ChatIcon from '@material-ui/icons/Chat';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import GroupIcon from '@material-ui/icons/Group';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import HelpIcon from '@material-ui/icons/Help';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

const LeftSidebar = () => {
    return (
        <div className="left-sidebar-container">
            <div className="left-sidebar-wrapper">
                <ul className="left-sidebar-list">
                    <Link to="/" className="left-sidebar-link">
                        <li className="left-sidebar-listItem">
                            <RssFeedIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Feed</span>
                        </li>
                    </Link>
                    <Link to="/chat" className="left-sidebar-link">
                        <li className="left-sidebar-listItem">
                            <ChatIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Chat</span>
                        </li>
                    </Link>
                    <Link to="/playVideo" className="left-sidebar-link">
                        <li className="left-sidebar-listItem">
                            <PlayCircleFilledIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Play Videos</span>
                        </li>
                    </Link>
                    <Link to ="/friends" className="left-sidebar-link">

                        <li className="left-sidebar-listItem">
                            <EmojiPeopleIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Friends</span>
                        </li>
                    </Link>
                    <Link to="/group" className="left-sidebar-link">
                        <li className="left-sidebar-listItem">
                            <GroupIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Group</span>
                        </li>
                    </Link>
                    <Link to="/bookmark" className="left-sidebar-link">
                        <li className="left-sidebar-listItem">
                            <BookmarkIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Bookmark</span>
                        </li>
                    </Link>
                    <Link to="/jobs" className="left-sidebar-link">
                        <li className="left-sidebar-listItem">
                            <WorkIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Jobs</span>
                        </li>
                    </Link>
                    <Link to="/event" className="left-sidebar-link">
                        <li className="left-sidebar-listItem">
                            <EventIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Events</span>
                        </li>
                    </Link>
                    <Link to="/help" className="left-sidebar-link">
                        <li className="left-sidebar-listItem">
                            <HelpIcon className="left-sidebar-listItem-icon"/>
                            <span className="left-sidebar-listItem-text">Help</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default LeftSidebar
