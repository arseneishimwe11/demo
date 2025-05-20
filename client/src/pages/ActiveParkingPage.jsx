import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaCar, FaMapMarkerAlt, FaClock, FaReceipt } from 'react-icons/fa';

const ActiveParkingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [parkingData, setParkingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [elapsedTime, setElapsedTime] = useState('');
  const [estimatedFee, setEstimatedFee] = useState(0);
  const [confirmExit, setConfirmExit] = useState(false);
  const [exitLoading, setExitLoading] = useState(false);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await axios.get(`/api/vehicles/entries/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setParkingData(response.data.data);
      } catch (err) {
        console.error('Error fetching parking data:', err);
        setError('Failed to load parking information. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchParkingData();
  }, [id]);

  useEffect(() => {
    // Update elapsed time and estimated fee every minute
    if (!parkingData) return;
    
    const updateElapsedTime = () => {
      const entryTime = new Date(parkingData.entryDatetime);
      const now = new Date();
      const diffMs = now - entryTime;
      
      // Calculate hours, minutes
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setElapsedTime(`${hours}h ${minutes}m`);
      
      // Calculate estimated fee (assuming fee per hour is available in parkingData)
      const hourlyRate = parkingData.parkingLocation?.feePerHour || 5; // Default to $5 if not available
      const totalHours = Math.ceil(diffMs / (1000 * 60 * 60)); // Round up to nearest hour
      setEstimatedFee(totalHours * hourlyRate);
    };
    
    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [parkingData]);

  const handleExitParking = async () => {
    setExitLoading(true);
    
    try {
      await axios.post(`/api/vehicles/exit`, { id: parkingData.id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      // Redirect to receipt page
      navigate(`/parking/receipt/${parkingData.id}`);
    } catch (err) {
      console.error('Error exiting parking:', err);
      setError('Failed to process parking exit. Please try again.');
      setExitLoading(false);
      setConfirmExit(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgba(5,5,5,1.00)] flex items-center justify-center">
        <div className="animate-pulse text-lime-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[rgba(5,5,5,1.00)] flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-lg mb-6 max-w-md w-full text-center">
          {error}
        </div>
        <Link 
          to="/dashboard" 
          className="px-6 py-3 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!parkingData) {
    return (
      <div className="min-h-screen bg-[rgba(5,5,5,1.00)] flex flex-col items-center justify-center p-4">
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-6 py-4 rounded-lg mb-6 max-w-md w-full text-center">
          Parking information not found.
        </div>
        <Link 
          to="/dashboard" 
          className="px-6 py-3 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors"
        >
          Return to Dashboard
        </Link>
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
        {/* Page Header */}
        <div className="flex items-center mb-8">
          <Link to="/dashboard" className="mr-4 text-gray-400 hover:text-white">
            <FaArrowLeft />
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2">Active Parking</h1>
            <p className="text-gray-400">View your current parking details</p>
          </div>
        </div>
        
        {/* Parking Information Card */}
        <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-lime-400/20 p-3 rounded-full mr-4">
                <FaCar className="text-lime-400 text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{parkingData.plateNumber}</h3>
                <p className="text-gray-400">Ticket #{parkingData.tickets?.[0]?.ticketNumber || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-lime-400/10 text-lime-400 px-4 py-2 rounded-full text-sm font-medium">
              Active
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start">
              <div className="bg-[rgba(25,25,25,0.6)] p-3 rounded-lg mr-4">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Parking Location</p>
                <h4 className="font-semibold">{parkingData.parkingLocation?.name || 'Unknown Location'}</h4>
                <p className="text-gray-400 text-sm">{parkingData.parkingLocation?.location || ''}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-[rgba(25,25,25,0.6)] p-3 rounded-lg mr-4">
                <FaClock className="text-gray-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Entry Time</p>
                <h4 className="font-semibold">
                  {new Date(parkingData.entryDatetime).toLocaleString()}
                </h4>
                <p className="text-gray-400 text-sm">Duration: {elapsedTime}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[rgba(25,25,25,0.6)] rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-400">Hourly Rate</p>
              <p>${parkingData.parkingLocation?.feePerHour || '5.00'}/hr</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-400">Duration</p>
              <p>{elapsedTime}</p>
            </div>
            <div className="border-t border-gray-700 my-2 pt-2"></div>
            <div className="flex justify-between items-center">
              <p className="font-semibold">Estimated Fee</p>
              <p className="font-semibold text-lime-400">${estimatedFee.toFixed(2)}</p>
            </div>
          </div>
          
          <button
            onClick={() => setConfirmExit(true)}
            className="w-full py-3 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors"
          >
            Exit Parking
          </button>
        </div>
        
        {/* Additional Information */}
        <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Important Information</h3>
          <ul className="space-y-2 text-gray-400">
            <li>• Please keep your ticket until you exit the parking area.</li>
            <li>• The final fee will be calculated based on your actual exit time.</li>
            <li>• For assistance, please contact our support at support@parkease.com</li>
          </ul>
        </div>
      </main>
      
      {/* Exit Confirmation Modal */}
      {confirmExit && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[rgba(15,15,15,1)] border border-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Exit</h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to exit the parking? You will be charged ${estimatedFee.toFixed(2)}.
            </p>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setConfirmExit(false)}
                className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
                disabled={exitLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleExitParking}
                className="flex-1 py-3 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors flex items-center justify-center"
                disabled={exitLoading}
              >
                {exitLoading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <span>Confirm Exit</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveParkingPage;