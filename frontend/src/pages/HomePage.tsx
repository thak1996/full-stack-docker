import React, { useState } from "react";
import apiService from "../services/apiService";
import TransportServiceForm from "../components/TransportServiceForm";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
    RideEstimateResponse,
    RideEstimateRequest
} from "../interface/rideEstimate";
import { CenteredContainer } from "../styles/homeStyles";

const HomePage: React.FC = () => {
    const [rideInfo, setRideInfo] = useState<RideEstimateResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);

    const handleEstimate = async (data: RideEstimateRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.estimateRide(data);
            console.log(response);
            setRideInfo(response);
            setCurrentStep(1);
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

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <CenteredContainer>
            {loading && <Loading />}
            {currentStep === 0 && (
                <TransportServiceForm onEstimate={handleEstimate} />
            )}
            {currentStep === 1 && (
                <div>
                    <h2>Resumo da Estimativa</h2>
                    {rideInfo && (
                        <p>
                            Informações da corrida: {JSON.stringify(rideInfo)}
                        </p>
                    )}
                    <button onClick={handlePreviousStep}>Voltar</button>
                </div>
            )}
            {error && <Error message={error} onClose={handleCloseError} />}
        </CenteredContainer>
    );
};

export default HomePage;
