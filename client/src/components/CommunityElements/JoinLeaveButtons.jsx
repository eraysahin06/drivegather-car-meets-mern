import PropTypes from "prop-types";

const JoinLeaveButtons = ({
  isMember,
  isPending,
  joinCommunity,
  cancelJoinRequest,
  leaveCommunity,
  communityType,
  userId,
  creatorId,
}) => {
  return (
    <div className="mb-4">
      {!isMember && (
        <>
          {communityType === "Private" ? (
            <>
              <button
                className={`bg-green-500 hover:bg-green-600 text-white p-2 rounded ${
                  isPending
                    ? "cursor-not-allowed bg-yellow-500 hover:bg-yellow-500"
                    : ""
                }`}
                onClick={!isPending ? joinCommunity : null}
                disabled={isPending}
              >
                {isPending ? "Requested to Join" : "Request to Join"}
              </button>
              {isPending && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded ml-2"
                  onClick={cancelJoinRequest}
                >
                  Cancel Request
                </button>
              )}
            </>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              onClick={joinCommunity}
            >
              Join Community
            </button>
          )}
        </>
      )}
      {isMember && userId !== creatorId && (
        <button
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
          onClick={leaveCommunity}
        >
          Leave Community
        </button>
      )}
    </div>
  );
};

JoinLeaveButtons.propTypes = {
  isMember: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  joinCommunity: PropTypes.func.isRequired,
  cancelJoinRequest: PropTypes.func.isRequired,
  leaveCommunity: PropTypes.func.isRequired,
  communityType: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  creatorId: PropTypes.string.isRequired,
};

export default JoinLeaveButtons;
