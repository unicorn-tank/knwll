import AuthCheck from '../../components/AuthCheck';


import { firestore, auth } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import QuestionFeed from '../../components/QuestionFeed';
import CreateNewQuestion from './questions/createnewquestion';

import Metatags from '../../components/Metatags';

export default function AdminPostsPage(props) {
    return (
        <main>
            <Metatags title="KNWLL: Admin Page | Know All" />
            <AuthCheck>
                <CreateNewQuestion />
            </AuthCheck>
        </main>
    )
}

function QuestionsList() {
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('questions')
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const questions = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            <h1>Manage Questions</h1>
                {/* <QuestionFeed questions={questions} admin={false} /> */}
                <QuestionFeed admin={false} />
        </>
    )
}





