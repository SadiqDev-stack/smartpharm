import axios from "axios";

// Use environment variable or default based on environment
const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://smartpharmapi.vercel.app/api"
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
  getProfile: () => {
    
    return api.get("/user/profile")
  },
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

// frontend/src/services/api.js - Add productAPI functions

// Product APIs with fallback
export const productAPI = {
  getAll: async () => {
    try {
      const response = await api.get("/products");
      if (response.data.success || response.data.data) {
        const data = response.data.data || response.data;
        Storage.setItem("cache_products", data);
        return { data, fromCache: false };
      }
      throw new Error("Invalid response");
    } catch (error) {
      const cached = Storage.getItem("cache_products");
      if (cached) return { data: cached, fromCache: true };
      return { data: mockProducts, fromCache: true };
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      const data = response.data.data || response.data;
      return { data, fromCache: false };
    } catch (error) {
      const cached = Storage.getItem("cache_products");
      if (cached) {
        const product = cached.find(p => p._id === id);
        if (product) return { data: product, fromCache: true };
      }
      const mockProduct = mockProducts.find(p => p._id === id);
      return { data: mockProduct, fromCache: true };
    }
  },

  create: async (data) => {
    try {
      const response = await api.post("/products", data);
      return response.data;
    } catch (error) {
      // Offline - store in sync queue
      const syncQueue = Storage.getItem("sync_queue") || [];
      syncQueue.push({
        operation: "POST",
        endpoint: "/products",
        data: data,
        type: "product",
        createdAt: new Date().toISOString()
      });
      Storage.setItem("sync_queue", syncQueue);
      return { data: { ...data, _id: `temp_${Date.now()}` }, offline: true };
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.patch(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      const syncQueue = Storage.getItem("sync_queue") || [];
      syncQueue.push({
        operation: "PATCH",
        endpoint: `/products/${id}`,
        data: data,
        type: "product",
        createdAt: new Date().toISOString()
      });
      Storage.setItem("sync_queue", syncQueue);
      return { data, offline: true };
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      const syncQueue = Storage.getItem("sync_queue") || [];
      syncQueue.push({
        operation: "DELETE",
        endpoint: `/products/${id}`,
        data: { id },
        type: "product",
        createdAt: new Date().toISOString()
      });
      Storage.setItem("sync_queue", syncQueue);
      return { success: true, offline: true };
    }
  },

  search: async (query) => {
    try {
      const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      const cached = Storage.getItem("cache_products") || [];
      const results = cached.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p._id.includes(query)
      );
      return { data: results, fromCache: true };
    }
  }
};

export default api;
