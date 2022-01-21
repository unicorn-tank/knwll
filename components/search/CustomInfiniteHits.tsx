import { useRef, useEffect } from 'react';
import { InfiniteScroll } from 'react-infinite-scroller';

import { connectInfiniteHits } from 'react-instantsearch-dom';
import { QuestionItem } from '../QuestionItem';
import CustomSearchBox from '../../components/Search/CustomSearchBox';
//import QuestionFeed from '../QuestionFeed';
import Stack from '../../layout/Stack';
import Cluster from '../../layout/Cluster';

const intersectionObserverOptions = {
    root: null,
    rootMargin: "10px",
    threshold: 0.5
}

const InfiniteHits = ({ questionsCount, hits, hasPrevious, hasMore, refinePrevious, refineNext }) => {

    const sentinelRef = useRef();

    useEffect(() => {

        if (!hasMore) {
            // We don't have to create an observer when we don't
            // have more results to fetch from the API. Exit early.
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting && hasMore) {
                    refineNext();
                }
            })
        }, intersectionObserverOptions);

        observer.observe(sentinelRef.current);

        return () => {

            observer.disconnect();
        }

    });

    return (
        <Stack space="1.66em">

            <CustomSearchBox />

            <Stack>
                
                <Cluster justifyContent='space-between' isBorder={false}>
                    <h2>Questions & Answers</h2>
                    <div>Total: {questionsCount}</div>
                </Cluster>

                {
                    hits.map((question, i) => (

                        <QuestionItem key={i} i={i} question={question} admin={false} />


                    ))
                }
            </Stack>

            <div ref={sentinelRef}></div>

            {/* <QuestionFeed admin={false} /> */}

        </Stack>
    )

}

export const CustomInfiniteHits = connectInfiniteHits(InfiniteHits)