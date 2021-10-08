import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { useCollection } from 'react-firebase-hooks/firestore';

import AuthCheck from '../../components/AuthCheck';
import QuestionFeed from '../../components/QuestionFeed';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import { UserContext } from '../../lib/context';

import styles from '../../styles/Admin.module.css';
import Metatags from '../../components/Metatags';

export default function AdminPostsPage(props) {
    return (
        <main>
            <Metatags title="Quizzo: Admin Page" />
            <AuthCheck>
                <QuestionsList />
                <CreateNewQuestion />
            </AuthCheck>
        </main>
    )
}

function QuestionsList() {
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

function CreateNewQuestion() {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [question, setQuestion] = useState('');

    // Ensure slug is URL safe
    const slug = encodeURI(kebabCase(question));

    const isValid = question.length > 3 && question.length < 150;

 
    // Create a new question in firestore
    const createPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('questions').doc(slug);
        console.log('uid', uid);
        console.log('username', username);
        const data = {
            question,
            slug,
            uid,
            username,
            published: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0
        }

        await ref.set(data);
        toast.success('Question created!');
        router.push(`/admin/${slug}`);
    }

    return (
        <form onSubmit={createPost}>

            <input 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="New Question!"
                className={styles.input}
            />

            <p>
                <strong>Slug:</strong> {slug}
            </p>

            <button type="submit" disabled={!isValid} className="btn-green">
                Add New Question
            </button>

        </form>
    )
}