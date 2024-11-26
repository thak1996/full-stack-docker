import axios from "axios";
import { RideEstimateRequest } from "../interface/rideEstimate";
import { ApiError } from "../interface/apiError";

const apiUrl = "http://localhost:8080/api/v1";

const api = axios.create({
    baseURL: apiUrl
});

const apiService = {
    // Message Test API
    fetchMessage: async () => {
        const response = await api.get("/message");
        return response.data;
    },
    estimateRide: async (request: RideEstimateRequest) => {
        try {
            const response = await api.post("/ride/estimate", {
                origin: request.origin,
                destination: request.destination,
                customer_id: request.customer_id
            });
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const apiError: ApiError = error.response.data;
                switch (apiError.error_code) {
                    case "ROUTE_NOT_FOUND":
                        throw new Error(apiError.error_description);
                    default:
                        throw new Error(
                            apiError.error_description ||
                                `Erro ao estimar a corrida: ${error.response.status}`
                        );
                }
            } else {
                throw new Error("Erro de rede ou a API não está acessível");
            }
        }
    }
};

export default apiService;
