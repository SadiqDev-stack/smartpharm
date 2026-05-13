// frontend/src/pages/Contact.jsx
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1E293B] mb-4">Contact Us</h1>
          <p className="text-lg text-[#64748B]">We're here to help and answer any questions</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E0F2FE] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#0F6E8A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E293B]">Email Us</h3>
                  <p className="text-sm text-[#64748B]">support@smartpharm.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E0F2FE] rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0F6E8A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E293B]">Call Us</h3>
                  <p className="text-sm text-[#64748B]">+234 (0) 123 456 789</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E0F2FE] rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#0F6E8A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E293B]">Visit Us</h3>
                  <p className="text-sm text-[#64748B]">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl border border-[#E2E8F0] shadow-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">Message Sent!</h3>
                  <p className="text-[#64748B]">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A]"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A]"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A]"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">Message</label>
                    <textarea
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F6E8A] focus:ring-1 focus:ring-[#0F6E8A] resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#0F6E8A] text-white py-3 rounded-lg font-semibold hover:bg-[#0A4D62] transition-all">
                    Send Message
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;