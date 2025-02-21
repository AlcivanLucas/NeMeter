// import React, { useState } from 'react';
// import { Bubble } from '../bubble';
// import './index.css';

// export const MainContent = ({ counter, increment, bubbles, addBubble, removeBubble }) => {
//   return (
//     <div className="container">
//       <h1>Contando quantidade de vezes que o Samuel fala "né"</h1>
//       <div id="counter">{counter}</div>
//       <div className="buttons">
//         <button onClick={() => { addBubble(); increment(); }}>
//           ➕ Mais um Né!🤯
//         </button>
//       </div>

//       <div className="bubble-container">
//         {bubbles.map(id => (
//           <Bubble key={id} id={id} onAnimationEnd={removeBubble} />
//         ))}
//       </div>
//     </div>
//   );
// };

// components/mainContent/index.jsx
import React from 'react';
import { Bubble } from '../bubble';
import './index.css';

export const MainContent = ({ 
  roomName,
  counter, 
  increment, 
  bubbles, 
  addBubble, 
  removeBubble 
}) => {
  return (
    <div className="container">
      <h1>Contador de Nés na Sala {roomName}</h1>
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
};