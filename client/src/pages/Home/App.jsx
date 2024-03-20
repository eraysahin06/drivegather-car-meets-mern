import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import VehicleCard from "../../components/Vehicles/VehicleCard/VehicleCard";
import Communities from "../../components/Communities/Communities";
import { useAuth } from "../../hooks/useAuth";
import { useHasVehicle } from "../../hooks/useHasVehicle";
import axios from "axios";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={userDetails}
        hasVehicle={hasVehicle}
        vehicle={vehicle}
      />

      {/* Main content */}
      <div className="flex-1 p-8">
        {hasVehicle && vehicle ? (
          <div className="mb-5">
            <h2 className="text-3xl font-semibold mb-4">Vehicle</h2>
            <VehicleCard vehicle={vehicle} />
          </div>
        ) : (
          <div className="flex items-center mb-5">
            <button
              onClick={() =>
                user ? navigate("/add-vehicle") : navigate("/register")
              }
              className="p-4 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center"
            >
              <FaPlus size={24} />
              <span className="text-xl font-semibold ml-2">
                Add your vehicle to join the car meets
              </span>
            </button>
          </div>
        )}
        <Communities user={user} />
      </div>
    </div>
  );
}

export default App;
