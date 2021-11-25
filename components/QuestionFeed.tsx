import Link from 'next/link';
import { connectStateResults } from 'react-instantsearch-dom'

const QuestionFeed = ({ admin, searchState, searchResults }) => {

    const validQuery = searchState.query?.lenght >= 3;
    console.log('searchResults?.hits.length:',searchResults?.hits.length)
    //return questions ? questions.map((question, i) => 
    //            {/* <QuestionItem i={i} key={hit.slug} question={hit.question} admin={admin}  /> */}

    return ( 
        <>
            { searchResults?.hits.length === 0 && validQuery && (
                <p>No search results were found.</p>
            )}

            { searchResults?.hits.length > 0 && 
            
                
                searchResults.hits.map((question, i) => (
                    <QuestionItem i={i} key={question.slug} question={question} admin={admin} />
        
                )) 

    
            }
                


        </>
    );
}

function QuestionItem({ i, question, admin }) {

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
                <span className="index">#{i + 1}</span>
            </footer>

        </div>
    )
}

export default connectStateResults(QuestionFeed);