import React, { useState } from "react";
import styled from "styled-components";
import { SearchCar } from "../interface/searchCar";
import apiService from "../services/apiService";

const FormContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
`;

const FormTitle = styled.h2`
    text-align: center;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 0;
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const TransportServiceForm: React.FC = () => {
    const [formData, setFormData] = useState<SearchCar>({
        id: null,
        origem: "",
        destino: ""
    });
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!formData.origem || !formData.destino) {
            setError("Origem e Destino são obrigatórios.");
            return;
        }

        if (formData.origem === formData.destino) {
            setError("Origem e Destino não podem ser iguais.");
            return;
        }

        try {
            const response = await apiService.fetchHomeData();
            console.log(response);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Um erro desconhecido ocorreu");
            }
        }
    };

    return (
        <FormContainer>
            <FormTitle>Serviço de Transporte</FormTitle>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>ID:</Label>
                    <Input
                        type="text"
                        name="id"
                        value={formData.id || ""}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Origem:</Label>
                    <Input
                        type="text"
                        name="origem"
                        value={formData.origem}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Destino:</Label>
                    <Input
                        type="text"
                        name="destino"
                        value={formData.destino}
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
