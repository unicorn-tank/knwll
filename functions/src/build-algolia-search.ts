import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';
import { firestore } from '../../lib/firebase';

//admin.initializeApp();
//const env = functions.config();

const client = algoliasearch("15PIEYPQ1C", "988caef458c1952ac4ec8c225da9e351");
const index = client.initIndex('questions_answers');

async function getAllQuestionsAnswers() {
    const questionsQuery = firestore
    .collectionGroup('questions')
    .orderBy('createdAt', 'desc');
    //.limit(5);

    const questions = (await questionsQuery.get()).docs.map(doc => {
        const objectID = doc.id;
        return {
            objectID, 
            ...doc.data()
            
        }
    }); 

    return questions;
}

(async function() {
try {

    const objectsToSaveInAlgolia = {};
    const questions = await getAllQuestionsAnswers();
    const algoliaResponse = await index.saveObjects(questions)
    console.log(`Algolia objects successfully added: ${algoliaResponse.objectIDs.length}.`);
    //console.log(`Successfully retrieved ${questions.length} questions.`)
    //console.log(`Successfully retrieved ${JSON.stringify(questions)} questions.`)
} catch(error) {
    console.log(error);
}
})()