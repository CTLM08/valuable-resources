/* eslint-disable no-param-reassign */
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAKbG4XqnqS2Gn7TjBuqV9v1GIREaCWrH4',
  authDomain: 'valuable-resources-mrga.firebaseapp.com',
  projectId: 'valuable-resources-mrga',
  storageBucket: 'valuable-resources-mrga.appspot.com',
  messagingSenderId: '921088994041',
  appId: '1:921088994041:web:9bb9cd3a30d3974993d028',
  measurementId: 'G-YXNKW1YT3M',
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = firebase.firestore(app);
export const uploadPost = async (name, url, image, type) => {
  url = `https://${url.split('://')[1] ?? url}`;
  if (image && image.startsWith('/')) {
    image = url + image;
  }

  await addDoc(collection(firestore, 'posts'), {
    name,
    url,
    image,
    type,
  });
};

export const addTypeInDB = async (type) => {
  await addDoc(collection(firestore, 'type'), {
    typeName: type,
  });
};

// (async () => {
//   const typesRef = await collection(firestore, 'posts');
//   const docs = await getDocs(typesRef);
//   docs.forEach((doc) => {
//     deleteDoc(doc.ref);
//   });
// })();
