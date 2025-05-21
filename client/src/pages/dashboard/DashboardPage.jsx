import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaParking, FaCar, FaHistory, FaMapMarkerAlt } from 'react-icons/fa';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [activeVehicles, setActiveVehicles] = useState([]);
  const [parkingLocations, setParkingLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        
        // Fetch active parking sessions
        const vehiclesResponse = await axios.get('/api/vehicles/active', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        // Fetch nearby parking locations
        const locationsResponse = await axios.get('/api/parking', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setActiveVehicles(vehiclesResponse.data.data || []);
        setParkingLocations(locationsResponse.data.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

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
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Welcome, <span className="text-white">{user?.fullName || 'User'}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-lime-400 flex items-center justify-center text-black font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {/* Welcome Section */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your parking experience with ease</p>
        </section>
        
        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Link to="/find-parking" className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 hover:border-lime-400/50 transition-colors">
            <div className="flex items-center mb-4">
              <FaParking className="text-lime-400 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Find Parking</h2>
            </div>
            <p className="text-gray-400">Locate available parking spots near you</p>
          </Link>
          
          <Link to="/vehicles" className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 hover:border-lime-400/50 transition-colors">
            <div className="flex items-center mb-4">
              <FaCar className="text-lime-400 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">My Vehicles</h2>
            </div>
            <p className="text-gray-400">Manage your registered vehicles</p>
          </Link>
          
          <Link to="/history" className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 hover:border-lime-400/50 transition-colors">
            <div className="flex items-center mb-4">
              <FaHistory className="text-lime-400 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Parking History</h2>
            </div>
            <p className="text-gray-400">View your past parking sessions</p>
          </Link>
          
          <Link to="/locations" className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 hover:border-lime-400/50 transition-colors">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-lime-400 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Locations</h2>
            </div>
            <p className="text-gray-400">Explore all parking locations</p>
          </Link>
        </section>
        
        {/* Active Parking */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Active Parking</h2>
          
          {activeVehicles.length === 0 ? (
            <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-400">You don't have any active parking sessions.</p>
              <Link to="/find-parking" className="inline-block mt-4 px-6 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors">
                Find Parking
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{vehicle.plateNumber}</h3>
                      <p className="text-gray-400">{vehicle.parkingLocation}</p>
                    </div>
                    <div className="bg-lime-400/20 text-lime-400 px-3 py-1 rounded-full text-sm">
                      Active
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <div>
                      <p>Entry Time</p>
                      <p className="text-white">{new Date(vehicle.entryTime).toLocaleString()}</p>
                    </div>
                    <div>
                      <p>Duration</p>
                      <p className="text-white">{vehicle.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Current Fee</p>
                      <p className="text-xl font-bold text-white">${vehicle.currentFee}</p>
                    </div>
                    <button className="px-4 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors">
                      End Parking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* Nearby Parking Locations */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Nearby Parking Locations</h2>
          
          {parkingLocations.length === 0 ? (
            <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 text-center">
              <p className="text-gray-400">No parking locations found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parkingLocations.slice(0, 3).map((location) => (
                <div key={location.id} className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6">
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
              ))}
            </div>
          )}
          
          {parkingLocations.length > 3 && (
            <div className="mt-4 text-center">
              <Link to="/locations" className="text-lime-400 hover:underline">
                View all parking locations
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;