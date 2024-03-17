import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CommunityCard = ({ community, isCreator }) => {
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
                    <button
                        className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Join community logic here
                        }}
                    >
                        Join
                    </button>
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
