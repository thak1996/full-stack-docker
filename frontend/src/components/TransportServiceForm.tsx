import React, { useState } from "react";
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
