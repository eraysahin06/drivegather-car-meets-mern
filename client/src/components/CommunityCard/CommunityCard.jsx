import PropTypes from "prop-types";
import { FaUser, FaCheck, FaUsers, FaLock } from "react-icons/fa";
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
            `${import.meta.env.VITE_HOST}/communities/${community._id}/isMember/${user._id}`
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
          `${import.meta.env.VITE_HOST}/communities/${community._id}/join`,
          { userId: user._id }
        );
        navigate(`/community-page/${community._id}`);
      } catch (error) {
        console.error("Error joining community:", error);
      }
    }
  };

  return (
    <Link
      to={`/community-page/${community._id}`}
      className="flex flex-col bg-gray-800 rounded-lg border-2 border-gray-900 transition-shadow hover:shadow-xl w-full max-w-xs "
    >
      <div className="p-4 bg-gray-900 text-white">
        <h3 className="text-xl font-bold">
          {isCreator && (
            <FaUser
              className="inline mr-2 text-sm text-green-500"
              title="Created by you"
            />
          )}
          <div className="flex items-center">
          {community.name}
          {community.type === "Private" && (
            <FaLock
              className="inline ml-2 text-sm text-red-500"
              title="Private Community"
            />
          )}
          </div>
          
        </h3>
        <p className="text-sm">Type: {community.type}</p>
        <p className="text-sm">
          <span className="text-yellow-300">Creator:</span>{" "}
          {community.creatorUsername}
        </p>
      </div>
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div className="flex items-center text-white">
          <FaUsers className="text-lg" />
          <span className="text-lg ml-2">{community.memberCount} Members</span>
        </div>
        {!isCreator &&
          (isJoined ? (
            <span className="bg-gray-700 mt-4 text-green-500 flex items-center justify-center">
              <FaCheck className="mr-1" /> Joined
            </span>
          ) : isPending ? (
            <span className="mt-4 text-yellow-500 flex items-center justify-center">
              Request Pending
            </span>
          ) : (
            <button
              className="mt-4 bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 rounded transition-all duration-200"
              onClick={(e) => {
                e.preventDefault();
                joinCommunity();
              }}
            >
              Join
            </button>
          ))}
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
    memberCount: PropTypes.number.isRequired,
    pendingMembers: PropTypes.array.isRequired,
  }).isRequired,
  isCreator: PropTypes.bool.isRequired,
};

export default CommunityCard;
