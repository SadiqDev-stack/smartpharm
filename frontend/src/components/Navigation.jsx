// frontend/src/components/Navigation.jsx
import { useState, useEffect } from "react";
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
} from "lucide-react";
import useStorage from "../hooks/useStorage";

const Navigation = ({ onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useStorage();

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
  }, [location]);

  // Smooth scroll to section
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

  // Navigation links based on user role
  const getNavLinks = () => {
    const publicNaviagtion = [
      { label: "Home", href: "#home", isScroll: true },
      { label: "Features", href: "#features", isScroll: true },
      { label: "Benefits", href: "#benefits", isScroll: true },
      { label: "Pricing", href: "#pricing", isScroll: true },
    ];

    const userNavigation = [
      {
        label: "Dashboard",
        href: "/user/dashboard",
        icon: LayoutDashboard,
        isScroll: false,
      },
      {
        label: "Products",
        href: "/user/dashboard/products",
        icon: Package,
        isScroll: false,
      },
      {
        label: "Patients",
        href: "/user/dashboard/patients",
        icon: Users,
        isScroll: false,
      },
      {
        label: "Loans",
        href: "/user/dashboard/loans",
        icon: CreditCard,
        isScroll: false,
      },
      {
        label: "Invoices",
        href: "/user/dashboard/invoices",
        icon: FileText,
        isScroll: false,
      },
    ];

    const adminNavigation = [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        isScroll: false,
      },
    ];

    const dynamicNav = [];

    let nav;

    if (user) {
      if (location.pathname.includes(`/${user.role}`)) {
        nav = user.role == "user" ? userNavigation : adminNavigation;
        nav.push({ label: "Home", href: "#home", isScroll: true });
      } else {
        dynamicNav.push({
          label: "Dashboard",
          href: `${user.role}/dashboard`,
          icon: LayoutDashboard,
          isScroll: false,
        });
      }
    } else {
      nav = publicNaviagtion;
    }

    nav = { ...nav, ...publicNaviagtion };

    return nav;
  };

  const navLinks = getNavLinks();

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
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Package className="w-6 h-6 md:w-7 md:h-7 text-[#0F6E8A]" />
              <span className="text-xl md:text-2xl font-bold text-[#1E293B]">
                Smart<span className="text-[#0F6E8A]">Pharm</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) =>
                link.isScroll ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) =>
                      handleSmoothScroll(e, link.href.substring(1))
                    }
                    className="text-[#64748B] font-medium hover:text-[#0F6E8A] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-[#64748B] font-medium hover:text-[#0F6E8A] transition-colors ${
                      location.pathname === link.href ? "text-[#0F6E8A]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#0F6E8A] to-[#48B5C5] rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="text-sm font-medium text-[#1E293B]">
                      {user.name?.split(" ")[0]}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-20">
                        <Link
                          to={`/${user.role}/dashboard/profile`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F6E8A]"
                        >
                          <User size={16} />
                          Profile
                        </Link>
                        <Link
                          to={`/${user.role}/dashboard/settings`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F6E8A]"
                        >
                          <Settings size={16} />
                          Settings
                        </Link>
                        <div className="border-t border-[#E2E8F0] my-1"></div>
                        <button
                          onClick={onLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2]"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/auth?mode=login"
                    className="px-4 py-2 text-[#64748B] font-semibold hover:text-[#0F6E8A] transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="px-5 py-2 bg-[#0F6E8A] text-white rounded-lg font-semibold hover:bg-[#0A4D62] transition-all hover:shadow-md"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
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
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E2E8F0] shadow-lg animate-fade-in">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) =>
                link.isScroll ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) =>
                      handleSmoothScroll(e, link.href.substring(1))
                    }
                    className="flex items-center gap-2 px-3 py-2 text-[#64748B] font-medium rounded-lg hover:bg-[#F8FAFC] hover:text-[#0F6E8A] transition"
                  >
                    {link.icon && <link.icon size={18} />}
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`flex items-center gap-2 px-3 py-2 text-[#64748B] font-medium rounded-lg hover:bg-[#F8FAFC] hover:text-[#0F6E8A] transition ${
                      location.pathname === link.href
                        ? "text-[#0F6E8A] bg-[#F8FAFC]"
                        : ""
                    }`}
                  >
                    {link.icon && <link.icon size={18} />}
                    {link.label}
                  </Link>
                ),
              )}

              {!user && (
                <div className="pt-2 space-y-2 border-t border-[#E2E8F0]">
                  <Link
                    to="/auth?mode=login"
                    className="block px-3 py-2 text-center text-[#0F6E8A] font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="block px-3 py-2 text-center bg-[#0F6E8A] text-white rounded-lg font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {user && (
                <div className="pt-2 space-y-2 border-t border-[#E2E8F0]">
                  <div className="px-3 py-2 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#0F6E8A] to-[#48B5C5] rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1E293B]">
                        {user.name}
                      </div>
                      <div className="text-xs text-[#64748B]">{user.email}</div>
                    </div>
                  </div>
                  <Link
                    to={`/${user.role}/dashboard/profile`}
                    className="flex items-center gap-2 px-3 py-2 text-[#64748B] rounded-lg hover:bg-[#F8FAFC]"
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <Link
                    to={`/${user.role}/dashboard/settings`}
                    className="flex items-center gap-2 px-3 py-2 text-[#64748B] rounded-lg hover:bg-[#F8FAFC]"
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#EF4444] rounded-lg hover:bg-[#FEF2F2]"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16 md:h-[70px]"></div>
    </>
  );
};

export default Navigation;
