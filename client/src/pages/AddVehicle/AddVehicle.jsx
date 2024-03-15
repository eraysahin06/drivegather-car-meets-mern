import { useState, useEffect } from 'react';
import axios from 'axios';
import carBrands from '../../data/carBrands';
import { useAuth } from '../../hooks/useAuth';
import VehicleCard from '../../components/Vehicles/VehicleCard/VehicleCard';

const AddVehicle = () => {
    const user = useAuth();
    const [vehicle, setVehicle] = useState({
        make: '',
        model: '',
        year: '',
    });
    const [userVehicles, setUserVehicles] = useState([]);

    useEffect(() => {
        const fetchUserVehicles = async () => {
            if (user && user.email) {
                try {
                    const response = await axios.get(`http://localhost:3000/vehicles?userEmail=${user.email}`);
                    setUserVehicles(response.data);
                } catch (error) {
                    console.error('Error fetching user vehicles:', error);
                }
            }
        };
    
        if (user && user.email) {
            fetchUserVehicles();
        }
    }, [user]);
    

    const handleChange = (e) => {
        setVehicle({ ...vehicle, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...vehicle, userEmail: user.email };
            await axios.post('http://localhost:3000/vehicles', data);
            alert('Vehicle added successfully!');
            setVehicle({ make: '', model: '', year: '' });
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto p-8">
                <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
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
                {userVehicles.length === 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-xl font-bold">Add your first vehicle</p>
                    </div>
                )}
                {userVehicles.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Your Vehicles</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {userVehicles.map((vehicle) => (
                                <VehicleCard key={vehicle._id} vehicle={vehicle} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default AddVehicle;
