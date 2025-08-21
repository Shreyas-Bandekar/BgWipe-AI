// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [credits, setCredits] = useState(null);
  
  const backendUrl = "http://localhost:8000"; // Define your backend URL

  const fetchCredits = async () => {
    try {
      const token = await getToken();
      const {data} = await axios.get(backendUrl + '/api/user/credits',{headers:{Authorization: `Bearer ${token}`}})

      if(data.success){
        setCredits(data.credits);
        console.log("Credits fetched successfully:", data.credits);
      }

    } catch (error) {
      console.log("Error fetching credits:", error);
      toast.error(error.message);
    }
  }; // Add missing closing brace

  useEffect(() => {
    fetchCredits();
  }, []); // Move useEffect inside component

  return (
    <AppContext.Provider value={{ credits, fetchCredits }}>
      {children}
    </AppContext.Provider>
  );
};


export default AppContextProvider;
