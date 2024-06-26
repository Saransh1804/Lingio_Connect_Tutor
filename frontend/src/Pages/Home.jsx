import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import {Link} from "react-router-dom"

const Home = () => {
    const { tutor } = useAppContext();

    

   
    useEffect(() => {
        console.log("Home component rendered. Tutor:", tutor);
    }, [tutor]);

    return (
        <div className='text-white'>
            <p className='text-white p-10 bg-pink-600'>{tutor[0].description}</p>

            <div>
            <div className='flex flex-col'>
            {tutor[0].bookings.map((student)=>(
                
                <Link to={`/student/${student.userId}`}>
                {student.userId}
                </Link>
            ))}
            </div>
           
            </div>
        </div>
        
    );
}

export default Home;
