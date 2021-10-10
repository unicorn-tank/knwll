import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore, auth, serverTimestamp } from '../../../lib/firebase';
import QuestionFeed from '../../../components/QuestionFeed';

export default function QuestionsList() {
    const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('questions')
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const questions = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            <h1>Manage Questions</h1>
            <QuestionFeed questions={questions} admin />
        </>
    )
}