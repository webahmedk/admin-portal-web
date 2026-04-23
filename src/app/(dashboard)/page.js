'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Top Header */}
      <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between sticky top-0 z-10 bg-white/[0.02] backdrop-blur-md">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-lg tracking-tight text-white">Dashboard Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition">
            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors px-4 py-2 rounded-lg border border-rose-500/20"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <p className="text-white/50 text-sm mt-1">Welcome back to your shop control center.</p>
        </div>

        {/* Analytic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Spare Parts', value: '1,248', trend: '+12.5%', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
            { label: 'Low Stock Alerts', value: '12', trend: '-2', isBad: true, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
            { label: 'Sales Today', value: '45', trend: '+15.2%', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
            { label: 'Monthly Revenue', value: '₹1,24,500', trend: '+4.1%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/[0.02] rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                  <svg className="w-5 h-5 text-white/60 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.isBad ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  {stat.trend}
                </span>
              </div>
              
              <h3 className="text-white/50 font-medium mb-1 text-sm">{stat.label}</h3>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold tracking-tight text-white">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 bg-white/[0.03] border border-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Recent Sales</h3>
            <div className="space-y-4">
              {[
                { id: 'INV-1001', cust: 'Ravi Mechanic', items: 3, amt: '₹4,500', status: 'Paid', time: '10 mins ago' },
                { id: 'INV-1002', cust: 'Walk-in Customer', items: 1, amt: '₹250', status: 'Paid', time: '45 mins ago' },
                { id: 'INV-1003', cust: 'Ali Auto Works', items: 12, amt: '₹15,200', status: 'Credit', time: '2 hours ago' },
              ].map((sale, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 font-bold text-xs">
                      {sale.cust.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{sale.cust}</p>
                      <p className="text-xs text-white/40">{sale.id} • {sale.items} items</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{sale.amt}</p>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <span className="text-xs text-white/30">{sale.time}</span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-[2px] rounded-full ${sale.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {sale.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
            <h3 className="text-lg font-bold mb-4 relative">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 relative">
              {[
                { label: 'New Sale', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', color: 'indigo', href: '/sales' },
                { label: 'Add Product', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6', color: 'emerald', href: '/inventory' },
                { label: 'Receive PO', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z', color: 'amber', href: '/vendors' },
                { label: 'Add Customer', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'cyan', href: '/customers' },
              ].map((action, i) => (
                <button key={i} onClick={() => router.push(action.href)} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] transition-colors group">
                  <svg className={`w-6 h-6 text-${action.color}-400 mb-2 group-hover:scale-110 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                  </svg>
                  <span className="text-xs font-medium text-white/70 group-hover:text-white">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}