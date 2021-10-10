import Link from "next/link";

export default function QuestionFeed({ questions, admin }) {
    return questions ? questions.map((question) => 
        <QuestionItem question={question} admin={admin} key={question.slug} />
    ) : <>Wait...</>;
}

function QuestionItem({ question, admin }) {

    //const wordCount = post?.question;

    return (
        <div className="card">
            
            <Link href={`/${question.username}`}>
                <a>
                    <span>By @{question.username}</span>
                </a>
            </Link>

            <Link href={`/${question.username}/${question.slug}`}>
                <h2>
                    <a>
                        {question.question}
                    </a>
                </h2>
            </Link>

            <footer>
                <span>💛 {question.heartCount}</span>
            </footer>

        </div>
    )
}