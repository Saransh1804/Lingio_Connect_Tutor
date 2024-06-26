import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Login from './Pages/Login.jsx'
import Home from "./Pages/Home.jsx"
import Student from './Pages/Student.jsx'
import VideoCall from './Pages/VideoCall.jsx'
 


function App() {


  return (
   <Router>
    <Routes>
      <Route path='/' element={<Login />}>
      </Route>

      <Route path='/home' element={<Home />}></Route>

      <Route path='/student/:studentId' element={<Student />}></Route>
      <Route path='/videocall/:studentId' element={<VideoCall />}></Route>
      
    </Routes>
   </Router>
  )
}

export default App
