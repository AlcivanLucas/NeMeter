import { useEffect, useState } from 'react';
import { database } from '../firebase/config';

export const useActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    const presenceRef = database.ref('activeUsers');
    const listener = presenceRef.on('value', (snapshot) => {
      const users = snapshot.val();
      setActiveUsers(users ? Object.values(users) : []);
    });
    return () => presenceRef.off('value', listener);
  }, []);

  return activeUsers;
};