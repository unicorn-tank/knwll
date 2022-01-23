import Link from 'next/link';
import Box from '@layout/Box';
import Cluster from '@layout/Cluster';

export const QuestionItem = ({ question, admin, i }) => {

    return (

        <Box isBorder={false}>
            
        <Cluster justifyContent='space-between' isBorder={false}>
         
        <span>#{i}</span>
                <Link href={`/${question.username}/${question.slug}`}>
                 
                        <h3><a>{question.question}</a></h3>
                
                </Link>

                <span>&#9825;<sup><small>{question.heartCount}</small></sup></span>
                
        </Cluster>
        </Box>
    )
}

