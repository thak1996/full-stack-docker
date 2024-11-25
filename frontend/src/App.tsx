import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { AppProvider } from "./context/AppContext";
import HomePage from "./pages/Home/HomePage";

const App: React.FC = () => {
    return (
        <AppProvider>
            <GlobalStyles />
            <HomePage />
        </AppProvider>
    );
};

export default App;
