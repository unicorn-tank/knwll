import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import algoliasearch from 'algoliasearch';

admin.initializeApp();
const env = functions.config();

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('questions_answers');

export const indexQuestionsAnswers = functions.firestore
    .document('users/{userId}/questions/{questionsId}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const objectID = snap.id;

        // Add the data to the algolia index
        return index.saveObject({
            objectID,
            ...data
        });
    });

export const unindexQuestionsAnswers = functions.firestore
    .document('users/{userId}/questions/{questionsId}')
    .onDelete((snap, context) => {
        const objectID = snap.id;

        return index.deleteObject(objectID);
    })
