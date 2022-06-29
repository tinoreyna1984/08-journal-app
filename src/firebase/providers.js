import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

/**
 * - Creación de proveedores de backend (por ahora solo con Google y servicio de email)
 * - Creación de métodos que usan los proveedores definidos previamente
 */

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid, // user info
    };
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const registerWithEmailAndPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = result.user;
    //console.log({uid, photoURL})
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName, // user info
    };
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    //console.log('user in provider: ', result.user);
    const { uid, photoURL, displayName } = result.user;
    //console.log({ uid, photoURL, displayName, email });
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName, // user info
    };
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);

    return {
      ok: false,
      errorMessage,
    };
  }
};

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
}
