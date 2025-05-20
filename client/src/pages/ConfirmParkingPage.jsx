import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaCar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ConfirmParkingPage = () => {
  const [searchParams] = useSearchParams();
  const vehicleId = searchParams.get('vehicle');
  const parkingCode = searchParams.get('parking');
  
  const [vehicle, setVehicle] = useState(null);
  const [parkingLocation, setParkingLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        if (!vehicleId || !parkingCode) {
          setError('Missing required parameters');
          return;
        }
        
        // Fetch vehicle details
        const vehicleResponse = await axios.get(`/api/vehicles/${vehicleId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setVehicle(vehicleResponse.data.data);
        
        // Fetch parking location details
        const parkingResponse = await axios.get(`/api/parking/${parkingCode}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setParkingLocation(parkingResponse.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [vehicleId, parkingCode]);

  const handleConfirmParking = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      
      // Call API to register vehicle entry
      const response = await axios.post('/api/vehicles/entry', {
        vehicleId: vehicle.id,
        parkingCode: parkingLocation.code
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      // Navigate to active parking page with the entry ID
      navigate(`/active-parking/${response.data.data.id}`);
    } catch (err) {
      console.error('Error registering parking:', err);
      setError(err.response?.data?.message || 'Failed to register parking. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        <div className="flex items-center mb-8">
          <Link to="/find-parking" className="mr-4 text-gray-400 hover:text-white">
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2">Confirm Parking</h1>
            <p className="text-gray-400">Review and confirm your parking details</p>
          </div>
        </div>
        
        {/* Confirmation Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg overflow-hidden mb-8">
            {/* Vehicle Details */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-start">
                <FaCar className="text-lime-400 text-3xl mr-4 mt-1" />
                <div>
                  <h2 className="text-xl font-bold mb-2">Vehicle Details</h2>
                  <p className="text-gray-300 mb-1">Plate Number: <span className="text-white">{vehicle?.plateNumber}</span></p>
                  <p className="text-gray-300 mb-1">Make & Model: <span className="text-white">{vehicle?.make} {vehicle?.model}</span></p>
                  <p className="text-gray-300">Color: <span className="text-white">{vehicle?.color}</span></p>
                </div>
              </div>
            </div>
            
            {/* Parking Location Details */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-lime-400 text-3xl mr-4 mt-1" />
                <div>
                  <h2 className="text-xl font-bold mb-2">Parking Location</h2>
                  <p className="text-gray-300 mb-1">Name: <span className="text-white">{parkingLocation?.name}</span></p>
                  <p className="text-gray-300 mb-1">Address: <span className="text-white">{parkingLocation?.location}</span></p>
                  <p className="text-gray-300">Available Spaces: <span className="text-white">{parkingLocation?.availableSpaces} / {parkingLocation?.totalSpaces}</span></p>
                  <p className="text-gray-300">Parking Type: <span className="text-white">{parkingLocation?.type}</span></p>
                </div>
              </div>
            </div>
            
            {/* Fee Details */}
            <div className="p-6">
              <div className="flex items-start">
                <FaClock className="text-lime-400 text-3xl mr-4 mt-1" />
                <div>
                  <h2 className="text-xl font-bold mb-2">Fee Information</h2>
                  <p className="text-gray-300 mb-1">Rate: <span className="text-white">${parkingLocation?.feePerHour} per hour</span></p>
                  <p className="text-gray-300 mb-4">Payment will be calculated based on your actual parking duration.</p>
                  
                  <div className="bg-lime-400/10 border border-lime-400/30 rounded p-3 text-sm">
                    <p className="text-lime-400">
                      Note: Your parking session will start immediately upon confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/find-parking"
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              onClick={handleConfirmParking}
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-bold ${
                isSubmitting 
                  ? 'bg-lime-400/50 text-black/50 cursor-not-allowed' 
                  : 'bg-lime-400 text-black hover:bg-lime-300 transition-colors'
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Parking'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmParkingPage;