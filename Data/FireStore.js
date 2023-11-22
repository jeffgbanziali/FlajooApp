import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as fs from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Fonction générique d'upload
const uploadToFirebase = async (localUri, storagePath) => {
    const storage = getStorage();
    const storageRef = ref(storage, storagePath);

    // Convertit le fichier en blob
    const response = await fetch(localUri);
    const blob = await response.blob();

    // Télécharge le blob vers Firebase Storage
    await uploadBytes(storageRef, blob);

    // Récupère l'URL de téléchargement
    const fileUrl = await getDownloadURL(storageRef);

    return fileUrl;
};

// Fonctions spécifiques d'upload
const uploadImageToFirebase = (localUri, imageName) => uploadToFirebase(localUri, `PostImages/${imageName}`);
const uploadMediaToFirebase = (localUri, imageName) => uploadToFirebase(localUri, `PostImages/${imageName}`);
const uploadProfileToFirebase = (localUri, imageName) => uploadToFirebase(localUri, `ProfileImage/${imageName}`);
const uploadStoryToFirebase = (localUri, imageName) => uploadToFirebase(localUri, `StoryContainer/${imageName}`);
const uploadRéelsToFirebase = (localUri, fileName) => uploadToFirebase(localUri, `VideoRéelsContainer/${fileName}`);

export { uploadImageToFirebase, uploadMediaToFirebase, uploadStoryToFirebase, uploadProfileToFirebase, uploadRéelsToFirebase };

// Fonction pour convertir une image en ArrayBuffer
const convertImageToArrayBuffer = async (localUri) => {
    try {
        const { uri } = await fs.downloadAsync(localUri, fs.DocumentDirectoryPath + 'image.jpg');

        // Lit le fichier image en tant qu'ArrayBuffer
        const arrayBuffer = await fs.readAsStringAsync(uri, { encoding: fs.EncodingType.Base64 });

        // Convertit la chaîne Base64 en Uint8Array
        const buffer = new Uint8Array(arrayBuffer.length);
        for (let i = 0; i < arrayBuffer.length; i++) {
            buffer[i] = arrayBuffer.charCodeAt(i);
        }

        return buffer;
    } catch (error) {
        throw new Error(`Erreur lors de la conversion de l'image en ArrayBuffer : ${error.message}`);
    }
};

export { convertImageToArrayBuffer };

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBrghzEzaaI_HgZbnRzKUlaHGNKizVF2aU",
    authDomain: "myflajooapp-15652.firebaseapp.com",
    projectId: "myflajooapp-15652",
    storageBucket: "myflajooapp-15652.appspot.com",
    messagingSenderId: "210714148369",
    appId: "1:210714148369:web:c2ab1fb38a1bbe53de7bb0",
    measurementId: "G-ZLPG5SHLYZ"
};

// Initialisez l'application Firebase
const app = initializeApp(firebaseConfig);

// Initialisez Firebase Auth avec la persistence AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Obtenez des références vers les services dont vous avez besoin
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
