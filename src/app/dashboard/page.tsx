"use client";

import { useState } from "react";
import { Phone, MessageCircle, Clock, User, Calendar, Plus, Home, Users, X, Save, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type MissedCall = {
  id: number;
  name: string;
  phone: string;
  time: string;
  isHighIntent: boolean;
  property?: string;
  daysSinceFirstContact: number;
};

type FollowUp = {
  id: number;
  name: string;
  reason: string;
  lastInteraction: string;
  phone: string;
  isOverdue: boolean;
  overdueDays?: number;
  stage: 'site-visit' | 'negotiation' | 'token' | 'document' | 'follow-up';
};

type PostCallData = {
  leadId: number;
  leadName: string;
  note: string;
  nextFollowUpDate: string;
};

export default function DashboardPage() {
  // Mock data
  const [missedCalls] = useState<MissedCall[]>([
    { id: 1, name: "Rajesh Kumar", phone: "+91 98765 43210", time: "9:42 AM", isHighIntent: true, property: "3BHK Koramangala", daysSinceFirstContact: 7 },
    { id: 2, name: "Priya Sharma", phone: "+91 87654 32109", time: "10:15 AM", isHighIntent: false, daysSinceFirstContact: 3 },
    { id: 3, name: "+91 76543 21098", phone: "+91 76543 21098", time: "11:05 AM", isHighIntent: true, property: "2BHK HSR Layout", daysSinceFirstContact: 2 },
  ]);

  const [todaysFollowUps] = useState<FollowUp[]>([
    { id: 1, name: "Amit Patel", reason: "Site Visit Scheduled", lastInteraction: "Yesterday", phone: "+91 98765 43211", isOverdue: false, stage: 'site-visit' },
    { id: 2, name: "Sneha Reddy", reason: "Negotiation Final", lastInteraction: "2 days ago", phone: "+91 98765 43212", isOverdue: false, stage: 'negotiation' },
    { id: 3, name: "Karthik Nair", reason: "Token Payment", lastInteraction: "Yesterday", phone: "+91 98765 43213", isOverdue: false, stage: 'token' },
    { id: 4, name: "Neha Gupta", reason: "Document Review", lastInteraction: "3 days ago", phone: "+91 98765 43214", isOverdue: false, stage: 'document' },
  ]);

  const [overdueFollowUps] = useState<FollowUp[]>([
    { id: 5, name: "Rohit Singh", reason: "Booking Confirmation", lastInteraction: "5 days ago", phone: "+91 98765 43215", isOverdue: true, overdueDays: 2, stage: 'negotiation' },
    { id: 6, name: "Anjali Mehta", reason: "Site Visit Follow-up", lastInteraction: "4 days ago", phone: "+91 98765 43216", isOverdue: true, overdueDays: 1, stage: 'site-visit' },
  ]);

  const [postCallData, setPostCallData] = useState<PostCallData | null>(null);
  const [note, setNote] = useState("");
  const [nextDate, setNextDate] = useState("");

  const handleCall = (phone: string, name: string, id: number) => {
    // Simulate call
    console.log(`Calling ${name} at ${phone}`);
    
    // Show post-call prompt
    setPostCallData({
      leadId: id,
      leadName: name,
      note: "",
      nextFollowUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Tomorrow
    });
    setNote("");
    setNextDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  };

  const handleWhatsApp = (phone: string, name: string) => {
    // Simulate WhatsApp
    console.log(`WhatsApp to ${name} at ${phone}`);
  };

  const savePostCallData = () => {
    if (postCallData) {
      console.log("Saved post-call data:", { ...postCallData, note, nextFollowUpDate: nextDate });
      setPostCallData(null);
      setNote("");
      setNextDate("");
    }
  };

  const skipPostCall = () => {
    setPostCallData(null);
    setNote("");
    setNextDate("");
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'site-visit': return 'text-blue-700 bg-blue-50';
      case 'negotiation': return 'text-purple-700 bg-purple-50';
      case 'token': return 'text-green-700 bg-green-50';
      case 'document': return 'text-amber-700 bg-amber-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'site-visit': return '🏠';
      case 'negotiation': return '🤝';
      case 'token': return '💰';
      case 'document': return '📄';
      default: return '📞';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-6">
      {/* Header - Slimmer */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto md:max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Today</h1>
              <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {missedCalls.length} missed • {todaysFollowUps.length} follow-ups
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 md:max-w-3xl">
        {/* Section 1: Missed Calls - Compressed */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-5 bg-red-500 rounded-full" />
            <h2 className="text-lg font-semibold text-gray-900">Missed Calls</h2>
            {missedCalls.some(c => c.isHighIntent) && (
              <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                High Intent
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {missedCalls.map((call) => (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg border-l-4 border-red-500 shadow-sm p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{call.name}</h3>
                      {call.isHighIntent && (
                        <span className="flex items-center gap-1 text-xs font-medium text-red-700">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          High Intent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate mb-1">{call.phone}</p>
                    {call.property && (
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Building className="w-3 h-3" />
                        <span className="truncate">{call.property}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right ml-2">
                    <div className="text-xs font-medium text-gray-600">{call.time}</div>
                    <div className="text-xs text-gray-500">Day {call.daysSinceFirstContact}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={() => handleCall(call.phone, call.name, call.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2.5 rounded-lg text-sm font-medium transition-colors active:scale-[0.98] touch-manipulation"
                  >
                    <Phone className="w-4 h-4" />
                    Call Back
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Today's Follow-ups - Enhanced Clarity */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-5 bg-blue-500 rounded-full" />
            <h2 className="text-lg font-semibold text-gray-900">Today's Follow-ups</h2>
          </div>

          <div className="space-y-2.5">
            {todaysFollowUps.map((followUp) => (
              <div
                key={followUp.id}
                className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 hover:border-blue-200 transition-colors active:bg-blue-50"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-lg">
                    {getStageIcon(followUp.stage)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mb-1.5 ${getStageColor(followUp.stage)}`}>
                      {followUp.reason}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{followUp.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        Last talk: {followUp.lastInteraction}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(followUp.phone, followUp.name, followUp.id);
                          }}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
                          aria-label="Call"
                        >
                          <Phone className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsApp(followUp.phone, followUp.name);
                          }}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
                          aria-label="WhatsApp"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Overdue Follow-ups - Clear Urgency */}
        {overdueFollowUps.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-5 bg-amber-500 rounded-full" />
              <h2 className="text-lg font-semibold text-gray-900">Overdue</h2>
              <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {overdueFollowUps.length} pending
              </span>
            </div>

            <div className="space-y-2.5">
              {overdueFollowUps.map((followUp) => (
                <div
                  key={followUp.id}
                  className="bg-white rounded-lg border border-amber-100 shadow-sm p-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 text-lg">
                      ⚠️
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getStageColor(followUp.stage)}`}>
                          {followUp.reason}
                        </div>
                        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          Overdue by {followUp.overdueDays} day{followUp.overdueDays !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{followUp.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          Last talk: {followUp.lastInteraction}
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCall(followUp.phone, followUp.name, followUp.id);
                            }}
                            className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-colors touch-manipulation"
                            aria-label="Call"
                          >
                            <Phone className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWhatsApp(followUp.phone, followUp.name);
                            }}
                            className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-full transition-colors touch-manipulation"
                            aria-label="WhatsApp"
                          >
                            <MessageCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Post-Call Prompt - Bottom Sheet */}
      <AnimatePresence>
        {postCallData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-50 md:flex md:items-center md:justify-center"
              onClick={skipPostCall}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-50 p-5 max-h-[85vh] overflow-y-auto md:max-w-md md:rounded-xl md:relative md:mx-auto md:mb-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Call completed with {postCallData.leadName}</h3>
                <button
                  onClick={skipPostCall}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-5">Add a quick note and next follow-up date</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short note (optional)
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g., Will decide tomorrow, asked for photos..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Next follow-up date
                  </label>
                  <input
                    type="date"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={skipPostCall}
                  className="flex-1 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={savePostCallData}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save & Continue
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation - Cleaner */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:border-t-0 md:bg-transparent">
        <div className="max-w-2xl mx-auto md:max-w-3xl">
          <div className="flex justify-around items-center py-2.5">
            <button className="flex flex-col items-center gap-1 text-blue-600 font-medium p-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs">Today</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 p-2">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs">Leads</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 p-2">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <span className="text-xs">Add</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}