import Link from 'next/link';
import { ArrowRight, Phone, Clock, Users, CheckCircle, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full mx-auto text-center">
          {/* Logo / Identity */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 ml-3">BrokerFlow</h1>
          </div>

          {/* Title & Tagline */}
          <div className="mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Real Estate Broker Demo
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-xl mx-auto">
              A simple, mobile-first daily workflow demo for real estate brokers to manage missed calls and follow-ups.
            </p>
          </div>

          {/* What This Demo Shows */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-8 text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 text-teal-600 mr-2" />
              What this demo shows
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mr-3">
                  <Clock className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Daily action hub</p>
                  <p className="text-gray-600 text-sm mt-0.5">
                    See everything you need to do today in one glance
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mr-3">
                  <Phone className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Missed calls recovery</p>
                  <p className="text-gray-600 text-sm mt-0.5">
                    Turn missed opportunities into follow-ups instantly
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Lead memory</p>
                  <p className="text-gray-600 text-sm mt-0.5">
                    Never forget serious buyers you're talking to
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Simple workflow</p>
                  <p className="text-gray-600 text-sm mt-0.5">
                    Act quickly without CRM complexity
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Important Notes */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-6 lg:p-8 mb-10">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Important notes about this demo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/80 rounded-lg p-4 border border-amber-200">
                <p className="text-sm font-medium text-amber-800 mb-1">Frontend-only demo</p>
                <p className="text-xs text-amber-700">No backend or real call tracking</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-amber-200">
                <p className="text-sm font-medium text-amber-800 mb-1">Simulated data</p>
                <p className="text-xs text-amber-700">All data is static and mock</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-amber-200">
                <p className="text-sm font-medium text-amber-800 mb-1">Behavior demo</p>
                <p className="text-xs text-amber-700">Buttons show intended behavior only</p>
              </div>
              <div className="bg-white/80 rounded-lg p-4 border border-amber-200">
                <p className="text-sm font-medium text-amber-800 mb-1">Mobile-first</p>
                <p className="text-xs text-amber-700">Optimized for phone viewing</p>
              </div>
            </div>
          </div>

          {/* Primary Action */}
          <div className="mb-12">
            <p className="text-gray-600 mb-6">
              Ready to explore the broker's daily workflow?
            </p>
            <Link
              href="/today"
              className="inline-flex items-center justify-center bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Built for demo and product validation
          </p>
          <p className="text-xs text-gray-400 mt-2">
            This is a frontend-only demo to showcase workflow concepts
          </p>
        </div>
      </footer>

      {/* Mobile Navigation Hint */}
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
        <p className="text-xs text-gray-600">
          Try on mobile for the best experience
        </p>
      </div>
    </div>
  );
}