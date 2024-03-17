import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CommunityPage = () => {
    const { id } = useParams();
    const [community, setCommunity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommunity = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/communities/${id}`);
                const communityData = response.data;

                // Fetch creator's details
                const creatorResponse = await axios.get(`http://localhost:3000/users/id/${communityData.creatorId}`);
                const creatorData = creatorResponse.data;

                // Add creator to the members array
                communityData.members = [creatorData, ...communityData.members];
                setCommunity(communityData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunity();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching community: {error.message}</div>;
    }

    if (!community) {
        return <div>Community not found</div>;
    }

    return (
        <div className="flex flex-col p-8 bg-gray-900 text-white h-screen">
            <h2 className="text-3xl font-semibold mb-4">{community.name}</h2>
            <p className="mb-2">Type: {community.type}</p>
            <p className="mb-2">Creator: {community.creatorUsername}</p>
            <p className="mb-2">Members:</p>
            <ul>
                {community.members.map(member => (
                    <li key={member._id} className="flex items-center mb-2">
                        <img src={member.photoURL} alt={member.username} className="w-10 h-10 rounded-full inline-block mr-2" />
                        <span>{member.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommunityPage;
