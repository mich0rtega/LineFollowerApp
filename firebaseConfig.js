import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDuQI492rdwwOXocQShqMTIojIJ_4A6jg4",
  authDomain: "linefollowerapp.firebaseapp.com",
  databaseURL: "https://linefollowerapp-default-rtdb.firebaseio.com",
  projectId: "linefollowerapp",
  storageBucket: "linefollowerapp.firebasestorage.app",
  messagingSenderId: "469875739327",
  appId: "1:469875739327:web:edbece3f02576fe901540a",
  measurementId: "G-69ZQVX9K9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };