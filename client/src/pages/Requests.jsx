import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { bloodRequestAPI } from '../services/api';
import CreateRequest from '../components/CreateRequest';
import { FaTint, FaMapMarkerAlt, FaClock, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Requests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState('all'); // all, my-requests, available

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    try {
      let response;
      if (filter === 'my-requests' && (user?.role === 'hospital' || user?.role === 'bloodbank')) {
        response = await bloodRequestAPI.getMyRequests();
      } else {
        response = await bloodRequestAPI.getRequests();
      }
      setRequests(response.data);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (requestId) => {
    try {
      await bloodRequestAPI.respondToRequest(requestId, 'interested');
      toast.success('Response sent successfully!');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to respond to request');
    }
  };

  const handleManageDonor = async (requestId, donorId, action) => {
    try {
      await bloodRequestAPI.manageDonorResponse(requestId, donorId, action);
      toast.success(`Donor ${action}ed successfully!`);
      fetchRequests();
    } catch (error) {
      toast.error(`Failed to ${action} donor`);
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await bloodRequestAPI.updateRequestStatus(requestId, status);
      toast.success('Request status updated!');
      fetchRequests();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blood Requests</h1>
          <div className="flex space-x-4">
            {/* Filter Buttons */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Requests</option>
              <option value="available">Available (No Donor)</option>
              {(user?.role === 'hospital' || user?.role === 'bloodbank') && (
                <option value="my-requests">My Requests</option>
              )}
            </select>
            
            {(user?.role === 'hospital' || user?.role === 'bloodbank') && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <FaPlus />
                <span>Create Request</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FaTint className="text-red-500" />
                  <span className="font-bold text-lg">{request.bloodGroup}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.urgency === 'emergency' ? 'bg-red-100 text-red-800' :
                    request.urgency === 'urgent' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.urgency}
                  </span>
                  
                  {/* Donor Status */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'fulfilled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {request.status === 'fulfilled' ? 'Got Donor' : 'Need Donor'}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{request.hospitalName}</h3>
              <p className="text-gray-600 mb-2">Patient: {request.patientName}</p>
              <p className="text-gray-600 mb-4">Units needed: {request.unitsNeeded}</p>

              <div className="flex items-center text-gray-500 text-sm mb-4">
                <FaMapMarkerAlt className="mr-1" />
                <span>{request.location?.city}</span>
              </div>

              <div className="flex items-center text-gray-500 text-sm mb-4">
                <FaClock className="mr-1" />
                <span>{new Date(request.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Show accepted donors for blood banks/hospitals */}
              {(user?.role === 'hospital' || user?.role === 'bloodbank') && request.responses?.filter(r => r.status === 'accepted').length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium text-green-800 mb-2">✅ Accepted Donors ({request.responses.filter(r => r.status === 'accepted').length})</h4>
                  <div className="space-y-2">
                    {request.responses.filter(r => r.status === 'accepted').map((response) => (
                      <div key={response._id} className="bg-green-50 border border-green-200 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm text-green-900">{response.donor?.profile?.name || response.donor?.email}</p>
                            <p className="text-xs text-green-700">📞 {response.donor?.profile?.phone}</p>
                            <p className="text-xs text-green-700">🩸 {response.donor?.profile?.bloodGroup}</p>
                            <p className="text-xs text-green-700">📍 {response.donor?.profile?.address?.city}</p>
                            <p className="text-xs text-green-600">Accepted: {new Date(response.acceptedAt).toLocaleDateString()}</p>
                          </div>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            CONFIRMED
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show donor responses for blood banks/hospitals */}
              {(user?.role === 'hospital' || user?.role === 'bloodbank') && request.responses?.filter(r => r.status === 'interested').length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Pending Responses ({request.responses.filter(r => r.status === 'interested').length})</h4>
                  <div className="space-y-2">
                    {request.responses.filter(r => r.status === 'interested').map((response) => (
                      <div key={response._id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{response.donor?.profile?.name || response.donor?.email}</p>
                            <p className="text-xs text-gray-600">{response.donor?.profile?.phone}</p>
                            <p className="text-xs text-gray-600">Blood Group: {response.donor?.profile?.bloodGroup}</p>
                            <p className="text-xs text-gray-600">{response.donor?.profile?.address?.city}</p>
                          </div>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {response.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleManageDonor(request._id, response.donor._id, 'accept')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleManageDonor(request._id, response.donor._id, 'deny')}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                          >
                            Deny
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {user?.role === 'donor' && (
                <button 
                  onClick={() => handleRespond(request._id)}
                  disabled={request.responses?.some(r => r.donor === user._id) || request.status === 'fulfilled'}
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    request.responses?.some(r => r.donor === user._id) 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : request.status === 'fulfilled'
                      ? 'bg-yellow-300 text-yellow-800 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {request.responses?.some(r => r.donor === user._id) 
                    ? 'Already Responded' 
                    : request.status === 'fulfilled'
                    ? 'Donor Found'
                    : 'Respond to Request'
                  }
                </button>
              )}

              {/* Hospital Controls - Show on all requests if user is hospital/bloodbank */}
              {(user?.role === 'hospital' || user?.role === 'bloodbank') && (
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleUpdateStatus(request._id, 'active')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm ${
                      request.status === 'active'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Need Donor
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(request._id, 'fulfilled')}
                    className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm ${
                      request.status === 'fulfilled'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Got Donor
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blood requests found</p>
          </div>
        )}

        {/* Create Request Modal */}
        {showCreateForm && (
          <CreateRequest
            onClose={() => setShowCreateForm(false)}
            onSuccess={fetchRequests}
          />
        )}
      </div>
    </div>
  );
};

export default Requests;