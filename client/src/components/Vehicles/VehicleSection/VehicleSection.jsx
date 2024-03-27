import { FaCar, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import VehicleCard from "../VehicleCard/VehicleCard";
import GTR from "../../../assets/GTR.jpg";

const VehicleSection = ({ user, hasVehicle, vehicle }) => {
  const navigate = useNavigate();

  return (
    <>
    <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center text-center gap-2">
          Choose Your Vehicle
        </h2>
     <div
      className="bg-gray-100 p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${GTR})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        
        
      }}
    >
      <div className="bg-white bg-opacity-50 p-4 rounded-lg border-2 border-black">
        <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center text-center gap-2">
          <FaCar />
          <span>Your Vehicle</span>
        </h2>
        {hasVehicle && vehicle ? (
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex-1">
              <VehicleCard vehicle={vehicle} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
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
      </div>
    </div>
    </>
   
  );
};

VehicleSection.propTypes = {
  user: PropTypes.object,
  hasVehicle: PropTypes.bool.isRequired,
  vehicle: PropTypes.object,
};

export default VehicleSection;
