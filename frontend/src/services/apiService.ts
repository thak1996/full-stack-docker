import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001"
});

const apiService = {
    fetchHomeData: async () => {
        const response = await api.get("/home");
        return response.data;
    }
};

export default apiService;
