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
  const [editCarMeetId, setEditCarMeetId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
  });

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
      fetchCarMeets(); //this
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

  const handleEditClick = (carMeet) => {
    setEditCarMeetId(carMeet._id);
    setEditFormData({
      name: carMeet.name,
      description: carMeet.description,
      location: carMeet.location,
      date: carMeet.date.substring(0, 10), // Format date to match input[type="date"]
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${
          import.meta.env.VITE_HOST
        }/car-meets/${communityId}/car-meets/${editCarMeetId}`,
        { ...editFormData, creatorId }
      );
      const updatedCarMeets = carMeets.map((carMeet) =>
        carMeet._id === editCarMeetId
          ? { ...carMeet, ...editFormData }
          : carMeet
      );
      setCarMeets(updatedCarMeets);
      setEditCarMeetId(null);
    } catch (error) {
      console.error("Error updating Car Meet:", error);
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
            {editCarMeetId === carMeet._id ? (
              <form
                onSubmit={handleEditFormSubmit}
                className="flex flex-col gap-2"
              >
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditFormChange}
                  className="p-2 border"
                />
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditFormChange}
                  className="p-2 border"
                />
                <input
                  type="text"
                  name="location"
                  value={editFormData.location}
                  onChange={handleEditFormChange}
                  className="p-2 border"
                />
                <input
                  type="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditFormChange}
                  className="p-2 border"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditCarMeetId(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
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
                      onClick={() => handleEditClick(carMeet)}
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
              </>
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
