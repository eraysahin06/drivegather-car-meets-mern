import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import CommunityCard from '../../components/CommunityCard/CommunityCard';
import useGetUser from '../../hooks/useGetUser';

const ExploreCommunities = () => {
    const user = useGetUser();
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

    const userCommunities = communities.filter((community) => community.creatorId === user?._id);
    const otherCommunities = communities.filter((community) => community.creatorId !== user?._id);

    return (
        <div className='p-8'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold">Explore Communities</h2>
                <Link to="/create-community" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md">
                    <FaPlus size={24} />
                </Link>
            </div>
            {userCommunities.length > 0 ? (
                <>
                    <h3 className="text-2xl font-semibold mb-4">Your Communities</h3>
                    {userCommunities.map((community) => (
                        <CommunityCard key={community._id} community={community} isCreator={true} />
                    ))}
                </>
            ) : (
                <div className="text-center">
                    <Link to="/explore-communities" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Join a Community
                    </Link>
                </div>
            )}
            <h3 className="text-2xl font-semibold mb-4">Other Communities</h3>
            {otherCommunities.map((community) => (
                <CommunityCard key={community._id} community={community} isCreator={false} />
            ))}
        </div>
    );
};

export default ExploreCommunities;
