import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [stats, setStats] = useState({
    activeBookings: 0,
    upcomingBookings: 0,
    totalSpent: 0,
    favoriteLocations: 0
  });
  
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        // For now, we'll use mock data
        setTimeout(() => {
          setStats({
            activeBookings: 2,
            upcomingBookings: 3,
            totalSpent: 156.50,
            favoriteLocations: 4
          });
          
          setRecentBookings([
            {
              id: 'BK-1234',
              parkingLot: 'Central City Parking',
              startTime: '2023-06-15T09:00:00',
              endTime: '2023-06-15T17:00:00',
              status: 'active',
              amount: 25.00
            },
            {
              id: 'BK-1235',
              parkingLot: 'Downtown Garage',
              startTime: '2023-06-14T10:00:00',
              endTime: '2023-06-14T14:00:00',
              status: 'completed',
              amount: 15.50
            },
            {
              id: 'BK-1236',
              parkingLot: 'Airport Parking',
              startTime: '2023-06-20T08:00:00',
              endTime: '2023-06-25T20:00:00',
              status: 'upcoming',
              amount: 120.00
            }
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back to your ParkEase dashboard</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-400"></div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-lime-400/10 text-lime-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Active Bookings</p>
                  <h3 className="text-2xl font-bold text-white">{stats.activeBookings}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-400/10 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Upcoming Bookings</p>
                  <h3 className="text-2xl font-bold text-white">{stats.upcomingBookings}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-400/10 text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Total Spent</p>
                  <h3 className="text-2xl font-bold text-white">${stats.totalSpent.toFixed(2)}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-400/10 text-pink-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Favorite Locations</p>
                  <h3 className="text-2xl font-bold text-white">{stats.favoriteLocations}</h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Bookings */}
          <div className="bg-[rgba(15,15,15,0.6)] rounded-xl border border-gray-800 mb-8">
            <div className="p-6 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
                <Link to="/bookings" className="text-lime-400 hover:underline text-sm font-medium">
                  View all
                </Link>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="px-6 py-3 font-medium">Booking ID</th>
                    <th className="px-6 py-3 font-medium">Location</th>
                    <th className="px-6 py-3 font-medium">Start Time</th>
                    <th className="px-6 py-3 font-medium">End Time</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-gray-800 text-white">
                      <td className="px-6 py-4">{booking.id}</td>
                      <td className="px-6 py-4">{booking.parkingLot}</td>
                      <td className="px-6 py-4">{formatDate(booking.startTime)}</td>
                      <td className="px-6 py-4">{formatDate(booking.endTime)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">${booking.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <Link to={`/bookings/${booking.id}`} className="text-lime-400 hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-[rgba(15,15,15,0.6)] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/dashboard/vehicles" className="bg-[rgba(20,20,20,0.8)] hover:bg-[rgba(30,30,30,0.8)] transition-colors p-4 rounded-lg flex items-center">
                <div className="p-3 rounded-full bg-lime-400/10 text-lime-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-18 0 7 7 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Find Parking</span>
              </Link>
              
              <Link to="/dashboard/vehicles" className="bg-[rgba(20,20,20,0.8)] hover:bg-[rgba(30,30,30,0.8)] transition-colors p-4 rounded-lg flex items-center">
                <div className="p-3 rounded-full bg-blue-400/10 text-blue-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <span className="text-white font-medium">Manage Vehicles</span>
              </Link>
              
              <Link to="/profile" className="bg-[rgba(20,20,20,0.8)] hover:bg-[rgba(30,30,30,0.8)] transition-colors p-4 rounded-lg flex items-center">
                <div className="p-3 rounded-full bg-purple-400/10 text-purple-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Edit Profile</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;