export const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: date.getFullYear(),
  });
};

export const formatCurrency = (amount, currency = "NGN") => {
  if (amount === undefined || amount === null || amount === "") return "";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

export const truncateText = (text, maxLength = 80) => {
  if (!text) return "";
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
};

export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const pattern = /^[0-9\s+\-()]{8,20}$/;
  return pattern.test(String(phone));
};

export const buildQueryString = (params = {}) => {
  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "");
  if (entries.length === 0) return "";
  return `?${entries.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&")}`;
};

export const safeParseJSON = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const sortByKey = (items = [], key, direction = "asc") => {
  return [...items].sort((a, b) => {
    const first = a[key] ?? "";
    const second = b[key] ?? "";
    if (first < second) return direction === "asc" ? -1 : 1;
    if (first > second) return direction === "asc" ? 1 : -1;
    return 0;
  });
};
