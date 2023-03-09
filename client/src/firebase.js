import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDh6hu45nwAdeA5_usrJvX86D9-jBB-M4U",
    authDomain: "students-teachers-1257c.firebaseapp.com",
    projectId: "students-teachers-1257c",
    storageBucket: "students-teachers-1257c.appspot.com",
    messagingSenderId: "861155707674",
    appId: "1:861155707674:web:941d7541b81c01503c3aa3",
    measurementId: "G-JL0ME6QL6V"
  };
//   configs should be used in .env file

  const app = initializeApp(firebaseConfig);
  export  const  db = getFirestore(app);

