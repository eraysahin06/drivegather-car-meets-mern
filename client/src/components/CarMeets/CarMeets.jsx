import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CarMeets = ({ communityId, communityType, isMember }) => {
  const [carMeets, setCarMeets] = useState([]);

  useEffect(() => {
    const fetchCarMeets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST}/car-meets/${communityId}/car-meets`
        );
        setCarMeets(response.data);
      } catch (error) {
        console.error("Error fetching Car Meets:", error);
      }
    };

    if (communityType === "Public" || isMember) {
      fetchCarMeets();
    }
  }, [communityId, communityType, isMember]);

  if (communityType === "Private" && !isMember) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Car Meets</h3>
        <p className="text-gray-500">
          You need to join the community to see the car meets in this community.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Car Meets</h3>
      <div className="flex flex-col">
        {carMeets.map((carMeet) => (
          <div
            key={carMeet._id}
            className="bg-white text-black border-2 p-4 mb-4 rounded-md"
          >
            <h4 className="text-xl font-semibold text-yellow-500">
              {carMeet.name}
            </h4>
            <p>{carMeet.description}</p>
            <p>Location: {carMeet.location}</p>
            <p>Date: {new Date(carMeet.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

CarMeets.propTypes = {
  communityId: PropTypes.string.isRequired,
  communityType: PropTypes.string.isRequired,
  isMember: PropTypes.bool.isRequired,
};

export default CarMeets;
