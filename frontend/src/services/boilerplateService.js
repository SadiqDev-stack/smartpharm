import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error.message || "An error occurred";
    return Promise.reject({
      status: error?.response?.status,
      message,
      original: error,
    });
  }
);

export const handleApiError = (error) => {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;
  return error.message || error.original?.message || "Network error";
};

export const authService = {
  login: (email, password) => api.post("/user/authenticate", { email, password }),
  logout: () => api.post("/user/logout"),
  register: (payload) => api.post("/user/register", payload),
  getProfile: () => api.get("/user/profile"),
};

export const productService = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  create: (payload) => api.post("/products", payload),
  update: (id, payload) => api.patch(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
  search: (query) => api.get(`/products/search${query ? `?q=${encodeURIComponent(query)}` : ""}`),
};

export const loanService = {
  getAll: () => api.get("/loans"),
  getById: (id) => api.get(`/loans/${id}`),
  create: (payload) => api.post("/loans", payload),
  update: (id, payload) => api.patch(`/loans/${id}`, payload),
  remove: (id) => api.delete(`/loans/${id}`),
};

export const storageService = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("storageService.set error", error);
      return false;
    }
  },
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      console.error("storageService.get error", error);
      return fallback;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("storageService.remove error", error);
      return false;
    }
  },
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("storageService.clear error", error);
      return false;
    }
  },
};

export default api;
