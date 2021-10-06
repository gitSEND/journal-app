import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggeIn, setIsLoggeIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggeIn(true);
      } else {
        setIsLoggeIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggeIn]);

  if (checking) {
    return <h1>ESPERE....</h1>;
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/auth' component={AuthRouter} />
          <Route exact path='/' component={JournalScreen} />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};
