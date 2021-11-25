"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const algoliasearch_1 = require("algoliasearch");
const env = functions.config();
const client = algoliasearch_1.default(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('questions_answers');
try {
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=build-algolia-search.js.map