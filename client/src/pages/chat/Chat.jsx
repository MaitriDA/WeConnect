import React from 'react';
import './Chat.css';
import Message from '../chat/message/Message';
import Conversation from '../chat/conversation/Conversation';
import SendIcon from '@material-ui/icons/Send';
import Online from '../chat/online/Online';

const Chat = () => {
    return (
        <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="chatMenuBox">
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>

            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                <div>
                    <Message type={"my"}/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message type={"my"}/>
                    <Message/>

                </div>
              </div>
              <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..." row={2}
                  ></textarea>
                  <button className="chatSubmitButton">
                    <SendIcon/>
                  </button>
                </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            Online friends
            <div className="onlineList">
            <Online/>
            <Online/>
            <Online/>
            <Online/>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Chat
