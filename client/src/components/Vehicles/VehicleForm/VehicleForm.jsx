import PropTypes from 'prop-types';
import { useState } from 'react';
import carBrands from '../../../data/carBrands';

const VehicleForm = ({ onSubmit }) => {
    const [vehicle, setVehicle] = useState({
        make: '',
        model: '',
        year: '',
    });

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={(e) => onSubmit(e, vehicle)} className="bg-gray-800 p-8 rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Add Vehicle</h1>
            <div className="mb-4">
                <label htmlFor="make" className="block mb-2">Make</label>
                <select name="make" id="make" value={vehicle.make} onChange={handleChange} className="w-full p-2 rounded-lg bg-gray-700">
                    <option value="">Select Make</option>
                    {Object.keys(carBrands).map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="model" className="block mb-2">Model</label>
                <select name="model" id="model" value={vehicle.model} onChange={handleChange} className="w-full p-2 rounded-lg bg-gray-700" disabled={!vehicle.make}>
                    <option value="">Select Model</option>
                    {vehicle.make && carBrands[vehicle.make].map((model) => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="year" className="block mb-2">Year</label>
                <input type="text" name="year" id="year" value={vehicle.year} onChange={handleChange} className="w-full p-2 rounded-lg bg-gray-700" />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-800 rounded-lg font-bold">Add Vehicle</button>
        </form>
    );
};

VehicleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default VehicleForm;
