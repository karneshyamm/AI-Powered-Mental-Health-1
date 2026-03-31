import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHm_VDBnAIzyHiMimi7cDOKmyhAVo9G-Y",
  authDomain: "ai-project-80221.firebaseapp.com",
  projectId: "ai-project-80221",
  storageBucket: "ai-project-80221.firebasestorage.app",
  messagingSenderId: "846529960743",
  appId: "1:846529960743:web:39da616b07a779218aa702",
  measurementId: "G-B8H0N2KYQ7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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
