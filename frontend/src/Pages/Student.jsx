import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import io from 'socket.io-client';
import {BsSend} from "react-icons/bs"
import Messages from '../components/Messages.jsx'

const Student = () => {
    const { tutor } = useAppContext();
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        console.log("Home component rendered. Tutor:", tutor);
    }, [tutor]);

    useEffect(() => {
        const newSocket = io('https://lingio-connect.onrender.com'); 
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    const tutorId = tutor[0]?._id

    const {studentId} = useParams()
    console.log(studentId)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;

        const newMessage = { studentId,tutorId , message };
        // mutation.mutate(newMessage);

        socket.emit('sendMessage', { senderId: tutorId, receiverId: studentId, message });

        setMessage("");
    };
    const handleKeyPress = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!message) return;

            const newMessage = { studentId,tutorId , message };
            // mutation.mutate(newMessage);

            socket.emit('sendMessage', { senderId: tutorId, receiverId: studentId, message });

            setMessage("");
        }
    };
    const handleClick = ()=>{
        navigate(`/videocall/${studentId}`)

    }
  return (
    <div>
     <form onSubmit={handleSubmit} className='border border-orange-200 flex flex-col p-3'>
                        <div className='border border-blue-400 text-white p-4 text-3xl'>
                            Chat with <span className='font-bold'>your tutor</span>
                        </div>
                        <div className='border flex-grow border-pink-600 text-white h-96 overflow-y-scroll p-4'>
                            <Messages tutorId={tutorId} userId={studentId} />
                        </div>
                        <div className='border text-white bottom-0 border-green-700 p-4'>
                            <div className='flex justify-between gap-2'>
                                <textarea
                                    type='text'
                                    className='border text-sm rounded-lg flex-grow p-2.5 bg-gray-700 border-gray-600 text-white resize-none'
                                    placeholder='Send a message'
                                    value={message}
                                    rows={1}
                                    onChange={(e) => { setMessage(e.target.value) }}
                                    onKeyDown={handleKeyPress}
                                />
                                <button type='submit' className='bg-cyan-950 rounded-lg p-3 flex items-center'>
                                    <BsSend />
                                </button>
                            </div>
                        </div>
     </form>
     <button onClick={handleClick} className='text-white border p-4 mt-4'>
        Start Live session
     </button>
      
    </div>
  )
}

export default Student
