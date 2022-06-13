import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQx5WItikcHmzxL7h_Hltc06hWAMyRJdw",
  authDomain: "abp-curso.firebaseapp.com",
  databaseURL: "https://abp-curso-default-rtdb.firebaseio.com",
  projectId: "abp-curso",
  storageBucket: "abp-curso.appspot.com",
  messagingSenderId: "1009696109050",
  appId: "1:1009696109050:web:20bf8dba950b2b6b6ff443"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db, auth, storage };

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  store.dispatch('detectarUsuario', user)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import 'bootstrap/dist/js/bootstrap.js'