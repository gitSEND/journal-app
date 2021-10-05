import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebaseConfig';
import { types } from '../types/types';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(123, 'pedro'));
    }, 3500);
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
