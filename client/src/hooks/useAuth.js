import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_HOST}/users/${authUser.email}`
          );
          setUser({ ...authUser, username: response.data.username });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return user;
};
