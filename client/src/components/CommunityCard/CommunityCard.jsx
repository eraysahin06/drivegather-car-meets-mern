import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';

const CommunityCard = ({ community, isCreator }) => {
    return (
        <div className="bg-gray-800 rounded-md p-4 mb-4">
            <h3 className="text-xl font-bold">{isCreator && <FaUser className='p-1' title="Created by you" />}{community.name} </h3>
            <p>Type: {community.type}</p>
            <p>Creator: {community.creatorUsername}</p>
            <p>Members: {community.memberCount}</p>
        </div>
    );
};

CommunityCard.propTypes = {
    community: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        creatorUsername: PropTypes.string.isRequired,
        memberCount: PropTypes.number.isRequired
    }).isRequired,
    isCreator: PropTypes.bool.isRequired
};

export default CommunityCard;
