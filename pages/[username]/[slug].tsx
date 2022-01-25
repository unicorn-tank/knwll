import Link from 'next/link';
import Head from 'next/head';
//import styles from '../../styles/Question.module.css';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';

import Metatags from '@components/MetaTags';
import ShowAnswerQuestion from '@components/ShowAnswerQuestion';

import Box from '@layout/Box';

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
    const metaDescriptionContent = `One question, one answer: ${question.question}: ${question.answer}`;

    return (
        <>

            <Metatags title="Know All, Know Well: Ask Question, Find Answer | Quizzo Wizard" description={metaDescriptionContent} />

            <Box isBorder={true} isBackground={true}>

                <ShowAnswerQuestion question={question} questionRef={questionRef} />

            </Box>
        </>
    )
}