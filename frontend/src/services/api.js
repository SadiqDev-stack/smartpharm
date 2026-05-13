import axios from "axios";

// Use environment variable or default based on environment
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://sadiqcapsapi.vercel.app/api"
    : "http://localhost:8080/api");

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// User API
export const userAPI = {
  login: (email, password) =>
    api.post("/user/authenticate", { email, password }),
  logout: () => api.post("/user/logout"),
  getProfile: () => api.get("/user/profile"),
  register: (userData) => api.post("/user/register", userData),
};

// services/api.js - Add these methods
export const contactAPI = {
  getHistory: (page, limit, filters) => {
    let url = `/contact/history?page=${page}&limit=${limit}`;
    if (filters.search) url += `&search=${encodeURIComponent(filters.search)}`;
    return api.get(url);
  },

  getContactById: (id) => api.get(`/contact/${id}`),

  markAsRead: (contactId) => api.put("/see", { contactId }),

  markAllAsRead: () => api.put("/see-all"),

  submit: (contactData) => api.post("/contact/support", contactData),
};

// Assistant API
export const assistantAPI = {
  getResponse: (payload) =>
    api.post("/assistant", payload),
};

export const sendChatMessage = async (message, userId, userName) => {
  try {
    const response = await fetch(`${API_BASE}/assistant/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, userId, userName }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
};

export default api;
