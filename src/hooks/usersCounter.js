import { useEffect, useState } from 'react';
import { database } from '../firebase/config';

export const useCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const counterRef = database.ref('counter');
    const listener = counterRef.on('value', (snapshot) => {
      setCounter(snapshot.val() || 0);
    });
    return () => counterRef.off('value', listener);
  }, []);

  const increment = () => {
    database.ref('counter').transaction((count) => (count || 0) + 1);
  };

  return { counter, increment };
};