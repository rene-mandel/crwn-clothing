import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCs495-jmDgYhw4O7MHAvDX7QYSyd5GF9w',
  authDomain: 'crwn-db-292fc.firebaseapp.com',
  projectId: 'crwn-db-292fc',
  storageBucket: 'crwn-db-292fc.appspot.com',
  messagingSenderId: '274824705301',
  appId: '1:274824705301:web:afe4bb9226a9ef6fb1a51c',
  measurementId: 'G-JZS1HDE06K',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
