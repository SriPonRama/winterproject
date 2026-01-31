import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { bloodRequestAPI } from '../services/api';
import { FaTint, FaPhone, FaMapMarkerAlt, FaCalendar, FaUser, FaCheck, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const RequestResponses = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, accepted, pending

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await bloodRequestAPI.getMyRequests();
      setRequests(response.data);
    } catch (error) {
      toast.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleManageDonor = async (requestId, donorId, action) => {
    try {
      console.log('Managing donor:', { requestId, donorId, action });
      await bloodRequestAPI.manageDonorResponse(requestId, donorId, action);
      toast.success(`Donor ${action}ed successfully!`);
      fetchRequests();
    } catch (error) {
      console.error('Error managing donor:', error);
      toast.error(error.response?.data?.message || `Failed to ${action} donor`);
    }
  };

  const getFilteredDonors = () => {
    let allDonors = [];
    requests.forEach(request => {
      if (request.responses) {
        request.responses.forEach(response => {
          if (filter === 'all' || 
              (filter === 'accepted' && response.status === 'accepted') ||
              (filter === 'pending' && response.status === 'interested')) {
            allDonors.push({
              ...response,
              requestId: request._id,
              requestBloodGroup: request.bloodGroup,
              hospitalName: request.hospitalName,
              patientName: request.patientName,
              urgency: request.urgency
            });
          }
        });
      }
    });
    return allDonors;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const filteredDonors = getFilteredDonors();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Request Responses</h1>
            <p className="text-gray-600">Manage donor responses to your blood requests</p>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Responses</option>
            <option value="accepted">Accepted Donors</option>
            <option value="pending">Pending Responses</option>
          </select>
        </div>

        {filteredDonors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No donor responses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <motion.div
                key={`${donor.requestId}-${donor.donor._id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  donor.status === 'accepted' ? 'border-green-500' :
                  donor.status === 'denied' ? 'border-red-500' :
                  'border-yellow-500'
                }`}
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    donor.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    donor.status === 'denied' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {donor.status === 'accepted' ? '✅ Accepted' :
                     donor.status === 'denied' ? '❌ Denied' :
                     '⏳ Pending'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    donor.urgency === 'emergency' ? 'bg-red-100 text-red-800' :
                    donor.urgency === 'urgent' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {donor.urgency}
                  </span>
                </div>

                {/* Donor Information */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      {donor.donor?.profile?.name || donor.donor?.email}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-gray-400" />
                    <span className="text-gray-700">{donor.donor?.profile?.phone || 'Not provided'}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaTint className="text-red-500" />
                    <span className="font-medium text-red-600">
                      {donor.donor?.profile?.bloodGroup || 'Not specified'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span className="text-gray-700">
                      {donor.donor?.profile?.address?.city || 'Location not provided'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaCalendar className="text-gray-400" />
                    <span className="text-gray-700 text-sm">
                      Responded: {new Date(donor.respondedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Request Details */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">Request Details</h4>
                  <p className="text-sm text-gray-600">Patient: {donor.patientName}</p>
                  <p className="text-sm text-gray-600">Hospital: {donor.hospitalName}</p>
                  <p className="text-sm text-gray-600">Blood Type: {donor.requestBloodGroup}</p>
                </div>

                {/* Debug donor object */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="bg-yellow-50 p-2 rounded text-xs mb-2">
                    <pre>{JSON.stringify(donor.donor, null, 2)}</pre>
                  </div>
                )}

                {/* Action Buttons */}
                {donor.status === 'interested' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const donorId = donor.donor?._id || donor.donor;
                        console.log('Accept - Donor ID:', donorId, 'Full donor:', donor.donor);
                        if (!donorId) {
                          toast.error('Donor ID not found');
                          return;
                        }
                        handleManageDonor(donor.requestId, donorId, 'accept');
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1"
                    >
                      <FaCheck />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => {
                        const donorId = donor.donor?._id || donor.donor;
                        console.log('Deny - Donor ID:', donorId, 'Full donor:', donor.donor);
                        if (!donorId) {
                          toast.error('Donor ID not found');
                          return;
                        }
                        handleManageDonor(donor.requestId, donorId, 'deny');
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1"
                    >
                      <FaTimes />
                      <span>Deny</span>
                    </button>
                  </div>
                )}

                {donor.status === 'accepted' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm font-medium">
                      ✅ Donor confirmed for donation
                    </p>
                    <p className="text-green-600 text-xs">
                      Accepted on: {new Date(donor.acceptedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestResponses;