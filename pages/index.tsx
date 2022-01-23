import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from "next/router";
import Metatags from '@components/MainMetaTags';

import { firestore, fromMillis } from '../lib/firebase';
import qs from 'qs';

import { findResultsState } from 'react-instantsearch-dom/server';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import Search from '@components/search/Search';
import Cluster from '@layout/Cluster';

const pathToSearchState = path =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

export async function getInitialProps(context) {

  const { req, res, query, ...restProps } = context;

  const searchState = pathToSearchState(restProps.asPath);
  const resultsState = await findResultsState(InstantSearch, {
    searchState,
  });

  return {
    resultsState,
    searchState,
  };
}

const Home = (props) => {

  const [questionsEnd, setQuestionsEnd] = useState(false);

  const [questionsCount, setQuestionsCount] = useState(0);

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

      <Metatags title="KNWL: Know well | Questions & Answers | Quizzo" description="Ask question, find answer, like qizzo." />

      <Cluster justifyContent='space-between' isBorder={false}>
        <h2>Search</h2>
      </Cluster>

      <Search props={props} questionsCount={questionsCount} />

      {/* {!loading && !questionsEnd && <button onClick={getMoreQuestions}>Load more</button>} */}

      {/* <Loader show={loading} /> */}

      {questionsEnd && 'You have reached the end!'}

    </main>
  )
}

export default withRouter(Home);