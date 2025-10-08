import React, { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import Teach from './pages/Teach'
import Mission from './pages/Mission'
import { Footer } from './components/Footer'
import Course from './pages/Course'
import Profile from './pages/Profile.jsx'
import { GetToken } from './controllers/getToken.js'
const App = () => {
  const [tokenValue, setTokenValue] = useState("");
  useEffect(() => {
    const token = GetToken();
    setTokenValue(token);
  }, []);
  return (
    <BrowserRouter>
      <Navbar token={tokenValue} />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={tokenValue ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/teach'
          element={<Teach />}
        />
        <Route
          path='/mission'
          element={<Mission />}
        />
        <Route
          path='/courses'
          element={<Course />}
        />
        <Route 
          path='/profile'
          element={tokenValue ? <Profile /> : <Navigate to='/' replace/>}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
