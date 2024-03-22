import { FaCar, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import VehicleCard from '../VehicleCard/VehicleCard';
import GTR from '../../../assets/GTR.jpg';

const VehicleSection = ({ user, hasVehicle, vehicle }) => {
  const navigate = useNavigate();

  return (
    <div>
      {hasVehicle && vehicle ? (
        <div className="mb-5 p-8 flex flex-col sm:flex-row items-center justify-center gap-5">
          <div className="flex-1 flex items-center justify-center">
            <img src={GTR} alt="GTR Vehicle" className="w-full max-w-xs h-auto rounded-lg shadow-lg border border-gray-300 p-1" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center text-center gap-2">
              <FaCar />
              <span>Your Vehicle</span>
            </h2>
            <VehicleCard vehicle={vehicle} />
          </div>
        </div>
      ) : (
        <div className="flex items-center mb-5 justify-center">
          <button
            onClick={() => user ? navigate("/add-vehicle") : navigate("/register")}
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
  );
};

VehicleSection.propTypes = {
    user: PropTypes.object,
    hasVehicle: PropTypes.bool.isRequired,
    vehicle: PropTypes.object,
  };
  

export default VehicleSection;
