import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export const UsernamePopup = ({ username, setUsername, handleSubmit, show }) => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula um processamento (remova em produção)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    handleSubmit();
    
    // Redirecionamento baseado na sala
    if (selectedRoom === 'alpha') {
      navigate('/alpha');
    } else {
      navigate('/');
    }
    
    setIsSubmitting(false);
  };

  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup-content animate-in">
        <h2>Bem-vindo à nossa plataforma! 👋</h2>
        <p className="intro-text">Por favor, escolha uma sala e digite seu nome para começar</p>
        
        <form onSubmit={handleFormSubmit}>
          <div className="room-selector">
            <label>
              <input
                type="radio"
                name="room"
                value="alpha"
                checked={selectedRoom === 'alpha'}
                onChange={(e) => setSelectedRoom(e.target.value)}
                required
              />
              <span className="room-card alpha">
                <h3>Sala Alpha</h3>
                <p>Para o chorume dev vespertino</p>
              </span>
            </label>
            
            <label>
              <input
                type="radio"
                name="room"
                value="zeta"
                checked={selectedRoom === 'zeta'}
                onChange={(e) => setSelectedRoom(e.target.value)}
                required
              />
              <span className="room-card zeta">
                <h3>Sala Zeta</h3>
                <p>Para o chorume dev noturno</p>
              </span>
            </label>
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="spinner"></div>
            ) : (
              'Entrar na plataforma'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};