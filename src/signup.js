import React  from 'react';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyBX0y6bt5V06S7dBt5XuZDoDNJ8_rQBk2c",
  authDomain: "community-f7790.firebaseapp.com",
  projectId: "community-f7790",
  storageBucket: "community-f7790.appspot.com",
  messagingSenderId: "782600470024",
  appId: "1:782600470024:web:2f4ae352911fda6b0cdbbd"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();
const analytics = getAnalytics();
const messagesRef = collection(firestore, 'messages');
const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth , provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}><img  className='goog' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'/>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}
export default SignIn;