import UserProfile from '../../components/UserProfile';
import QuestionFeed from '../../components/QuestionFeed';

import { getUserWithUsername } from '../../lib/firebase';
import { postToJSON } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
    
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

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

export default function UserProfilePage({ user, questions }) {
    return (
        <main>
            <UserProfile user={user} />
            <QuestionFeed questions={questions} admin={false} />
        </main>
    )
}