import axios from "axios";

const API_AUTH = import.meta.env.VITE_API_AUTH;

export const authAPI = async (username, password) => {
    try {
        const { data } = await axios({
            method: "POST",
            url: `${API_AUTH}`,
            data: {
                username,
                password,
            },
        });
        return data; // Return token
    } catch (err) {
        console.error("Error logging in:", err);
        throw err; 
    }
};