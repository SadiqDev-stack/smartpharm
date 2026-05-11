import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  ArrowRight,
  Loader2,
  Home,
} from 'lucide-react';

export const MessagePage = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [redirecting, setRedirecting] = useState(false);

  const title = searchParams.get('title') || 'Notification';
  const description = searchParams.get('description') || '';
  const redirectParam = searchParams.get('redirect');
  const urlParam = searchParams.get('url');
  const type = searchParams.get('type') || 'success';
  
  let redirect = false;
  let redirectUrl = '/';
  
  if (redirectParam === 'true' || redirectParam === '1' || redirectParam === 'yes') {
    redirect = true;
    redirectUrl = urlParam || '/';
  } else if (redirectParam && redirectParam !== 'false' && redirectParam !== '0' && redirectParam !== 'no') {
    redirect = true;
    redirectUrl = redirectParam;
  }

  const getIcon = () => {
    switch(type) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-16 h-16 text-yellow-500" />;
      default:
        return <Info className="w-16 h-16 text-blue-500" />;
    }
  };

  const getGradient = () => {
    switch(type) {
      case 'success':
        return 'from-green-600 to-emerald-600';
      case 'error':
        return 'from-red-600 to-rose-600';
      case 'warning':
        return 'from-yellow-600 to-orange-600';
      default:
        return 'from-blue-600 to-cyan-600';
    }
  };

  useEffect(() => {
    if (redirect && redirectUrl) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setRedirecting(true);
            navigate(redirectUrl);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [redirect, redirectUrl, navigate]);

  const handleRedirect = () => {
    setRedirecting(true);
    navigate(redirectUrl);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-md w-full">
        <div className={`absolute -inset-1 bg-gradient-to-r ${getGradient()} rounded-2xl blur-xl opacity-30 animate-pulse`}></div>
        
        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800 p-8 text-center shadow-2xl">
          <div className="mb-6 flex justify-center transform animate-bounce-in">
            {getIcon()}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            {decodeURIComponent(title)}
          </h1>

          <div className="text-gray-400 mb-8 space-y-2">
            {decodeURIComponent(description).split('\n').map((line, idx) => (
              <p key={idx} className="leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          {redirect && countdown > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Redirecting in {countdown} seconds...</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1 mt-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getGradient()} rounded-full transition-all duration-1000`}
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {redirect && (
              <button
                onClick={handleRedirect}
                disabled={redirecting}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {redirecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}

            <button
              onClick={handleGoHome}
              className="w-full px-6 py-3 border border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
              <Home className="w-4 h-4" />
              Go to Homepage
            </button>

            {!redirect && (
              <button
                onClick={() => navigate(-1)}
                className="w-full px-6 py-3 text-gray-500 hover:text-gray-300 rounded-lg font-medium transition-all duration-300"
              >
                Go Back
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      `}</style>
    </div>
  );
};