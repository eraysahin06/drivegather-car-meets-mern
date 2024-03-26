import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaUsers } from "react-icons/fa";
import CommunityCard from "../CommunityCard/CommunityCard";
import useGetUser from "../../hooks/useGetUser";

const Communities = () => {
  const user = useGetUser();
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

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
              `${import.meta.env.VITE_HOST}/communities/${
                community._id
              }/isMember/${user._id}`
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
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold mb-4 md:mb-0">
          <FaUsers className="inline-block mr-2" />
          Communities
        </h2>
        <button
          onClick={() =>
            user ? navigate("/create-community") : navigate("/register")
          }
          className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          <FaPlus size={20} />
        </button>
      </div>
      <div className="space-y-8">
        {createdCommunities.length > 0 && (
          <>
            <h3 className="text-2xl text-center md:text-left font-semibold text-gray-800">
              Your Communities ({createdCommunities.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {createdCommunities.map((community) => (
                <CommunityCard
                  key={community._id}
                  community={community}
                  isCreator={true}
                  isJoined={true}
                />
              ))}
            </div>
          </>
        )}
        {joinedCommunities.length > 0 && (
          <>
            <h3 className="text-2xl text-center md:text-left font-semibold text-gray-800">
              Joined Communities ({joinedCommunities.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {joinedCommunities.map((community) => (
                <CommunityCard
                  key={community._id}
                  community={community}
                  isCreator={false}
                  isJoined={true}
                />
              ))}
            </div>
          </>
        )}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl text-center md:text-left font-semibold text-gray-800">
            Explore Communities ({otherCommunities.length} available)
          </h3>
          {otherCommunities.length > 3 && (
            <Link
              to="/communities"
              className="text-sm w-[100px] hover:bg-black hover:text-white text-center border-2 border-gray-700"
            >
              View all
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {user && otherCommunities.length > 0 ? (
            otherCommunities
              .slice(0, 3)
              .map((community) => (
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

export default Communities;
