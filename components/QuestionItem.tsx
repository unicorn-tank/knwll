import Link from 'next/link';
import Cluster from '../layout/Cluster';
import Box from '../layout/Box';

export const QuestionItem = ({ question, admin, i }) => {

    return (

        <Box isBorder={false}>
            
        <Cluster justifyContent='space-between' isBorder={false}>
         
        <span>#{i}</span>
                <Link href={`/${question.username}/${question.slug}`}>
                 
                        <h3><a>{question.question}</a></h3>
                
                </Link>

                <span>{question.heartCount} &#9825;</span>
                
  
           
        </Cluster>
        </Box>
    )
}

