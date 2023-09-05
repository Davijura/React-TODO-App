import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD4m7Fi52aRAzAtX05X2_uOeEeS0Edh6Z0",
    authDomain: "todoapp-e2a17.firebaseapp.com",
    projectId: "todoapp-e2a17",
    storageBucket: "todoapp-e2a17.appspot.com",
    messagingSenderId: "591850509454",
    appId: "1:591850509454:web:0427c8daeaf1ec782425df"
};

const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore();

export { projectFirestore };