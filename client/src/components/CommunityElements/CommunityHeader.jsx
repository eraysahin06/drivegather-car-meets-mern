import PropTypes from 'prop-types';


const CommunityHeader = ({ community }) => {
    return (
      <div>
        <h2 className="text-3xl font-semibold mb-4">{community.name}</h2>
        <p className="mb-2">Type: {community.type}</p>
        <p className="mb-2">Creator: {community.creatorUsername}</p>
      </div>
    );
  };
  
  CommunityHeader.propTypes = {
    community: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      creatorUsername: PropTypes.string.isRequired,
    }).isRequired,
  };
  

  export default CommunityHeader;
  