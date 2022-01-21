import Link from 'next/link';
import { auth, googleAuthProvider, firestore } from '../lib/firebase';
import { useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../lib/context';
import { ToastBar } from 'react-hot-toast';
import debounce from 'lodash.debounce';

import Cover from '../layout/Cover';
import Cluster from '../layout/Cluster';

export default function EnterPage(props) {

    const { user, username } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if (username) {
            router.push('/admin'); 
        }
        
    }, [username])

    return (
        <main>
            { user ? (!username ? <UsernameForm /> : <></>) : <SignInButton /> }
        </main>
    )
}

function SignInButton() {

    const signInWithGoogle = async() => {
        await auth.signInWithPopup(googleAuthProvider);
    }

    const signInAnonymously = async() => {
        await auth.signInAnonymously();
    }

    return (
        <Cover centeredElement='div'>
  
            <div>
            <Cluster justifyContent='space-evenly' isBorder={false}>
            <Cluster isBorder={false}>

            <button onClick={signInWithGoogle} className="login" style={{fontSize: '3rem'}}>
                <img src={'/google.png'} width="4components/Metatags0px"/> Sign in with Google
            </button>

            <button onClick={signInAnonymously} className="login" style={{fontSize: '3rem'}} disabled>
                <img src={'/hacker.png'} width="40px"/>
                Sign in Anonymously
            </button>

            </Cluster>
            </Cluster>
            </div>

            
        </Cover>
    );

}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {

    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);

    const onChange = (e) => {
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    }

    const checkUsername = useCallback(
        debounce(async (username) => {
        if (username.length >= 3) {
            const ref = firestore.doc(`usernames/${username}`);
            const { exists } = await ref.get();
            console.log('Firestore read executed!');
            setIsValid(!exists);
            setLoading(false);

        }
    }, 500), 
    []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);

        // Commit both docs together as a batch write.
        const batch = firestore.batch();
        batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
        batch.set(usernameDoc, { uid: user.uid });

        await batch.commit();

    }

    return (
        !username && (
            <Cluster isBorder={false}>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    
                    <input name="username" placeholder="username" value={formValue} onChange={onChange} />
                    
                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                    
                    <button type="submit" className="btn-green" disabled={!isValid}>
                        Choose
                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br/>
                        Loading: {loading.toString()}
                        <br/>
                        Username Valid: {isValid.toString()}
                    </div>
                </form>

            </Cluster>
        )
    );
}

function UsernameMessage({ username, isValid, loading }) {
    if(loading) {
        return <p>Checking ...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>
    } else if (username && !isValid) {
        return <p className="text-danger">The username is taken!</p>
    } else {
        return <p></p>
    }
}