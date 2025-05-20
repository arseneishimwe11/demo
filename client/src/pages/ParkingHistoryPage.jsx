import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaCar, FaMapMarkerAlt, FaClock, FaReceipt, FaSearch, FaCalendarAlt } from 'react-icons/fa';

const ParkingHistoryPage = () => {
  const [parkingHistory, setParkingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchParkingHistory();
  }, [currentPage, searchTerm, dateFilter]);

  const fetchParkingHistory = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = {
        page: currentPage,
        limit: 10,
        status: 'completed'
      };
      
      if (searchTerm) {
        params.plateNumber = searchTerm;
      }
      
      if (dateFilter.startDate) {
        params.startDate = dateFilter.startDate;
      }
      
      if (dateFilter.endDate) {
        params.endDate = dateFilter.endDate;
      }
      
      const response = await axios.get('/api/vehicles/entries', {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setParkingHistory(response.data.data || []);
      setTotalPages(response.data.pagination?.pages || 1);
    } catch (err) {
      console.error('Error fetching parking history:', err);
      setError('Failed to load parking history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDateFilterChange = (e) => {
    setDateFilter({
      ...dateFilter,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter({
      startDate: '',
      endDate: ''
    });
    setCurrentPage(1);
  };

  const formatDuration = (entry) => {
    if (!entry.entryDatetime || !entry.exitDatetime) return 'N/A';
    
    const entryTime = new Date(entry.entryDatetime);
    const exitTime = new Date(entry.exitDatetime);
    const diffMs = exitTime - entryTime;
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  if (loading && parkingHistory.length === 0) {
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
            <h1 className="text-3xl font-bold mb-2">Parking History</h1>
            <p className="text-gray-400">View your past parking sessions</p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="searchTerm" className="block text-gray-400 mb-2">Search by Plate Number</label>
                <div className="relative">
                  <input
                    type="text"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-[rgba(25,25,25,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
                    placeholder="Enter plate number..."
                  />
                  <FaSearch className="absolute left-3 top-3.5 text-gray-500" />
                </div>
              </div>
              
              <div className="flex-1">
                <label htmlFor="startDate" className="block text-gray-400 mb-2">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={dateFilter.startDate}
                    onChange={handleDateFilterChange}
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-[rgba(25,25,25,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
                  />
                  <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-500" />
                </div>
              </div>
              
              <div className="flex-1">
                <label htmlFor="endDate" className="block text-gray-400 mb-2">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={dateFilter.endDate}
                    onChange={handleDateFilterChange}
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-[rgba(25,25,25,0.6)] border border-gray-700 text-white focus:outline-none focus:border-lime-400"
                  />
                  <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-4">
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Filters
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        
        {/* Parking History List */}
        {parkingHistory.length === 0 ? (
          <div className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-4">No parking history found.</p>
            <Link
              to="/dashboard"
              className="px-6 py-2 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors inline-block"
            >
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {parkingHistory.map((entry) => (
                <div key={entry.id} className="bg-[rgba(15,15,15,0.6)] border border-gray-800 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="bg-lime-400/20 p-3 rounded-full mr-4">
                        <FaCar className="text-lime-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{entry.plateNumber}</h3>
                        <p className="text-gray-400">Ticket #{entry.tickets?.[0]?.ticketNumber || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Amount Paid</p>
                        <p className="text-xl font-semibold text-lime-400">${Number(entry.chargedAmount).toFixed(2)}</p>
                      </div>
                      <Link
                        to={`/parking/receipt/${entry.id}`}
                        className="p-3 bg-[rgba(25,25,25,0.6)] rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <FaReceipt className="text-gray-400" />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start">
                      <div className="bg-[rgba(25,25,25,0.6)] p-3 rounded-lg mr-4">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Parking Location</p>
                        <h4 className="font-semibold">{entry.parkingLocation?.name || entry.parkingCode}</h4>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-[rgba(25,25,25,0.6)] p-3 rounded-lg mr-4">
                        <FaClock className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Duration</p>
                        <h4 className="font-semibold">{formatDuration(entry)}</h4>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-[rgba(25,25,25,0.6)] p-3 rounded-lg mr-4">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Date</p>
                        <h4 className="font-semibold">
                          {new Date(entry.entryDatetime).toLocaleDateString()}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center px-4 py-2 bg-[rgba(25,25,25,0.6)] rounded-lg">
                    <span className="text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ParkingHistoryPage;