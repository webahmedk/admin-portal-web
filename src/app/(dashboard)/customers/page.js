'use client';

import { useState } from 'react';

const mockCustomers = [
  { id: '1', name: 'Ravi Mechanic', phone: '+91 9876543210', type: 'Regular', dues: 4500, lastVisit: 'Today' },
  { id: '2', name: 'Ali Auto Works', phone: '+91 8765432109', type: 'Regular', dues: 15200, lastVisit: 'Yesterday' },
  { id: '3', name: 'Walk-in Customer', phone: '-', type: 'Walk-in', dues: 0, lastVisit: '10 mins ago' },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col h-full bg-transparent">
      <header className="h-16 border-b border-white/5 flex items-center px-8 sticky top-0 z-10 bg-white/[0.02] backdrop-blur-md">
        <h1 className="font-semibold text-lg tracking-tight text-white">Customer Credit Management</h1>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Mechanics & Customers</h2>
            <p className="text-white/50 text-sm mt-1">Track dues, receive payments, and view history</p>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Customer
          </button>
        </div>

        {/* Top Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-white/50 text-sm font-medium">Total Credit Outstanding</span>
            <span className="text-3xl font-bold text-rose-400 mt-2">₹19,700</span>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-white/50 text-sm font-medium">Total Received This Month</span>
            <span className="text-3xl font-bold text-emerald-400 mt-2">₹42,500</span>
          </div>
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <span className="text-white/50 text-sm font-medium">Active Regulars</span>
            <span className="text-3xl font-bold text-white mt-2">24</span>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/5 flex gap-4 bg-white/[0.01]">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Customer Name</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Credit Outstanding</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockCustomers.map(customer => {
                  const hasDues = customer.dues > 0;
                  return (
                    <tr key={customer.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 font-bold text-xs">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-white/90">{customer.name}</div>
                            <div className="text-xs text-white/40">Last visit: {customer.lastVisit}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-white/70">{customer.phone}</td>
                      <td className="px-6 py-4">
                         <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm ${customer.type === 'Regular' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-white/50'}`}>
                           {customer.type}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                        {hasDues ? (
                           <div className="font-bold text-rose-400">₹{customer.dues.toLocaleString()}</div>
                        ) : (
                           <div className="font-bold text-white/30">-</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="text-indigo-400 hover:bg-indigo-500/10 px-3 py-1 rounded-lg text-xs font-semibold transition-colors border border-indigo-500/20">
                             View History
                           </button>
                           {hasDues && (
                             <button className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1 rounded-lg text-xs font-semibold transition-colors border border-emerald-500/20">
                               Receive Payment
                             </button>
                           )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
