import axios from 'axios';
export const BASE_URL = "http://localhost:8080/api";

export const fetchApi = async (url) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/${url}`);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

// POST Request
export const postApi = async (url, payload) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/${url}`, payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return data;
    } catch (error) {
        console.error("Error posting data:", error.message);
        return null;
    }
};
       