import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaEdit, FaTimes } from 'react-icons/fa'; // Import FaTimes
import VehicleForm from '../VehicleForm/VehicleForm';

const VehicleCard = ({ vehicle, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleUpdateVehicle = async (updatedVehicle) => {
        console.log("Updated vehicle:", updatedVehicle);
        try {
            const vehicleData = {
                make: updatedVehicle.make,
                model: updatedVehicle.model,
                year: updatedVehicle.year
            };
            const response = await axios.put(`http://localhost:3000/vehicles/${updatedVehicle._id}`, vehicleData);
            setIsEditing(false);
            if (onEdit) {
                onEdit(response.data);
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };

    if (!vehicle) {
        return null; // or return a placeholder/loading component
    }

    return (
        <div className="bg-white text-black border-2 border-black p-6 rounded-lg max-w-xs h-auto shadow-lg relative">
            {isEditing ? (
                <>
                    <button onClick={handleCancelEdit} className="absolute top-2 right-2 text-gray-400 hover:text-black">
                        <FaTimes />
                    </button>
                    <VehicleForm vehicle={vehicle} onSubmit={handleUpdateVehicle} onCancel={handleCancelEdit} />
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-2 gap-4">
                        <h3 className="text-lg font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                        <button onClick={handleEditClick} className="text-gray-400 hover:text-black">
                            <FaEdit />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

VehicleCard.propTypes = {
    vehicle: PropTypes.shape({
        _id: PropTypes.string,
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
    }).isRequired,
    onEdit: PropTypes.func
};

export default VehicleCard;
