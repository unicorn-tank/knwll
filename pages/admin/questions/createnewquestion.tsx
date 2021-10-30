import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { firestore, auth, serverTimestamp } from '../../../lib/firebase';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { UserContext } from '../../../lib/context';
import styles from '../../../styles/Admin.module.css';

const questionsGroupQuery = firestore.collectionGroup('questions');

export default function CreateNewQuestion() {
    const router = useRouter();
    const { username } = useContext(UserContext);

    return (
        <section>
            <QuestionForm username={username} router={router}></QuestionForm>
        </section>
    )
}

function QuestionForm({ username, router }) {

    const { register, handleSubmit, reset, watch, formState, formState: { errors } } 
                    = useForm({ mode: 'onChange' });

    const { isValid, isDirty } = formState;

    const [question, setQuestion] = useState('');
    let [slug, setSlug] = useState(encodeURI(kebabCase(question)));

    const isQuestionNotDuplicated = async (value: string ) => {

        const valueAsSlug = encodeURI(kebabCase(value)).trim();

        const empty = (await questionsGroupQuery.where('slug','==', valueAsSlug).get()).empty;
        setSlug(valueAsSlug);
        return empty ? true : false;
       
    }

    const onChangeQuestionInput = (e) => {
        const value = e.target.value;
 
        setQuestion(value);

    }

    // Create a new question in firestore
    const onQuestionCreatingSubmit = (data) => {
        
        // Ensure slug is URL safe
        
        const uid = auth.currentUser.uid;
        const question = data.question;

        const ref = firestore.collection('users').doc(uid).collection('questions').doc(slug);
    
        const dataDBModel = {
            question,
            slug,
            uid,
            username,
            published: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0
        }

        ref.set(dataDBModel);
        toast.success('Question created!');

        router.push(`/admin/${slug}`);
        //parentCallback(slug);

    }

    return (
        <form onSubmit={handleSubmit(onQuestionCreatingSubmit)}>

            {/* <input
                value={question}
                
                placeholder="Add New Question!"
                className={styles.input}
            /> */}

            <input name="question" 
                 
                {...register("question",
                    {
                        required: true,
                        maxLength: 250,
                        minLength: 7,
                        validate: isQuestionNotDuplicated
                    }

            )}
                placeholder="Add New Question!"
                className={styles.input}
                disabled={formState.isSubmitting}
                ></input>

            <span style={{color:'red'}}>
            {errors.question?.type === 'required' && "Question is required"}
            {errors.question?.type === 'maxLength' && "Question is too long"}
            {errors.question?.type === 'minLength' && "Question is too short"}
            {errors.question?.type === 'validate' && "Such question is already exist"}
            </span>

            <p>
                <strong>Slug:</strong> {slug}
            </p>

            <button type="submit" disabled={!isDirty || !isValid} className="btn-green">
                Add New Question
            </button>

        </form>
    )
}
