import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import Metatags from '../components/Metatags';

import Loader from '../components/Loader';
import QuestionFeed from '../components/QuestionFeed';

const LIMIT = 10;

export async function getServerSideProps(context) {
  const questionsQuery = firestore
        .collectionGroup('questions')
        //.where('published', '==', false)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT);

  const questions = (await questionsQuery.get()).docs.map(postToJSON);

  return {
    props: { questions }, // will be passed to the page component as props
  }
}

export default function Home(props) {

  const [questions, setQuestions] = useState(props.questions);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [questionsEnd, setQuestionsEnd] = useState(false);

  const getMoreQuestions = async() => {
    setLoading(true);
    
    const last = questions[questions.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore 
        .collectionGroup('questions')
        .where('published', '==', false)
        .orderBy('createdAt', 'desc')
        .startAfter(cursor)
        .limit(LIMIT);

    const newQuestions = (await query.get()).docs.map((doc) => doc.data());

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
  }, []);
 

  return (
    <main>
      <Metatags title="KNWL: Know All | Questions & Answers | Smart Query, Quiz Request" description="Ask, query or inquire Questions & Answers pair like quiz request." />

      <div className="card card-head">
        <div className="card-title">
          <h1>Questions & Answers</h1>
        </div>
        <div className="card-info">
          <h1>Total: {questionsCount}</h1>
        </div>
      </div>

      <QuestionFeed questions={questions} admin={false} />

      {!loading && !questionsEnd && <button onClick={getMoreQuestions}>Load more</button>}

      <Loader show={loading} />

      {questionsEnd && 'You have reached the end!'}

    </main>
  )
}
