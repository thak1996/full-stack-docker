import React, { useState, useEffect } from "react";
import { RideEstimateRequest } from "../interface/rideEstimate";
import {
    ErrorMessage,
    FormContainer,
    FormGroup,
    FormTitle,
    Input,
    Label,
    SubmitButton
} from "../styles/transportServiceFormStyles";

interface TransportServiceFormProps {
    onEstimate: (data: RideEstimateRequest) => void;
}

const TransportServiceForm: React.FC<TransportServiceFormProps> = ({
    onEstimate
}) => {
    const [formData, setFormData] = useState<RideEstimateRequest>({
        customer_id: "",
        origin: "",
        destination: ""
    });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const originInput = document.getElementById(
            "origin"
        ) as HTMLInputElement;
        const destinationInput = document.getElementById(
            "destination"
        ) as HTMLInputElement;

        const initAutocomplete = () => {
            if (originInput && destinationInput && (window as any).google) {
                const autocompleteOrigin = new (
                    window as any
                ).google.maps.places.Autocomplete(originInput);
                const autocompleteDestination = new (
                    window as any
                ).google.maps.places.Autocomplete(destinationInput);

                autocompleteOrigin.addListener("place_changed", () => {
                    const place = autocompleteOrigin.getPlace();
                    if (place && place.formatted_address) {
                        setFormData((prev) => ({
                            ...prev,
                            origin: place.formatted_address
                        }));
                    }
                });

                autocompleteDestination.addListener("place_changed", () => {
                    const place = autocompleteDestination.getPlace();
                    if (place && place.formatted_address) {
                        setFormData((prev) => ({
                            ...prev,
                            destination: place.formatted_address
                        }));
                    }
                });
            } else {
                console.error("Google Maps API not loaded.");
            }
        };

        const checkGoogleMapsAPI = setInterval(() => {
            if ((window as any).google) {
                clearInterval(checkGoogleMapsAPI);
                initAutocomplete();
            }
        }, 100);

        return () => clearInterval(checkGoogleMapsAPI);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "origin" || name === "destination") {
            if (value.length >= 4) {
                console.log("Autocompletar ativado para:", value);
            } else {
                console.log("Autocompletar desativado.");
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!formData.origin || !formData.destination) {
            setError("Origem e Destino são obrigatórios.");
            return;
        }

        if (formData.origin === formData.destination) {
            setError("Origem e Destino não podem ser iguais.");
            return;
        }

        onEstimate(formData);
    };

    return (
        <FormContainer>
            <FormTitle>Serviço de Transporte</FormTitle>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>ID:</Label>
                    <Input
                        type="text"
                        name="customer_id"
                        value={formData.customer_id}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Origem:</Label>
                    <Input
                        id="origin"
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Destino:</Label>
                    <Input
                        id="destination"
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton type="submit">Enviar</SubmitButton>
            </form>
        </FormContainer>
    );
};

export default TransportServiceForm;
