'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const AddLeadPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    note: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {
      name: '',
      phone: '',
    };
    
    // Simple validation
    if (!form.name.trim()) {
      newErrors.name = 'Please enter a name';
    }
    
    if (!form.phone.trim()) {
      newErrors.phone = 'Please enter a phone number';
    }
    
    setErrors(newErrors);
    
    // If no errors, simulate submission
    if (!newErrors.name && !newErrors.phone) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Redirect after showing success
        setTimeout(() => {
          router.push('/today');
        }, 1500);
      }, 500);
    }
  };

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Lead saved!
            </h2>
            <p className="text-gray-600">
              Redirecting to Today...
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center">
            <Link
              href="/today"
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div className="ml-2 flex-1">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Add Lead</h1>
              <p className="text-xs lg:text-sm text-gray-600">
                Save someone you spoke to quickly
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="John Smith"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                  } outline-none transition-colors`}
                  disabled={isSubmitting}
                  autoFocus
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  First name is enough
                </p>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100'
                  } outline-none transition-colors`}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  For calling and WhatsApp
                </p>
              </div>

              {/* Note Field */}
              <div>
                <label htmlFor="note" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                  Note (optional)
                </label>
                <textarea
                  id="note"
                  value={form.note}
                  onChange={handleChange('note')}
                  placeholder="e.g., Asked about 2BHK in St. Louis"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-colors resize-none"
                  disabled={isSubmitting}
                />
                <p className="mt-1 text-xs text-gray-500">
                  What did they ask about?
                </p>
              </div>

              {/* Example Note */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Example notes:</p>
                <ul className="text-xs text-gray-500 space-y-0.5">
                  <li>• "Interested in 3BHK near school"</li>
                  <li>• "Wants to see properties next week"</li>
                  <li>• "Budget around $400K"</li>
                </ul>
              </div>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50/50 border-t border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center ${
                  isSubmitting
                    ? 'bg-teal-500 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800'
                } text-white px-6 py-3.5 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Save Lead
                  </>
                )}
              </button>
              
              <Link
                href="/today"
                className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 rounded-lg font-medium transition-colors"
              >
                Cancel
              </Link>
            </div>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              Takes less than 10 seconds to save a lead
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
          <h3 className="font-medium text-gray-900 mb-2 text-sm">💡 Quick tips</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Save right after a call – it takes seconds</li>
            <li>• Add a quick note while it's fresh in your mind</li>
            <li>• Don't overthink – you can add details later</li>
            <li>• Follow up within 24 hours for best results</li>
          </ul>
        </div>

        {/* Demo Notice */}
        <div className="mt-4 bg-gray-100 rounded-xl p-4 border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            This is a demo. No data is actually saved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AddLeadPage;