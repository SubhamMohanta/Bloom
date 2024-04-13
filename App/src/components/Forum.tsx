import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom"
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, User } from 'firebase/auth';
import { collection, getFirestore, serverTimestamp, addDoc, orderBy, query, Firestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Navbar from './Navbar';


const firebaseConfig = {
    apiKey: "AIzaSyC2ow4B-uLzGmtezKOLxImZgsTbi5RfAbk",
    authDomain: "bloom-789ff.firebaseapp.com",
    projectId: "bloom-789ff",
    storageBucket: "bloom-789ff.appspot.com",
    messagingSenderId: "575982325846",
    appId: "1:575982325846:web:a7c396ae295a2a85716bf7",
    measurementId: "G-F4Q6J21VL6"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const firestore: Firestore = getFirestore(app);

const Forum: React.FC = () => {
    const [user]: [User | null, boolean, Error | null] = useAuthState(auth);
    return (
        <>
            <Navbar/>
            <div className='App'>
                {user ? <ChatRoom /> : <SignIn />}
            </div>
        </>
    )
}

const SignIn: React.FC = () => {
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }

    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
        </>
    )
}

const SignOut: React.FC = () => {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

const ChatRoom: React.FC = () => {
    const dummy = useRef<HTMLDivElement>(null);
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const [messages]: [any[], boolean, Error | null] = useCollectionData(q, { idField: 'id' });
    const [formValue, setFormValue] = useState<string>('');

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser!;
        if (!uid) return;

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL,
        });

        setFormValue('');
        dummy.current!.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className='Welcome-msg'>
                <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>Welcome to<br />the Bloom community</h2>
                <p>Please maintain decorum in the community forum</p>
            </div>
            <div className='custom-hr-room-2' />
            <main>
                {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                <span ref={dummy}></span>
            </main>

            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="Type here"
                />
                <button type="submit" disabled={!formValue}><svg width="30" height="20" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.5886 14.1203C29.7557 14.0503 29.8985 13.9327 29.9994 13.7823C30.1003 13.6319 30.1548 13.4551 30.1561 13.274C30.1575 13.0929 30.1057 12.9153 30.0071 12.7634C29.9086 12.6114 29.7676 12.4917 29.6016 12.4191L3.03784 0.794708L3.03654 0.793389L2.21222 0.431151C2.05602 0.362616 1.88391 0.338591 1.71491 0.361728C1.54591 0.384866 1.3866 0.454267 1.25457 0.562264C1.12253 0.670261 1.02292 0.812653 0.966732 0.973709C0.910544 1.13477 0.899967 1.30822 0.93617 1.47491L1.12578 2.35316L1.12444 2.35708L3.42067 13.0703L0.961477 23.7473L0.961438 23.7526L0.75847 24.6278C0.720334 24.7938 0.728722 24.967 0.782709 25.1285C0.836696 25.29 0.934189 25.4334 1.06446 25.543C1.19472 25.6527 1.35272 25.7242 1.52104 25.7499C1.68937 25.7755 1.8615 25.7542 2.01849 25.6883L29.5886 14.1203ZM24.7162 14.1578L5.10301 14.0084L5.26948 13.2859C5.30011 13.1534 5.30116 13.0158 5.27256 12.8829L5.11711 12.158L24.7303 12.3074L26.8811 13.249L24.7162 14.1578Z" fill="#FFFAEA"/>
</svg></button>
            </form>
        </>
    );
}

const ChatMessage: React.FC<{ message: any }> = (props) => {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img className="img" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="User avatar" />
            <p style={{ borderRadius: "50px", padding: "8px" }}>{text}</p>
        </div>
    );
}

export default Forum;
