import React, { useState } from "react";
import styled from "styled-components";
import {
    FormContainer,
    SubmitButton
} from "../styles/transportServiceFormStyles";
import { Driver, RideEstimateResponse } from "../interface/rideEstimate";

const DriverList = styled.div`
    margin-top: 20px;
`;

const DriverOption = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    transition: background-color 0.3s;

    &:hover {
        background-color: #eaeaea;
    }

    input {
        margin-right: 10px;
    }
`;

const MapContainer = styled.div`
    height: 300px;
    background-color: #eaeaea;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const StyledFormContainer = styled(FormContainer)`
    margin: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const StyledButton = styled(SubmitButton)`
    margin: 0 10px;
`;

interface DriverSelectionFormProps {
    drivers: Driver[];
    onSubmit: (data: any) => void;
    onPrevious: () => void;
    rideInfo: RideEstimateResponse;
}

const DriverSelectionForm: React.FC<DriverSelectionFormProps> = ({
    drivers,
    onSubmit,
    onPrevious,
    rideInfo
}) => {
    const [selectedDriverId, setSelectedDriverId] = useState<number | null>(
        null
    );

    const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDriverId(Number(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedDriverId !== null) {
            const selectedDriver = drivers.find(
                (driver) => driver.id === selectedDriverId
            );
            const fare = (
                parseFloat(selectedDriver?.km_tax || "0") *
                (rideInfo.distance / 1000)
            ).toFixed(2);

            const requestBody = {
                customer_id: selectedDriver?.id,
                origin: rideInfo.origin,
                destination: rideInfo.destination,
                distance: rideInfo.distance,
                duration: rideInfo.duration,
                driver: {
                    id: selectedDriverId,
                    name: selectedDriver?.name
                },
                value: fare
            };
            onSubmit(requestBody);
        } else {
            alert("Por favor, selecione um motorista.");
        }
    };

    return (
        <StyledFormContainer>
            <h2>Selecione um Motorista</h2>
            <MapContainer>
                {/* Aqui você pode integrar um mapa, por exemplo, usando uma biblioteca como Leaflet ou Google Maps */}
                Mapa com a rota traçada
            </MapContainer>
            <form onSubmit={handleSubmit}>
                <DriverList>
                    {drivers.map((driver) => {
                        const fare = (
                            parseFloat(driver.km_tax) *
                            (rideInfo.distance / 1000)
                        ).toFixed(2);

                        return (
                            <DriverOption
                                key={driver.id}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-center"
                                }}
                            >
                                <input
                                    type="radio"
                                    name="driver"
                                    value={driver.id}
                                    onChange={handleDriverChange}
                                />
                                <div>
                                    <strong>Motorista:</strong>{" "}
                                    <span>{driver.name}</span>
                                    <br />
                                    <strong>Carro:</strong>{" "}
                                    <span>{driver.vehicle}</span>
                                    <br />
                                    <strong>Avaliação:</strong>{" "}
                                    <span>{driver.review.rating}</span>
                                    <br />
                                    <strong>Comentários:</strong>{" "}
                                    <span>{driver.review.comment}</span>
                                    <br />
                                    <strong>Taxa por Km:</strong>{" "}
                                    <span>R$ {driver.km_tax}</span>
                                    <br />
                                    <strong>Distância:</strong>{" "}
                                    <span>
                                        {(rideInfo.distance / 1000).toFixed(2)}{" "}
                                        km
                                    </span>
                                    <br />
                                    <strong>Pagamento:</strong>{" "}
                                    <span>R$ {fare}</span>
                                </div>
                            </DriverOption>
                        );
                    })}
                </DriverList>
                <ButtonContainer>
                    <button type="button" onClick={onPrevious}>
                        Voltar
                    </button>
                    <StyledButton type="submit">Confirmar</StyledButton>
                </ButtonContainer>
            </form>
        </StyledFormContainer>
    );
};

export default DriverSelectionForm;
