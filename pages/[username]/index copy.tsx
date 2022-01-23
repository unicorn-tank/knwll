import UserProfile from '@components/UserProfile';
import QuestionsUserFeed from '@components/QuestionsUserFeed';

import { getUserWithUsername } from '@lib/firebase';
import { postToJSON } from '@lib/firebase';

export async function getServerSideProps({ query }) {
    
    const { username } = query;
    console.log('------->query:', query);
    const userDoc = await getUserWithUsername(username);
    console.log('------->userDoc:', userDoc);

    if (!userDoc) {
        return {
            notFound: true,
        }
    }

    let user = null;
    let questions = null;

    if (userDoc) {
        
        user = userDoc.data();

        const postQuery = userDoc.ref
            .collection('questions')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc');

        questions = (await postQuery.get()).docs.map(postToJSON);
    }

    return {
        props: { user, questions }
    }
}


export default function UserProfilePage(props) {

    const { user, questions } = props;
    console.log('USER:', user);
    
    console.log('QUESTIONS:', questions);
    
    return (
        <>
            <UserProfile user={user} />
            <QuestionsUserFeed questions={questions} admin={false} />
        </>
    )
}