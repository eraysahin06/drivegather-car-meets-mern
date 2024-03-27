import { useState } from "react";
import axios from "axios";
import useGetUser from "../../hooks/useGetUser";
import { useNavigate } from "react-router-dom";
import CommunityImage from '../../assets/community.jpg'

const CreateCommunity = () => {
  const user = useGetUser();
  const [name, setName] = useState("");
  const [type, setType] = useState("Public");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user && user._id && user.username) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_HOST}/communities`,
          {
            creatorId: user._id,
            creatorUsername: user.username,
            name,
            type,
            members: [user._id], // Include the creator's ID in the members array
          }
        );
        console.log("Community created:", response.data);
        navigate("/");
      } catch (error) {
        console.error("Error creating community:", error);
      }
    } else {
      console.error("User not found");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="relative">
        <img
          src={CommunityImage}
          alt="Community"
          className="w-full object-cover"
          style={{ height: "75vh", filter: "brightness(50%)" }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Create a Community</h1>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 text-black w-full rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border p-2 text-black w-full rounded-md"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Community
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;
