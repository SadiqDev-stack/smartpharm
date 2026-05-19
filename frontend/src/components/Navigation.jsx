// frontend/src/components/Navigation.jsx
import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Package,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  CreditCard,
  Users,
  FileText,
  Bell,
  Activity,
  Home,
  Sparkles,
  MessageCircle,
  DollarSign,
  BarChart3,
  Terminal,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

// Abstracted Profile Dropdown Component
const ProfileDropdown = ({ user, logout, isOpen, onClose, onToggle }) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-[#0F6E8A] to-[#48B5C5] rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <span className="text-sm font-medium text-[#1E293B] hidden lg:inline">
          {user.name?.split(" ")[0]}
        </span>
        <ChevronDown size={14} className="text-[#64748B] hidden lg:block" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={onClose} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-20">
            <div className="px-4 py-3 border-b border-[#E2E8F0] mb-1">
              <p className="text-sm font-semibold text-[#1E293B] truncate">
                {user.name}
              </p>
              <p className="text-xs text-[#64748B] truncate">{user.email}</p>
              <p className="text-xs text-[#0F6E8A] capitalize mt-1">
                {user.role}
              </p>
            </div>
            <Link
              to={`/${user.role}/profile`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F6E8A]"
              onClick={onClose}
            >
              <User size={16} />
              Profile
            </Link>
            <Link
              to={`/shared/settings`}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F6E8A]"
              onClick={onClose}
            >
              <Settings size={16} />
              Settings
            </Link>
            <div className="border-t border-[#E2E8F0] my-1" />
            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2]"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Abstracted Mobile Menu Component
