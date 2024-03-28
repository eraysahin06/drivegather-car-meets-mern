import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import { useCallback } from "react";
import CarMeets from "../../components/CarMeets/CarMeets";
import CommunityHeader from "../../components/CommunityElements/CommunityHeader";
import JoinLeaveButtons from "../../components/CommunityElements/JoinLeaveButtons";
import MemberList from "../../components/CommunityElements/MemberList";
import PendingJoinRequests from "../../components/CommunityElements/PendingJoinRequests";
import CarMeetSection from "../../components/CommunityElements/CarMeetSection";

const CommunityPage = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useGetUser();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();


  const [showForm, setShowForm] = useState(false);

  const fetchCommunity = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/communities/${id}`
      );
      setCommunity(response.data);
      setIsPending(response.data.pendingMembers.includes(user?._id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id, user?._id]);

  useEffect(() => {
    fetchCommunity();
  }, [fetchCommunity]);

  const joinCommunity = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_HOST}/communities/${id}/join`, {
        userId: user._id,
      });
      setIsPending(true);
      fetchCommunity(); // Refresh the community data to update the members list
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  const cancelJoinRequest = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_HOST}/communities/${id}/cancel`, {
        userId: user._id,
      });
      setIsPending(false);
      fetchCommunity(); // Refresh the community data to update the members list
    } catch (error) {
      console.error("Error cancelling join request:", error);
    }
  };

  const leaveCommunity = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_HOST}/communities/${id}/leave`, {
        userId: user._id,
      });
      fetchCommunity(); // Refresh the community data to update the members list
    } catch (error) {
      console.error("Error leaving community:", error);
    }
  };

  const acceptJoinRequest = async (userId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_HOST}/communities/${id}/accept`,
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
        `${import.meta.env.VITE_HOST}/communities/${id}/decline`,
        { userId }
      );
      setCommunity(response.data);
    } catch (error) {
      console.error("Error declining join request:", error);
    }
  };

  const deleteCommunity = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this community?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_HOST}/communities/${id}`);
        navigate("/");
      } catch (error) {
        console.error("Error deleting community:", error);
      }
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

  const isMember = community.members.some((memberId) => memberId === user?._id);

  return (
    <div className="bg-white text-black p-8">
      <div className="mb-4">
        <CommunityHeader community={community} />
      </div>
      <div className="mb-4">
        <JoinLeaveButtons
          isMember={isMember}
          isPending={isPending}
          joinCommunity={joinCommunity}
          cancelJoinRequest={cancelJoinRequest}
          leaveCommunity={leaveCommunity}
          communityType={community.type}
          userId={user?._id || ''}
          creatorId={community.creatorId}
        />
      </div>
      <div className="mb-4">
        {user && user._id === community.creatorId && (
          <div className="mb-4">
            <PendingJoinRequests
              pendingMembers={community.pendingMembers}
              acceptJoinRequest={acceptJoinRequest}
              declineJoinRequest={declineJoinRequest}
            />
          </div>
        )}
        <MemberList members={community.members} />
      </div>
      {user ? (
        <div className="mb-4">
          <CarMeets
            communityId={id}
            communityType={community.type}
            isMember={isMember}
            creatorId={community.creatorId}
            user={user}
          />
        </div>
      ) : (
        <h5 className="text-lg">Log in to see car meets</h5>
      )}

      {user && user._id === community.creatorId && (
        <div>
          <button
            className="bg-gray-800 hover:bg-white hover:text-gray-800 border-2 border-gray-800 text-white font-bold py-6 px-4 rounded"
            onClick={() => setShowForm(true)}
          >
            Create a Car Meet
          </button>

          {showForm && (
            <>
              <div className="mb-4">
                <CarMeetSection
                  communityId={id}
                  creatorId={community.creatorId}
                  fetchCommunity={fetchCommunity}
                />
              </div>
             
            </>
          )}
           <div className="my-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                  onClick={deleteCommunity}
                >
                  Delete Community
                </button>
              </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
