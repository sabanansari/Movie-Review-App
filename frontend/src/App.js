import React from 'react'
import {Route, Routes } from 'react-router-dom';
import ConfirmPassword from './components/auth/ConfirmPassword';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Navbar from './components/user/Navbar';

export default function App() {
  return <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/auth/signin' element={<Signin/>} />
      <Route path='/auth/signup' element={<Signup/>} />
      <Route path='/auth/verification' element={<EmailVerification/>} />
      <Route path='/auth/forget-password' element={<ForgetPassword/>} />
      <Route path='/auth/confirm-password' element={<ConfirmPassword/>} />
    </Routes>
  </div>
  
}
