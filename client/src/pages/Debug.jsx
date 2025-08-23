import React, { useContext, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Debug = () => {
  const { getToken } = useAuth();
  const { user, isSignedIn } = useUser();
  const { credit, backendUrl } = useContext(AppContext);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [authTestResult, setAuthTestResult] = useState(null);

  const testAuthentication = async () => {
    try {
      const token = await getToken();
      console.log('Testing auth with token:', token);
      
      const response = await axios.get(`${backendUrl}/api/user/test-auth`, {
        headers: { token }
      });
      
      setAuthTestResult(response.data);
      console.log('Auth test result:', response.data);
    } catch (error) {
      console.error('Auth test error:', error);
      setAuthTestResult({
        success: false,
        error: error.response?.data?.message || error.message
      });
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          console.log('Raw token:', token);
          
          // Decode token manually to see its structure
          if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            const decoded = JSON.parse(jsonPayload);
            setTokenInfo(decoded);
            console.log('Decoded token payload:', decoded);
          }
        } catch (error) {
          console.error('Token decode error:', error);
        }
      }
    };

    checkToken();
  }, [isSignedIn, getToken]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Debug Information</h1>
        
        <div className="grid gap-6">
          {/* Authentication Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
            <div className="space-y-2">
              <p><strong>Signed In:</strong> {isSignedIn ? 'Yes' : 'No'}</p>
              <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
              <p><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress || 'N/A'}</p>
              <p><strong>Full Name:</strong> {user?.fullName || 'N/A'}</p>
            </div>
          </div>

          {/* Token Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Token Information</h2>
            {tokenInfo ? (
              <div className="space-y-2">
                <p><strong>Subject (sub):</strong> {tokenInfo.sub || 'N/A'}</p>
                <p><strong>Issuer:</strong> {tokenInfo.iss || 'N/A'}</p>
                <p><strong>Audience:</strong> {tokenInfo.aud || 'N/A'}</p>
                <p><strong>Expires:</strong> {tokenInfo.exp ? new Date(tokenInfo.exp * 1000).toLocaleString() : 'N/A'}</p>
                <p><strong>Issued At:</strong> {tokenInfo.iat ? new Date(tokenInfo.iat * 1000).toLocaleString() : 'N/A'}</p>
                <details className="mt-4">
                  <summary className="cursor-pointer font-medium">Full Token Payload</summary>
                  <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
                    {JSON.stringify(tokenInfo, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p className="text-gray-500">No token information available</p>
            )}
          </div>

          {/* App Context */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">App Context</h2>
            <div className="space-y-2">
              <p><strong>Credits:</strong> {credit}</p>
              <p><strong>Backend URL:</strong> {backendUrl}</p>
            </div>
          </div>

          {/* Authentication Test */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Authentication Test</h2>
            <button
              onClick={testAuthentication}
              disabled={!isSignedIn}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Test Server Authentication
            </button>
            
            {authTestResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Test Result:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(authTestResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Environment Variables */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2">
              <p><strong>VITE_BACKEND_URL:</strong> {import.meta.env.VITE_BACKEND_URL || 'Not set'}</p>
              <p><strong>VITE_CLERK_PUBLISHABLE_KEY:</strong> {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug;