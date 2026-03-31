import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Connection Test
import { getDocFromServer, doc } from 'firebase/firestore';
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection successful");
  } catch (error: any) {
    if (error.message?.includes('the client is offline') || error.message?.includes('configuration-not-found')) {
      console.error("Firebase Configuration Error: Please ensure Authentication and Firestore are enabled in your Firebase Console.");
    }
  }
}
testConnection();

export default app;
