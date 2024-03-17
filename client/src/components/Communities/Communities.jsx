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
        const communitiesData = response.data;

        // Check membership for each community
        const checkedCommunities = await Promise.all(
          communitiesData.map(async (community) => {
            const isMemberResponse = await axios.get(
              `http://localhost:3000/communities/${community._id}/isMember/${user._id}`
            );
            return { ...community, isMember: isMemberResponse.data.isMember };
          })
        );

        setCommunities(checkedCommunities);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    if (user) {
      fetchCommunities();
    }
  }, [user]);

  const createdCommunities = communities.filter(
    (community) => community.creatorId === user?._id
  );
  const joinedCommunities = communities.filter(
    (community) => community.isMember && community.creatorId !== user?._id
  );
  const otherCommunities = communities.filter(
    (community) => !community.isMember && community.creatorId !== user?._id
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
      {createdCommunities.map((community) => (
        <CommunityCard
          key={community._id}
          community={community}
          isCreator={true}
          isJoined={true}
        />
      ))}
      <h3 className="text-2xl font-semibold mb-4">Joined Communities</h3>
      {joinedCommunities.map((community) => (
        <CommunityCard
          key={community._id}
          community={community}
          isCreator={false}
          isJoined={true}
        />
      ))}
      <h3 className="text-2xl font-semibold mb-4">Other Communities</h3>
      {otherCommunities.map((community) => (
        <CommunityCard
          key={community._id}
          community={community}
          isCreator={false}
          isJoined={false}
        />
      ))}
    </div>
  );
};

export default Communities;
