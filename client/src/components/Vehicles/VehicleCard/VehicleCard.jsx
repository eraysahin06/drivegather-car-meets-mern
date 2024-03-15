import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FaEdit } from 'react-icons/fa';
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
        try {
            const response = await axios.put(`http://localhost:3000/vehicles/${updatedVehicle._id}`, updatedVehicle);
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
        <div className="bg-gray-800 p-4 rounded-lg">
            {isEditing ? (
                <VehicleForm vehicle={vehicle} onSubmit={handleUpdateVehicle} onCancel={handleCancelEdit} />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                        <button onClick={handleEditClick} className="text-gray-400 hover:text-white">
                            <FaEdit />
                        </button>
                    </div>
                    <p>Year: {vehicle.year}</p>
                </>
            )}
        </div>
    );
};

VehicleCard.propTypes = {
    vehicle: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
    }).isRequired,
    onEdit: PropTypes.func
};

export default VehicleCard;
