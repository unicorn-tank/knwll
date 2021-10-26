import Link from "next/link";

export default function QuestionFeed({ questions, admin }) {
    return questions ? questions.map((question, i) => 
        <QuestionItem i={i} question={question} admin={admin} key={question.slug} />
    ) : <>Wait...</>;
}

function QuestionItem({ i, question, admin }) {

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
                <span className="heart">💛 {question.heartCount}</span>
                <span className="index">{i + 1}</span>
            </footer>

        </div>
    )
}