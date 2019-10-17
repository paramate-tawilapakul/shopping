import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCM2mtOrcVuCrBWZx2m0OQcycFGY_5XcBM',
  authDomain: 'shopping-db-8bb26.firebaseapp.com',
  databaseURL: 'https://shopping-db-8bb26.firebaseio.com',
  projectId: 'shopping-db-8bb26',
  storageBucket: 'shopping-db-8bb26.appspot.com',
  messagingSenderId: '874750259568',
  appId: '1:874750259568:web:287054738b3100e4751fb5',
  measurementId: 'G-J5GTYLL956'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  //console.log(snapShot);

  // if false mean this user not exist and create it
  // if true do note create
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
