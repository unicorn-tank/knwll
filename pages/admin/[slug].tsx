import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import { useForm } from 'react-hook-form';

import AuthCheck from '../../components/AuthCheck';

import styles from '../../styles/Admin.module.css';
import toast from 'react-hot-toast';

export default function AdminPostEdit(props) {
    return (
        <AuthCheck>
            <QuestionManager />
        </AuthCheck>
    )
}

function QuestionManager() {
    const [preview, setPreview] = useState(false);

    const router = useRouter();
    const { slug } = router.query;

    const questionRef = firestore.collection('users').doc(auth.currentUser.uid).collection('questions').doc(slug.toString());
    const [ question ] = useDocumentData(questionRef);

    return (
        <main className={styles.container}>
            {question && (
                <>
                    <section>
                        <h1>{question.question}</h1>
                        <p>ID: {question.slug}</p>

                        <AnswerForm questionRef={questionRef} defaultValues={question} preview={preview} />
                    </section>
                </>
            )}
        </main>
    );
}

function AnswerForm({ questionRef, defaultValues, preview }) {
    const { register, handleSubmit, reset, watch, formState, formState: {errors} } = useForm({ defaultValues, mode: 'onChange'});
    const { isValid, isDirty } = formState;
    const router = useRouter();

    const updateQuestion = async ({ answer, published }) => {

        await questionRef.update({
            answer,
            published,
            updatedAt: serverTimestamp(),
        });

        reset({ answer, published });
        router.push(`/admin`);
        toast.success('Answer updated successfully!');
    }

    return (
        <form onSubmit={handleSubmit(updateQuestion)}>

            {preview && (
                <div className="card">
                    {/* <ReactMarkdown>{watch('answer')}</ReactMarkdown> */}
                </div>
            )}

            <div className={preview ? styles.hidden : styles.control }>

                <input name="answer" {...register("answer",
                               { required: true,
                                maxLength: 150,
                                minLength: 3}

                        )}></input>
 
                {errors.answer?.type === 'required' && "Answer is required"}
                {errors.answer?.type === 'maxLength' && "Answer is too long"}
                {errors.answer?.type === 'minLength' && "Answer is too short"}

                <fieldset>
                    <input className={styles.checkbox} name="published" type="checkbox" {...register("published")}></input>
                    <label>Published</label>
                </fieldset>

                <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
                    Save changes
                </button>

            </div>

        </form>
    )
}