'use client';

import { useState } from 'react';
import { Phone, MessageCircle, CheckCircle, Calendar, Clock, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

type FollowUp = {
  id: number;
  name: string;
  reason: string;
  due: 'today' | 'overdue';
  dueText: string;
  time?: string;
  phone: string;
  location: string;
  budget: string;
  completed: boolean;
  rescheduled?: boolean;
};

const FollowUpsPage = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: 1,
      name: 'Michael Rodriguez',
      reason: 'Tour scheduled for 3BHK villa tomorrow',
      due: 'today',
      dueText: 'Today',
      time: '2:00 PM',
      phone: '+1 (555) 456-7890',
      location: 'Springfield area',
      budget: '$450K',
      completed: false
    },
    {
      id: 2,
      name: 'Lisa Wang',
      reason: 'Paperwork review for closing',
      due: 'today',
      dueText: 'Today',
      time: '4:30 PM',
      phone: '+1 (555) 678-9012',
      location: 'Maple Street condo',
      budget: '$320K',
      completed: false
    },
    {
      id: 3,
      name: 'David Miller',
      reason: 'Price negotiation follow-up',
      due: 'today',
      dueText: 'Today',
      time: '5:00 PM',
      phone: '+1 (555) 789-0123',
      location: 'Riverside apartment',
      budget: '$280K',
      completed: false
    },
    {
      id: 4,
      name: 'James Wilson',
      reason: 'Mortgage pre-approval documents review',
      due: 'overdue',
      dueText: 'Yesterday',
      phone: '+1 (555) 890-1234',
      location: 'Lakeview property',
      budget: '$510K',
      completed: false
    },
    {
      id: 5,
      name: 'Emma Thompson',
      reason: 'Property inspection results discussion',
      due: 'overdue',
      dueText: '2 days ago',
      phone: '+1 (555) 901-2345',
      location: 'Garden district',
      budget: '$395K',
      completed: false
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      reason: 'Final walkthrough questions',
      due: 'overdue',
      dueText: '3 days ago',
      phone: '+1 (555) 234-5678',
      location: 'Downtown loft',
      budget: '$550K',
      completed: false
    }
  ]);

  const [showToday, setShowToday] = useState(true);
  const [showOverdue, setShowOverdue] = useState(true);
  const [rescheduleId, setRescheduleId] = useState<number | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleMarkDone = (id: number) => {
    setFollowUps(prev => prev.map(item => 
      item.id === id ? { ...item, completed: true } : item
    ));
  };

  const handleReschedule = (id: number, option: string) => {
    setFollowUps(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          due: option === 'tomorrow' ? 'today' : 'overdue',
          dueText: option === 'tomorrow' ? 'Tomorrow' : 
                  option === 'in-2-days' ? 'In 2 days' : 'Next week',
          rescheduled: true
        };
      }
      return item;
    }));
    setRescheduleId(null);
  };

  const handleCall = (phone: string) => {
    console.log(`Simulating call to: ${phone}`);
  };

  const handleWhatsApp = (phone: string) => {
    console.log(`Simulating WhatsApp to: ${phone}`);
  };

  const todayItems = followUps.filter(item => item.due === 'today' && !item.completed);
  const overdueItems = followUps.filter(item => item.due === 'overdue' && !item.completed);
  const completedItems = followUps.filter(item => item.completed);

  const rescheduleOptions = [
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'in-2-days', label: 'In 2 days' },
    { id: 'next-week', label: 'Next week' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 lg:px-8 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center">
            <Link
              href="/today"
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div className="ml-2 flex-1">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Follow-ups</h1>
              <p className="text-xs lg:text-sm text-gray-600">
                Calls you planned to make • {todayItems.length + overdueItems.length} pending
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Today Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowToday(!showToday)}
            className="w-full p-4 lg:p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-teal-600" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">Today</h2>
                <p className="text-sm text-gray-500">
                  {todayItems.length} follow-up{todayItems.length !== 1 ? 's' : ''} scheduled
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                {todayItems.length}
              </div>
              {showToday ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </button>

          {showToday && (
            <>
              {todayItems.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {todayItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 lg:p-5 hover:bg-gray-50/30 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-gray-900 text-base">{item.name}</h3>
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                  {item.dueText}
                                </span>
                                {item.rescheduled && (
                                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                                    Rescheduled
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{item.phone}</p>
                            </div>
                            {item.time && (
                              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                {item.time}
                              </span>
                            )}
                          </div>

                          <p className="text-gray-800 mt-3">{item.reason}</p>

                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                            <span>
                              <span className="font-medium">{item.budget}</span> budget
                            </span>
                            <span>📍 {item.location}</span>
                          </div>
                        </div>

                        <div className="mt-4 lg:mt-0 lg:ml-4 flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                          <button
                            onClick={() => handleCall(item.phone)}
                            className="flex-1 lg:flex-none flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-3 py-2.5 rounded-lg font-medium transition-colors text-sm"
                          >
                            <Phone className="h-4 w-4 mr-1.5" />
                            Call
                          </button>
                          <button
                            onClick={() => handleWhatsApp(item.phone)}
                            className="flex-1 lg:flex-none flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2.5 rounded-lg font-medium transition-colors text-sm"
                          >
                            <MessageCircle className="h-4 w-4 mr-1.5" />
                            WhatsApp
                          </button>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-50">
                        <button
                          onClick={() => handleMarkDone(item.id)}
                          className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-1.5" />
                          Mark as Done
                        </button>
                        <div className="relative flex-1">
                          <button
                            onClick={() => setRescheduleId(rescheduleId === item.id ? null : item.id)}
                            className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                          >
                            <Calendar className="h-4 w-4 mr-1.5" />
                            Reschedule
                          </button>

                          {rescheduleId === item.id && (
                            <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
                              {rescheduleOptions.map((option) => (
                                <button
                                  key={option.id}
                                  onClick={() => handleReschedule(item.id, option.id)}
                                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm"
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-7 w-7 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No follow-ups today</h3>
                  <p className="text-gray-600 text-sm">
                    You're all caught up. Great work!
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Overdue Section - Only show if there are overdue items */}
        {overdueItems.length > 0 && (
          <section className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
            <button
              onClick={() => setShowOverdue(!showOverdue)}
              className="w-full p-4 lg:p-5 flex items-center justify-between hover:bg-amber-50/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-semibold text-gray-900">Overdue</h2>
                  <p className="text-sm text-amber-600">
                    {overdueItems.length} follow-up{overdueItems.length !== 1 ? 's' : ''} past due
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  {overdueItems.length}
                </div>
                {showOverdue ? (
                  <ChevronUp className="h-5 w-5 text-amber-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-amber-500" />
                )}
              </div>
            </button>

            {showOverdue && (
              <div className="divide-y divide-amber-50/50">
                {overdueItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 lg:p-5 hover:bg-amber-50/20 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900 text-base">{item.name}</h3>
                              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                                {item.dueText}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{item.phone}</p>
                          </div>
                        </div>

                        <p className="text-gray-800 mt-3">{item.reason}</p>

                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                          <span>
                            <span className="font-medium">{item.budget}</span> budget
                          </span>
                          <span>📍 {item.location}</span>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-4 flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                        <button
                          onClick={() => handleCall(item.phone)}
                          className="flex-1 lg:flex-none flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white px-3 py-2.5 rounded-lg font-medium transition-colors text-sm"
                        >
                          <Phone className="h-4 w-4 mr-1.5" />
                          Call
                        </button>
                        <button
                          onClick={() => handleWhatsApp(item.phone)}
                          className="flex-1 lg:flex-none flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-3 py-2.5 rounded-lg font-medium transition-colors text-sm"
                        >
                          <MessageCircle className="h-4 w-4 mr-1.5" />
                          WhatsApp
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 pt-4 border-t border-amber-50">
                      <button
                        onClick={() => handleMarkDone(item.id)}
                        className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        Mark as Done
                      </button>
                      <div className="relative flex-1">
                        <button
                          onClick={() => setRescheduleId(rescheduleId === item.id ? null : item.id)}
                          className="w-full flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                          <Calendar className="h-4 w-4 mr-1.5" />
                          Reschedule
                        </button>

                        {rescheduleId === item.id && (
                          <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
                            {rescheduleOptions.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => handleReschedule(item.id, option.id)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm"
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Completed Section - Toggle */}
        {completedItems.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="w-full flex items-center justify-between p-3 text-gray-600 hover:text-gray-900"
            >
              <span className="text-sm font-medium">
                Completed ({completedItems.length})
              </span>
              {showCompleted ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showCompleted && (
              <div className="space-y-2 mt-2">
                {completedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl p-3 border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-700 text-sm">{item.name}</span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                            Completed
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs mt-1 truncate">{item.reason}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
          <h3 className="font-medium text-gray-900 mb-2 text-sm">💡 Best Practices</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Always follow up within 24 hours</li>
            <li>• Use WhatsApp for quick updates and photos</li>
            <li>• Set clear next steps in every call</li>
            <li>• Schedule the next follow-up before ending the call</li>
          </ul>
        </div>
      </main>

      {/* Close reschedule dropdown when clicking outside */}
      {rescheduleId !== null && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setRescheduleId(null)}
        />
      )}
    </div>
  );
};

export default FollowUpsPage;