// import { useEffect, useState } from 'react';
// import { database } from '../firebase/config';

// export const useCounter = () => {
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     const counterRef = database.ref('counter');
//     const listener = counterRef.on('value', (snapshot) => {
//       setCounter(snapshot.val() || 0);
//     });
//     return () => counterRef.off('value', listener);
//   }, []);

//   const increment = () => {
//     database.ref('counter').transaction((count) => (count || 0) + 1);
//   };

//   return { counter, increment };
// };

// hooks/usersCounter.js
// hooks/usersCounter.js
import { useState, useEffect } from 'react';
import { database } from '../firebase/config';

export const useCounter = (roomId = 'default') => { // Valor padrão para evitar undefined
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!roomId) return; // Proteção contra roomId inválido
    
    const counterRef = database.ref(`counters/${roomId}`);
    
    counterRef.on('value', (snapshot) => {
      setCounter(snapshot.val() || 0);
    });

    return () => counterRef.off();
  }, [roomId]); // Recria o listener quando roomId muda

  const increment = () => {
    database.ref(`counters/${roomId}`).transaction((current) => {
      return (current || 0) + 1;
    });
  };

  return { counter, increment };
};