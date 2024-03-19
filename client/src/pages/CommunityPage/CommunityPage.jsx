import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import CreateCarMeetForm from "../../components/CreateCarMeetForm/CreateCarMeetForm";
import { useCallback } from "react";
import CarMeets from "../../components/CarMeets/CarMeets";
import AttendeeMemberCard from "../../components/AttendeeMemberCard/AttendeeMemberCard";

const CommunityPage = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useGetUser();

  const fetchCommunity = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/communities/${id}`
      );
      setCommunity(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCommunity();
  }, [fetchCommunity]);

  const acceptJoinRequest = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/communities/${id}/accept`,
        { userId }
      );
      setCommunity(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting join request:", error);
    }
  };

  const declineJoinRequest = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/communities/${id}/decline`,
        { userId }
      );
      setCommunity(response.data);
    } catch (error) {
      console.error("Error declining join request:", error);
    }
  };

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
    <div className="bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-semibold mb-4">{community.name}</h2>
      <p className="mb-2">Type: {community.type}</p>
      <p className="mb-2">Creator: {community.creatorUsername}</p>
      <p className="mb-2">Members: {community.memberCount}</p>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Current Members</h3>
        <div className="flex flex-col">
          {community.members.map((memberId) => (
            <AttendeeMemberCard key={memberId} memberId={memberId} />
          ))}
        </div>
      </div>

      {user && user._id === community.creatorId && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Pending Join Requests</h3>
          <div className="flex flex-col">
            {community.pendingMembers.map((pendingMemberId) => (
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
            {user && user._id === community.creatorId && (
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">
                  Create a Car Meet
                </h3>
                <CreateCarMeetForm
                  communityId={id}
                  creatorId={community.creatorId}
                  fetchCommunity={fetchCommunity}
                />
              </div>
            )}
            <CarMeets communityId={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
