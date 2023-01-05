import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMORS3pEXSWPET_mAvc05AiCiVqrdbji4",
  authDomain: "jobbox-d2e92.firebaseapp.com",
  projectId: "jobbox-d2e92",
  storageBucket: "jobbox-d2e92.appspot.com",
  messagingSenderId: "747859460153",
  appId: "1:747859460153:web:fbdca27bc851ca8b3fcde8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
