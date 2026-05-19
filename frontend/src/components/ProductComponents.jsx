import { useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Sparkles,
  Eye,
  Edit2,
  Trash2,
  Pin,
  PinOff,
  CheckSquare,
  Square,
  Package,
  X,
  ChevronLeft,
  DollarSign,
  Baby,
  TrendingUp,
  Calendar,
  Clock,
  AlertCircle
} from "lucide-react";
import { productAPI } from "../services/api";
import { mockProducts } from "../services/mockData";
import Loader from "./Loader";
// search bar 



export const ProductSearchBar = ({ onSearch, onFilter, loading }) => {
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({ 
    type: "all", expiry: false, volatile: false, 
    pregnantAllowed: false, sensitive: false, dosage: null 
  });
  
  const debounceTime = 500;
  const debounceTimerRef = useRef(null);

  const handleSearch = (value, filterData) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      onSearch(value, filterData);
    }, debounceTime);
  };

  const handleQueryChange = (value) => {
    setQuery(value);
    handleSearch(value, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    handleSearch(query, newFilters);
  };

  return (
    <div className="relative">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search by name, ID, description..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0F6E8A] focus:ring-2 focus:ring-[#0F6E8A]/20 transition-all shadow-sm"
          />
        </div>
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)} 
          className={`px-5 py-3 rounded-xl flex items-center gap-2 transition-all ${showAdvanced ? 'bg-[#0F6E8A] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#0F6E8A]'}`}
        >
          <Filter size={18} /> Filters
        </button>
        <button 
          onClick={() => onSearch(query, { ...filters, ai: true })} 
          className="px-5 py-3 rounded-xl flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Sparkles size={18} /> AI
        </button>
      </div>

      {showAdvanced && (
        <div className="absolute top-full mt-2 right-0 w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-20 p-5">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Product Type</label>
              <select 
                value={filters.type} 
                onChange={(e) => handleFilterChange({ ...filters, type: e.target.value })}
                className="w-full p-2.5 border rounded-lg focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A]"
              >
                <option value="all">All Types</option>
                <option value="tablet">Tablet</option>
                <option value="capsule">Capsule</option>
                <option value="syrup">Syrup</option>
                <option value="injection">Injection</option>
                <option value="cream">Cream/Ointment</option>
              </select>
            </div>
            
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.expiry} onChange={(e) => handleFilterChange({ ...filters, expiry: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm">Expiring Soon</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.volatile} onChange={(e) => handleFilterChange({ ...filters, volatile: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm">Price Volatile</span>
              </label>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Dosage Age Group</p>
              <div className="flex flex-wrap gap-2">
                {["infant", "child", "adult", "senior"].map(age => (
                  <button 
                    key={age} 
                    onClick={() => handleFilterChange({ ...filters, dosage: filters.dosage === age ? null : age })} 
                    className={`px-3 py-1.5 rounded-full text-sm capitalize transition-all ${filters.dosage === age ? 'bg-[#0F6E8A] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.pregnantAllowed} onChange={(e) => handleFilterChange({ ...filters, pregnantAllowed: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm">Pregnant Allowed</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.sensitive} onChange={(e) => handleFilterChange({ ...filters, sensitive: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm">Sensitive Product</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// bulk action bar 
export const BulkActionBar = ({ selectedCount, onDeleteSelected, onClearSelection }) => {
  if (selectedCount === 0) return null;
  
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-2xl border px-6 py-3 flex items-center gap-4 z-40">
      <span className="text-sm font-medium">{selectedCount} item{selectedCount > 1 ? 's' : ''} selected</span>
      <button onClick={onDeleteSelected} className="px-4 py-1.5 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition flex items-center gap-2">
        <Trash2 size={14} /> Delete
      </button>
      <button onClick={onClearSelection} className="px-4 py-1.5 border rounded-full text-sm hover:bg-gray-50 transition">Cancel</button>
    </div>
  );
};

// modal for deleting 
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 mx-4">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trash2 size={24} className="text-red-500" />
          </div>
          <h3 className="text-lg font-semibold">Delete Product</h3>
          <p className="text-gray-600 mt-2">Are you sure you want to delete <span className="font-medium">{productName}</span>? This action cannot be undone.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
        </div>
      </div>
    </div>
  );
};

// ProductCard component
export const ProductCard = ({ product, onDelete, onPin, onSelect, isSelected, viewMode = "grid" }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  
  const getStockBadge = () => {
    if (product.stock === 0) return <span className="px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700">Out of Stock</span>;
    if (product.stock < 10) return <span className="px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700">Low Stock</span>;
    return <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">In Stock</span>;
  };

  const getExpiryBadge = () => {
    if (!product.expiryDate) return null;
    const daysLeft = Math.ceil((new Date(product.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return <span className="px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700">Expired</span>;
    if (daysLeft < 30) return <span className="px-2 py-1 rounded-lg text-xs font-medium bg-orange-100 text-orange-700">{daysLeft} days left</span>;
    return null;
  };

  const handleDelete = async () => {
    try {
      await productAPI.delete(product._id);
      onDelete(product._id);
    } catch (error) {
      onDelete(product._id);
    }
    setShowDeleteModal(false);
  };

  if (viewMode === "list") {
    return (
      <>
        <div className="flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition">
          <button onClick={() => onSelect(product._id)} className="shrink-0">
            {isSelected ? <CheckSquare size={20} className="text-[#0F6E8A]" /> : <Square size={20} className="text-gray-400" />}
          </button>
          {product.mediaSource && product.mediaSource !== "N/A" ? (
            <img src={product.mediaSource} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-[#0F6E8A]/10 to-[#48B5C5]/10 rounded-lg flex items-center justify-center"><Package size={20} className="text-[#0F6E8A]" /></div>
          )}
          <div className="flex-1">
            <Link to={`/user/products/view/${product._id}`} className="font-semibold hover:text-[#0F6E8A]">{product.name}</Link>
            <div className="text-sm text-gray-500 capitalize">{product.type}</div>
          </div>
          <div className="w-24 text-right font-medium">₦{product.pricing?.[0]?.amount || product.price || 0}</div>
          <div className="w-20 text-right">{product.stock}</div>
          <div className="flex gap-2">
            {getStockBadge()}
            {getExpiryBadge()}
          </div>
          <div className="flex gap-1">
            <button onClick={() => onPin(product._id, !product.pinned)} className="p-2 hover:bg-gray-100 rounded-lg" title={product.pinned ? "Unpin" : "Pin"}>
              {product.pinned ? <PinOff size={16} className="text-gray-500" /> : <Pin size={16} className="text-gray-400" />}
            </button>
            <Link to={`/user/products/view/${product._id}`} className="p-2 hover:bg-gray-100 rounded-lg"><Eye size={16} className="text-blue-500" /></Link>
            <Link to={`/user/products/update/${product._id}`} className="p-2 hover:bg-gray-100 rounded-lg"><Edit2 size={16} className="text-green-500" /></Link>
            <button onClick={() => setShowDeleteModal(true)} className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
          </div>
        </div>
        <DeleteConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} productName={product.name} />
      </>
    );
  }

  return (
    <>
      <div className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        <button onClick={() => onSelect(product._id)} className="absolute top-3 left-3 z-10">
          {isSelected ? <CheckSquare size={20} className="text-[#0F6E8A]" /> : <Square size={20} className="text-gray-400 bg-white rounded" />}
        </button>
        <button onClick={() => onPin(product._id, !product.pinned)} className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 rounded-lg opacity-0 group-hover:opacity-100 transition">
          {product.pinned ? <PinOff size={14} className="text-gray-500" /> : <Pin size={14} className="text-gray-400" />}
        </button>
        
        <div className="p-4 pt-8">
          <div className="flex justify-center mb-3">
            {product.mediaSource && product.mediaSource !== "N/A" ? (
              <img src={product.mediaSource} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-[#0F6E8A]/10 to-[#48B5C5]/10 rounded-xl flex items-center justify-center">
                <Package size={32} className="text-[#0F6E8A]" />
              </div>
            )}
          </div>
          
          <Link to={`/user/products/view/${product._id}`}>
            <h3 className="font-semibold text-center mb-1 hover:text-[#0F6E8A] line-clamp-1">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-500 text-center capitalize mb-2">{product.type}</p>
          <p className="text-xl font-bold text-[#0F6E8A] text-center mb-2">₦{product.pricing?.[0]?.amount || product.price || 0}</p>
          
          <div className="flex justify-center gap-2 mb-3">
            {getStockBadge()}
            {getExpiryBadge()}
          </div>
          
          <div className="flex gap-2 pt-2 border-t">
            <Link to={`/user/products/view/${product._id}`} className="flex-1 text-center text-sm py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">View</Link>
            <Link to={`/user/products/update/${product._id}`} className="flex-1 text-center text-sm py-2 text-green-600 hover:bg-green-50 rounded-lg transition">Edit</Link>
            <button onClick={() => setShowDeleteModal(true)} className="flex-1 text-center text-sm py-2 text-red-600 hover:bg-red-50 rounded-lg transition">Delete</button>
          </div>
        </div>
      </div>
      <DeleteConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} productName={product.name} />
    </>
  );
};

// AI SEARCH MODAL
export const AISearchModal = ({ isOpen, onClose, onSearchResult }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleAISearch = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/assistant/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: prompt,
          context: "You are a pharmacy inventory assistant. Help find products based on user description. Return product names as a comma-separated list."
        })
      });
      const data = await res.json();
      setResponse(data.message);
      if (onSearchResult && data.productNames) onSearchResult(data.productNames.split(","));
    } catch (error) {
      setResponse("Sorry, I couldn't process that request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-purple-500" />
            <h3 className="text-lg font-semibold">AI Product Search</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
        </div>
        
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-4">Describe what product you're looking for and AI will help find it.</p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: painkiller for headache that's safe for pregnant women..."
            rows={3}
            className="w-full p-3 border rounded-xl focus:outline-none focus:border-[#0F6E8A]"
          />
          
          {response && (
            <div className="mt-4 p-3 bg-purple-50 rounded-xl text-sm text-gray-700">
              <p className="font-medium mb-1">AI Response:</p>
              <p>{response}</p>
            </div>
          )}
          
          <div className="flex gap-3 mt-5">
            <button onClick={handleAISearch} disabled={loading} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl flex items-center justify-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles size={16} />}
              {loading ? "Searching..." : "Search with AI"}
            </button>
            <button onClick={onClose} className="px-6 py-2 border rounded-xl hover:bg-gray-50 transition">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};


// Product Form Modal
export const ProductForm = ({ isOpen, onClose, onSubmit, product = null }) => {
  const [formData, setFormData] = useState(
    product || { name: "", price: "", stock: "", type: "tablet" },
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {product ? "Update Product" : "Add Product"}
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            className="w-full p-2 border rounded mb-3"
            required
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="tablet">Tablet</option>
            <option value="capsule">Capsule</option>
            <option value="syrup">Syrup</option>
            <option value="injection">Injection</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-[#0F6E8A] text-white py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
