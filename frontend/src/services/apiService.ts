import axios from "axios";
import { RideEstimateRequest } from "../interface/rideEstimate";

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
        const response = await api.post("/ride/estimate", {
            origin: request.origin,
            destination: request.destination,
            customer_id: request.customer_id
        });
        return response.data;
    }
};

export default apiService;
