import { useState, useEffect } from 'react';
import axios from 'axios';
import CommunityCard from '../CommunityCard/CommunityCard';

const Communities = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const response = await axios.get('http://localhost:3000/communities');
                setCommunities(response.data);
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        };

        fetchCommunities();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4">Explore Communities</h2>
            {communities.map(community => (
                <CommunityCard key={community._id} community={community} />
            ))}
        </div>
    );
};

export default Communities;
