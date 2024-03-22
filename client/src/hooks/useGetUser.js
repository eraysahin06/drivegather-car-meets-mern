import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

const useGetUser = () => {
    const [userDetails, setUserDetails] = useState(null);
    const authUser = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (authUser && authUser.email) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_HOST}/users/${authUser.email}`);
                    setUserDetails(response.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserDetails();
    }, [authUser]);

    return userDetails;
};

export default useGetUser;
