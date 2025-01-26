import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', loanAmount: 500000, status: 'Pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', loanAmount: 300000, status: 'Pending' },
    { id: 3, name: 'Ali Ahmed', email: 'ali@example.com', loanAmount: 200000, status: 'Pending' },
    { id: 4, name: 'Ali Ahmed', email: 'ali@example.com', loanAmount: 200000, status: 'Pending' },
    { id: 5, name: 'Ali Ahmed', email: 'ali@example.com', loanAmount: 200000, status: 'Pending' },
  ]);

  const handleAction = (id, action) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: action } : request
    );
    setRequests(updatedRequests);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Name</th>
                <th className="border border-gray-300 p-3 text-left">Email</th>
                <th className="border border-gray-300 p-3 text-left">Loan Amount</th>
                <th className="border border-gray-300 p-3 text-left">Status</th>
                <th className="border border-gray-300 p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{request.name}</td>
                  <td className="border border-gray-300 p-3">{request.email}</td>
                  <td className="border border-gray-300 p-3">PKR {request.loanAmount.toLocaleString()}</td>
                  <td
                    className={`border border-gray-300 p-3 ${
                      request.status === 'Accepted'
                        ? 'text-green-600'
                        : request.status === 'Rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {request.status}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {request.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleAction(request.id, 'Accepted')}
                          className="bg-green-600 text-white py-1 px-3 rounded-md mr-2 hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(request.id, 'Rejected')}
                          className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">No Action Available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminDashboard;
