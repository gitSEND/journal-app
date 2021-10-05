import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, provider } from '../firebase/firebaseConfig';
import { types } from '../types/types';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => console.log(err));
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then(({ user }) => dispatch(login(user.uid, user.displayName)))
      .catch((err) => console.log(err));
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: { uid, displayName },
  };
};
