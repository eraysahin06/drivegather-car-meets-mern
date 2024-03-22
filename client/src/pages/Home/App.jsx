import { useState, useEffect } from "react";
import Communities from "../../components/Communities/Communities";
import { useAuth } from "../../hooks/useAuth";
import { useHasVehicle } from "../../hooks/useHasVehicle";
import axios from "axios";
import HeroSection from "../../components/HeroSection/HeroSection";
import VehicleSection from "../../components/Vehicles/VehicleSection/VehicleSection";

function App() {
  const user = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const hasVehicle = useHasVehicle();
  const [vehicle, setVehicle] = useState(null);

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
        <VehicleSection user={user} hasVehicle={hasVehicle} vehicle={vehicle} />
        {/* Communities */}
        <Communities user={user} />
      </div>
    </div>
  );
}

export default App;
