import { createSlice } from '@reduxjs/toolkit'
import { signInWithGoogle, registerWithEmailAndPassword, loginWithEmailAndPassword, logoutFirebase } from '../../../firebase/providers';
import { clearNotesLogout } from '../journal/journalSlice';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'not-authenticated', 'checking', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: { // del action estoy sacando directamente el payload
    login: (state, {payload}) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, {payload}) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    },
  },
})

// thunks - ini

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    //console.log(result);
    if(!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const {ok, uid, photoURL, errorMessage} = await registerWithEmailAndPassword({email, password, displayName});
    if(!ok) return dispatch(logout({errorMessage}));
    dispatch(login( {uid, displayName, email, photoURL} ));
  }
}

export const startLoginWithEmailPassword = ({email, password}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const {ok, displayName, uid, photoURL, errorMessage} = await loginWithEmailAndPassword({email, password});
    //console.log('result in slice: ', result);
    if(!ok) return dispatch(logout({errorMessage}));
    dispatch(login( {uid, displayName, email, photoURL} ));
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout({errorMessage: 'Logged out'}));
  }
}

// thunks - fin

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;