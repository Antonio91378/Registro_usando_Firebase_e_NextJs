import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAxqioHhOyH_nT0mK8zK8xl21C8QvAn6Jw',
  authDomain: 'autentication-next-js.firebaseapp.com',
  projectId: 'autentication-next-js',
  storageBucket: 'autentication-next-js.appspot.com',
  messagingSenderId: '901081831274',
  appId: '1:901081831274:web:ef6026bced5c00c1e47713',
}

const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

export { database }
