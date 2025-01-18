import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/check-session",
          { withCredentials: true }
        );
        setIsAuthorized(response.data.import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/check-session', { withCredentials: true });
        setIsAuthorized(response.data.otpVerified);
      } catch {
        setIsAuthorized(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Or a loader
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
);
      } catch {
        setIsAuthorized(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Or a loader
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
