import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CarMeets = ({
  communityId,
  communityType,
  isMember,
  creatorId,
  user,
}) => {
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

  const deleteCarMeet = async (carMeetId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car meet?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${
            import.meta.env.VITE_HOST
          }/car-meets/${communityId}/car-meets/${carMeetId}`
        );

        setCarMeets(carMeets.filter((carMeet) => carMeet._id !== carMeetId));
      } catch (error) {
        console.error("Error deleting car meet:", error);
      }
    }
  };

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
            className="bg-white text-black border-2 border-gray-700 p-4 mb-4 rounded-md"
          >
            <h4 className="text-xl font-semibold text-yellow-500">
              {carMeet.name}
            </h4>
            <p>{carMeet.description}</p>
            <p>Location: {carMeet.location}</p>
            <p>Date: {new Date(carMeet.date).toLocaleDateString()}</p>
            {user && user._id === creatorId && (
              <div className="flex space-x-2">
                <button
                  className="p-2 text-blue-500"
                  onClick={() => {
                    /* Handle edit logic here */
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className="p-2 text-red-500"
                  onClick={() => deleteCarMeet(carMeet._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            )}
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
  creatorId: PropTypes.string.isRequired,
  user: PropTypes.object,
};

export default CarMeets;
