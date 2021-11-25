"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionsDecrementCount = exports.questionsIncrementCount = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
exports.questionsIncrementCount = functions.firestore
    .document("users/{userId}/questions/{questionsId}")
    .onCreate(async () => {
    // const data = snapshot.data();
    const statqQuestionsRef = db.doc("stat/questionsdata");
    const statQuestionsSnap = await statqQuestionsRef.get();
    const statquestionsData = statQuestionsSnap.data();
    return statqQuestionsRef.update({
        count: (statquestionsData === null || statquestionsData === void 0 ? void 0 : statquestionsData.count) + 1,
    });
});
exports.questionsDecrementCount = functions.firestore
    .document("users/{userId}/questions/{questionsId}")
    .onDelete(async () => {
    // const data = snapshot.data();
    const statqQuestionsRef = db.doc("stat/questionsdata");
    const statQuestionsSnap = await statqQuestionsRef.get();
    const statquestionsData = statQuestionsSnap.data();
    return statqQuestionsRef.update({
        count: (statquestionsData === null || statquestionsData === void 0 ? void 0 : statquestionsData.count) - 1,
    });
});
//# sourceMappingURL=old.firestore.js.map