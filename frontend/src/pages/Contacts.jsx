import { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Input } from '../components/FormComponents';
import { Modal } from '../components/Modal';
import { contactAPI, assistantAPI } from '../services/api';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Send, 
  MessageCircle, 
  Eye,
  Sparkles,
  Loader2,
  Mail,
  Phone,
  User,
  ArrowRight,
  Copy,
  Check,
  Inbox,
  RefreshCw,
  CheckCheck
} from 'lucide-react';

export const Contacts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);

  const searchTimeoutRef = useRef(null);
  const ITEMS_PER_PAGE = 10;

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 500);
    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchInput]);

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await contactAPI.getHistory(page, ITEMS_PER_PAGE, {
        search: search || undefined,
      });
      
      if (response.data?.success) {
        const contactsData = response.data.data?.contacts || [];
        const paginationData = response.data.data?.pagination;
        
        setContacts(contactsData);
        setTotalPages(paginationData?.totalPages || 1);
        setTotal(paginationData?.total || 0);
        
        // Check for view param
        if (viewParam && contactsData.length > 0 && !selectedContact) {
          const contactToView = contactsData.find(c => c._id === viewParam);
          if (contactToView) {
            setSelectedContact(contactToView);
            setShowDetailModal(true);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, search, viewParam, selectedContact]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Fetch single contact if not in list
  const fetchSingleContact = useCallback(async () => {
    if (!viewParam || selectedContact) return;
    try {
      const response = await contactAPI.getContactById(viewParam);
      if (response.data?.success) {
        setSelectedContact(response.data.data?.contact);
        setShowDetailModal(true);
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  }, [viewParam, selectedContact]);

  useEffect(() => {
    if (viewParam && !selectedContact && !loading) {
      fetchSingleContact();
    }
  }, [viewParam, selectedContact, loading, fetchSingleContact]);

  // Mark single contact as read
  const handleMarkAsRead = async (id) => {
    try {
      await contactAPI.markAsRead(id);
      setContacts(prev => prev.map(c => 
        c._id === id ? { ...c, seen: true } : c
      ));
      if (selectedContact?._id === id) {
        setSelectedContact(prev => ({ ...prev, seen: true }));
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    setMarkingAll(true);
    try {
      await contactAPI.markAllAsRead();
      setContacts(prev => prev.map(c => ({ ...c, seen: true })));
      if (selectedContact) {
        setSelectedContact(prev => ({ ...prev, seen: true }));
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    } finally {
      setMarkingAll(false);
    }
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowDetailModal(true);
    setAiQuestion('');
    setAiResponse('');
    setSearchParams({ view: contact._id });
    
    // Mark as read when viewed
    if (!contact.seen) {
      handleMarkAsRead(contact._id);
    }
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedContact(null);
    setAiQuestion('');
    setAiResponse('');
    setCopied(false);
    setSearchParams({});
  };

  const handleAskAI = async () => {
    if (!aiQuestion.trim() || !selectedContact) return;
    
    setAiLoading(true);
    setAiResponse('');
    try {
      const context = `Customer: ${selectedContact.name || 'Customer'}
Email: ${selectedContact.email}
Message: ${selectedContact.message || selectedContact.description || 'No message'}

Question: ${aiQuestion}

Please provide a helpful response as a customer support agent.`;

      const response = await assistantAPI.getResponse(context, selectedContact);
      if (response.data?.success) {
        setAiResponse(response.data.message || response.data.response);
      } else {
        setAiResponse('Unable to generate response. Please try again.');
      }
    } catch (error) {
      setAiResponse('Error getting AI response. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    if (selectedContact?.phone) {
      const message = aiResponse || `Hello ${selectedContact.name || 'there'}, thank you for contacting Sadiq Caps. How can I help you today?`;
      const phoneNumber = selectedContact.phone.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const getTimeAgo = (date) => {
    if (!date) return 'Unknown';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  // Count unread messages
  const unreadCount = contacts.filter(c => !c.seen).length;

  // Suggested prompts for AI
  const suggestedPrompts = [
    "What is the best reply for this message?",
    "Draft a professional response",
    "How to handle this inquiry?",
    "Write a friendly follow-up",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Messages
                </h1>
                <p className="text-gray-400 text-xs">Manage customer inquiries</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  disabled={markingAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 rounded-lg text-gray-400 hover:text-purple-400 transition border border-gray-700 text-sm"
                >
                  <CheckCheck className="w-4 h-4" />
                  {markingAll ? 'Marking...' : `Mark All (${unreadCount})`}
                </button>
              )}
              <button
                onClick={() => fetchContacts()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 rounded-lg text-gray-400 hover:text-purple-400 transition border border-gray-700 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
          <Input
            placeholder="Search by name, email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 py-2 text-sm"
          />
        </div>
        {search && (
          <p className="text-xs text-gray-500 mt-2">Found {total} result{total !== 1 ? 's' : ''}</p>
        )}
      </div>

      {/* Contacts List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-3" />
            <p className="text-gray-500 text-sm">Loading messages...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/30 rounded-xl border border-gray-800">
            <Inbox className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No messages found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className={`group bg-gray-900/40 rounded-lg border transition-all duration-200 cursor-pointer hover:border-purple-500/50 hover:bg-gray-900/60 ${
                  viewParam === contact._id ? 'border-purple-500 bg-gray-900/60' : 'border-gray-800'
                }`}
                onClick={() => handleViewContact(contact)}
              >
                <div className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-medium text-white text-sm">
                          {contact.name || contact.from || 'Unknown'}
                        </h3>
                        {!contact.seen && (
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(contact.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{contact.email}</span>
                        {contact.phone && (
                          <>
                            <span>•</span>
                            <Phone className="w-3 h-3" />
                            <span>{contact.phone}</span>
                          </>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs truncate">
                        {contact.message || contact.description || contact.subject || 'No message'}
                      </p>
                    </div>
                    {!contact.seen && (
                      <div className="ml-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-800">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              size="sm"
              className="text-sm"
            >
              <ChevronLeft size={14} className="mr-1" />
              Previous
            </Button>
            <span className="text-gray-500 text-xs">Page {page} of {totalPages}</span>
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              size="sm"
              className="text-sm"
            >
              Next
              <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={showDetailModal} onClose={handleCloseModal} title="" maxWidth="max-w-2xl">
        {selectedContact && (
          <div className="flex flex-col max-h-[85vh] bg-gray-900 rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 px-5 pt-4">
              <div>
                <h2 className="text-base font-semibold text-white">Message Details</h2>
                <p className="text-xs text-gray-500">From {selectedContact.name || 'Customer'}</p>
              </div>
              <button onClick={handleCloseModal} className="p-1 rounded-lg hover:bg-gray-800">
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3 custom-scrollbar">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800/50 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <User className="w-3 h-3 text-purple-400" />
                    <p className="text-xs text-purple-400">From</p>
                  </div>
                  <p className="text-sm font-medium text-white">{selectedContact.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-400 truncate">{selectedContact.email}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-2.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Phone className="w-3 h-3 text-purple-400" />
                    <p className="text-xs text-purple-400">Phone</p>
                  </div>
                  <p className="text-sm font-medium text-white">{selectedContact.phone || 'Not provided'}</p>
                  {selectedContact.phone && (
                    <button onClick={handleWhatsApp} className="text-xs text-green-400 hover:text-green-300 mt-1 flex items-center gap-1">
                      <MessageCircle size={11} /> WhatsApp
                    </button>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="bg-gray-800/50 rounded-lg p-2.5">
                <p className="text-xs text-purple-400 mb-0.5">Message</p>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedContact.message || selectedContact.description || 'No message content'}
                </p>
              </div>

              {/* AI Assistant */}
              <div className="bg-gray-800/30 rounded-lg p-2.5">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <p className="text-xs font-medium text-purple-400">AI Assistant</p>
                </div>

                {/* Suggested Prompts */}
                <div className="mb-2.5">
                  <p className="text-xs text-gray-500 mb-1.5">Try asking:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAiQuestion(prompt)}
                        className="text-xs bg-gray-800 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 px-2 py-1 rounded-full border border-gray-700 transition"
                      >
                        {prompt.length > 25 ? prompt.substring(0, 25) + '...' : prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Input */}
                <textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask AI for response suggestions..."
                  className="w-full px-2.5 py-1.5 bg-gray-800 border border-gray-700 rounded-lg focus:ring-1 focus:ring-purple-500 outline-none resize-none text-white placeholder-gray-500 text-xs"
                  rows={2}
                />

                <button
                  onClick={handleAskAI}
                  disabled={!aiQuestion.trim() || aiLoading}
                  className="w-full mt-2 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {aiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send size={12} />}
                  {aiLoading ? 'Thinking...' : 'Get Suggestion'}
                </button>

                {/* AI Response */}
                {aiResponse && (
                  <div className="mt-2 bg-gray-800/50 rounded-lg p-2.5 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <Sparkles size={11} className="text-purple-400" />
                        <p className="text-xs font-medium text-purple-400">Response:</p>
                      </div>
                      <button onClick={handleCopyResponse} className="text-gray-500 hover:text-purple-400 text-xs flex items-center gap-0.5">
                        {copied ? <Check size={10} /> : <Copy size={10} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">{aiResponse}</p>
                    <button onClick={() => setAiQuestion(aiResponse)} className="mt-1.5 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-0.5">
                      Use this <ArrowRight size={10} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-2 pt-3 border-t border-gray-800 px-5 pb-4">
              <Button variant="outline" onClick={handleCloseModal} className="flex-1 text-sm py-1.5" size="sm">
                Close
              </Button>
              <Button onClick={handleWhatsApp} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center gap-1.5 text-sm py-1.5" size="sm">
                <MessageCircle size={14} /> Reply on WhatsApp
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1f1f1f; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4a4a4a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b21a5; }
      `}</style>
    </div>
  );
};

// Add X icon if not imported
const X = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);