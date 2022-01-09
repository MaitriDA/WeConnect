import React from 'react';
import './Home.css';
import LeftSidebar from '../../components/left-sidebar/LeftSidebar';
import News from '../../components/news/News';
import Feed from '../../components/feed/Feed';

const Home = () => {
    return (
        <div>
            <div className="home-container">
                <LeftSidebar/>
                <Feed/>
                <News/>
            </div>
        </div>
    )
}

export default Home
