import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CarMeets = ({ communityId }) => {
  const [carMeets, setCarMeets] = useState([]);

  useEffect(() => {
    const fetchCarMeets = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/car-meets/${communityId}/car-meets`);

        setCarMeets(response.data);
      } catch (error) {
        console.error("Error fetching Car Meets:", error);
      }
    };

    fetchCarMeets();
  }, [communityId]);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Car Meets</h3>
      <div className="flex flex-col">
        {carMeets.map((carMeet) => (
          <div key={carMeet._id} className="bg-gray-800 p-4 mb-4 rounded-md">
            <h4 className="text-xl font-semibold">{carMeet.name}</h4>
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
};

export default CarMeets;
