import React, { useState , useRef } from 'react';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signOut, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './App.css';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { addDoc } from 'firebase/firestore';

import { serverTimestamp } from 'firebase/firestore';

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

// Rest of your code...

function Community1() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1 className='mymy'>Community</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

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

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(firestore, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    const auth = getAuth();
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>
    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Community..." />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>

  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}


export default Community1;
