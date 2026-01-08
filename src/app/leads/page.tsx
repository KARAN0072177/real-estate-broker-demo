'use client';

import Link from 'next/link';
import { ChevronLeft, MessageCircle, Phone, Clock, User, Calendar } from 'lucide-react';
import { useState } from 'react';

type Lead = {
  id: string;
  name: string;
  interest: 'new' | 'interested' | 'cold';
  lastContact: string;
  lastActivity: string;
  location: string;
  budget: string;
  lookingFor: string;
  avatarColor: string;
  lastContactType?: 'call' | 'message';
};

const LeadsPage = () => {
  const [leads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      interest: 'new',
      lastContact: '2 hours ago',
      lastActivity: 'Asked about 2BHK in Downtown',
      location: 'Springfield area',
      budget: '$450K',
      lookingFor: '2BHK apartment',
      avatarColor: 'bg-teal-500',
      lastContactType: 'call'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      interest: 'interested',
      lastContact: 'Yesterday',
      lastActivity: 'Scheduled tour for tomorrow',
      location: 'Riverside apartments',
      budget: '$320K',
      lookingFor: '3BHK villa',
      avatarColor: 'bg-blue-500',
      lastContactType: 'message'
    },
    {
      id: '3',
      name: 'Lisa Wang',
      interest: 'interested',
      lastContact: '3 days ago',
      lastActivity: 'Reviewing mortgage options',
      location: 'Garden district',
      budget: '$280K',
      lookingFor: 'Condo near school',
      avatarColor: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Robert Chen',
      interest: 'new',
      lastContact: 'Today',
      lastActivity: 'Called twice, high urgency',
      location: 'Maple Street',
      budget: '$550K',
      lookingFor: 'Investment property',
      avatarColor: 'bg-amber-500',
      lastContactType: 'call'
    },
    {
      id: '5',
      name: 'David Miller',
      interest: 'cold',
      lastContact: '1 week ago',
      lastActivity: 'Still considering options',
      location: 'Lakeview property',
      budget: '$395K',
      lookingFor: 'Family home',
      avatarColor: 'bg-gray-500'
    },
    {
      id: '6',
      name: 'Emma Thompson',
      interest: 'interested',
      lastContact: '2 days ago',
      lastActivity: 'Waiting for inspection report',
      location: 'Downtown loft',
      budget: '$510K',
      lookingFor: 'Modern apartment',
      avatarColor: 'bg-pink-500',
      lastContactType: 'message'
    }
  ]);

  const getInterestColor = (interest: Lead['interest']) => {
    switch (interest) {
      case 'new':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'interested':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cold':
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getInterestLabel = (interest: Lead['interest']) => {
    switch (interest) {
      case 'new':
        return 'New';
      case 'interested':
        return 'Interested';
      case 'cold':
        return 'Cold';
    }
  };

  const getContactIcon = (type?: 'call' | 'message') => {
    if (type === 'call') {
      return <Phone className="h-3 w-3 text-gray-500" />;
    }
    if (type === 'message') {
      return <MessageCircle className="h-3 w-3 text-gray-500" />;
    }
    return <Clock className="h-3 w-3 text-gray-500" />;
  };

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
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Leads</h1>
              <p className="text-xs lg:text-sm text-gray-600">
                People you're in touch with • {leads.length} active
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-gray-900">
                {leads.filter(l => l.interest === 'new').length}
              </div>
              <div className="text-xs text-gray-600">New</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-gray-900">
                {leads.filter(l => l.interest === 'interested').length}
              </div>
              <div className="text-xs text-gray-600">Interested</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-lg font-bold text-gray-900">
                {leads.filter(l => l.interest === 'cold').length}
              </div>
              <div className="text-xs text-gray-600">Cold</div>
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-3">
          {leads.map((lead) => (
            <Link
              key={lead.id}
              href={`/leads/${lead.id}`}
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-teal-200 hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex items-start">
                {/* Avatar */}
                <div className={`${lead.avatarColor} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <User className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900 text-base truncate">{lead.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getInterestColor(lead.interest)}`}>
                          {getInterestLabel(lead.interest)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">{lead.lookingFor}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">{lead.budget}</span>
                      <span className="ml-1">budget</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>📍 {lead.location}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      {getContactIcon(lead.lastContactType)}
                      <span className="ml-1.5">{lead.lastActivity}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {lead.lastContact}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {leads.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center my-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-7 w-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads yet</h3>
            <p className="text-gray-600 text-sm mb-4">
              Add someone you spoke to recently
            </p>
            <Link
              href="/add-lead"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              Add your first lead
            </Link>
          </div>
        )}

        {/* Insights */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
          <h3 className="font-medium text-gray-900 mb-2 text-sm">💡 Quick insights</h3>
          <ul className="text-xs text-gray-600 space-y-1.5">
            <li className="flex items-center">
              <span className="mr-2">•</span>
              <span>{leads.filter(l => l.interest === 'new').length} new leads need first follow-up within 24h</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              <span>{leads.filter(l => l.interest === 'cold').length} cold leads might need a re-engagement message</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span>
              <span>Average time since last contact: 2.5 days</span>
            </li>
          </ul>
        </div>

        {/* Contact Frequency Reminder */}
        <div className="mt-4 bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">Contact rhythm</h4>
              <p className="text-xs text-gray-600">
                Follow up with new leads within 24 hours, interested leads every 3-4 days, 
                and cold leads once a week.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile CTA - Hidden on desktop since navbar has the button */}
      <div className="lg:hidden fixed bottom-24 right-4 z-30">
        <Link
          href="/add-lead"
          className="flex items-center justify-center w-14 h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Add lead"
        >
          <User className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default LeadsPage;