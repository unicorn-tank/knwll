import { firestore, auth, increment } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

// Allows user to heart or like a question
export default function Heart({ questionRef }) {

    // Listen to heart document for currently logged in user
    const heartRef = questionRef.collection('hearts').doc(auth.currentUser.uid);
    const [heartDoc] = useDocument(heartRef);

    const addHeart = async() => {
        const uid = auth.currentUser.uid;
        const batch = firestore.batch();

        batch.update(questionRef, { heartCount: increment(1) });
        batch.set(heartRef, {uid});

        await batch.commit();

    }

    const removeHeart = async() => {
        const batch = firestore.batch();

        batch.update(questionRef, { heartCount: increment(-1)});
        batch.delete(heartRef);

        await batch.commit();

    }

    return heartDoc?.exists ? (
        <button onClick={removeHeart}>💔 Unheart</button>
    ) : ( 
        <button onClick={addHeart}>🧡 Heart</button>
    )
}