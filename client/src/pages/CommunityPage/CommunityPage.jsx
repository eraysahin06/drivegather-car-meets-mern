import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CommunityPage = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/communities/${id}`
        );
        const communityData = response.data;

        // Fetch details of each member
        const memberDetails = await Promise.all(
          communityData.members.map(async (memberId) => {
            const memberResponse = await axios.get(
              `http://localhost:3000/users/id/${memberId}`
            );
            const memberData = memberResponse.data;

            // Fetch vehicle details for each member
            const vehicleResponse = await axios.get(
              `http://localhost:3000/vehicles?userEmail=${memberData.email}`
            );
            const vehicleData = vehicleResponse.data;

            return { ...memberData, vehicles: vehicleData };
          })
        );

        // Update the community data with member details
        communityData.members = memberDetails;
        setCommunity(communityData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id]);

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
    <div className="flex flex-col p-8 bg-gray-900 text-white h-screen">
      <h2 className="text-3xl font-semibold mb-4">{community.name}</h2>
      <p className="mb-2">Type: {community.type}</p>
      <p className="mb-2">Creator: {community.creatorUsername}</p>
      <p className="mb-2">Members: {community.memberCount}</p>
      <h3 className="text-xl font-semibold mb-2">Users</h3>
      <div className="flex flex-col">
        <div className="flex mb-2 font-semibold">
          <div className="flex-1">Profile Picture and Username</div>
          <div className="flex-1">Vehicle Info</div>
        </div>
        {community.members.map((member) => (
          <div
            key={member._id}
            className="flex items-center border border-gray-800 rounded-md p-4 mb-2"
          >
            <div className="flex-1 flex items-center">
              <img
                src={member.photoURL}
                alt={member.username}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span>{member.username}</span>
            </div>
            <div className="flex-1">
              {member.vehicles.map((vehicle) => (
                <p key={vehicle._id} className="mb-1">
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
