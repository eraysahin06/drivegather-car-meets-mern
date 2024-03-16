import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import app from '../firebaseConfig';
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const registerUser = async (name, username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name
    });

    const user = userCredential.user;
    await axios.post('http://localhost:3000/users', {
      firebaseId: user.uid,
      displayName: user.displayName,
      username: username, // Include the username here
      email: user.email,
      photoURL: user.photoURL
    });

    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    // Set firebaseId in User schema
    const user = result.user;

    // Generate a username by combining the first and last names and converting to lowercase
    const username = (user.displayName.split(' ')[0] + user.displayName.split(' ')[1] || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    await axios.post('http://localhost:3000/users', {
      firebaseId: user.uid,
      displayName: user.displayName,
      email: user.email,
      username: username,
      photoURL: user.photoURL
    });

    console.log("User signed in with Google:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user);
  } else {
    console.log("User is signed out");
  }
});
