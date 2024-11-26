import axios from "axios";

const apiUrl = "http://localhost:8080";

const api = axios.create({
    baseURL: apiUrl
});

const apiService = {
    fetchHomeData: async () => {
        const response = await api.get("/home");
        return response.data;
    }
};

export default apiService;
