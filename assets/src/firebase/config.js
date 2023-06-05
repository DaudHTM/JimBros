import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKLa7tJZ2pPNkOptH2XiK8Aw-e8sGop1k",
  authDomain: "jimbrows-b3b99.firebaseapp.com",
  projectId: "jimbrows-b3b99",
  storageBucket: "jimbrows-b3b99.appspot.com",
  messagingSenderId: "337894967581",
  appId: "1:337894967581:web:39a94f28ba5461a1f639f4",
  measurementId: "G-2ZPN64R3VB"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };