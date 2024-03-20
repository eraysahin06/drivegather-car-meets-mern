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

  const fetchCommunity = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/communities/${id}`
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
      await axios.put(`http://localhost:3000/communities/${id}/join`, {
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
      await axios.put(`http://localhost:3000/communities/${id}/cancel`, {
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
      await axios.put(`http://localhost:3000/communities/${id}/leave`, {
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

  const deleteCommunity = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this community?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/communities/${id}`);
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
    <div className="bg-gray-900 text-white p-8">
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
          userId={user?._id}
          creatorId={community.creatorId}
        />
      </div>
      <div className="mb-4">
        <MemberList members={community.members} />
      </div>
      {user && user._id === community.creatorId && (
        <>
          <div className="mb-4">
            <PendingJoinRequests
              pendingMembers={community.pendingMembers}
              acceptJoinRequest={acceptJoinRequest}
              declineJoinRequest={declineJoinRequest}
            />
          </div>
          <div className="mb-4">
            <CarMeetSection
              communityId={id}
              creatorId={community.creatorId}
              fetchCommunity={fetchCommunity}
            />
          </div>
          <div className="mb-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
              onClick={deleteCommunity}
            >
              Delete Community
            </button>
          </div>
        </>
      )}
      <div className="mb-4">
        <CarMeets
          communityId={id}
          communityType={community.type}
          isMember={isMember}
        />
      </div>
    </div>
  );
  
};

export default CommunityPage;
