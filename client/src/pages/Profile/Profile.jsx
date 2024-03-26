import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import ProfileImage from "../../assets/profileimg.jpg";

const Profile = () => {
  const authUser = useAuth();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST}/users/${authUser.email}`
        );
        setUser(response.data);
        setUsername(response.data.username || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
        setErrorMessage("Failed to fetch user details");
      }
    };

    if (authUser) {
      fetchUserDetails();
    }
  }, [authUser]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_HOST}/users/${user.email}`,
        {
          username,
        }
      );
      if (response.data) {
        setUser(response.data);
        setUsername(response.data.username);
      }
      setIsEditing(false);
    } catch (error) {
      setErrorMessage("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <div className="relative">
        <img
          src={ProfileImage}
          alt="Profile"
          className="w-full object-cover"
          style={{ height: "75vh", filter: "brightness(50%)" }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Your Profile</h1>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <div className="mb-4">
            <label className="block font-semibold">Username</label>
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 text-black w-full rounded-md"
              />
            ) : (
              <p className="text-lg">{username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Username
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
