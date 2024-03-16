import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import carBrands from '../../../data/carBrands';

const VehicleForm = ({ vehicle: initialVehicle, onSubmit, onCancel }) => {
    const [vehicle, setVehicle] = useState({
        make: '',
        model: '',
        year: '',
        _id: ''
    });

    useEffect(() => {
        if (initialVehicle) {
            setVehicle(initialVehicle);
        }
    }, [initialVehicle]);

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, vehicle);
    };
    

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= 1930; year--) {
            years.push(<option key={year} value={year}>{year}</option>);
        }
        return years;
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">{initialVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h1>
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
                <select name="year" id="year" value={vehicle.year} onChange={handleChange} className="w-full p-2 rounded-lg bg-gray-700">
                    <option value="">Select Year</option>
                    {generateYearOptions()}
                </select>
            </div>
            <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-800 rounded-lg font-bold">{initialVehicle ? 'Update Vehicle' : 'Add Vehicle'}</button>
            {initialVehicle && <button type="button" onClick={onCancel} className="w-full mt-2 p-2 bg-red-600 hover:bg-red-800 rounded-lg font-bold">Cancel</button>}
        </form>
    );
};

VehicleForm.propTypes = {
    vehicle: PropTypes.shape({
        _id: PropTypes.string,
        make: PropTypes.string,
        model: PropTypes.string,
        year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func
};

export default VehicleForm;
