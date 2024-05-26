/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArGvRnfgZcyOjz7ynubWGEixWGyF8cja4",
  authDomain: "practice-task-e8dff.firebaseapp.com",
  projectId: "practice-task-e8dff",
  storageBucket: "practice-task-e8dff.appspot.com",
  messagingSenderId: "382794074956",
  appId: "1:382794074956:web:b8ba38b7a265da258d1de9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
