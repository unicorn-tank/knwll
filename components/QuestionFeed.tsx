
import { connectStateResults } from 'react-instantsearch-dom';
import { QuestionItem } from './QuestionItem';

const QuestionFeed = ({ admin, searchState, searchResults }) => {

    const validQuery = searchState.query?.lenght >= 3;

    //return questions ? questions.map((question, i) => 
    //            {/* <QuestionItem i={i} key={hit.slug} question={hit.question} admin={admin}  /> */}

    return ( 
        <>
            { searchResults?.hits.length === 0 && validQuery && (
                <p>
                    No search results were found.
                </p>
            )}

            { searchResults?.hits.length > 0 && 
            
                        searchResults.hits.map((question, i) => (
                            <QuestionItem key={question.slug} i={i} question={question} admin={admin} />
                    ))
          

            }
                
        </>
    );
}

export default connectStateResults(QuestionFeed);