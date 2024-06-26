import React, { useState } from 'react';
import Register_Animation from "../assets/Register_Animation.json";
import Lottie from 'lottie-react';
import { LuLanguages } from "react-icons/lu";
import { useMutation } from "react-query";
import * as apiClient from "../apiClient.js";
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext.jsx';

const Login = () => {
    const { setTutor } = useAppContext();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.getTutor, {
        onSuccess: (data) => {
            console.log("success");
            setTutor(data);
            navigate(`/home`);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(password);
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-6 '>
            <div className='flex justify-between bg-cyan-950 h-20'>
                <div className='flex items-center p-3 mb-2 ml-1'>
                    <span className='text-white gap-2 flex text-2xl'>
                        <LuLanguages className='my-auto' /> Lingio Connect
                    </span>
                </div>
            </div>
            <div className='md:h-screen grid items-center grid-cols-1 lg:grid-cols-2 gap-4 max-[1024px]:gap-8 p-3 '>
                <div className='flex items-center justify-center p-3'>
                    <Lottie animationData={Register_Animation} />
                </div>
                <div className='flex justify-center'>
                    <div className='rounded-lg justify-center flex flex-col gap-3 py-7 px-20 max-[1174px]:px-10 max-[524px]:px-5'>
                        <div className='text-white text-3xl p-3 max-[524px]:p-2 mb-6 font-bold'>
                            Login to Lingio-Connect
                        </div>
                        <input onChange={(e) => setPassword(e.target.value)} className='bg-black p-2 text-xl border-2 text-white rounded-lg border-cyan-950' placeholder='Enter password' type='password' name='password' />
                        <button className='hover:bg-black mt-4 bg-cyan-950 text-white font-bold text-xl p-3 border rounded-lg'>Login</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;
