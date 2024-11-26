import React, { useState } from "react";
import apiService from "../services/apiService";
import TransportServiceForm from "../components/TransportServiceForm";
import Error from "../components/Error";
import {
    RideEstimateResponse,
    RideEstimateRequest
} from "../interface/rideEstimate";
import { CenteredContainer } from "../styles/homeStyles";
import Loading from "../components/Loading";

const HomePage: React.FC = () => {
    const [rideInfo, setRideInfo] = useState<RideEstimateResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleEstimate = async (data: RideEstimateRequest) => {
        console.log(data);
        setLoading(true);
        setError(null);

        try {
            const response = await apiService.estimateRide(data);
            console.log(response);
            setRideInfo(response);
        } catch (error) {
            const errorMessage =
                (error as Error).message || "Um erro desconhecido ocorreu";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseError = () => {
        setError(null);
        window.history.back();
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <CenteredContainer>
            <TransportServiceForm onEstimate={handleEstimate} />
            {error && <Error message={error} onClose={handleCloseError} />}
        </CenteredContainer>
    );
};

export default HomePage;
