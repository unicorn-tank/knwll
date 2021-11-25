import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const questionsIncrementCount = functions.firestore
    .document("users/{userId}/questions/{questionsId}")
    .onCreate(async () => {
        // const data = snapshot.data();
        const statqQuestionsRef = db.doc("stat/questionsdata");
        const statQuestionsSnap = await statqQuestionsRef.get();
        const statquestionsData = statQuestionsSnap.data();

        return statqQuestionsRef.update({
            count: statquestionsData?.count + 1,
        });
});

export const questionsDecrementCount = functions.firestore
    .document("users/{userId}/questions/{questionsId}")
    .onDelete(async () => {
        // const data = snapshot.data();
        const statqQuestionsRef = db.doc("stat/questionsdata");
        const statQuestionsSnap = await statqQuestionsRef.get();
        const statquestionsData = statQuestionsSnap.data();

        return statqQuestionsRef.update({
            count: statquestionsData?.count - 1,
        });
});
