import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/note';

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  const [isLoggeIn, setIsLoggeIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggeIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggeIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggeIn]);

  if (checking) {
    return <h1>ESPERE....cargando!!</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path='/auth'
            component={AuthRouter}
            isAuthenticated={isLoggeIn}
          />
          <PrivateRoute
            exact
            path='/'
            component={JournalScreen}
            isAuthenticated={isLoggeIn}
          />
          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  );
};
