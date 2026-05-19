// frontend/src/components/Form.jsx
import { useState, useEffect } from "react";

// Input Component with debounce
export const Input = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  required = false,
  debounce = 0,
  icon: Icon,
  error,
  className = ""
}) => {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    if (debounce > 0) {
      const timer = setTimeout(() => {
        onChange(localValue);
      }, debounce);
      return () => clearTimeout(timer);
    }
  }, [localValue, debounce]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    if (debounce === 0) onChange(val);
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-[#1E293B] mb-2">{label} {required && <span className="text-red-500">*</span>}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />}
        <input
          type={type}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 transition ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:border-red-500' : 'border-[#E2E8F0] focus:border-[#0F6E8A] focus:ring-[#0F6E8A]'} ${className}`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

// Search Input with built-in debounce
export const SearchInput = ({ value, onChange, placeholder = "Search...", className = "" }) => {
  return (
    <Input
      icon={Search}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      debounce={300}
      className={className}
    />
  );
};

// Select Component
export const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select...",
  required = false,
  icon: Icon,
  className = ""
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-[#1E293B] mb-2">{label} {required && <span className="text-red-500">*</span>}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] appearance-none ${Icon ? 'pl-10' : ''} ${className}`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
      </div>
    </div>
  );
};

// Textarea Component
export const Textarea = ({ 
  label, 
  value, 
  onChange, 
  rows = 4, 
  placeholder = "",
  required = false,
  className = ""
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-[#1E293B] mb-2">{label} {required && <span className="text-red-500">*</span>}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] resize-none ${className}`}
      />
    </div>
  );
};

// Button Component
export const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary",
  loading = false,
  disabled = false,
  icon: Icon,
  className = ""
}) => {
  const variants = {
    primary: "bg-[#0F6E8A] hover:bg-[#0A4D62] text-white",
    secondary: "bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#1E293B]",
    outline: "border border-[#0F6E8A] text-[#0F6E8A] hover:bg-[#0F6E8A] hover:text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    ghost: "hover:bg-[#F8FAFC] text-[#64748B]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {loading ? <Loader className="w-4 h-4 animate-spin" /> : Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

// Modal Component
export const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center p-4 border-b border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#1E293B]">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#F8FAFC] rounded-lg">
            <X className="w-5 h-5 text-[#64748B]" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// Card Component
export const Card = ({ children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// Badge Component
export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-[#F8FAFC] text-[#1E293B]",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-[#0F6E8A]"
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Toggle Switch
export const Toggle = ({ label, value, onChange, className = "" }) => {
  return (
    <label className={`flex items-center justify-between cursor-pointer ${className}`}>
      <span className="text-sm font-medium text-[#1E293B]">{label}</span>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <div className={`w-10 h-5 rounded-full transition ${value ? 'bg-[#0F6E8A]' : 'bg-[#E2E8F0]'}`} />
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition ${value ? 'translate-x-5' : ''}`} />
      </div>
    </label>
  );
};

// Loading Spinner
export const Spinner = ({ size = "md", className = "" }) => {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={`border-4 border-[#E2E8F0] border-t-[#0F6E8A] rounded-full animate-spin ${sizes[size]} ${className}`} />
  );
};

// Alert Component
export const Alert = ({ type = "info", title, message, onClose }) => {
  const types = {
    success: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", icon: CheckCircle },
    error: { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", icon: AlertCircle },
    warning: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", icon: AlertCircle },
    info: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", icon: Info }
  };

  const Icon = types[type].icon;
  return (
    <div className={`p-4 rounded-lg border ${types[type].bg} ${types[type].border} relative mb-4`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 ${types[type].text}`} />
        <div>
          {title && <h4 className={`font-semibold ${types[type].text}`}>{title}</h4>}
          <p className={`text-sm ${types[type].text}`}>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className={`ml-auto ${types[type].text}`}>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Form Container
export const Form = ({ onSubmit, children, className = "" }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {children}
    </form>
  );
};

// Form Actions
export const FormActions = ({ children, className = "" }) => {
  return (
    <div className={`flex gap-3 pt-4 border-t border-[#E2E8F0] ${className}`}>
      {children}
    </div>
  );
};