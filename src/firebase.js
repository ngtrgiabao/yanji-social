import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCh48hTF9qr31QZXsOK5aHS_KUraLvOJuw",
    authDomain: "webapp-e9b03.firebaseapp.com",
    databaseURL:
        "https://webapp-e9b03-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webapp-e9b03",
    storageBucket: "webapp-e9b03.appspot.com",
    messagingSenderId: "739953845694",
    appId: "1:739953845694:web:eda849a46054cf3810c5ef",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
