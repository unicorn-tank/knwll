"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unindexQuestionsAnswers = exports.indexQuestionsAnswers = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch_1 = require("algoliasearch");
admin.initializeApp();
const env = functions.config();
const client = algoliasearch_1.default(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('questions_answers');
exports.indexQuestionsAnswers = functions.firestore
    .document('users/{userId}/questions/{questionsId}')
    .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    // Add the data to the algolia index
    return index.saveObject(Object.assign({ objectID }, data));
});
exports.unindexQuestionsAnswers = functions.firestore
    .document('users/{userId}/questions/{questionsId}')
    .onDelete((snap, context) => {
    const objectID = snap.id;
    return index.deleteObject(objectID);
});
//# sourceMappingURL=algolia.js.map