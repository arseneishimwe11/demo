import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeBookings: 0,
    totalUsers: 0,
    occupancyRate: 0,
    totalParkingLots: 0,
    totalSlots: 0
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
            totalRevenue: 15680.50,
            totalBookings: 342,
            activeBookings: 48,
            totalUsers: 215,
            occupancyRate: 72,
            totalParkingLots: 8,
            totalSlots: 450
          });
          
          setRecentBookings([
            {
              id: 'BK-1234',
              user: 'John Doe',
              parkingLot: 'Central City Parking',
              startTime: '2023-06-15T09:00:00',
              endTime: '2023-06-15T17:00:00',
              status: 'active',
              amount: 25.00
            },
            {
              id: 'BK-1235',
              user: 'Jane Smith',
              parkingLot: 'Downtown Garage',
              startTime: '2023-06-14T10:00:00',
              endTime: '2023-06-14T14:00:00',
              status: 'completed',
              amount: 15.50
            },
            {
              id: 'BK-1236',
              user: 'Robert Johnson',
              parkingLot: 'Airport Parking',
              startTime: '2023-06-20T08:00:00',
              endTime: '2023-06-25T20:00:00',
              status: 'upcoming',
              amount: 120.00
            },
            {
              id: 'BK-1237',
              user: 'Emily Davis',
              parkingLot: 'Mall Parking',
              startTime: '2023-06-18T12:00:00',
              endTime: '2023-06-18T18:00:00',
              status: 'upcoming',
              amount: 18.00
            },
            {
              id: 'BK-1238',
              user: 'Michael Wilson',
              parkingLot: 'Central City Parking',
              startTime: '2023-06-13T14:00:00',
              endTime: '2023-06-13T16:00:00',
              status: 'completed',
              amount: 10.00
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

  // Revenue chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 1800, 2400, 2800, 3200],
        borderColor: 'rgba(219, 251, 54, 1)',
        backgroundColor: 'rgba(219, 251, 54, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Bookings chart data
  const bookingsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Bookings',
        data: [25, 32, 28, 35, 42, 38, 30],
        backgroundColor: 'rgba(219, 251, 54, 0.8)',
        borderRadius: 4
      }
    ]
  };

  // Occupancy chart data
  const occupancyData = {
    labels: ['Occupied', 'Available'],
    datasets: [
      {
        data: [stats.occupancyRate, 100 - stats.occupancyRate],
        backgroundColor: [
          'rgba(219, 251, 54, 0.8)',
          'rgba(100, 100, 100, 0.2)'
        ],
        borderWidth: 0
      }
    ]
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your parking system</p>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-400/10 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Total Bookings</p>
                  <h3 className="text-2xl font-bold text-white">{stats.totalBookings}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-400/10 text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <h3 className="text-2xl font-bold text-white">{stats.totalUsers}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-pink-400/10 text-pink-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-400 text-sm">Parking Lots</p>
                  <h3 className="text-2xl font-bold text-white">{stats.totalParkingLots}</h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl border border-gray-800 p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-white mb-4">Revenue Overview</h2>
              <div className="h-64">
                <Line 
                  data={revenueData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(75, 75, 75, 0.2)'
                        },
                        ticks: {
                          color: 'rgba(200, 200, 200, 0.8)'
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(75, 75, 75, 0.2)'
                        },
                        ticks: {
                          color: 'rgba(200, 200, 200, 0.8)'
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        labels: {
                          color: 'rgba(200, 200, 200, 0.8)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl border border-gray-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Current Occupancy</h2>
              <div className="h-64 flex items-center justify-center">
                <Doughnut 
                  data={occupancyData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: 'rgba(200, 200, 200, 0.8)'
                        }
                      }
                    }
                  }}
                />
                <div className="absolute text-center">
                  <div className="text-3xl font-bold text-white">{stats.occupancyRate}%</div>
                  <div className="text-gray-400 text-sm">Occupied</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-[rgba(15,15,15,0.6)] rounded-xl border border-gray-800 p-6">
              <h2 className="text