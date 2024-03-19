import PropTypes from "prop-types";
import { FaUser, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import axios from "axios";
import { useEffect, useState } from "react";

const CommunityCard = ({ community, isCreator }) => {
  const user = useGetUser();
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const checkMembership = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:3000/communities/${community._id}/isMember/${user._id}`
          );
          setIsJoined(response.data.isMember);
          setIsPending(community.pendingMembers.includes(user._id));
        } catch (error) {
          console.error("Error checking membership:", error);
        }
      }
    };

    checkMembership();
  }, [user, community._id, community.pendingMembers]);

  const joinCommunity = async () => {
    if (!user) {
      navigate("/register");
    } else {
      try {
        await axios.put(
          `http://localhost:3000/communities/${community._id}/join`,
          { userId: user._id }
        );
      } catch (error) {
        console.error("Error joining community:", error);
      }
    }
  };

  return (
    <Link
      to={`/community-page/${community._id}`}
      className="block bg-gray-800 rounded-md p-4 mb-4 relative"
    >
      <h3 className="text-xl font-bold">
        {isCreator && <FaUser className="p-1" title="Created by you" />}
        {community.name}
      </h3>
      <p>Type: {community.type}</p>
      <p>Creator: {community.creatorUsername}</p>
      <p>Members: {community.memberCount}</p>
      {!isCreator &&
        (isJoined ? (
          <div className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded flex items-center">
            <FaCheck className="mr-1" /> Joined
          </div>
        ) : isPending ? (
          <div className="absolute bottom-2 right-2 bg-yellow-500 text-white p-2 rounded flex items-center">
            Request Pending
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
        ))}
    </Link>
  );
};

CommunityCard.propTypes = {
  community: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    creatorUsername: PropTypes.string.isRequired,
    memberCount: PropTypes.number.isRequired,
    pendingMembers: PropTypes.array.isRequired,
  }).isRequired,
  isCreator: PropTypes.bool.isRequired,
};

export default CommunityCard;
