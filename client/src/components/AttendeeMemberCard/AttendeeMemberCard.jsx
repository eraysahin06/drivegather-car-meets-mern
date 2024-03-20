import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AttendeeMemberCard = ({ memberId }) => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      const response = await axios.get(
        `http://localhost:3000/users/id/${memberId}`
      );
      const memberData = response.data;

      // Fetch vehicle details for the member
      const vehicleResponse = await axios.get(
        `http://localhost:3000/vehicles?userEmail=${memberData.email}`
      );
      const vehicleData = vehicleResponse.data;

      setMember({ ...memberData, vehicles: vehicleData });
    };

    fetchMember();
  }, [memberId]);

  if (!member) {
    return <div>Loading member...</div>;
  }

  return (
    <div className="flex items-center justify-between mb-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 transition-colors">
      <div className="flex items-center">
        <img
          src={member.photoURL}
          alt={member.username}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-lg">{member.username}</p>
        </div>
      </div>
      <div>
        {member.vehicles.map((vehicle) => (
          <p key={vehicle._id} className="text-sm text-gray-400">
            {vehicle.make} {vehicle.model} ({vehicle.year})
          </p>
        ))}
      </div>
    </div>
  );
};

AttendeeMemberCard.propTypes = {
  memberId: PropTypes.string.isRequired,
};

export default AttendeeMemberCard;
