import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCgc65SwfYZlQaPLduvTqgKsD1rpky1GH8",
    authDomain: "step-in-style-db.firebaseapp.com",
    databaseURL: "https://step-in-style-db.firebaseio.com",
    projectId: "step-in-style-db",
    storageBucket: "step-in-style-db.appspot.com",
    messagingSenderId: "310066435148",
    appId: "1:310066435148:web:e3adc71cba2018abbbd0e9",
    measurementId: "G-WV6CQXVDQ1"
  };

export const createUserProfileDocument = async (userAuth, otherAditionalData) => {
  if(!userAuth) return;

  const userRef = await firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();

  if(!userSnapshot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...otherAditionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;