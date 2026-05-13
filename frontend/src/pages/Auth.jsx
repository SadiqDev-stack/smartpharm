// frontend/src/pages/Auth.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Briefcase,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader,
  Apple,
  ArrowRight,
  Store,
  FileText,
  Globe
} from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, register, isAuthenticated, unlocked } = useAuth();
  const isLogin = searchParams.get("mode") !== "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      if (unlocked) {
        navigate("/dashboard");
      } else {
        navigate("/unlock");
      }
    }
  }, [isAuthenticated, unlocked, navigate]);
  
  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: 'male',
    country: 'nigeria',
    password: '',
    confirmPassword: '',
    passCode: '',
    shopDescription: {
      name: '',
      description: '',
      type: 'small',
    }
  });

  const [acceptTerms, setAcceptTerms] = useState(false);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await login(loginData.email, loginData.password);
      if (response.redirect) {
        if (response.redirect.includes("/message")) {
          window.location.href = response.redirect;
        } else {
          navigate(response.redirect);
        }
      } else {
        if (response.message) {
          setErrors({ loginSuccess: response.message });
          setTimeout(() => {
            navigate(unlocked ? "/dashboard" : "/unlock");
          }, 2000);
        } else {
          navigate(unlocked ? "/dashboard" : "/unlock");
        }
      }
    } catch (error) {
      setErrors({
        login: error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    if (registerData.password !== registerData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    if (registerData.password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }

    if (!acceptTerms) {
      setErrors({ terms: "You must accept the terms and conditions" });
      return;
    }

    if (!registerData.shopDescription.name.trim()) {
      setErrors({ shopName: "Shop name is required" });
      return;
    }

    if (!registerData.shopDescription.type) {
      setErrors({ shopType: "Shop type is required" });
      return;
    }

    if (!registerData.passCode || registerData.passCode.length < 4) {
      setErrors({ passCode: "Passcode must be at least 4 characters" });
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerPayload } = registerData;
      void confirmPassword;
      const response = await register(registerPayload);

      if (response.redirect) {
        if (response.redirect.includes("/message")) {
          window.location.href = response.redirect;
        } else {
          navigate(response.redirect);
        }
      } else {
        setErrors({
          registerSuccess:
            response.message ||
            "Registration successful! Please check your email for verification.",
        });
        setTimeout(() => {
          setSearchParams({ mode: "login" });
          setErrors({});
        }, 3000);
      }
    } catch (error) {
      setErrors({
        register: error.response?.data?.message || "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation effect when toggling
  const [animate, setAnimate] = useState(false);
  
  const handleFormToggle = (value) => {
    if (value === isLogin) return;
    setAnimate(true);
    setTimeout(() => {
      setSearchParams({ mode: value ? "login" : "signup" });
      setErrors({});
      setAnimate(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Info/Brand */}
          <div className="hidden lg:flex flex-col justify-center p-8 bg-gradient-to-br from-[#0F6E8A] to-[#0A4D62] rounded-2xl text-white shadow-xl">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Store className="w-8 h-8" />
                <span className="text-2xl font-bold">Smart<span className="text-[#48B5C5]">Pharm</span></span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {isLogin ? 'Welcome Back!' : 'Join SmartPharm Today'}
              </h2>
              <p className="text-[#48B5C5] mb-6">
                {isLogin 
                  ? 'Sign in to manage your pharmacy inventory, track patients, and access AI-powered insights.'
                  : 'Create your account and start managing your pharmacy smarter, even offline.'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm">Offline-first architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm">AI-powered medicine recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm">Inventory & loan tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-sm">Patient history management</span>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#48B5C5] to-[#0F6E8A] border-2 border-white"></div>
                ))}
              </div>
              <p className="text-sm mt-3">Trusted by 500+ pharmacies</p>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Toggle Buttons */}
            <div className="flex gap-2 p-1 bg-[#F8FAFC] rounded-xl mb-8">
              <button
                onClick={() => handleFormToggle(true)}
                className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
                  isLogin 
                    ? 'bg-white text-[#0F6E8A] shadow-sm' 
                    : 'text-[#64748B] hover:text-[#0F6E8A]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleFormToggle(false)}
                className={`flex-1 py-2.5 rounded-lg font-semibold transition-all ${
                  !isLogin 
                    ? 'bg-white text-[#0F6E8A] shadow-sm' 
                    : 'text-[#64748B] hover:text-[#0F6E8A]'
                }`}
              >
                Sign Up
              </button>
            </div>
            
            {/* Success Message */}
            {(errors.registerSuccess || errors.loginSuccess) && (
              <div className="mb-4 p-3 bg-[#D1FAE5] border border-[#10B981] rounded-lg flex items-center gap-2 text-sm text-[#065F46]">
                <CheckCircle size={16} />
                <span>{errors.registerSuccess || errors.loginSuccess}</span>
              </div>
            )}
            
            {/* Error Message */}
            {(errors.login || errors.register) && (
              <div className="mb-4 p-3 bg-[#FEF2F2] border border-[#EF4444] rounded-lg flex items-center gap-2 text-sm text-[#991B1B]">
                <AlertCircle size={16} />
                <span>{errors.login || errors.register}</span>
              </div>
            )}
            
            {/* Login Form */}
            <div className={`transition-all duration-300 ${animate ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
              {isLogin ? (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type="email"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full pl-10 pr-10 py-2.5 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-[#64748B]" />
                        ) : (
                          <Eye className="w-4 h-4 text-[#64748B] blink-eye" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-[#E2E8F0] text-[#0F6E8A] focus:ring-[#0F6E8A]" />
                      <span className="text-sm text-[#64748B]">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-[#0F6E8A] hover:text-[#0A4D62]">
                      Forgot password?
                    </Link>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0F6E8A] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0A4D62] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
          
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegister} className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          type="text"
                          required
                          value={registerData.name}
                          onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          type="tel"
                          required
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                          className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition"
                          placeholder="08012345678"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type="email"
                        required
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Shop Name
                    </label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type="text"
                        required
                        value={registerData.shopDescription.name}
                        onChange={(e) => setRegisterData({
                          ...registerData, 
                          shopDescription: {...registerData.shopDescription, name: e.target.value}
                        })}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 transition ${
                          errors.shopName ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#0F6E8A]'
                        }`}
                        placeholder="Smart Pharmacy"
                      />
                    </div>
                    {errors.shopName && (
                      <p className="text-xs text-[#EF4444] mt-1">{errors.shopName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Shop Type
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <select
                        value={registerData.shopDescription.type}
                        onChange={(e) => setRegisterData({
                          ...registerData,
                          shopDescription: {
                            ...registerData.shopDescription,
                            type: e.target.value,
                          },
                        })}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 transition ${
                          errors.shopType ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#0F6E8A]'
                        }`}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                    {errors.shopType && (
                      <p className="text-xs text-[#EF4444] mt-1">{errors.shopType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Shop Description
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-[#64748B]" />
                      <textarea
                        rows="2"
                        value={registerData.shopDescription.description}
                        onChange={(e) => setRegisterData({
                          ...registerData, 
                          shopDescription: {...registerData.shopDescription, description: e.target.value}
                        })}
                        className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition resize-none"
                        placeholder="Describe your pharmacy..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Passcode
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type="password"
                        required
                        value={registerData.passCode}
                        onChange={(e) => setRegisterData({ ...registerData, passCode: e.target.value })}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 transition ${
                          errors.passCode ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#0F6E8A]'
                        }`}
                        placeholder="Enter a secure passcode"
                      />
                    </div>
                    {errors.passCode && (
                      <p className="text-xs text-[#EF4444] mt-1">{errors.passCode}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Shop Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type="text"
                        required
                        value={registerData.address}
                        onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition"
                        placeholder="123 Main Street, Lagos"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Gender
                      </label>
                      <select
                        value={registerData.gender}
                        onChange={(e) => setRegisterData({...registerData, gender: e.target.value})}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Country
                      </label>
                      <select
                        value={registerData.country}
                        onChange={(e) => setRegisterData({...registerData, country: e.target.value})}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] transition"
                      >
                        <option value="nigeria">Nigeria</option>
                        <option value="ghana">Ghana</option>
                        <option value="kenya">Kenya</option>
                        <option value="south africa">South Africa</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-1 transition ${
                            errors.password ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#0F6E8A]'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-[#64748B]" />
                          ) : (
                            <Eye className="w-4 h-4 text-[#64748B] blink-eye" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-xs text-[#EF4444] mt-1">{errors.password}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#1E293B] mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                          className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-1 transition ${
                            errors.confirmPassword ? 'border-[#EF4444] focus:border-[#EF4444]' : 'border-[#E2E8F0] focus:border-[#0F6E8A]'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-[#64748B]" />
                          ) : (
                            <Eye className="w-4 h-4 text-[#64748B] blink-eye" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-[#EF4444] mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-0.5 rounded border-[#E2E8F0] text-[#0F6E8A] focus:ring-[#0F6E8A]"
                    />
                    <span className="text-sm text-[#64748B]">
                      I accept the <Link to="/terms" className="text-[#0F6E8A] hover:underline">Terms & Conditions</Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-xs text-[#EF4444] -mt-2">{errors.terms}</p>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0F6E8A] text-white py-2.5 rounded-lg font-semibold hover:bg-[#0A4D62] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                  
              
                  
              
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F1F5F9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0F6E8A;
        }
        .blink-eye {
          animation: blink-eye 4s infinite;
          transform-origin: center;
        }
        @keyframes blink-eye {
          0%, 20%, 40%, 60%, 80%, 100% {
            transform: scaleY(1);
            opacity: 1;
          }
          10%, 30%, 50%, 70%, 90% {
            transform: scaleY(0.25);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default Auth;