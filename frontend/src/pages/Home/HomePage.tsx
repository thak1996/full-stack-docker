import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import TransportServiceForm from "../../components/TransportServiceForm";

const HomePage: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiService.fetchHomeData();
                setMessage(data.message);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Um erro desconhecido ocorreu");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div>
            <TransportServiceForm />
        </div>
    );
};

export default HomePage;