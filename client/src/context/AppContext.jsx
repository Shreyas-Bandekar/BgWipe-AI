import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);

  const loadCreditData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/credits", {
        withCredentials: true,
      });
      setCredits(res.data.credits);
    } catch (err) {
      console.error("Error fetching credits:", err);
    }
  };

  useEffect(() => {
    loadCreditData();
  }, []);

  return (
    <AppContext.Provider value={{ credits, setCredits, loadCreditData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
