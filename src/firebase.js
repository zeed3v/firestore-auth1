
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCkD7K2eZzeC24y6b6Yjqm-9On5wRCCh90",
    authDomain: "firestore-auth1-caae6.firebaseapp.com",
    projectId: "firestore-auth1-caae6",
    storageBucket: "firestore-auth1-caae6.appspot.com",
    messagingSenderId: "413952947617",
    appId: "1:413952947617:web:b9018be5649e03d47a87e0"
};

// Initialize Firebase
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()
const auth = firebase.auth()
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsuscribe = firebase.auth().onAuthStateChanged(user => {
            unsuscribe()
            resolve(user)
        }, reject)
    })
}

export {db, auth, marcaTiempo, firebase}
