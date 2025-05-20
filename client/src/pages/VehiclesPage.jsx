import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    plateNumber: '',
    make: '',
    model: '',
    color: ''
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setIsLoading(true);
        
        const response = await axios.get('/api/vehicles', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setVehicles(response.data.data || []);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Failed to load vehicles. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVehicles();
  }, []);

  const handleInputChange = (e) => {
    setNewVehicle({
      ...newVehicle,
      [e.target.name]: e.target.value
    });
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/vehicles', newVehicle, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setVehicles([...vehicles, response.data.data]);
      setNewVehicle({
        plateNumber: '',
        make: '',
        model: '',
        color: ''
      });
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding vehicle:', err);
      setError('Failed to add vehicle. Please try again.');
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await axios.delete(`/api/vehicles/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
      } catch (err) {
        console.error('Error deleting vehicle:', err);
        setError('Failed to delete vehicle. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[rgba(5,5,5,1.00)] flex items-center justify-center">
        <div className="animate-pulse text-lime-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgba(5,5,5,1.00)] text-white">
      {/* Header */}
      <header className="bg-[rgba(15,15,15,0.6)] border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold bg-lime-400 bg-clip-text text-transparent">
            ParkEase
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-gray-400 hover:text-white">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">My Vehicles</h1>
              <p className="text-gray-400">Manage your registered vehicles</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" /> Add Vehicle
          </button>
        </div>
        
        {/* Vehicles List */}
        {vehicles.length === 0 ? (
          <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-4">You haven't added any vehicles yet.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors"
            >
              Add Your First Vehicle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{vehicle.plateNumber}</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white">
                      <FaEdit />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-red-400"
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="text-gray-400 mb-4">
                  <p>{vehicle.make} {vehicle.model}</p>
                  <p>Color: {vehicle.color}</p>
                </div>
                
                <Link 
                  to={`/find-parking?vehicle=${vehicle.id}`}
                  className="block w-full py-2 bg-lime-400 text-black font-bold rounded-lg text-center hover:bg-lime-300 transition-colors"
                >
                  Park This Vehicle
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[rgba(15,15,15,1)] border border-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Vehicle</h2>
            
            <form onSubmit={handleAddVehicle}>
              <div className="mb-4">
                <label htmlFor="plateNumber" className="block text-gray-300 mb-2">Plate Number</label>
                <input
                  type="text"
                  id="plateNumber"
                  name="plateNumber"
                  value={newVehicle.plateNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(25,25,25,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
                  placeholder="ABC123"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="make" className="block text-gray-300 mb-2">Make</label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={newVehicle.make}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(25,25,25,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
                  placeholder="Toyota"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="model" className="block text-gray-300 mb-2">Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={newVehicle.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(25,25,25,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
                  placeholder="Corolla"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="color" className="block text-gray-300 mb-2">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={newVehicle.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(25,25,25,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
                  placeholder="Black"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;