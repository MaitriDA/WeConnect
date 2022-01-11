import React, { useContext, useState, useEffect, useRef } from 'react';
import './Chat.css';
import Message from '../chat/message/Message';
import Conversation from '../chat/conversation/Conversation';
import SendIcon from '@material-ui/icons/Send';
import Online from '../chat/online/Online';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const URL = process.env.REACT_APP_URL;
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg,setMsg]=useState("");
  const scrollRef=useRef();
  const getConversations = async () => {
    const res = await axios.get(URL + `conversation/${user._id}`)
    setConversation(res.data)
  }
  
  const getMessages=async(id)=>{
    try{
      const res=await axios.get(URL+`message/${id}`);
      setMessages(res.data);
    }catch(err){
      console.log("Error")
    }
  }

  const handleConversation=async(c)=>{
    setCurrentChat(c);
    getMessages(c._id);
  }

  const handleSendMsg=async()=>{
    console.log(msg);
    const chat={
      "conversationId":currentChat._id,
      "msg":msg,
      "sender":user._id
    }
    try{
      const res=await axios.post(URL+`message/`,chat);
      console.log(res);
      getMessages(currentChat._id);

    }catch(err){
      console.log("Error");
    }
    setMsg("");
  }
  useEffect(() => {
    getConversations();
    if(currentChat){
      getMessages(currentChat);
    }
  }, [])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  })
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <div className="chatMenuBox">
            {conversation.map(c => (
              <div onClick={()=>handleConversation(c)} key={c._id}>
                <Conversation conversation={c}/>
              </div>
              
            ))}

          </div>
        </div>
      </div>
      <div className="chatBox">
        {currentChat?<div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {messages.length!==0?<div>
              {messages.map(m=>(
                <div key={m._id} ref={scrollRef}>
                  <Message msg={m}/>
                </div>
              ))}

            </div>:<div className="chatBoxWrapper-message">No Conversation</div>}
            
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..." row={2}
            onChange={(e)=>setMsg(e.target.value)} value={msg}></textarea>
            <button className="chatSubmitButton" onClick={()=>handleSendMsg()}>
              <SendIcon />
            </button>
          </div>
        </div>:<div className="chatBoxWrapper">
          <div className="chatBoxWrapper-message">Select a friend to start open conversation!!</div>
        </div>}
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          Online friends
          <div className="onlineList">
            <Online />
            <Online />
            <Online />
            <Online />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
