import { useState } from "react";
import { Send, Sparkles, MessageCircle } from "lucide-react";
import Navigation from "../components/Navigation";
import { assistantAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Assistant = () => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const payload = {
        message: input.trim(),
        userId: user?.id,
        userName: user?.name,
      };
      const res = await assistantAPI.getResponse(payload);

      setResponse(res.data.message || "No response available.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reach assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E0F2FE] mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-[#0F6E8A]" />
          </div>
          <h1 className="text-4xl font-bold text-[#1E293B] mb-3">AI Assistant</h1>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Ask SmartPharm for help with inventory, invoices, customer questions, or business guidance.
          </p>
        </div>

        

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xl">
            
        {response && (
          <div className="mt-10 mb-10 bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-semibold text-[#1E293B] mb-4">Assistant Response</h3>
            <p className="text-[#475569] leading-relaxed whitespace-pre-line">{response}</p>
          </div>
        )}
            <form onSubmit={handleSend} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">Your question</label>
                <textarea
                  rows={5}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full rounded-2xl border border-[#E2E8F0] px-4 py-3 focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] resize-none"
                  placeholder="Ask about stock, invoices, patients, or how to use SmartPharm..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full bg-[#0F6E8A] px-6 py-3 text-white font-semibold hover:bg-[#0A4D62] transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? "Thinking..." : "Send to assistant"}
              </button>
              {error && <p className="text-sm text-[#EF4444]">{error}</p>}
            </form>
          </div>

          <div className="bg-[#0F6E8A] rounded-3xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Assistant Notes</h2>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Use this assistant to get guidance on running your pharmacy, managing stock, or generating invoice ideas.
            </p>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <h3 className="font-semibold">Tip</h3>
                <p className="text-sm text-[#E2E8F0]">Ask questions like “What stock should I reorder?” or “How do I track overdue loans?”.</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <h3 className="font-semibold">Offline</h3>
                <p className="text-sm text-[#E2E8F0]">You can still compose your question offline and send it once your connection returns.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Assistant;
