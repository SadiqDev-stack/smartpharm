// frontend/src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  CreditCard, 
  Bell, 
  Sparkles, 
  Shield, 
  Cloud, 
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Smartphone,
  Database,
  Lock,
  Star,
  Zap,
  FileText,
  ShoppingCart,
  MessageCircle,
  Headphones,
  BarChart3,
  Timer,
  DollarSign,
  HeartHandshake
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0F6E8A] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles size={16} />
                <span>AI-Powered Pharmacy Management</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E293B] leading-tight mb-6">
                Run Your Pharmacy{' '}
                <span className="relative inline-block">
                  <span className="text-[#0F6E8A]">Smarter</span>
                  <span className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#0F6E8A] to-[#48B5C5] rounded-full"></span>
                </span>
                <br />
                Even Offline
              </h1>
              
              <p className="text-lg text-[#64748B] leading-relaxed mb-8">
                SmartPharm helps you manage inventory, track loans, handle patients,
                and sync automatically when online. Perfect for modern pharmacy shops.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/auth/register" className="inline-flex items-center justify-center gap-2 bg-[#0F6E8A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0A4D62] hover:shadow-lg transition-all group">
                  Start Free Trial
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#64748B] px-6 py-3 rounded-lg font-semibold hover:border-[#0F6E8A] hover:text-[#0F6E8A] transition-all">
                  <Headphones size={18} />
                  Contact Support
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E2E8F0]">
                <div>
                  <div className="text-2xl font-bold text-[#0F6E8A]">500+</div>
                  <div className="text-sm text-[#64748B]">Pharmacies</div>
                </div>
                <div className="w-px h-8 bg-[#E2E8F0]"></div>
                <div>
                  <div className="text-2xl font-bold text-[#0F6E8A]">50k+</div>
                  <div className="text-sm text-[#64748B]">Products Tracked</div>
                </div>
                <div className="w-px h-8 bg-[#E2E8F0]"></div>
                <div>
                  <div className="text-2xl font-bold text-[#0F6E8A]">99.9%</div>
                  <div className="text-sm text-[#64748B]">Uptime</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Dashboard Preview */}
            <div className="relative animate-slide-up">
              <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden">
                <div className="bg-[#F8FAFC] p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                  </div>
                  <div className="text-sm text-[#64748B] font-medium">Dashboard Overview</div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                      <Package className="w-5 h-5 text-[#0F6E8A]" />
                      <div>
                        <div className="text-xs text-[#64748B]">Total Products</div>
                        <div className="text-xl font-bold text-[#1E293B]">1,234</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                      <Users className="w-5 h-5 text-[#0F6E8A]" />
                      <div>
                        <div className="text-xs text-[#64748B]">Active Patients</div>
                        <div className="text-xl font-bold text-[#1E293B]">456</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-48 bg-gradient-to-br from-[#0F6E8A]/10 to-[#48B5C5]/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-[#0F6E8A] mx-auto mb-2" />
                      <div className="text-sm text-[#64748B]">Analytics Dashboard</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-[#8B5CF6] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                AI Powered ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Complete */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge">Features</span>
            <h2 className="section-title">
              Complete Pharmacy Management Solution
            </h2>
            <p className="section-subtitle">
              Everything you need to run your pharmacy efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Package />}
              title="Inventory Management"
              description="Track stock levels, expiry dates, and price history. Get low stock alerts automatically."
              color="teal"
            />
            <FeatureCard 
              icon={<FileText />}
              title="Invoice Management"
              description="Create purchasing & selling invoices with item management and payment tracking."
              color="blue"
            />
            <FeatureCard 
              icon={<CreditCard />}
              title="Loan Tracking"
              description="Manage patient loans, track payments, and get overdue notifications automatically."
              color="purple"
            />
            <FeatureCard 
              icon={<Users />}
              title="Patient Management"
              description="Maintain patient history, track dosage schedules, and monitor treatment progress."
              color="green"
            />
            <FeatureCard 
              icon={<Bell />}
              title="Expiry Alerts"
              description="Automatic notifications for products expiring within 1 year with color-coded status."
              color="orange"
            />
            <FeatureCard 
              icon={<ShoppingCart />}
              title="Sales Analytics"
              description="Track revenue, best-selling products, and get AI-powered business insights."
              color="teal"
            />
            <FeatureCard 
              icon={<Cloud />}
              title="Offline First"
              description="Work without internet. Everything syncs automatically when you're back online."
              color="blue"
            />
            <FeatureCard 
              icon={<Sparkles />}
              title="AI Assistant"
              description="Get medicine recommendations, dosage suggestions, and smart insights instantly."
              color="purple"
            />
            <FeatureCard 
              icon={<HeartHandshake />}
              title="24/7 Support"
              description="Dedicated support team and AI-powered help desk for instant assistance."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* Invoice Feature Highlight */}
      <section className="py-16 bg-gradient-to-br from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0F6E8A] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FileText size={16} />
                <span>Smart Invoicing</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">
                Professional Invoices Made Simple
              </h3>
              <p className="text-[#64748B] mb-6">
                Create professional invoices for both purchasing and selling. Track payments, 
                manage customer details, and get real-time payment status updates.
              </p>
              <div className="space-y-3">
                {[
                  'Purchase & selling invoices',
                  'Automatic invoice numbering',
                  'Payment tracking with balance',
                  'Print and share invoices'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    <span className="text-[#1E293B]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-lg">
              <div className="bg-[#F8FAFC] rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-[#0F6E8A]">INV-2024-001</span>
                  <span className="text-xs px-2 py-1 bg-[#10B981]/10 text-[#10B981] rounded">Completed</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Amoxicillin 500mg</span>
                    <span className="font-medium">₦5,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#64748B]">Paracetamol 1g</span>
                    <span className="font-medium">₦2,500</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-[#0F6E8A]">₦7,500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offline-First Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-[#E0F2FE] text-[#0F6E8A] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Database size={16} />
                <span>Offline-First Architecture</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
                Never Stop Working,{' '}
                <span className="text-[#0F6E8A]">Even Without Internet</span>
              </h2>
              
              <p className="text-lg text-[#64748B] mb-6">
                SmartPharm works completely offline. Add products, create invoices, 
                and manage patients - everything saves locally and syncs when you're back online.
              </p>
              
              <div className="space-y-3">
                {[
                  'Full CRUD operations offline',
                  'Automatic sync when online',
                  'Conflict resolution handled',
                  'Local image storage'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981]" />
                    <span className="text-[#1E293B]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-[#0F6E8A]/5 to-[#48B5C5]/5 rounded-2xl p-8 border border-[#E2E8F0] shadow-lg">
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[#0F6E8A] shadow-md">
                      <Smartphone className="w-8 h-8 text-[#0F6E8A]" />
                    </div>
                    <div className="text-sm font-semibold text-[#1E293B]">Offline Mode</div>
                    <div className="text-xs text-[#64748B]">Working locally</div>
                  </div>
                  
                  <div className="text-2xl text-[#0F6E8A] font-bold animate-pulse">⟷</div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#0F6E8A] to-[#48B5C5] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Cloud className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-[#1E293B]">Cloud Sync</div>
                    <div className="text-xs text-[#64748B]">Auto-sync when online</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">Designed for Pharmacy Success</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Timer />}
              title="Save Time"
              description="Automate inventory tracking, expiry alerts, and patient reminders"
              stat="70%"
              statLabel="faster operations"
            />
            <BenefitCard 
              icon={<DollarSign />}
              title="Reduce Loss"
              description="Never miss expired products or unpaid loans again"
              stat="45%"
              statLabel="reduced waste"
            />
            <BenefitCard 
              icon={<Shield />}
              title="Secure & Reliable"
              description="Enterprise-grade security with encrypted data and backups"
              stat="99.9%"
              statLabel="data safety"
            />
          </div>
        </div>
      </section>
{/* 
      Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge">Pricing</span>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">Choose the plan that works for your pharmacy</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Starter"
              price="free"
              period="/month"
              features={[
                "Up to 1k products",
                "Basic inventory management",
                 "AI assistant",
                "Priority support",
                "Email support",
                "Offline mode"
              ]}
              buttonText="Get Started"
              popular={false}
            />
            <PricingCard 
              title="Professional"
              price="₦20,000"
              period="/month"
              features={[
                "Unlimited products",
                "Full inventory management",
                "Patient & loan tracking",
                "AI assistant",
                "Priority support",
                "Analytics dashboard"
              ]}
              buttonText="Start Free Trial"
              popular={true}
            />
            <PricingCard 
              title="Enterprise"
              price="Custom"
              period=""
              features={[
                "Everything in Professional",
                "Multi-branch support",
                "API access",
                "Dedicated account manager",
                "Custom integrations",
                "24/7 phone support"
              ]}
              buttonText="Contact Sales"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0F6E8A] to-[#0A4D62] rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Pharmacy?
            </h2>
            <p className="text-[#48B5C5] text-base md:text-lg mb-8">
              Join hundreds of pharmacy owners who trust SmartPharm
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link to="/auth/register" className="inline-flex items-center justify-center gap-2 bg-white text-[#0F6E8A] px-6 md:px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all group">
                Start Free Trial
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                <Headphones size={18} />
                Contact Support
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
              <Lock size={14} />
              <span>No credit card required. Free 14-day trial.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6 text-[#48B5C5]" />
                <span className="text-xl font-bold">Smart<span className="text-[#48B5C5]">Pharm</span></span>
              </div>
              <p className="text-[#94A3B8] text-sm">
                Modern pharmacy management system with offline-first technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><Link to="/assistant" className="hover:text-white transition">AI Assistant</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#334155] text-center text-sm text-[#94A3B8]">
            <p>&copy; 2026 SmartPharm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    teal: 'bg-[#E0F2FE] text-[#0F6E8A]',
    blue: 'bg-[#DBEAFE] text-[#3B82F6]',
    purple: 'bg-[#F3E8FF] text-[#8B5CF6]',
    orange: 'bg-[#FEF3C7] text-[#F97316]',
    green: 'bg-[#D1FAE5] text-[#10B981]'
  };
  
  return (
    <div className="group p-6 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] hover:shadow-lg transition-all hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1E293B] mb-2">{title}</h3>
      <p className="text-[#64748B] leading-relaxed">{description}</p>
    </div>
  );
};

// Benefit Card Component
const BenefitCard = ({ icon, title, description, stat, statLabel }) => {
  return (
    <div className="text-center p-6 bg-white border border-[#E2E8F0] rounded-xl hover:shadow-lg transition-all">
      <div className="w-16 h-16 bg-gradient-to-br from-[#0F6E8A]/10 to-[#48B5C5]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1E293B] mb-2">{title}</h3>
      <p className="text-[#64748B] mb-4">{description}</p>
      <div>
        <div className="text-3xl font-bold text-[#0F6E8A]">{stat}</div>
        <div className="text-sm text-[#64748B]">{statLabel}</div>
      </div>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ title, price, period, features, buttonText, popular }) => {
 const navigate = (path) => () =>
    location.href = path;
    
 
 
    return (
    <div className={`relative p-6 rounded-xl border transition-all hover:shadow-xl ${
      popular 
        ? 'bg-white border-[#0F6E8A] shadow-lg scale-105' 
        : 'bg-white border-[#E2E8F0] hover:border-[#0F6E8A]'
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#0F6E8A] text-white px-3 py-1 rounded-full text-xs font-semibold">
          Most Popular
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-[#1E293B] mb-2">{title}</h3>
        <div className="text-3xl font-bold text-[#0F6E8A]">{price}</div>
        <div className="text-sm text-[#64748B]">{period}</div>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-[#64748B]">
            <CheckCircle size={16} className="text-[#10B981] shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 rounded-lg font-semibold transition-all ${
        popular
          ? 'bg-[#0F6E8A] text-white hover:bg-[#0A4D62]'
          : 'border border-[#0F6E8A] text-[#0F6E8A] hover:bg-[#0F6E8A] hover:text-white'
      }` }  onClick={navigate("/auth")}>
        {buttonText}
      </button>
    </div>
  );
};

export default Landing;