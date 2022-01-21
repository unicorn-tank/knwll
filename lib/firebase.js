"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.postToJSON = exports.getUserWithUsername = exports.storage = exports.increment = exports.serverTimestamp = exports.fromMillis = exports.firestore = exports.googleAuthProvider = exports.auth = void 0;
var app_1 = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
// apiKey: process.env.REACT_APP_API_FIREBASE_KEY,
var firebaseConfig = {
    apiKey: "AIzaSyD0ol07LiGiTwkq2w1L4bSUCbsTVazTw4I",
    authDomain: "quizo-cc.firebaseapp.com",
    projectId: "quizo-cc",
    storageBucket: "quizo-cc.appspot.com",
    messagingSenderId: "364265088318",
    appId: "1:364265088318:web:1e132997d0163610c6b86f"
};
if (!app_1["default"].apps.length) {
    app_1["default"].initializeApp(firebaseConfig);
}
exports.auth = app_1["default"].auth();
exports.googleAuthProvider = new app_1["default"].auth.GoogleAuthProvider();
exports.firestore = app_1["default"].firestore();
exports.fromMillis = app_1["default"].firestore.Timestamp.fromMillis;
exports.serverTimestamp = app_1["default"].firestore.FieldValue.serverTimestamp;
exports.increment = app_1["default"].firestore.FieldValue.increment;
exports.storage = app_1["default"].storage();
function getUserWithUsername(username) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRef, query, userDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usersRef = exports.firestore.collection('users');
                    query = usersRef.where('username', '==', username).limit(1);
                    return [4 /*yield*/, query.get()];
                case 1:
                    userDoc = (_a.sent()).docs[0];
                    return [2 /*return*/, userDoc];
            }
        });
    });
}
exports.getUserWithUsername = getUserWithUsername;
function postToJSON(doc) {
    var data = doc.data();
    return __assign(__assign({}, data), { createdAt: (data === null || data === void 0 ? void 0 : data.createdAt.seconds) * 10000 + (data === null || data === void 0 ? void 0 : data.createdAt.nanoseconds) / 10000000 || 0, updatedAt: (data === null || data === void 0 ? void 0 : data.updatedAt._seconds) * 10000 + (data === null || data === void 0 ? void 0 : data.updatedAt.nanoseconds) / 10000000 || 0 });
}
exports.postToJSON = postToJSON;
