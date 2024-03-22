import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CreateCarMeetForm = ({ communityId, creatorId, fetchCommunity }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_HOST}/car-meets/${communityId}/car-meets`,
        {
          creatorId,
          name,
          description,
          location,
          date,
        }
      );
      alert("Car Meet created successfully!");
      setName("");
      setDescription("");
      setLocation("");
      setDate("");
      fetchCommunity(); // Reload the community data to show the new Car Meet
    } catch (error) {
      console.error("Error creating Car Meet:", error);
      alert("Error creating Car Meet. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
      <input
        type="text"
        placeholder="Car Meet Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border"
        required
      />
      <textarea
        placeholder="Car Meet Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 border"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border"
        required
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
      >
        Create Car Meet
      </button>
    </form>
  );
};

CreateCarMeetForm.propTypes = {
  communityId: PropTypes.string.isRequired,
  creatorId: PropTypes.string.isRequired,
  fetchCommunity: PropTypes.func.isRequired,
};

export default CreateCarMeetForm;
