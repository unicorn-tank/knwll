import Link from 'next/link';
import { postToJSON } from '../lib/firebase';
import PostQuestionPage from '../pages/[username]/[slug]';

export default function PostAnswer({ question }) {
    const createdAt = typeof question?.createdAt === 'number' ? new Date(question.createdAt) : question.createdAt.toDate();

    return (
        <div className="card">

            <h1>{question?.question}</h1>

            <h2><span className="answer-title">Answer:&nbsp;</span>{question?.answer}</h2>

            <span className="text-sm author">
                Written by{' '}
                <Link href={`/${question.username}/`}>
                    <a className="text-info">@{question.username}</a>
                </Link>
                on {createdAt.toISOString()}

            </span>
  

        </div>
    )
}