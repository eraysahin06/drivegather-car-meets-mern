import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import VehicleCard from '../../components/Vehicles/VehicleCard/VehicleCard';
import VehicleForm from '../../components/Vehicles/VehicleForm/VehicleForm';

const AddVehicle = () => {
    const user = useAuth();
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

    const handleSubmit = async (e, vehicle) => {
        e.preventDefault();
        try {
            const data = { ...vehicle, userEmail: user.email };
            await axios.post('http://localhost:3000/vehicles', data);
            alert('Vehicle added successfully!');
            setUserVehicles([...userVehicles, data]);
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto p-8">
                {userVehicles.length === 0 && (
                    <VehicleForm onSubmit={handleSubmit} />
                )}
                {userVehicles.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Your Vehicle</h2>
                        <VehicleCard key={userVehicles[0]._id} vehicle={{ ...userVehicles[0], year: parseInt(userVehicles[0].year) }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddVehicle;
