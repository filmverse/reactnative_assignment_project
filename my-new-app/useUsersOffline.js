import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const USERS_KEY = 'users_cache';

export function useUsersOffline() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const netState = await NetInfo.fetch();
      if (netState.isConnected) {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const json = await response.json();
          setUsers(json);
          await AsyncStorage.setItem(USERS_KEY, JSON.stringify(json));
        } catch (error) {
          const cached = await AsyncStorage.getItem(USERS_KEY);
          if (cached) setUsers(JSON.parse(cached));
        }
      } else {
        const cached = await AsyncStorage.getItem(USERS_KEY);
        if (cached) setUsers(JSON.parse(cached));
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return { users, loading };
}
