import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

export const useHasVehicle = () => {
  const [hasVehicle, setHasVehicle] = useState(false);
  const user = useAuth();

  useEffect(() => {
    const fetchUserVehicles = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_HOST}/vehicles?userEmail=${user.email}`);
          setHasVehicle(response.data.length > 0);
        } catch (error) {
          console.error('Error fetching user vehicles:', error);
        }
      }
    };

    fetchUserVehicles();
  }, [user]);

  return hasVehicle;
};
