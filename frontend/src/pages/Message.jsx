import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, ArrowRight, Loader } from "lucide-react";
import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";

const Message = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState({
    title: "",
    description: "",
    redirect: null,
  });
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Get parameters - support multiple spellings
    const title = searchParams.get("title") || searchParams.get("titile") || "";
    const description = searchParams.get("description") || searchParams.get("message") || "No message available.";
    let redirect = searchParams.get("redirect");
    
    // Handle redirect parameter
    if (redirect === "false" || redirect === "") {
      redirect = null;
    }
    
    setMessage({
      title: title,
      description: description,
      redirect: redirect,
    });
  }, [searchParams]);

  // Handle auto-redirect with countdown
  useEffect(() => {
    if (message.redirect && message.redirect !== "/" && message.redirect !== "false") {
      // Check if redirect is to a protected route and user isn't authenticated
      const protectedRoutes = ["/user/", "/admin/", "/products", "/patients", "/loans", "/invoices", "/unlock"];
      const isProtectedRoute = protectedRoutes.some(route => message.redirect.startsWith(route));
      
      if (isProtectedRoute && !isAuthenticated) {
        // Don't auto-redirect, show message asking to login
        return;
      }
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Perform redirect
            if (message.redirect.startsWith("http")) {
              window.location.href = message.redirect;
            } else {
              navigate(message.redirect);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [message.redirect, navigate, isAuthenticated]);

  const getIcon = () => {
    const title = message.title.toLowerCase();
    if (title.includes("error") || title.includes("failed") || title.includes("invalid")) {
      return <AlertCircle className="w-10 h-10 text-accent-red" />;
    }
    if (title.includes("success") || title.includes("verified") || title.includes("welcome") || title.includes("congratulations")) {
      return <CheckCircle className="w-10 h-10 text-accent-green" />;
    }
    return <CheckCircle className="w-10 h-10 text-primary" />;
  };

  const iconBg = () => {
    const title = message.title.toLowerCase();
    if (title.includes("error") || title.includes("failed") || title.includes("invalid")) {
      return "bg-red-50 text-accent-red";
    }
    if (title.includes("success") || title.includes("verified") || title.includes("welcome") || title.includes("congratulations")) {
      return "bg-green-50 text-accent-green";
    }
    return "bg-blue-50 text-primary";
  };

  const hasRedirect = message.redirect && message.redirect !== "/" && message.redirect !== "false";
  const protectedRoutes = ["/user/", "/admin/", "/products", "/patients", "/loans", "/invoices", "/unlock"];
  const isProtectedRoute = protectedRoutes.some(route => message.redirect?.startsWith(route));
  const needsLogin = isProtectedRoute && !isAuthenticated;

  return (
    <div className="min-h-screen bg-[var(--bg-light)]">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl border border-[var(--border)] shadow-xl p-8 md:p-12 text-center">
          <div className={`mx-auto mb-6 w-20 h-20 rounded-full ${iconBg()} flex items-center justify-center`}>
            {hasRedirect && !needsLogin ? (
              <Loader className="w-10 h-10 animate-spin" />
            ) : (
              getIcon()
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-dark)] mb-4">{message.title}</h1>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">{message.description}</p>
          {needsLogin ? (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-muted)]">Please log in to continue</p>
              <Link
                to="/auth?mode=login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-all group"
              >
                Log In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : hasRedirect ? (
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold">
              <span>Redirecting in {countdown} seconds...</span>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            </div>
          ) : (
            <Link
              to={message.redirect === "false" ? "/" : "/"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-dark)] transition-all group"
            >
              Continue
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;