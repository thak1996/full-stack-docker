import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [state, setState] = useState({});

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
