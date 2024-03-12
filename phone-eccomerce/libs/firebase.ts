// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase product that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from '@firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBAU9CQzs4lZ4KTewaHgJOGKpcb5D8ZzQU',
  authDomain: 'kingsmobile.firebaseapp.com',
  projectId: 'kingsmobile',
  storageBucket: 'kingsmobile.appspot.com',
  messagingSenderId: '687645080321',
  appId: '1:687645080321:web:652466392207b7b4b03900',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
