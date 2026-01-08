'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, Home, PhoneMissed, Clock, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const navItems = [
    {
      label: 'Today',
      href: '/today',
      icon: Home,
      mobileLabel: 'Today',
    },
    {
      label: 'Missed Calls',
      href: '/missed-calls',
      icon: PhoneMissed,
      mobileLabel: 'Calls',
    },
    {
      label: 'Follow-ups',
      href: '/follow-ups',
      icon: Clock,
      mobileLabel: 'Follow',
    },
    {
      label: 'Leads',
      href: '/leads',
      icon: Users,
      mobileLabel: 'Leads',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/today') {
      return pathname === href || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <nav 
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgb(255, 255, 255)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
            : '0 1px 0 rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BF</span>
                </div>
                <span className="text-xl font-semibold text-gray-800 tracking-tight hidden sm:inline">
                  BrokerFlow
                </span>
              </div>
            </div>

            {/* Desktop Nav Items - Center Aligned */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex justify-center space-x-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        relative flex items-center px-4 py-2 rounded-lg transition-all duration-200
                        ${active 
                          ? 'text-teal-700' 
                          : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5 mr-2" />
                      <span className="font-medium text-sm">{item.label}</span>
                      {active && (
                        <div 
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-teal-500 rounded-full"
                          style={{
                            bottom: 'calc(100% - 44px)',
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Add Lead Button */}
            <div className="flex-shrink-0">
              <Link
                href="/add-lead"
                className={`
                  group flex items-center justify-center bg-gradient-to-r from-teal-600 to-emerald-600 
                  hover:from-teal-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl 
                  font-medium transition-all duration-200 shadow-md hover:shadow-lg
                  hover:scale-[1.02] active:scale-[0.98]
                `}
                style={{
                  minWidth: '120px',
                }}
              >
                <Plus className="h-5 w-5 mr-2 transition-transform group-hover:rotate-90" />
                <span className="whitespace-nowrap">Add Lead</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
          height: 'calc(72px + env(safe-area-inset-bottom))',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Mobile Add Lead FAB with enhanced touch area */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: '-32px',
          }}
        >
          <Link
            href="/add-lead"
            className={`
              flex items-center justify-center w-16 h-16 rounded-full
              bg-gradient-to-br from-teal-600 to-emerald-600
              hover:from-teal-700 hover:to-emerald-700
              text-white shadow-xl hover:shadow-2xl
              transition-all duration-300 hover:scale-110 active:scale-95
              border-4 border-white
            `}
            style={{
              minWidth: '64px',
              minHeight: '64px',
            }}
            aria-label="Add Lead"
          >
            <Plus className="h-7 w-7" />
          </Link>
        </div>

        {/* Mobile Nav Items with improved spacing */}
        <div 
          className="flex justify-around items-center h-full"
          style={{
            padding: '0 8px',
          }}
        >
          {navItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative flex flex-col items-center justify-center 
                  rounded-xl transition-all duration-200 flex-1 mx-1
                  ${active 
                    ? 'text-teal-600 bg-teal-50/50' 
                    : 'text-gray-500 hover:text-teal-500'
                  }
                `}
                style={{
                  height: '56px',
                  maxWidth: '80px',
                  minWidth: '64px',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div className="relative">
                  <item.icon 
                    className={`
                      h-6 w-6 transition-all duration-200
                      ${active ? 'scale-110' : 'scale-100'}
                    `}
                  />
                  {active && (
                    <div 
                      className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full animate-pulse"
                      style={{
                        animationDuration: '2s',
                      }}
                    />
                  )}
                </div>
                <span 
                  className={`
                    text-xs font-medium mt-1 transition-all duration-200
                    ${active ? 'font-semibold' : 'font-medium'}
                  `}
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.01em',
                  }}
                >
                  {item.mobileLabel}
                </span>
                
                {/* Active indicator bar */}
                {active && (
                  <div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-teal-500 rounded-b-full"
                    style={{
                      top: '-2px',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Responsive spacers that account for safe areas */}
      <div 
        className="hidden lg:block"
        style={{
          height: '64px',
        }}
      />
      
      <div 
        className="lg:hidden"
        style={{
          height: 'calc(72px + env(safe-area-inset-bottom))',
        }}
      />
    </>
  );
};

export default Navbar;