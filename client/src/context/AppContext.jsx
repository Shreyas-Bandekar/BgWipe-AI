import React, { createContext } from 'react';
import { useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ props }) => {
  
    const [credit, setCredit] = useState(false);

    const loadCreditData = async () => {
        const response = await new Promise((resolve) =>
            setTimeout(() => resolve({ credit: 100 }), 1000)
        );
        setCredit(response.credit);
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