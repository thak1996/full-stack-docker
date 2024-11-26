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
    const [error, setError] = useState<string>("");

    const handleEstimate = async (data: RideEstimateRequest) => {
        setLoading(true);
        setError("");

        try {
            const response = await apiService.estimateRide(data);
            setRideInfo(response);
        } catch (error) {
            const errorMessage =
                (error as Error).message || "Um erro desconhecido ocorreu";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <CenteredContainer>
            <TransportServiceForm onEstimate={handleEstimate} />
            {error && <Error message={error} />}
            {rideInfo && (
                <div>
                    <h2>Informações da Corrida</h2>
                    <p>
                        Origem: {rideInfo.origin.latitude},{" "}
                        {rideInfo.origin.longitude}
                    </p>
                    <p>
                        Destino: {rideInfo.destination.latitude},{" "}
                        {rideInfo.destination.longitude}
                    </p>
                    <p>Distância: {rideInfo.distance} metros</p>
                    <p>Duração: {rideInfo.duration}</p>
                    <h3>Motoristas Disponíveis:</h3>
                    <ul>
                        {rideInfo.options.map((driver) => (
                            <li key={driver.id}>
                                {driver.name} - {driver.vehicle} -{" "}
                                {driver.description} - Custo: {driver.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </CenteredContainer>
    );
};

export default HomePage;
