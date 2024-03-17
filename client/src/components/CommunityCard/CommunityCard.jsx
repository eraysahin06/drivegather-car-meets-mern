import PropTypes from 'prop-types';
import { FaUser, FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useGetUser from '../../hooks/useGetUser';
import axios from 'axios';

const CommunityCard = ({ community, isCreator }) => {
    const user = useGetUser();
    const navigate = useNavigate();

    const joinCommunity = async () => {
        try {
            await axios.put(`http://localhost:3000/communities/${community._id}/join`, {
                userId: user._id
            });
            navigate(`/community-page/${community._id}`)
        } catch (error) {
            console.error('Error joining community:', error);
        }
    };

    const isJoined = user && user.communities && user.communities.map(community => community.toString()).includes(community._id);

    return (
        <Link to={`/community-page/${community._id}`} className="block">
            <div className="bg-gray-800 rounded-md p-4 mb-4 relative">
                <h3 className="text-xl font-bold">
                    {isCreator && <FaUser className='p-1' title="Created by you" />}
                    {community.name}
                </h3>
                <p>Type: {community.type}</p>
                <p>Creator: {community.creatorUsername}</p>
                <p>Members: {community.memberCount}</p>
                {!isCreator && (
                    isJoined ? (
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded flex items-center">
                            <FaCheck className="mr-1" /> Joined
                        </div>
                    ) : (
                        <button
                            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                joinCommunity();
                            }}
                        >
                            Join
                        </button>
                    )
                )}
            </div>
        </Link>
    );
};

CommunityCard.propTypes = {
    community: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        creatorUsername: PropTypes.string.isRequired,
        memberCount: PropTypes.number.isRequired
    }).isRequired,
    isCreator: PropTypes.bool.isRequired
};

export default CommunityCard;
