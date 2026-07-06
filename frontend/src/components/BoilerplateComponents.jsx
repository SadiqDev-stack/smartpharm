import { useEffect, useState } from "react";
import { X, Search, ChevronDown } from "lucide-react";

export const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2 ${
        disabled
          ? "bg-slate-300 text-slate-700 cursor-not-allowed"
          : "bg-[#0F6E8A] text-white hover:bg-[#0C5B74]"
      } ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export const TextInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  error = "",
  icon: Icon,
  className = "",
}) => {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Icon size={18} />
          </span>
        )}
        <input
          type={type}
          value={localValue}
          onChange={(e) => {
            setLocalValue(e.target.value);
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F6E8A] transition ${
            Icon ? "pl-11" : ""
          } ${error ? "border-red-500" : "border-slate-300"}`}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const TextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F6E8A] transition"
      />
    </div>
  );
};

export const SelectField = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  required = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F6E8A] transition"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative mb-4 ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
        <Search size={18} />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F6E8A] transition"
      />
    </div>
  );
};

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className = "",
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`w-full ${sizes[size]} rounded-3xl bg-white shadow-2xl overflow-hidden ${className}`}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export const DataCard = ({ title, value, children, className = "" }) => {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {title && <p className="text-sm font-medium text-slate-500 mb-2">{title}</p>}
      {value && <p className="text-3xl font-semibold text-slate-900 mb-3">{value}</p>}
      {children}
    </div>
  );
};
