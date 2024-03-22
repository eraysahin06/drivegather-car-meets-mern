import { useState, useEffect } from "react";
import { FaPlus, FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import VehicleCard from "../../components/Vehicles/VehicleCard/VehicleCard";
import Communities from "../../components/Communities/Communities";
import { useAuth } from "../../hooks/useAuth";
import { useHasVehicle } from "../../hooks/useHasVehicle";
import axios from "axios";
import HeroSection from "../../components/HeroSection/HeroSection";

function App() {
  const user = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const hasVehicle = useHasVehicle();
  const [vehicle, setVehicle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            `http://localhost:3000/users/${user.email}`
          );
          setUserDetails(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  useEffect(() => {
    const fetchUserVehicle = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(
            `http://localhost:3000/vehicles?userEmail=${user.email}`
          );
          if (response.data.length > 0) {
            setVehicle(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching user vehicle:", error);
        }
      }
    };

    fetchUserVehicle();
  }, [user]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex-1 bg-white text-black">
        {/* Hero Section */}
        <div className="mb-8">
          <HeroSection />
        </div>
        {/* Welcome User */}
        {userDetails && (
          <div className="text-left p-8">
            <h2 className="text-xl font-semibold">
              Welcome, {userDetails.displayName}
            </h2>
          </div>
        )}
        {/* User Vehicle */}
        {hasVehicle && vehicle ? (
          <div className="mb-5 p-8">
            <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center text-center gap-2">
              <FaCar />
              <span>Your Vehicle</span>
            </h2>
              <VehicleCard vehicle={vehicle} />
          </div>
        ) : (
          <div className="flex items-center mb-5 justify-center">
            <button
              onClick={() =>
                user ? navigate("/add-vehicle") : navigate("/register")
              }
              className="p-4 bg-white border-2 border-black hover:bg-black hover:text-white rounded-md flex items-center"
            >
              <FaPlus size={24} />
              <span className="text-xl font-semibold ml-2">
                Add your vehicle to join the car meets
              </span>
            </button>
          </div>
        )}

        {/* Communities */}
        <Communities user={user} />
      </div>
    </div>
  );
}

export default App;
