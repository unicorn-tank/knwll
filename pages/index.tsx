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

  const fetchQuestionsCount = () =>{
    const statRef = firestore.collection("stat").doc("questionsdata");
    statRef.get().then(doc => {
      if (doc.exists) {
        setQuestionsCount(doc.data().count);
      }
    })
  }

  useEffect(() => {
    fetchQuestionsCount();
  }, []);


 

  return (
    <main>
      <Metatags title="KNWL: Know All | Questions & Answers" description="Questions & Answers, know them almost all." />

      <div className="card card-info">
          <p>Questions & Answers (Total: {questionsCount})</p>
      </div>

      <QuestionFeed questions={questions} admin={false} />

      {!loading && !questionsEnd && <button onClick={getMoreQuestions}>Load more</button>}

      <Loader show={loading} />

      {questionsEnd && 'You have reached the end!'}

    </main>
  )
}
