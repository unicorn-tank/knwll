import { useRouter } from 'next/router';
import Head from 'next/head';

import UserProfile from '@components/UserProfile';
import QuestionsUserFeed from '@components/QuestionsUserFeed';

import { firestore, auth } from '@lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function UserProfilePage(props) {


    // console.log('USER:', user);

    // console.log('QUESTIONS:', questions);
    let { user } = props;
    let questions = {};

    if (auth.currentUser) {
        user = auth.currentUser;
        const uid = user.uid;
        const ref = firestore.collection('users').doc(uid).collection('questions')
        const query = ref.orderBy('createdAt');
        const [querySnapshot] = useCollection(query);
        questions = querySnapshot?.docs.map((doc) => doc.data());
    } else {
        //const router = useRouter();
        //const { user } = router.query;


        //user = getUserWithUsername(user);
        //const userDoc = getUserWithUsername(user);

        if (user) {
            const ref = firestore.collection('users').doc(user).collection('questions')
            const query = ref.orderBy('createdAt');
            const [querySnapshot] = useCollection(query);
            questions = querySnapshot?.docs.map((doc) => doc.data());
        }


    }

    return (
        <>
            <Head>
                <title>Questions and answers user profile, knwll: know well, like qizzo</title>
                <meta name="description" content="Question & Answer user profile page of KNWLL, know well, like quizzo." />
            </Head>
            
            {user &&
                <>
                    <UserProfile user={user} />
                    <QuestionsUserFeed questions={questions} admin={false} />
                </>

            }

        </>
    )
}