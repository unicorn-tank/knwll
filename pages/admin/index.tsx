import AuthCheck from '../../components/AuthCheck';
import QuestionsList from './questions/questionslist';
import CreateNewQuestion from './questions/createnewquestion';

import Metatags from '../../components/Metatags';

export default function AdminPostsPage(props) {
    return (
        <main>
            <Metatags title="KNWLL: Admin Page | Know All" />
            <AuthCheck>
                <CreateNewQuestion />
                <br />
                <QuestionsList />
            </AuthCheck>
        </main>
    )
}



