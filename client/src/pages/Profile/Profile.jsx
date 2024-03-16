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
                const response = await axios.get(`http://localhost:3000/users/${authUser.email}`);
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
            const response = await axios.put(`http://localhost:3000/users/${user.email}`, {
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
        <div className="container mx-auto p-4 bg-gray-900 text-white">
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
                    <p>{username}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block">Email</label>
                <p>{user?.email}</p>
            </div>
            {isEditing ? (
                <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
            ) : (
                <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded">Edit Username</button>
            )}
        </div>
    );
};

export default Profile;
