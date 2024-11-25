import React, { useState } from "react";
import { SearchCarModel } from "../models/searchCarModel";
import apiService from "../services/apiService";

const TransportServiceForm: React.FC = () => {
    const [formData, setFormData] = useState<SearchCarModel>({
        id: 0,
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
        <div>
            <h2>Serviço de Transporte</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        ID:
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Origem:
                        <input
                            type="text"
                            name="origem"
                            value={formData.origem}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Destino:
                        <input
                            type="text"
                            name="destino"
                            value={formData.destino}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default TransportServiceForm;
