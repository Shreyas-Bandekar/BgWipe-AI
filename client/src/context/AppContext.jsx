import React, { createContext } from 'react';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = ({ props }) => {
  
    const [credit, setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { getToken } = useAuth();

    const loadCreditData = async () => {
        try {
            const token = await getToken();
            const {data} = await axios.get(backendUrl+ '/api/user/credits', {
                headers: {Authorization: `Bearer ${token}`}
            });


            if (data.success) {
                setCredit(data.credit);
            }
        } catch (error) {
            
        }
    };

    const value = {

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;