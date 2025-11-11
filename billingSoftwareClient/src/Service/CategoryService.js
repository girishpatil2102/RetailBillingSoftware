import axios from "axios";

export const addCategory = async (category) => {
  return await axios.post("http://localhost:8081/api/v1.0/categories", category, {
    timeout: 10000, // 10 second timeout
  });
};

export const deleteCategory = async (categoryId) => {
  return await axios.delete(`http://localhost:8081/api/v1.0/categories/${categoryId}`, {
    timeout: 10000, // 10 second timeout
  });
};

export const fetchCategories = async () => {
  return await axios.get("http://localhost:8081/api/v1.0/categories");
};
