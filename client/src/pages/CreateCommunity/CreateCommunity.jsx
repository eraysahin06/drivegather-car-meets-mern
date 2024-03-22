import { useState } from 'react';
import axios from 'axios';
import useGetUser from '../../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';

const CreateCommunity = () => {
    const user = useGetUser();
    const [name, setName] = useState('');
    const [type, setType] = useState('Public');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user && user._id && user.username) {
            try {
                const response = await axios.post('http://localhost:3000/communities', {
                    creatorId: user._id,
                    creatorUsername: user.username,
                    name,
                    type,
                    members: [user._id] // Include the creator's ID in the members array
                });
                console.log('Community created:', response.data);
                navigate('/');
            } catch (error) {
                console.error('Error creating community:', error);
            }
        } else {
            console.error('User not found');
        }
    };
    

    return (
        <div className="flex h-screen bg-white text-black">
            <div className="flex-1 p-5">
                <h1 className="text-2xl font-bold mb-4">Create a Community</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border p-2 text-black"
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Community</button>
                </form>
            </div>
        </div>
    );
};

export default CreateCommunity;
