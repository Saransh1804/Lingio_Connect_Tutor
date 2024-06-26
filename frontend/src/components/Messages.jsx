import React, { useEffect, useRef, useState } from 'react';
import * as apiClient from "../apiClient.js";
import { useQuery } from "react-query";
import Message from './Message.jsx';
import io from 'socket.io-client';

const Messages = ({ tutorId, userId }) => {
    const { data: messages } = useQuery(["getMessages", tutorId, userId], () => apiClient.getMessages(tutorId, userId));
    const messagesEndRef = useRef(null);

    const [socket, setSocket] = useState(null);
    const [realTimeMessages, setRealTimeMessages] = useState([]);
    const [initialMessages, setInitialMessages] = useState([]);

    useEffect(() => {
        const newSocket = io('https://lingio-connect.onrender.com');
        setSocket(newSocket);

        newSocket.emit('joinRoom', { senderId: tutorId, receiverId: userId });

        newSocket.on('receiveMessage', (message) => {
            setRealTimeMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => newSocket.close();
    }, [tutorId, userId]);
    useEffect(() => {
        if (messages && initialMessages.length === 0) {
            setInitialMessages(messages);
        }
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [initialMessages, realTimeMessages]);


    return (
        <div className=' '>
            {initialMessages.length > 0 && (
                <div className=''>
                    {initialMessages.map((message) => (
                        <Message key={message._id} message={message} userId={tutorId} />
                    ))}
                    {realTimeMessages.map((message) => (
                        <Message key={message._id} message={message} userId={tutorId} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
}

export default Messages;
