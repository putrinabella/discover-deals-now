import axios from "axios";

const API_PRODUCT = import.meta.env.VITE_API_PRODUCTS;

export const fetchProductsAPI = async () => {
    try {
        const { data } = await axios({
        method: "GET",
        url: API_PRODUCT,
    });
    return data; 
    } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
};
