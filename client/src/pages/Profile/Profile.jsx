import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
    const authUser = useAuth();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_HOST}/users/${authUser.email}`);
                setUser(response.data);
                setUsername(response.data.username || '');
            } catch (error) {
                console.error('Error fetching user details:', error);
                setErrorMessage('Failed to fetch user details');
            }
        };

        if (authUser) {
            fetchUserDetails();
        }
    }, [authUser]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_HOST}/users/${user.email}`, {
                username
            });
            if (response.data) {
                setUser(response.data);
                setUsername(response.data.username);
            }
            setIsEditing(false);
        } catch (error) {
            setErrorMessage('Error updating profile');
        }
    };

    return (
        <div className="flex h-screen bg-white text-black">
            <div className="flex-1 p-5">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <div className="mb-4">
                    <label className="block">Username</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border p-2 text-black"
                        />
                    ) : (
                        <p className="text-lg">{username}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block">Email</label>
                    <p className="text-lg">{user?.email}</p>
                </div>
                {isEditing ? (
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                ) : (
                    <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Username</button>
                )}
            </div>
        </div>
    );
};

export default Profile;
