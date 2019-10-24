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
  //const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get();
  //const collectionSnapshot = await collectionRef.get();
  //console.log(collectionSnapshot);
  // docs: Array, how many doc from users collection
  // empty: Boolean, users collection empty or not
  // size: Int, how many doc in users collection

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  await collectionRef.get();

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  // console.log(objectsToAdd);
  // batch
  //   .commit()
  //   .then(function() {
  //     console.log('Done.');
  //   })
  //   .catch(err => console.log(`There was an error: ${err}`));
  // const res = await batch.commit();
  // console.log(res);

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  //console.log(transformedCollections);
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
