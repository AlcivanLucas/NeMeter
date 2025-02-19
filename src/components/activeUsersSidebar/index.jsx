import React from 'react';
import './index.css';

export const ActiveUsersSidebar = ({ activeUsers }) => {
  return (
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
  );
};