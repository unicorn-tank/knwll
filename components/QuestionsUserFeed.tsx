import { QuestionItem } from './QuestionItem';
import Stack from '../layout/Stack';

const QuestionsUserFeed = ({ admin, questions }) => {

    return (
    <Stack> {
        questions ? questions.map((question, i) => (
            <QuestionItem key={question.slug} i={i} question={question} admin={admin} />
        )) : ''
    }</Stack>)

}

export default QuestionsUserFeed;