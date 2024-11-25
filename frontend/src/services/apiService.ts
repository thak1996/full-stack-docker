import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

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
