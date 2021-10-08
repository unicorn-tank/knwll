import Link from 'next/Link';
import { postToJSON } from '../lib/firebase';
import PostQuestionPage from '../pages/[username]/[slug]';

export default function PostAnswer({ question }) {
    const createdAt = typeof question?.createdAt === 'number' ? new Date(question.createdAt) : question.createdAt.toDate();

    return (
        <div className="card">

            <h1>{question?.question}</h1>

            <span className="text-sm">

                Written by{' '}
                <Link href={`/${question.username}/`}>
                    <a className="text-info">@{question.username}</a>
                </Link>
                on {createdAt.toISOString()}

            </span>
            <h2>Answer:</h2>
             <h2>{question?.answer}</h2>

        </div>
    )
}