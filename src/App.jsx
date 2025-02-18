import React, { useEffect, useState } from 'react';
import './App.css';

// Import da versão compat do Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Configuração do Firebase
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

function Bubble({ id, onAnimationEnd }) {
  return (
    <div className="bubble" onAnimationEnd={() => onAnimationEnd(id)}>
      🤯
    </div>
  );
}

function App() {
  const [counter, setCounter] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [username, setUsername] = useState('');

  // Efeito para o contador
  useEffect(() => {
    const counterRef = database.ref('counter');
    const listener = counterRef.on('value', (snapshot) => {
      setCounter(snapshot.val() || 0);
    });
    return () => counterRef.off('value', listener);
  }, []);

  // Efeito para usuários ativos
  useEffect(() => {
    const presenceRef = database.ref('activeUsers');
    const listener = presenceRef.on('value', (snapshot) => {
      const users = snapshot.val();
      setActiveUsers(users ? Object.values(users) : []);
    });
    return () => presenceRef.off('value', listener);
  }, []);

  const handleSubmitUsername = () => {
    if (username.trim()) {
      const presenceRef = database.ref('activeUsers');
      const userRef = presenceRef.push();
      userRef.set(username.trim());
      userRef.onDisconnect().remove();
      setShowPopup(false);
    }
  };

  const addBubble = () => {
    const id = Date.now();
    setBubbles(prev => [...prev, id]);
  };

  const removeBubble = (id) => {
    setBubbles(prev => prev.filter(b => b !== id));
  };

  const increment = () => {
    database.ref('counter').transaction((count) => (count || 0) + 1);
  };

  return (
    <div className="container">
      {/* Pop-up de username */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <input
              type="text"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitUsername()}
            />
            <button onClick={handleSubmitUsername}>Entrar</button>
          </div>
        </div>
      )}

      {/* Sidebar de usuários ativos */}
      <div className="sidebar">
        <div className="active-users">
          Usuários online: {activeUsers.length}
        </div>
        <ul className="user-list">
          {activeUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>

      {/* Conteúdo principal */}
      <h1>Contando quantidade de vezes que o Samuel fala "né"</h1>
      <div id="counter">{counter}</div>
      <div className="buttons">
        <button onClick={() => { addBubble(); increment(); }}>
          ➕ Mais um Né!🤯
        </button>
      </div>

      <div className="bubble-container">
        {bubbles.map(id => (
          <Bubble key={id} id={id} onAnimationEnd={removeBubble} />
        ))}
      </div>
    </div>
  );
}

export default App;