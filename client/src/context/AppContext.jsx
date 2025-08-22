import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  
  const loadCreditData = async () => {
    if (!isLoaded || !isSignedIn || !user) {
      console.log('User not loaded or not signed in');
      return;
    }
    
    try {
      console.log('Getting token from Clerk...');
      // Try to get a JWT token
      const token = await getToken();
      
      if (!token) {
        console.error('Failed to get token from Clerk');
        return;
      }
      
      // Log the user ID for debugging
      console.log('User ID:', user.id);
      
      console.log('Token obtained, making API request...');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-ID': user.id // Add user ID as a separate header
        }
      });
      
      console.log('Credits response:', res.data);
      setCredits(res.data.creditBalance || 0);
    } catch (err) {
      console.error("Error fetching credits:", err);
      console.error("Error details:", err.response?.data || err.message);
      // Set default credits if there's an error
      setCredits(0);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      loadCreditData();
    }
  }, [isLoaded, isSignedIn, user]);



  return (
    <AppContext.Provider value={{ credits, setCredits, loadCreditData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
