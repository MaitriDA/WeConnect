import React,{useState} from 'react'
import Feed from '../../components/feed/Feed'
import LeftSidebar from '../../components/left-sidebar/LeftSidebar'
import './Bookmark.css';

const Bookmark = () => {
    const [page,setPage]=useState({page:"bookmark",userId:"none"})
    return (
        <div>
            <div className="bookmark-container">
                <LeftSidebar/>
                <div className="bookmark-right">
                    <Feed page={page}/>
                </div>
            </div>
        </div>
    )
}

export default Bookmark
