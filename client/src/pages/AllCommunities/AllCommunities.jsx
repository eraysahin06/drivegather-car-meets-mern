import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import CommunityCard from "../../components/CommunityCard/CommunityCard";
import useGetUser from "../../hooks/useGetUser";

const AllCommunities = () => {
  const user = useGetUser();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST}/communities`
        );
        const communitiesData = response.data;

        // Check membership for each community
        const checkedCommunities = await Promise.all(
          communitiesData.map(async (community) => {
            const isMemberResponse = await axios.get(
              `${import.meta.env.VITE_HOST}/communities/${community._id}/isMember/${user._id}`
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

  const otherCommunities = communities.filter(
    (community) => !community.isMember && community.creatorId !== user?._id
  );

  return (
    <div className="mx-auto p-8 bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold mb-4 md:mb-0">
          <FaUsers className="inline-block mr-2" />
          All Communities
        </h2>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {user && otherCommunities.length > 0 ? (
            otherCommunities.map((community) => (
              <CommunityCard
                key={community._id}
                community={community}
                isCreator={false}
                isJoined={false}
              />
            ))
          ) : (
            <div className="w-full text-center">
              <p className="text-gray-500 mb-4">
                {user
                  ? "You have joined all available communities."
                  : "Sign in to explore communities."}
              </p>
              {!user && (
                <Link
                  to="/register"
                  className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                  Explore Communities
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCommunities;
