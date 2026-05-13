import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, ArrowRight, Loader } from "lucide-react";
import Navigation from "../components/Navigation";

const Message = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
  }, [message.redirect, navigate]);

  // Determine icon based on title/content
  const getIcon = () => {
    const title = message.title.toLowerCase();
    if (title.includes("error") || title.includes("failed") || title.includes("invalid")) {
      return <AlertCircle className="w-10 h-10 text-[#EF4444]" />;
    }
    if (title.includes("success") || title.includes("verified") || title.includes("welcome") || title.includes("congratulations")) {
      return <CheckCircle className="w-10 h-10 text-[#10B981]" />;
    }
    return <CheckCircle className="w-10 h-10 text-[#0F6E8A]" />;
  };

  const iconBg = () => {
    const title = message.title.toLowerCase();
    if (title.includes("error") || title.includes("failed") || title.includes("invalid")) {
      return "bg-[#FEF2F2] text-[#EF4444]";
    }
    if (title.includes("success") || title.includes("verified") || title.includes("welcome") || title.includes("congratulations")) {
      return "bg-[#D1FAE5] text-[#10B981]";
    }
    return "bg-[#E0F2FE] text-[#0F6E8A]";
  };

  const hasRedirect = message.redirect && message.redirect !== "/" && message.redirect !== "false";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-8 md:p-12 text-center">
          <div className={`mx-auto mb-6 w-20 h-20 rounded-full ${iconBg()} flex items-center justify-center`}>
            {hasRedirect ? (
              <Loader className="w-10 h-10 animate-spin" />
            ) : (
              getIcon()
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">{message.title}</h1>
          <p className="text-[#64748B] mb-8 leading-relaxed">{message.description}</p>
          {hasRedirect ? (
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#0F6E8A] text-white font-semibold">
              <span>Redirecting in {countdown} seconds...</span>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            </div>
          ) : (
            <Link
              to={message.redirect === "false" ? "/" : "/"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F6E8A] text-white font-semibold hover:bg-[#0A4D62] transition-all group"
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