import React from 'react';

const Message = ({ message, userId }) => {
    const fromMe = userId === message.senderId;
    const chatClassName = fromMe ? "chat chat-end" : "chat chat-start";
    return (
        <div className={`${chatClassName} overflow-auto my-auto `}>
            <div className="bg-cyan-950 text-white p-2 rounded max-w-xs  lg:max-w-lg break-words whitespace-normal">
                {message.message}
            </div>
        </div>
    );
}

export default Message;
