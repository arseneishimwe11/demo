import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaCar, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaPrint, FaDownload } from 'react-icons/fa';

const ParkingReceiptPage = () => {
  const { id } = useParams();
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const response = await axios.get(`/api/vehicles/entries/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setReceiptData(response.data.data);
      } catch (err) {
        console.error('Error fetching receipt data:', err);
        setError('Failed to load receipt information. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReceiptData();
  }, [id]);

  const formatDuration = (entry) => {
    if (!entry.entryDatetime || !entry.exitDatetime) return 'N/A';
    
    const entryTime = new Date(entry.entryDatetime);
    const exitTime = new Date(entry.exitDatetime);
    const diffMs = exitTime - entryTime;
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgba(5,5,5,1.00)] flex items-center justify-center">
        <div className="animate-pulse text-lime-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !receiptData) {
    return (
      <div className="min-h-screen bg-[rgba(5,5,5,1.00)] flex flex-col items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-lg mb-6 max-w-md w-full text-center">
          {error || 'Receipt information not found.'}
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
      <header className="bg-[rgba(15,15,15,0.6)] border-b border-gray-800 print:hidden">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold bg-lime-400 bg-clip-text text-transparent">
            ParkEase
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <div className="flex items-center">
            <Link to="/parking/history" className="mr-4 text-gray-400 hover:text-white">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">Parking Receipt</h1>
              <p className="text-gray-400">Receipt #{receiptData.tickets[0]?.ticketNumber || id}</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
            >
              <FaPrint className="mr-2" /> Print
            </button>
            <button
              className="px-4 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors flex items-center"
            >
              <FaDownload className="mr-2" /> Download PDF
            </button>
          </div>
        </div>
        
        {/* Receipt Card */}
        <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-8 max-w-3xl mx-auto print:bg-white print:text-black print:border-none">
          {/* Receipt Header */}
          <div className="text-center mb-8 print:mb-12">
            <h2 className="text-3xl font-bold bg-lime-400 bg-clip-text text-transparent print:text-black">ParkEase</h2>
            <p className="text-gray-400 print:text-gray-600 mt-2">Parking Receipt</p>
          </div>
          
          {/* Receipt Details */}
          <div className="space-y-6 print:space-y-8">
            {/* Ticket Info */}
            <div className="flex flex-col md:flex-row justify-between pb-6 border-b border-gray-700 print:border-gray-300">
              <div>
                <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Receipt Number</p>
                <p className="font-semibold">{receiptData.tickets[0]?.ticketNumber || `TKT-${id}`}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Date</p>
                <p className="font-semibold">
                  {new Date(receiptData.exitDatetime).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {/* Vehicle Info */}
            <div className="pb-6 border-b border-gray-700 print:border-gray-300">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaCar className="mr-2 text-lime-400 print:text-gray-700" /> Vehicle Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Plate Number</p>
                  <p className="font-semibold">{receiptData.plateNumber}</p>
                </div>
              </div>
            </div>
            
            {/* Parking Info */}
            <div className="pb-6 border-b border-gray-700 print:border-gray-300">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-lime-400 print:text-gray-700" /> Parking Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Parking Location</p>
                  <p className="font-semibold">{receiptData.parkingCode}</p>
                </div>
                <div>
                  <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Duration</p>
                  <p className="font-semibold">{formatDuration(receiptData)}</p>
                </div>
                <div>
                  <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Entry Time</p>
                  <p className="font-semibold">
                    {new Date(receiptData.entryDatetime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Exit Time</p>
                  <p className="font-semibold">
                    {new Date(receiptData.exitDatetime).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Payment Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaReceipt className="mr-2 text-lime-400 print:text-gray-700" /> Payment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Payment Method</p>
                  <p className="font-semibold">Credit Card</p>
                </div>
                <div>
                  <p className="text-gray-400 print:text-gray-600 text-sm mb-1">Payment Status</p>
                  <p className="font-semibold text-green-400 print:text-green-700">Paid</p>
                </div>
              </div>
              
              {/* Total */}
              <div className="bg-[rgba(25,25,25,0.6)] print:bg-gray-100 rounded-lg p-4 flex justify-between items-center">
                <p className="font-bold">Total Amount</p>
                <p className="text-2xl font-bold text-lime-400 print:text-black">
                  ${receiptData.chargedAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-12 text-center text-gray-400 print:text-gray-600 text-sm">
            <p>Thank you for using ParkEase!</p>
            <p className="mt-1">For any inquiries, please contact support@parkease.com</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParkingReceiptPage;