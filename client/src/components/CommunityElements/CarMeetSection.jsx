import PropTypes from 'prop-types';
import CreateCarMeetForm from "../CreateCarMeetForm/CreateCarMeetForm";

const CarMeetSection = ({ communityId, creatorId, fetchCommunity }) => {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Create a Car Meet</h3>
        <CreateCarMeetForm
          communityId={communityId}
          creatorId={creatorId}
          fetchCommunity={fetchCommunity}
        />
      </div>
    );
  };
  
  CarMeetSection.propTypes = {
    communityId: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    fetchCommunity: PropTypes.func.isRequired,
  };
  

  export default CarMeetSection;
  