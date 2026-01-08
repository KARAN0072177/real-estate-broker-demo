'use client';

import { useState } from 'react';
import { Phone, MessageCircle, UserPlus, Clock, ChevronLeft, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

type MissedCall = {
  id: number;
  name: string;
  phone: string;
  time: string;
  callCount: number;
  intent: 'new' | 'unknown' | 'cold';
  notes?: string;
  location?: string;
  handled: boolean;
};

const MissedCallsPage = () => {
  const [missedCalls, setMissedCalls] = useState<MissedCall[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      time: '10:42 AM',
      callCount: 2,
      intent: 'new',
      notes: 'Looking for 2BHK in Downtown, called twice',
      location: 'Springfield area',
      handled: false
    },
    {
      id: 2,
      name: 'Robert Chen',
      phone: '+1 (555) 345-6789',
      time: '11:15 AM',
      callCount: 1,
      intent: 'new',
      notes: 'High budget, urgent response needed',
      location: 'Maple Street condo',
      handled: false
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      phone: '+1 (555) 456-7890',
      time: '9:30 AM',
      callCount: 1,
      intent: 'cold',
      notes: 'Follow-up from open house last week',
      location: 'Riverside apartments',
      handled: true
    },
    {
      id: 4,
      phone: '+1 (555) 567-8901',
      name: 'Unknown',
      time: '2:18 PM',
      callCount: 1,
      intent: 'unknown',
      location: 'Local number',
      handled: false
    },
    {
      id: 5,
      name: 'Lisa Wang',
      phone: '+1 (555) 678-9012',
      time: '1:05 PM',
      callCount: 1,
      intent: 'new',
      notes: 'Referred by David Miller',
      location: 'Garden district',
      handled: false
    },
    {
      id: 6,
      name: 'James Wilson',
      phone: '+1 (555) 789-0123',
      time: '12:30 PM',
      callCount: 3,
      intent: 'cold',
      notes: 'Previous client, asking about investment property',
      location: 'Lakeview property',
      handled: false
    }
  ]);

  const [showConvertedToast, setShowConvertedToast] = useState(false);

  const handleConvertToLead = (id: number, name: string) => {
    setMissedCalls(calls =>
      calls.map(call =>
        call.id === id ? { ...call, handled: true } : call
      )
    );
    setShowConvertedToast(true);
    setTimeout(() => setShowConvertedToast(false), 3000);
  };

  const handleCallBack = (phone: string) => {
    // Simulate call back action
    console.log(`Simulating call to: ${phone}`);
    // In a real app, this would trigger the phone dialer
    window.open(`tel:${phone.replace(/\D/g, '')}`, '_self');
  };

  const handleWhatsApp = (phone: string) => {
    // Simulate WhatsApp action
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}`;
    window.open(whatsappUrl, '_blank');
  };

  const unhandledCalls = missedCalls.filter(call => !call.handled);
  const handledCalls = missedCalls.filter(call => call.handled);

  const getIntentColor = (intent: MissedCall['intent']) => {
    switch (intent) {
      case 'new':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'unknown':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cold':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getIntentLabel = (intent: MissedCall['intent']) => {
    switch (intent) {
      case 'new':
        return 'New';
      case 'unknown':
        return 'Unknown';
      case 'cold':
        return 'Cold';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 safe-bottom safe-top">
      {/* Toast Notification */}
      {showConvertedToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center space-x-3 max-w-sm mx-4">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">Converted to lead successfully</span>
            <button 
              onClick={() => setShowConvertedToast(false)}
              className="ml-auto hover:bg-green-600 rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header - Fixed on mobile */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-8 lg:py-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center">
            <Link
              href="/today"
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
              aria-label="Back to Today"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div className="ml-2 flex-1 min-w-0">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">Missed Calls</h1>
              <p className="text-xs lg:text-sm text-gray-600 truncate">
                People who tried to reach you • {unhandledCalls.length} need attention
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-6">
        {/* Stats Summary - Horizontal scroll on mobile */}
        <div className="mb-4 lg:mb-6 overflow-x-auto pb-2 -mx-3 px-3">
          <div className="flex space-x-3 min-w-max lg:grid lg:grid-cols-4 lg:gap-4 lg:min-w-0">
            <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 min-w-[120px] lg:min-w-0">
              <div className="text-lg lg:text-2xl font-bold text-gray-900">{missedCalls.length}</div>
              <div className="text-xs lg:text-sm text-gray-600">Total Calls</div>
            </div>
            <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 min-w-[120px] lg:min-w-0">
              <div className="text-lg lg:text-2xl font-bold text-teal-600">{unhandledCalls.length}</div>
              <div className="text-xs lg:text-sm text-gray-600">Need Action</div>
            </div>
            <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 min-w-[120px] lg:min-w-0">
              <div className="text-lg lg:text-2xl font-bold text-gray-900">
                {missedCalls.filter(c => c.intent === 'new').length}
              </div>
              <div className="text-xs lg:text-sm text-gray-600">New Leads</div>
            </div>
            <div className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 min-w-[120px] lg:min-w-0">
              <div className="text-lg lg:text-2xl font-bold text-gray-900">{handledCalls.length}</div>
              <div className="text-xs lg:text-sm text-gray-600">Handled</div>
            </div>
          </div>
        </div>

        {/* Unhandled Calls */}
        {unhandledCalls.length > 0 ? (
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base lg:text-lg font-semibold text-gray-900 flex items-center">
                <span className="mr-2">Need Attention</span>
                <span className="bg-red-100 text-red-700 text-xs lg:text-sm px-2 py-0.5 rounded-full">
                  {unhandledCalls.length}
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {unhandledCalls.map((call) => (
                <div
                  key={call.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden touch-manipulation"
                >
                  <div className="p-3 sm:p-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900 text-base truncate">
                            {call.name === 'Unknown' ? 'Unknown Caller' : call.name}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getIntentColor(call.intent)} flex-shrink-0`}>
                            {getIntentLabel(call.intent)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-700 text-sm truncate">{call.phone}</p>
                          <div className="flex items-center text-xs text-gray-500 ml-2 flex-shrink-0">
                            <Clock className="h-3 w-3 mr-1" />
                            {call.time}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes & Location */}
                    {call.notes && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">{call.notes}</p>
                    )}
                    
                    {call.location && (
                      <div className="mt-2 text-xs text-gray-500 flex items-center">
                        📍 {call.location}
                      </div>
                    )}

                    {/* Call Info */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-500">
                        Called {call.callCount} time{call.callCount > 1 ? 's' : ''}
                      </span>
                      {call.intent === 'new' && (
                        <span className="text-xs text-teal-600 font-medium flex items-center">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mr-1 animate-pulse"></span>
                          High intent
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons - Mobile optimized */}
                  <div className="border-t border-gray-100 p-3 bg-gray-50/50">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleCallBack(call.phone)}
                        className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white px-3 py-2.5 rounded-lg font-medium transition-colors text-sm touch-manipulation"
                      >
                        <Phone className="h-4 w-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">Call</span>
                      </button>
                      <button
                        onClick={() => handleWhatsApp(call.phone)}
                        className="flex items-center justify-center bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-3 py-2.5 rounded-lg font-medium transition-colors text-sm touch-manipulation"
                      >
                        <MessageCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleConvertToLead(call.id, call.name)}
                        className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 px-3 py-2.5 rounded-lg font-medium transition-colors text-sm touch-manipulation"
                      >
                        <UserPlus className="h-4 w-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">Convert</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center my-8">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-7 w-7 lg:h-8 lg:w-8 text-teal-600" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
              No missed calls
            </h3>
            <p className="text-gray-600 text-sm lg:text-base">
              You're all caught up. Everyone who tried to reach you has been contacted.
            </p>
            <Link
              href="/today"
              className="inline-block mt-4 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              Back to Today
            </Link>
          </div>
        )}

        {/* Handled Calls */}
        {handledCalls.length > 0 && (
          <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200">
            <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center px-1">
              <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 mr-2 flex-shrink-0" />
              Already Handled
            </h2>

            <div className="space-y-2 lg:space-y-3">
              {handledCalls.map((call) => (
                <div
                  key={call.id}
                  className="bg-gray-50/50 rounded-xl border border-gray-200 p-3 lg:p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-700 text-sm lg:text-base truncate">{call.name}</h3>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full flex-shrink-0">
                          Handled
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs lg:text-sm truncate">{call.phone}</p>
                      <div className="flex items-center text-xs lg:text-sm text-gray-500 mt-1 lg:mt-2">
                        <Clock className="h-3 w-3 lg:h-4 lg:w-4 mr-1 flex-shrink-0" />
                        {call.time} • Now a lead in your pipeline
                      </div>
                    </div>
                    <button
                      onClick={() => handleCallBack(call.phone)}
                      className="ml-3 flex-shrink-0 w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation"
                      aria-label="Call back"
                    >
                      <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Tips - Mobile optimized */}
        <div className="mt-6 lg:mt-8 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl lg:rounded-2xl p-4 lg:p-5 border border-teal-100">
          <h3 className="font-medium text-gray-900 mb-2 text-sm lg:text-base">📞 Quick Tips</h3>
          <ul className="text-xs lg:text-sm text-gray-600 space-y-1">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Call back within 30 minutes for best conversion</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>New leads often call during lunch hours (12–2 PM)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Ask about timeline in first 30 seconds</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Always text a follow-up after the call</span>
            </li>
          </ul>
        </div>

        {/* Bottom safe area for mobile navigation */}
        <div className="h-16 lg:hidden"></div>
      </main>
    </div>
  );
};

export default MissedCallsPage;