import React, { useState } from 'react';
import { useCounter } from './hooks/usersCounter';
import { useActiveUsers } from './hooks/useActtiveUsers';
import { UsernamePopup } from './components/usernamePopup';
import { ActiveUsersSidebar } from './components/activeUsersSidebar';
import { MainContent } from './components/mainContent';
import './App.css';
import { database } from './firebase/config'; // Importando o database de firebase/config

function App() {
  const [bubbles, setBubbles] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [username, setUsername] = useState('');
  
  const { counter, increment } = useCounter();
  const activeUsers = useActiveUsers();

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

  return (
    <>
      <UsernamePopup
        show={showPopup}
        username={username}
        setUsername={setUsername}
        handleSubmit={handleSubmitUsername}
      />

      <ActiveUsersSidebar activeUsers={activeUsers} />
      
      <MainContent
        counter={counter}
        increment={increment}
        bubbles={bubbles}
        addBubble={addBubble}
        removeBubble={removeBubble}
      />
    </>
  );
}

export default App;