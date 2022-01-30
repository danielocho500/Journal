import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth_box-container'>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
        </Routes>
      </div>
    </div>
  );
};
