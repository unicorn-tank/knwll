import Link from 'next/link';
//import styles from '../../styles/Question.module.css';
import Helmet from 'react-helmet';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';

//import PostQuestions from '../../components/QuestionFeed';
import ShowAnswerQuestion from '../../components/ShowAnswerQuestion';

import Box from '../../layout/Box';
import Cluster from '../../layout/Cluster';

export async function getStaticProps({ params }) {
    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);

    let question;
    let path;

    if (userDoc) {
        const questionRef = userDoc.ref.collection('questions').doc(slug);
        question = postToJSON(await questionRef.get());

        path = questionRef.path;
    }

    return {
        props: { question, path },
        revalidate: 5000
    }
}

export async function getStaticPaths() {

    const snapshot = await firestore.collectionGroup('questions').get();

    const paths = snapshot.docs.map((doc) => {
        // Improve my using Admin SDK to select empty docs
        const { slug, username } = doc.data();
        return {
            params: { username, slug }
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}

export default function PostQuestion(props) {

    const questionRef = firestore.doc(props.path);
    const [realtimeQuestion] = useDocumentData(questionRef);

    const question = realtimeQuestion || props.question;

    return (
        <>
            <Helmet>
                <title>Question & Answer, knwll: know well</title>
                <meta name="description" content="Question & Answer page of KNWLL, know well." />
            </Helmet>
            <Box isBorder={true}>

                <ShowAnswerQuestion question={question} questionRef={questionRef} />

            </Box>
        </>
    )
}