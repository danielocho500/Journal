import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config'
import { login } from '../actions/auth';
import { Loading } from '../components/basics/Loading';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
      }

      setChecking(false);
    })

  }, []);

  if (checking) {
    return (
      <Loading></Loading>
    )
  }
  else{
    return (
      <Routes>
        <Route path='/' element={
          <PrivateRoute>
            <JournalScreen />
          </PrivateRoute>
        } />
  
        <Route path='/auth/*' element={
          <PublicRoute>
            <AuthRouter />
          </PublicRoute>
        } />
  
  
      </Routes>
    )
  }

};
