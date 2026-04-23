'use client';

import { Inter } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: 'Warehouse', href: '/warehouse', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
    { label: 'Inventory', href: '/inventory', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /> },
    { label: 'Point of Sale', href: '/sales', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> },
    { label: 'Customers', href: '/customers', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
    { label: 'Vendors', href: '/vendors', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /> },
  ];

  return (
    <div className={`min-h-screen hero-gradient text-white flex ${inter.className}`}>
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center text-white font-bold text-lg">
              BP
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white m-0 leading-tight">Bike Parts</h1>
              <p className="text-xs text-indigo-300 font-medium tracking-wider uppercase">Portal</p>
            </div>
          </div>
          
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-400' : 'text-white/40 group-hover:text-indigo-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {item.icon}
                  </svg>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <span className="text-xs font-bold text-indigo-400">AM</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-white/40">admin@bikeparts.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden antialiased">
        {children}
      </main>
    </div>
  );
}