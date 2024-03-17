import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus, FaUsers } from "react-icons/fa";
import CommunityCard from "../CommunityCard/CommunityCard";
import useGetUser from "../../hooks/useGetUser";

const Communities = () => {
  const user = useGetUser();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/communities");
        setCommunities(response.data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, []);

  // Extract community IDs from the user's communities array
  const userCommunityIds = user
    ? user.communities.map((community) => community)
    : [];

  const userCommunities = communities.filter(
    (community) =>
      community.creatorId === user?._id ||
      userCommunityIds.includes(community._id)
  );
  const otherCommunities = communities.filter(
    (community) =>
      community.creatorId !== user?._id &&
      !userCommunityIds.includes(community._id)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex gap-2 items-center text-3xl font-semibold">
          <FaUsers className="mt-1" />
          Communities
        </h2>
        <Link
          to="/create-community"
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-md"
        >
          <FaPlus size={24} />
        </Link>
      </div>
      <h3 className="text-2xl font-semibold mb-4">Your Communities</h3>
      {userCommunities.map((community) => (
        <CommunityCard
          key={community._id}
          community={community}
          isCreator={community.creatorId === user?._id}
          isJoined={true}
        />
      ))}
      {otherCommunities.map((community) => (
        <CommunityCard
          key={community._id}
          community={community}
          isCreator={false}
          isJoined={userCommunityIds.includes(community._id)}
        />
      ))}
    </div>
  );
};

export default Communities;
