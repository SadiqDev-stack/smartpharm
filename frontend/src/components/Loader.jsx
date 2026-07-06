

const Loader = ({ fullScreen = true, text = "Loading..." }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 min-w-[200px]">
          {/* Rotating Spinner */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[#E2E8F0] rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-[#0F6E8A] rounded-full animate-spin border-t-transparent"></div>
          </div>
          {text && <p className="text-[#64748B] font-medium text-sm">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-8 h-8 border-3 border-[#E2E8F0] rounded-full"></div>
        <div className="absolute top-0 left-0 w-8 h-8 border-3 border-[#0F6E8A] rounded-full animate-spin border-t-transparent"></div>
      </div>
      {text && <span className="ml-3 text-[#64748B] text-sm">{text}</span>}
    </div>
  );
};

export default Loader;