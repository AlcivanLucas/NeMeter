import React, { useEffect, useState } from 'react';
import './App.css';

// Import da versão compat do Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Configuração do Firebase (pode mover para variáveis de ambiente se quiser)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa o Firebase apenas uma vez
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

function App() {
  const [counter, setCounter] = useState(0);

  // Efeito para escutar mudanças do contador em tempo real
  useEffect(() => {
    const counterRef = database.ref('counter');
    const listener = counterRef.on('value', (snapshot) => {
      const value = snapshot.val() || 0;
      setCounter(value);
    });

    // Cleanup: remove o listener quando o componente desmontar
    return () => {
      counterRef.off('value', listener);
    };
  }, []);

  // Função para incrementar o contador no Firebase
  const increment = () => {
    const counterRef = database.ref('counter');
    counterRef.transaction((currentCount) => {
      return (currentCount || 0) + 1;
    });
  };

  return (
    <div className="container">
      <h1>Contando quantidade de vezes o Samuel fala "né"</h1>
      <div id="counter">{counter}</div>
      <div className="buttons">
        <button onClick={increment}>➕ Mais um Né!🤯</button>
      </div>
    </div>
  );
}

export default App;
