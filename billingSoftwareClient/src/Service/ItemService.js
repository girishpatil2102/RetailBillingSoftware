import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/v1.0/items'; // replace with your actual API URL

// Add a new item
export const addItem = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Fetch all items (optional, if you want to list items)
export const fetchItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// Delete an item (optional)
export const deleteItem = async (itemId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${itemId}`);
        return response;
    } catch (error) {
        throw error;
    }
};
