import Head from 'next/head';

import AuthCheck from '@components/AuthCheck';


import { firestore, auth } from '@lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import QuestionFeed from '@components/QuestionFeed';
import CreateNewQuestion from './questions/createnewquestion';

export default function AdminPostsPage(props) {
    return (
        <main>

             <Head>
                <title>New Question & Answer pair creating...</title>
                <meta name="description" content="Create new question answer pair. Knwll: know well, like qizzo" />
            </Head>

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





