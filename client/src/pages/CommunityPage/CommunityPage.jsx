import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useGetUser from '../../hooks/useGetUser';

const CommunityPage = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useGetUser();

  useEffect(() => {
    const fetchCommunity = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/communities/${id}`);
        setCommunity(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id]);

  const acceptJoinRequest = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3000/communities/${id}/accept`, { userId });
      setCommunity(response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error accepting join request:', error);
    }
  };

  const declineJoinRequest = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:3000/communities/${id}/decline`, { userId });
      setCommunity(response.data);
    } catch (error) {
      console.error('Error declining join request:', error);
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
            <MemberCard key={memberId} memberId={memberId} />
          ))}
        </div>
      </div>

      {user && user._id === community.creatorId && community.type === 'Private' && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Pending Join Requests</h3>
          <div className="flex flex-col">
            {community.pendingMembers.map((pendingMemberId) => (
              <div key={pendingMemberId} className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md">
                <MemberCard memberId={pendingMemberId} />
                <div>
                  <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded mr-2" onClick={() => acceptJoinRequest(pendingMemberId)}>Accept</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded" onClick={() => declineJoinRequest(pendingMemberId)}>Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MemberCard = ({ memberId }) => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      const response = await axios.get(`http://localhost:3000/users/id/${memberId}`);
      const memberData = response.data;

      // Fetch vehicle details for the member
      const vehicleResponse = await axios.get(`http://localhost:3000/vehicles?userEmail=${memberData.email}`);
      const vehicleData = vehicleResponse.data;

      setMember({ ...memberData, vehicles: vehicleData });
    };

    fetchMember();
  }, [memberId]);

  if (!member) {
    return <div>Loading member...</div>;
  }

  return (
    <div className="flex items-center justify-between mb-2 bg-gray-800 p-4 rounded-md">
      <div className="flex items-center">
        <img src={member.photoURL} alt={member.username} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <p className="font-semibold">{member.username}</p>
        </div>
      </div>
      <div>
        {member.vehicles.map((vehicle) => (
          <p key={vehicle._id} className="text-sm">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
        ))}
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  memberId: PropTypes.string.isRequired,
};

export default CommunityPage;
