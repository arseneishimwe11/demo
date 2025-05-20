import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSearch, FaMapMarkerAlt, FaCar } from 'react-icons/fa';

const FindParkingPage = () => {
  const [searchParams] = useSearchParams();
  const selectedVehicleId = searchParams.get('vehicle');
  
  const [parkingLocations, setParkingLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch parking locations
        const parkingResponse = await axios.get('/api/parking', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setParkingLocations(parkingResponse.data.data || []);
        
        // Fetch user vehicles
        const vehiclesResponse = await axios.get('/api/vehicles', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        const userVehicles = vehiclesResponse.data.data || [];
        setVehicles(userVehicles);
        
        // Set selected vehicle if provided in URL or default to first vehicle
        if (selectedVehicleId && userVehicles.length > 0) {
          const vehicle = userVehicles.find(v => v.id.toString() === selectedVehicleId);
          if (vehicle) {
            setSelectedVehicle(vehicle);
          } else {
            setSelectedVehicle(userVehicles[0]);
          }
        } else if (userVehicles.length > 0) {
          setSelectedVehicle(userVehicles[0]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [selectedVehicleId]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredLocations = parkingLocations.filter(location => 
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleParkHere = (parkingLocation) => {
    if (!selectedVehicle) {
      setError('Please select a vehicle first');
      return;
    }
    
    navigate(`/confirm-parking?vehicle=${selectedVehicle.id}&parking=${parkingLocation.code}`);
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
        <div className="flex items-center mb-8">
          <Link to="/dashboard" className="mr-4 text-gray-400 hover:text-white">
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Parking</h1>
            <p className="text-gray-400">Search and select a parking location</p>
          </div>
        </div>
        
        {/* Vehicle Selection */}
        {vehicles.length > 0 ? (
          <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Select Vehicle</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedVehicle?.id === vehicle.id 
                      ? 'border-lime-400 bg-lime-400/10' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center">
                    <FaCar className={`text-2xl mr-3 ${
                      selectedVehicle?.id === vehicle.id ? 'text-lime-400' : 'text-gray-400'
                    }`} />
                    <div>
                      <h3 className="font-semibold">{vehicle.plateNumber}</h3>
                      <p className="text-sm text-gray-400">{vehicle.make} {vehicle.model}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 mb-6 text-center">
            <p className="text-gray-400 mb-4">You need to add a vehicle before you can park.</p>
            <Link
              to="/vehicles"
              className="px-6 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors"
            >
              Add Vehicle
            </Link>
          </div>
        )}
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search parking locations..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[rgba(15,15,15,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
          />
        </div>
        
        {/* Parking Locations */}
        {filteredLocations.length === 0 ? (
          <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">No parking locations found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <div key={location.code} className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg overflow-hidden">
                <div className="h-40 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-lime-400 text-5xl" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                  <p className="text-gray-400 mb-4">{location.location}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-sm text-gray-400">Available Spaces</span>
                      <div className="text-xl font-bold">
                        {location.availableSpaces} / {location.totalSpaces}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">Fee per Hour</span>
                      <div className="text-xl font-bold">${location.feePerHour}</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleParkHere(location)}
                    disabled={location.availableSpaces === 0 || !selectedVehicle}
                    className={`w-full py-3 rounded-lg font-bold ${
                      location.availableSpaces === 0 || !selectedVehicle
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-lime-400 text-black hover:bg-lime-300 transition-colors'
                    }`}
                  >
                    {location.availableSpaces === 0 
                      ? 'No Spaces Available' 
                      : !selectedVehicle 
                        ? 'Select a Vehicle First'
                        : 'Park Here'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FindParkingPage;