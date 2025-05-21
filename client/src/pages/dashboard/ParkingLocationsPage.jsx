import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';

const ParkingLocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        
        const response = await axios.get('/api/parking', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setLocations(response.data.data || []);
        setFilteredLocations(response.data.data || []);
      } catch (err) {
        console.error('Error fetching parking locations:', err);
        setError('Failed to load parking locations. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocations();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter(
        location => 
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchTerm, locations]);

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
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-gray-400 hover:text-white">
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2">Parking Locations</h1>
            <p className="text-gray-400">Find and book parking spaces</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg bg-[rgba(15,15,15,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Locations Grid */}
        {filteredLocations.length === 0 ? (
          <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400">No parking locations found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <div key={location.id} className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg overflow-hidden">
                <div className="h-40 bg-gray-800 relative">
                  {/* This would be an image in a real app */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-lime-400 text-4xl" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <p className="text-gray-400 mb-4">{location.address}</p>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <div>
                      <p className="text-gray-400">Available Spaces</p>
                      <p className="text-white font-bold">{location.availableSpaces}/{location.totalSpaces}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Fee</p>
                      <p className="text-white font-bold">${location.feePerHour}/hr</p>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/parking/${location.id}`}
                    className="block w-full py-2 bg-lime-400 text-black font-bold rounded-lg text-center hover:bg-lime-300 transition-colors"
                  >
                    Park Here
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ParkingLocationsPage;