// laer add pagination , fix dosage age search, fic theme color , fix comfimation for multiselect delete , 
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package, Plus, Grid, List, Sparkles, Trash2, X } from "lucide-react";
import {
  ProductSearchBar,
  ProductCard,
  ProductForm,
  BulkActionBar,
  AISearchModal,
} from "../components/ProductComponents";
import { productAPI } from "../services/api";
import { mockProducts } from "../services/mockData";
import Loader from "../components/Loader";

// ==================== PRODUCT LIST COMPONENT ====================
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    expiry: false,
    volatile: false,
    pregnantAllowed: false,
    sensitive: false,
    dosage: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAll();
      setProducts(data || mockProducts);
      setFilteredProducts(data || mockProducts);
    } catch (error) {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query, filterData) => {
    let results = [...products];

    if (query) {
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p._id.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (filterData.type !== "all")
      results = results.filter((p) => p.type === filterData.type);
    if (filterData.expiry)
      results = results.filter(
        (p) =>
          p.expiryDate &&
          new Date(p.expiryDate) <
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      );
    if (filterData.volatile)
      results = results.filter((p) => p.priceHistory?.length > 2);
    if (filterData.dosage)
      results = results.filter((p) =>
        p.dosage?.breakdown?.some((b) =>
          b.ageRange?.toLowerCase().includes(filterData.dosage),
        ),
      );
    if (filterData.pregnantAllowed)
      results = results.filter((p) => p.dosage?.pregnantAllowed === true);
    if (filterData.sensitive)
      results = results.filter((p) => p.dosage?.sensitive === true);

    setFilteredProducts(results);
    setFilters(filterData);
  };

  const handleDelete = async (id) => {
    try {
      await productAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      setFilteredProducts(filteredProducts.filter((p) => p._id !== id));
    } catch {
      setProducts(products.filter((p) => p._id !== id));
      setFilteredProducts(filteredProducts.filter((p) => p._id !== id));
    }
  };

  const handlePin = async (id, pinned) => {
    try {
      await productAPI.update(id, { pinned });
      setProducts(products.map((p) => (p._id === id ? { ...p, pinned } : p)));
      setFilteredProducts(
        filteredProducts.map((p) => (p._id === id ? { ...p, pinned } : p)),
      );
    } catch {
      setProducts(products.map((p) => (p._id === id ? { ...p, pinned } : p)));
      setFilteredProducts(
        filteredProducts.map((p) => (p._id === id ? { ...p, pinned } : p)),
      );
    }
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = async () => {
    for (const id of selectedProducts) {
      try {
        await productAPI.delete(id);
      } catch {}
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setFilteredProducts((prev) => prev.filter((p) => p._id !== id));
    }
    setSelectedProducts([]);
  };

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
    setFilteredProducts([newProduct, ...filteredProducts]);
    setShowAddModal(false);
  };

  const handleAISearchResult = (productNames) => {
    if (productNames && productNames.length) {
      const query = productNames.join(" ");
      handleSearch(query, filters);
    }
  };

  if (loading) return <Loader fullScreen text="Loading products..." />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#1E293B]">Products</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAIModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition"
            >
              <Sparkles size={16} /> AI Search
            </button>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl flex items-center gap-2 hover:border-[#0F6E8A] transition shadow-sm"
            >
              {viewMode === "grid" ? <List size={16} /> : <Grid size={16} />}
              {viewMode === "grid" ? "List" : "Grid"}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#0F6E8A] text-white rounded-xl flex items-center gap-2 hover:bg-[#0A4D62] transition shadow-md"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <ProductSearchBar onSearch={handleSearch} loading={loading} />

        {/* Bulk Action Bar */}
        <BulkActionBar
          selectedCount={selectedProducts.length}
          onDeleteSelected={handleBulkDelete}
          onClearSelection={() => setSelectedProducts([])}
        />

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                : "bg-white rounded-xl border overflow-hidden"
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
                onPin={handlePin}
                onSelect={handleSelectProduct}
                isSelected={selectedProducts.includes(product._id)}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        <ProductForm
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
        />

        <AISearchModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          onSearchResult={handleAISearchResult}
        />
      </div>
    </div>
  );
};


