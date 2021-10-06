import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth, provider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));

        dispatch(finishLoading());
      })
      .catch((error) => {
        console.log(error.code);
        dispatch(finishLoading());
        Swal.fire('Error', error.code, 'error');
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
      .catch((error) => Swal.fire('Error', error.code, 'error'));
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

export const startLogout = () => {
  return async (dispatch) => {
    await signOut(auth);

    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
