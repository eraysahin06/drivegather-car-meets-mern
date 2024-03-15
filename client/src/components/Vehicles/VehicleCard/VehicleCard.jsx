import PropTypes from 'prop-types';

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold">{vehicle.make} {vehicle.model}</h3>
            <p>Year: {vehicle.year}</p>
        </div>
    );
};

VehicleCard.propTypes = {
    vehicle: PropTypes.shape({
        make: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
    }).isRequired
};

export default VehicleCard;