// ProductView Component
const ProductView = ({ id, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getById(id);
      setProduct(data);
    } catch (error) {
      const found = mockProducts.find(p => p._id === id);
      setProduct(found);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen text="Loading product..." />;
  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 mb-6 hover:text-[#0F6E8A] transition">
          <ChevronLeft size={20} /> Back
        </button>
        
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-[#0F6E8A]/5 to-transparent">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                {product.mediaSource && product.mediaSource !== "N/A" ? (
                  <img src={product.mediaSource} alt={product.name} className="w-24 h-24 rounded-xl object-cover" />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-[#0F6E8A]/10 to-[#48B5C5]/10 rounded-xl flex items-center justify-center">
                    <Package size={40} className="text-[#0F6E8A]" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-[#1E293B]">{product.name}</h1>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-sm capitalize">{product.type}</span>
                    {product.pinned && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">Pinned</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/user/products/update/${id}`} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  <Edit2 size={16} className="inline mr-1" /> Edit
                </Link>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Pricing Section */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <DollarSign size={18} className="text-[#0F6E8A]" /> Pricing
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {product.pricing?.map((p, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 capitalize">{p.unit}</p>
                    <p className="text-xl font-bold text-[#0F6E8A]">₦{p.amount}</p>
                    {p.quantity > 1 && <p className="text-xs text-gray-400">per {p.quantity} units</p>}
                  </div>
                ))}
                {!product.pricing?.length && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xl font-bold text-[#0F6E8A]">₦{product.price || 0}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Stock & Expiry */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Stock Quantity</p>
                <p className={`text-2xl font-bold ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  {product.stock} units
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="text-xl font-bold">
                  {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}
                </p>
                {product.expiryDate && (
                  <p className={`text-sm ${new Date(product.expiryDate) < new Date() ? 'text-red-500' : 'text-green-500'}`}>
                    {new Date(product.expiryDate) < new Date() ? 'Expired' : 'Valid'}
                  </p>
                )}
              </div>
            </div>
            
            {/* Dosage Section */}
            {product.dosage && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Baby size={18} className="text-[#0F6E8A]" /> Dosage Information
                </h3>
                <div className="flex gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${product.dosage.pregnantAllowed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.dosage.pregnantAllowed ? '✓ Safe for Pregnancy' : '⚠ Not for Pregnancy'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${product.dosage.sensitive ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {product.dosage.sensitive ? '⚠ Sensitive Product' : '✓ General Use'}
                  </span>
                </div>
                {product.dosage.breakdown?.map((bd, i) => (
                  <div key={i} className="p-3 border rounded-lg mb-2">
                    <p className="font-medium">{bd.label} {bd.ageRange && `(${bd.ageRange})`}</p>
                    <p className="text-sm text-gray-600">{bd.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Price History */}
            {product.priceHistory?.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#0F6E8A]" /> Price History
                </h3>
                <div className="space-y-2">
                  {product.priceHistory.map((ph, i) => (
                    <div key={i} className="flex justify-between p-2 border-b">
                      <span className="text-gray-600">{new Date(ph.date).toLocaleDateString()}</span>
                      <span className="font-medium">₦{ph.price} per {ph.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Products */}
            {product.relatedProducts?.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Related Products</h3>
                <div className="flex flex-wrap gap-2">
                  {product.relatedProducts.map((rp, i) => (
                    <Link 
                      key={i} 
                      to={`/user/products/view/${rp}`} 
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-[#0F6E8A]/10 hover:text-[#0F6E8A] transition"
                    >
                      View Related
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Metadata */}
            <div className="pt-4 border-t text-sm text-gray-500">
              <p>Created: {new Date(product.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(product.updatedAt).toLocaleString()}</p>
              <p>ID: {product._id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==================== PRODUCT ADD COMPONENT ====================


const ProductAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    type: "tablet",
    dosage: { pregnantAllowed: false, sensitive: false, breakdown: [] },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await productAPI.create(formData);
      navigate("/user/products");
    } catch {
      const newProduct = { ...formData, _id: `temp_${Date.now()}` };
      navigate("/user/products");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-[#0F6E8A]"
        >
          ← Back
        </button>
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h1 className="text-2xl font-bold mb-6">Add Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full p-3 border rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Stock"
              className="w-full p-3 border rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
            />
            <select
              className="w-full p-3 border rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="syrup">Syrup</option>
              <option value="injection">Injection</option>
            </select>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#0F6E8A] text-white py-3 rounded-xl"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 border py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==================== PRODUCT UPDATE COMPONENT ====================
const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const { data } = await productAPI.getById(id);
      setProduct(data);
    } catch {
      const found = mockProducts.find((p) => p._id === id);
      setProduct(found);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productAPI.update(id, product);
      navigate("/user/products");
    } catch {
      navigate("/user/products");
    }
  };

  if (loading) return <Loader fullScreen text="Loading product..." />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-6 hover:text-[#0F6E8A]"
        >
          ← Back
        </button>
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h1 className="text-2xl font-bold mb-6">Update Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={product?.name || ""}
              className="w-full p-3 border rounded-xl"
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
            <input
              type="number"
              value={product?.price || ""}
              className="w-full p-3 border rounded-xl"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              required
            />
            <input
              type="number"
              value={product?.stock || ""}
              className="w-full p-3 border rounded-xl"
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
              required
            />
            <select
              value={product?.type || "tablet"}
              className="w-full p-3 border rounded-xl"
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
            >
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="syrup">Syrup</option>
              <option value="injection">Injection</option>
            </select>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#0F6E8A] text-white py-3 rounded-xl"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 border py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN PRODUCTS COMPONENT ====================
const Products = () => {
  const { id } = useParams();
  const path = window.location.pathname;
  const navigate = useNavigate();

  if (path.includes("/view"))
    return <ProductView id={id} onBack={() => navigate("/user/products")} />;
  if (path.includes("/update")) return <ProductUpdate />;
  if (path.includes("/add")) return <ProductAdd />;
  return <ProductList />;
};

export default Products;
