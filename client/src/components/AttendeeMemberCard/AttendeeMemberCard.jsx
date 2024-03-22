import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AttendeeMemberCard = ({ memberId }) => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/users/id/${memberId}`
      );
      const memberData = response.data;

      // Fetch vehicle details for the member
      const vehicleResponse = await axios.get(
        `${import.meta.env.VITE_HOST}/vehicles?userEmail=${memberData.email}`
      );
      const vehicleData = vehicleResponse.data[0]; // Assuming only one vehicle

      setMember({ ...memberData, vehicle: vehicleData });
    };

    fetchMember();
  }, [memberId]);

  if (!member) {
    return <div>Loading member...</div>;
  }

  return (
    <div className="flex flex-col items-center my-8 bg-white p-2 rounded-lg shadow-md border border-black transition-colors w-1/6 min-w-[150px] mx-2">
      <img
        src={member.photoURL}
        alt={member.username}
        className="w-16 h-16 rounded-full mb-2"
      />
      <p className="font-semibold text-sm">{member.username}</p>
      {member.vehicle && (
        <p className="text-xs">
          {member.vehicle.make} {member.vehicle.model} ({member.vehicle.year})
        </p>
      )}
    </div>
  );
};

AttendeeMemberCard.propTypes = {
  memberId: PropTypes.string.isRequired,
};

export default AttendeeMemberCard;
