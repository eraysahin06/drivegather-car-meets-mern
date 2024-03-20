import PropTypes from 'prop-types';
import AttendeeMemberCard from '../AttendeeMemberCard/AttendeeMemberCard'

const PendingJoinRequests = ({ pendingMembers, acceptJoinRequest, declineJoinRequest }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Pending Join Requests</h3>
      <div className="flex flex-col">
        {pendingMembers.map((pendingMemberId) => (
          <div
            key={pendingMemberId}
            className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md"
          >
            <AttendeeMemberCard memberId={pendingMemberId} />
            <div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mr-2"
                onClick={() => acceptJoinRequest(pendingMemberId)}
              >
                Accept
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                onClick={() => declineJoinRequest(pendingMemberId)}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PendingJoinRequests.propTypes = {
    pendingMembers: PropTypes.arrayOf(PropTypes.string).isRequired,
    acceptJoinRequest: PropTypes.func.isRequired,
    declineJoinRequest: PropTypes.func.isRequired,
  };

export default PendingJoinRequests;
