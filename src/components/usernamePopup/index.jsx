import React from 'react';
import './index.css';

export const UsernamePopup = ({ username, setUsername, handleSubmit, show }) => {
  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <input
          type="text"
          placeholder="Digite seu nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button onClick={handleSubmit}>Entrar</button>
      </div>
    </div>
  );
};