const MobileMenu = ({
  isOpen,
  navLinks,
  user,
  onSmoothScroll,
  onLinkClick,
  logout,
  isActive,
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-b border-[#E2E8F0] shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto">
      <div className="px-4 py-3 space-y-1">
        {navLinks.map((link) =>
          link.isScroll ? (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => onSmoothScroll(e, link.href.substring(1))}
              className="flex items-center gap-3 px-3 py-2.5 text-[#64748B] font-medium rounded-lg hover:bg-[#F8FAFC] hover:text-[#0F6E8A] transition"
            >
              {link.icon && <link.icon size={18} />}
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              to={link.href}
              onClick={onLinkClick}
              className={`flex items-center gap-3 px-3 py-2.5 text-[#64748B] font-medium rounded-lg hover:bg-[#F8FAFC] hover:text-[#0F6E8A] transition ${
                isActive(link.href) ? "text-[#0F6E8A] bg-[#F8FAFC]" : ""
              }`}
            >
              {link.icon && <link.icon size={18} />}
              {link.label}
            </Link>
          ),
        )}

        {!user && (
          <div className="pt-4 space-y-2 border-t border-[#E2E8F0] mt-2">
            <Link
              to="/auth?mode=login"
              className="block px-3 py-2.5 text-center text-[#0F6E8A] font-semibold rounded-lg border border-[#0F6E8A]"
            >
              Sign In
            </Link>
            <Link
              to="/auth?mode=signup"
              className="block px-3 py-2.5 text-center bg-[#0F6E8A] text-white rounded-lg font-semibold"
            >
              Get Started
            </Link>
          </div>
        )}

        {user && (
          <div className="pt-4 space-y-2 border-t border-[#E2E8F0] mt-2">
            <div className="px-3 py-3 flex items-center gap-3 bg-[#F8FAFC] rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0F6E8A] to-[#48B5C5] rounded-full flex items-center justify-center text-white font-semibold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#1E293B] truncate">
                  {user.name}
                </div>
                <div className="text-xs text-[#64748B] truncate">
                  {user.email}
                </div>
                <div className="text-xs text-[#0F6E8A] capitalize mt-0.5">
                  {user.role}
                </div>
              </div>
            </div>
            <Link
              to={`/${user.role}/profile`}
              className="flex items-center gap-3 px-3 py-2.5 text-[#64748B] rounded-lg hover:bg-[#F8FAFC]"
              onClick={onLinkClick}
            >
              <User size={18} />
              Profile
            </Link>
            <Link
              to={`/shared/settings`}
              className="flex items-center gap-3 px-3 py-2.5 text-[#64748B] rounded-lg hover:bg-[#F8FAFC]"
              onClick={onLinkClick}
            >
              <Settings size={18} />
              Settings
            </Link>
            <button
              onClick={() => {
                onLinkClick();
                logout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-[#EF4444] rounded-lg hover:bg-[#FEF2F2]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Smooth scroll to section (only for public pages)
  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Get navigation links based on user authentication status and role
  const getNavLinks = () => {
    // Public navigation (not logged in)
    if (!user) {
      return [
        { label: "Home", href: "#home", isScroll: true, icon: Home },
        {
          label: "Features",
          href: "#features",
          isScroll: true,
          icon: Sparkles,
        },
        {
          label: "Benefits",
          href: "#benefits",
          isScroll: true,
          icon: Activity,
        },
        {
          label: "Pricing",
          href: "#pricing",
          isScroll: true,
          icon: DollarSign,
        },
        {
          label: "Support",
          href: "/contact",
          isScroll: false,
          icon: MessageCircle,
        },
        {
          label: "AI Assistant",
          href: "/assistant",
          isScroll: false,
          icon: Sparkles,
        },
      ];
    }

    // Admin navigation (role = "admin" or "super")
    if (user.role === "admin" || user.role === "super") {
      return [
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          icon: LayoutDashboard,
          isScroll: false,
        },
        { label: "Users", href: "/admin/users", icon: Users, isScroll: false },
        {
          label: "Config",
          href: "/admin/config",
          icon: Settings,
          isScroll: false,
        },
        { label: "Logs", href: "/admin/logs", icon: Terminal, isScroll: false },
        {
          label: "Notifications",
          href: "/admin/notifications",
          icon: Bell,
          isScroll: false,
        },
        {
          label: "AI Assistant",
          href: "/assistant",
          icon: Sparkles,
          isScroll: false,
        },
      ];
    }

    // Regular user navigation - reduced for desktop to prevent overflow
    return [
      {
        label: "Dashboard",
        href: "/user/dashboard",
        icon: LayoutDashboard,
        isScroll: false,
      },
      {
        label: "Products",
        href: "/user/products",
        icon: Package,
        isScroll: false,
      },
      {
        label: "Patients",
        href: "/user/patients",
        icon: Users,
        isScroll: false,
      },
      {
        label: "Loans",
        href: "/user/loans",
        icon: CreditCard,
        isScroll: false,
      },
      {
        label: "Invoices",
        href: "/user/invoices",
        icon: FileText,
        isScroll: false,
      },
      {
        label: "Analytics",
        href: "/user/analytics",
        icon: BarChart3,
        isScroll: false,
      },
      {
        label: "AI Assistant",
        href: "/assistant",
        icon: Sparkles,
        isScroll: false,
      },
    ];
  };

  const navLinks = getNavLinks();

  // Check if a link is active
  const isActive = (href) => {
    if (href.startsWith("#")) return false;
    return location.pathname === href || location.pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-[70px]">
            {/* Logo */}
            <Link to={"/"} className="flex items-center gap-2 shrink-0">
              <Package className="w-6 h-6 md:w-7 md:h-7 text-[#0F6E8A]" />
              <span className="text-xl md:text-2xl font-bold text-[#1E293B]">
                Smart<span className="text-[#0F6E8A]">Pharm</span>
              </span>
            </Link>

            {/* Desktop Navigation - with overflow handling */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 overflow-x-auto max-w-[60%] lg:max-w-none scrollbar-hide">
              {navLinks.map((link) =>
                link.isScroll ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) =>
                      handleSmoothScroll(e, link.href.substring(1))
                    }
                    className="text-[#64748B] font-medium hover:text-[#0F6E8A] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    {link.icon && <link.icon size={16} />}
                    <span className="hidden lg:inline">{link.label}</span>
                    <span className="lg:hidden">{link.label.slice(0, 8)}</span>
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-[#64748B] font-medium hover:text-[#0F6E8A] transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      isActive(link.href) ? "text-[#0F6E8A]" : ""
                    }`}
                  >
                    {link.icon && <link.icon size={16} />}
                    <span className="hidden lg:inline">{link.label}</span>
                    <span className="lg:hidden">{link.label.slice(0, 8)}</span>
                  </Link>
                ),
              )}
            </div>

            {/* Desktop Actions - Profile Dropdown */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {user ? (
                <ProfileDropdown
                  user={user}
                  logout={logout}
                  isOpen={dropdownOpen}
                  onClose={() => setDropdownOpen(false)}
                  onToggle={() => setDropdownOpen(!dropdownOpen)}
                />
              ) : (
                <>
                  <Link
                    to="/auth?mode=login"
                    className="px-4 py-2 text-[#64748B] font-semibold hover:text-[#0F6E8A] transition whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="px-5 py-2 bg-[#0F6E8A] text-white rounded-lg font-semibold hover:bg-[#0A4D62] transition-all hover:shadow-md whitespace-nowrap"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1E293B]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1E293B]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          navLinks={navLinks}
          user={user}
          onSmoothScroll={handleSmoothScroll}
          onLinkClick={handleMobileLinkClick}
          logout={logout}
          isActive={isActive}
        />
      </nav>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16 md:h-[70px]" />
    </>
  );
};

export default Navigation;
