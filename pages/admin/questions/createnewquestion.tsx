import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { firestore, auth, serverTimestamp } from '../../../lib/firebase';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { UserContext } from '../../../lib/context';
import styles from '../../../styles/Admin.module.css';

export default function CreateNewQuestion() {
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
        <section>
        <form onSubmit={createPost}>

            <input 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Add New Question!"
                className={styles.input}
            />

            <p>
                <strong>Slug:</strong> {slug}
            </p>

            <button type="submit" disabled={!isValid} className="btn-green">
                Add New Question
            </button>

        </form>
        </section>
    )
}
