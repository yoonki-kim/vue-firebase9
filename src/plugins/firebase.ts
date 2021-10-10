import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCboYGDyrAIf1UjzHhHTkTSOHx6LUTclxI',
  authDomain: 'test-firebase9-2083b.firebaseapp.com',
  projectId: 'test-firebase9-2083b',
  storageBucket: 'test-firebase9-2083b.appspot.com',
  messagingSenderId: '127607491262',
  appId: '1:127607491262:web:a197bd91f58b8d6aa7acef'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
connectAuthEmulator(auth, 'http://localhost:9099')
auth.languageCode = 'ko'
