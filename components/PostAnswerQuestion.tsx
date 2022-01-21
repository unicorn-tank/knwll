import Link from 'next/link';
import { postToJSON } from '../lib/firebase';
import AuthCheck from './AuthCheck';
import HeartButton from './HeartButton';
import PostQuestionPage from '../pages/[username]/[slug]';
import Stack from '../layout/Stack';
import Cluster from '../layout/Cluster';

export default function PostAnswerQuestion({ question, questionRef }) {
    const createdAt = typeof question?.createdAt === 'number' ? new Date(question.createdAt) : question.createdAt.toDate();

    return (
        <Stack>

            <h1>{question?.question}</h1>

            <h2><span className="answer-title">Answer:&nbsp;</span>{question?.answer}</h2>



            <Cluster justifyContent='flex-end' isBorder={false}>
                <p><strong>&#9825; {question.heartCount || 0}</strong></p>

                <AuthCheck fallback={
                        <Link href="/login">
                            <button>&#9829; Sign Up</button>
                        </Link>
                    }>
                    <HeartButton questionRef={questionRef} />
                </AuthCheck>

            </Cluster>

            <Cluster justifyContent='flex-end' isBorder={false}>
                Placed here by{' '}
                <Link href={`/${question.username}/`}>
                    <a>@{question.username}</a>
                </Link>
                <div>on {createdAt.toLocaleString()}</div>
            </Cluster>
  

        </Stack>
    )
}