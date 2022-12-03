import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
    apiKey: "AIzaSyCdHQkmpiytUmf0i0hb3XGq-rN9-EF5Z0c",
    authDomain: "react-crud-47f64.firebaseapp.com",
    projectId: "react-crud-47f64",
    storageBucket: "react-crud-47f64.appspot.com",
    messagingSenderId: "712795804112",
    appId: "1:712795804112:web:6b0f92c25550d8a22829d5"
});

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app)