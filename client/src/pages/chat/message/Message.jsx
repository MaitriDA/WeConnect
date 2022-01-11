import React from 'react';
import './Message.css';

const Message = ({type}) => {
  return (
    <div className={type ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur unde error quisquam, hic suscipit repudiandae aliquid qui voluptatum laborum cumque illo doloribus quaerat at id maiores. Quos suscipit quaerat architecto?</p>
      </div>
      <div className="messageBottom">Time</div>
    </div>
  )
}

export default Message
