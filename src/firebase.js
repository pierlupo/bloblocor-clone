// import firebase from "firebase";
//import firebase from "firebase/compat/app";
import { initializeApp, getApps } from "firebase/app";
//import 'firebase/database'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// const firebaseConfig = firebase.initializeApp({
//   //apiKey:`${process.env.REACT_APP_FIREBASE_API_KEY}`,
//   apiKey: "AIzaSyA6H7Umx4PLVWPPzevyG3HU82Z9RrIlHeo",
//   authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
//   // databaseURL:`${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
//   databaseURL: "https://bloblocor-f56ab-default-rtdb.firebaseio.com/",
//   projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
//   storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.REACT_APP_FIREABSE_MESSAGING_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
// });

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// // const app = !firebase.apps.length  ? firebase.initializeApp(firebaseConfig)  : firebase.app();
// const realTimeDb = getDatabase(app);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);

//  let firebaseAuth;

    let firebaseConfig = {
      //apiKey:`${process.env.REACT_APP_FIREBASE_API_KEY}`,
      apiKey: "AIzaSyA6H7Umx4PLVWPPzevyG3HU82Z9RrIlHeo",
      authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
      // databaseURL:`${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
      databaseURL: "https://bloblocor-f56ab-default-rtdb.firebaseio.com/",
      projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
      storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
      messagingSenderId: `${process.env.REACT_APP_FIREABSE_MESSAGING_SENDER_ID}`,
      appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
    };
   
    /*
    firebaseAuth = initializeAuth(firebaseApp, {
      persistence: browserSessionPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    });
    */
   
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const realTimeDb = getDatabase(app);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const storage = getStorage(app);
    // const app = !firebase.apps.length  ? firebase.initializeApp(firebaseConfig)  : firebase.app();
   
    //firebaseAuth = getAuth();
    
    // onAuthStateChanged(firebaseAuth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     console.log("User is signed in");

    //   } else {
    //     // User is signed out
    //     console.log("User is signed out");
    //   }
    // });



  export { auth, db, storage, realTimeDb };
