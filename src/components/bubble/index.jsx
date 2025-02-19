import React from 'react';
import './index.css';

export const Bubble = ({ id, onAnimationEnd }) => {
  return (
    <div className="bubble" onAnimationEnd={() => onAnimationEnd(id)}>
      🤯
    </div>
  );
};
