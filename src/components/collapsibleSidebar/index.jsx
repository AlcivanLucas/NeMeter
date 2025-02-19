import React, { useState } from 'react';
import './index.css';

const CollapsibleSideBar = ({ activeUsers }) => {

 const [isCollapsed, setIsCollapsed] = useState(true); // definoe o stado inicial do sidebar 
  
 const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className="active-users">
            Usuários online: {activeUsers.length}
      </div>

      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <button 
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {isCollapsed ? '▶' : '◀'}
        </button>
        
        <div className="sidebar-content">

          <ul className="user-list">
            {activeUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Overlay para mobile */}
      {!isCollapsed && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}
    </>
  );
};

export default CollapsibleSideBar;