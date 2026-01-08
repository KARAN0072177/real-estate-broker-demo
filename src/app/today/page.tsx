'use client';

import Link from 'next/link';
import { Phone, MessageCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const TodayPage = () => {
  const [currentDate] = useState(() => {
    const date = new Date();
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  const missedCalls = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+1 (555) 234-5678",
      time: "9:42 AM",
      location: "Looking for 2BHK in Downtown",
      note: "Called twice today"
    },
    {
      id: 2,
      name: "Robert Chen",
      phone: "+1 (555) 345-6789",
      time: "11:15 AM",
      location: "Interested in condo near school",
      note: "High budget, urgent"
    }
  ];

  const todaysFollowUps = [
    {
      id: 1,
      name: "Michael Rodriguez",
      time: "2:00 PM",
      reason: "Tour scheduled for 3BHK villa",
      budget: "$450K",
      location: "Springfield area"
    },
    {
      id: 2,
      name: "Lisa Wang",
      time: "4:30 PM",
      reason: "Paperwork review for closing",
      budget: "$320K",
      location: "Maple Street condo"
    },
    {
      id: 3,
      name: "David Miller",
      time: "5:00 PM",
      reason: "Price negotiation follow-up",
      budget: "$280K",
      location: "Riverside apartment"
    }
  ];

  const overdueFollowUps = [
    {
      id: 1,
      name: "James Wilson",
      due: "Yesterday",
      reason: "Mortgage pre-approval docs",
      budget: "$510K",
      location: "Lakeview property"
    },
    {
      id: 2,
      name: "Emma Thompson",
      due: "2 days ago",
      reason: "Property inspection results",
      budget: "$395K",
      location: "Garden district"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Today</h1>
          <p className="text-gray-600 mt-1">
            {currentDate.day}, {currentDate.date} • Your daily action hub
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Missed Calls - Top Priority */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Missed Calls</h2>
                    <p className="text-sm text-gray-500">High-intent leads waiting</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                {missedCalls.length} missed
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {missedCalls.map((call) => (
              <div key={call.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{call.name}</h3>
                      <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                        Missed
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{call.phone}</p>
                    <p className="text-sm text-gray-700 mt-2">{call.location}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Clock className="h-4 w-4 mr-1" />
                      {call.time} • {call.note}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button 
                      className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center hover:bg-teal-200 transition-colors"
                      aria-label="Call back"
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                    <button 
                      className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                      aria-label="Message on WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gray-50/50 border-t border-gray-50">
            <Link 
              href="/missed-calls" 
              className="flex items-center justify-between group"
            >
              <span className="text-teal-600 font-medium group-hover:text-teal-700 transition-colors">
                View all missed calls
              </span>
              <ChevronRight className="h-5 w-5 text-teal-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Follow-ups Due Today */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Follow-ups Today</h2>
                  <p className="text-sm text-gray-500">Scheduled calls and tasks</p>
                </div>
              </div>
              <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                {todaysFollowUps.length} due
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {todaysFollowUps.map((followUp) => (
              <div key={followUp.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{followUp.name}</h3>
                      <span className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                        {followUp.time}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{followUp.reason}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">{followUp.budget}</span> budget
                      </span>
                      <span className="text-sm text-gray-600">
                        {followUp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button 
                      className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center hover:bg-teal-200 transition-colors"
                      aria-label="Call"
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-gray-50/50 border-t border-gray-50">
            <Link 
              href="/follow-ups" 
              className="flex items-center justify-between group"
            >
              <span className="text-teal-600 font-medium group-hover:text-teal-700 transition-colors">
                View all follow-ups
              </span>
              <ChevronRight className="h-5 w-5 text-teal-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Overdue Follow-ups */}
        {overdueFollowUps.length > 0 && (
          <section className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
            <div className="p-5 border-b border-amber-50 bg-amber-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Overdue Follow-ups</h2>
                    <p className="text-sm text-gray-500">Gentle reminder to check these</p>
                  </div>
                </div>
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  {overdueFollowUps.length} overdue
                </div>
              </div>
            </div>

            <div className="divide-y divide-amber-50/50">
              {overdueFollowUps.map((item) => (
                <div key={item.id} className="p-5 hover:bg-amber-50/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                          Due {item.due}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-2">{item.reason}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-sm text-gray-600">
                          <span className="font-medium">{item.budget}</span> budget
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button 
                        className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center hover:bg-teal-200 transition-colors"
                        aria-label="Call"
                      >
                        <Phone className="h-5 w-5" />
                      </button>
                      <button 
                        className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-200 transition-colors"
                        aria-label="Schedule"
                      >
                        <Clock className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-amber-50/30 border-t border-amber-50">
              <Link 
                href="/follow-ups" 
                className="flex items-center justify-between group"
              >
                <span className="text-amber-700 font-medium group-hover:text-amber-800 transition-colors">
                  Manage all follow-ups
                </span>
                <ChevronRight className="h-5 w-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        )}

        {/* Daily Stats Summary */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-5 border border-teal-100">
          <h3 className="font-medium text-gray-900 mb-3">Today's Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/80 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{missedCalls.length}</div>
              <div className="text-sm text-gray-600">Missed Calls</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{todaysFollowUps.length}</div>
              <div className="text-sm text-gray-600">Follow-ups</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{overdueFollowUps.length}</div>
              <div className="text-sm text-gray-600">Overdue</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Active Leads</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TodayPage;