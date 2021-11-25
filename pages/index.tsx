import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from "next/router";

import { firestore, fromMillis } from '../lib/firebase';
import qs from 'qs';

import Metatags from '../components/Metatags';
import Loader from '../components/Loader';
import QuestionFeed from '../components/QuestionFeed';
import Search from '../components/search/Search';
import { findResultsState } from 'react-instantsearch-dom/server';
export { createURL, searchStateToURL, pathToSearchState  } from "../components/search";

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Configure, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY);

const updateAfter = 30;

const LIMIT = 100;
// export function _postToJSON(doc) {
//   const data = doc.data();

//   return {
//     ...data,
//     createdAt: data?.createdAt.seconds * 10000 + data?.createdAt.nanoseconds / 10000000 || 0,
//     updatedAt: data?.updatedAt._seconds * 10000 + data?.updatedAt.nanoseconds / 10000000 || 0
//   }
// }

// export async function getServerSideProps({ req, res, query, ...restProps}){
//   console.log('[SSR] get server-side props: ', req.url, query, restProps);

//   const searchState = '';
//   const resultsState = '';

//   return {
//     resultsState,
//     searchState
//   }
// }

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToURL = (location, searchState) =>
  searchState ? `${location.pathname}?${qs.stringify(searchState)}` : "";

const pathToSearchState = path =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};


export async function getInitialProps(context) {

  const { req, res, query, ...restProps } = context; 

  const searchState = pathToSearchState(restProps.asPath);
  const resultsState = await findResultsState(InstantSearch , {
    searchState,
  });

  return {
    resultsState,
    searchState,
  };
}



// export async function getServerSideProps(context) {
//   const questionsQuery = firestore
//     .collectionGroup('questions')
//     .orderBy('createdAt', 'desc')
//     .limit(LIMIT);

//   const questions = (await questionsQuery.get()).docs.map(doc => _postToJSON(doc));

//   return {
//     props: { questions }, // will be passed to the page component as props
//   }
// }




 const Home = (props) => {

  const [questions, setQuestions] = useState(props.questions);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [questionsEnd, setQuestionsEnd] = useState(false);

  const { router, page, seoProps, ...restProps } = props;

  const setStateId = useRef(null);

  const [searchState, setSearchState] = useState(
    pathToSearchState(router.asPath)
  );

  const onSearchStateChange = nextSearchState => {
    clearTimeout(10);

    setStateId.current = setTimeout(() => {
      const href = searchStateToURL(router, nextSearchState);

      props.router.push(href, href, {
        shallow: true
      });

      setSearchState(nextSearchState);
    }, updateAfter);
  };


  const getMoreQuestions = async () => {

    setLoading(true);

    const last = questions[questions.length - 1];

    const cursor = typeof last?.createdAt == 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('questions')
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newQuestions = (await query.get()).docs.map(doc => _postToJSON(doc));

    setQuestions(questions.concat(newQuestions));
    setLoading(false);

    if (newQuestions.length < LIMIT) {
      setQuestionsEnd(true);
    }
  }

  const fetchQuestionsCount = () => {
    const questionsGroup = firestore.collectionGroup('questions').get().then((docs) => {
      setQuestionsCount(docs.size);
    }
    )
  }

  useEffect(() => {
    fetchQuestionsCount();
  });

  return (
    <main>
      <Metatags title="KNWL: Know All | Questions & Answers | Smart Query, Quiz Request" description="Ask questions, check answers." />

      <InstantSearch 
        searchClient={searchClient}
        indexName="questions_answers"
        searchState={searchState}
        resultsState={restProps.resultsState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
        
        >

        <Configure hitsPerPage={restProps.hitsPerPage || 18} />

        <SearchBox 
          showLoadingIndicator={true}
        
        />

        <div className="card card-head">
          <div className="card-title">
            <h1>Questions & Answers</h1>
          </div>
          <div className="card-info">
            <h1>Total: {questionsCount}</h1>
          </div>
        </div>

        {/* <QuestionFeed questions={questions} admin={false} /> */}
        <QuestionFeed admin={false} />

      </InstantSearch>

      {!loading && !questionsEnd && <button onClick={getMoreQuestions}>Load more</button>}

      <Loader show={loading} />

      {questionsEnd && 'You have reached the end!'}

    </main>
  )
}

export default withRouter(Home);