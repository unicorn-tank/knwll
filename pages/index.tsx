import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from "next/router";
import Metatags from '@components/MetaTags';

import { firestore, fromMillis } from '../lib/firebase';
import qs from 'qs';

import { findResultsState } from 'react-instantsearch-dom/server';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import Search from '@components/search/Search';
import { QuestionItem } from '@components/QuestionItem';
import Cluster from '@layout/Cluster';
import Stack from '@layout/Stack';

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
  const [lastQuestions, setLastQuestions] = useState([]);

  const fetchQuestionsCount = () => {
    const questionsGroup = firestore.collectionGroup('questions').get().then((docs) => {
      setQuestionsCount(docs.size);
    }
    )
  }

  const fetchLastQuestions = (limitNumber) => {
    const result = firestore.collectionGroup('questions')
      .orderBy('createdAt', 'desc').limit(limitNumber).get().then((querySnapshot) => {
        const data = querySnapshot?.docs.map((doc) => doc.data());
        setLastQuestions(data);
    }
    )
  }

  useEffect(() => {
    fetchQuestionsCount();
    fetchLastQuestions(2);
  });

  return (

    <main>

      <Metatags title="KNWLL: Know Well, Know All | Questions & Answers | Quizzo" description="Ask question, find answer, be qizzo wizzard and know well, know all. KNWLL project" />

        <Stack>
                
                <Cluster justifyContent='space-between' isBorder={false}>
                    <h2>Recent Questions & Answers</h2>
                </Cluster>

                {
                    lastQuestions.map((question, i) => (

                        <QuestionItem key={i} i={i} question={question} admin={false} />


                    ))
                }
            
        </Stack>

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