import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Access Denied</h2>
        <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
        <button 
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
