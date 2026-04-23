'use client';

import { useState } from 'react';

const mockInventory = [
  { id: '1', sku: 'PRD-001', name: 'Brake Pad Set', brand: 'Bosch', cost: 450, price: 850, qty: 12, reorder: 5, location: 'Rack A - Shelf 1 - Bin A1' },
  { id: '2', sku: 'PRD-002', name: 'Spark Plug', brand: 'NGK', cost: 80, price: 150, qty: 3, reorder: 10, location: 'Rack A - Shelf 2 - Bin A3' },
  { id: '3', sku: 'PRD-003', name: 'Clutch Cable', brand: 'OEM', cost: 120, price: 250, qty: 45, reorder: 15, location: 'Rack B - Shelf 1 - Bin B1' },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col h-full bg-transparent">
      <header className="h-16 border-b border-white/5 flex items-center px-8 sticky top-0 z-10 bg-white/[0.02] backdrop-blur-md">
        <h1 className="font-semibold text-lg tracking-tight text-white">Inventory Management</h1>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Products List</h2>
            <p className="text-white/50 text-sm mt-1">Manage stock, prices, and locations</p>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Product
          </button>
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
                placeholder="Search products by SKU or Name..." 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filter
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Product / SKU</th>
                  <th className="px-6 py-4 font-medium">Brand</th>
                  <th className="px-6 py-4 font-medium">Pricing</th>
                  <th className="px-6 py-4 font-medium">Stock</th>
                  <th className="px-6 py-4 font-medium">Location</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockInventory.map(item => {
                  const isLowStock = item.qty <= item.reorder;
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white/90">{item.name}</div>
                        <div className="text-xs text-white/40">{item.sku}</div>
                      </td>
                      <td className="px-6 py-4 text-white/70">{item.brand}</td>
                      <td className="px-6 py-4">
                        <div className="text-white/90">₹{item.price} <span className="text-[10px] text-emerald-400 font-bold ml-1">SELL</span></div>
                        <div className="text-white/40 text-xs">₹{item.cost} <span className="text-[10px] uppercase font-bold ml-1">COST</span></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${isLowStock ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLowStock ? 'bg-rose-400' : 'bg-emerald-400'}`}></div>
                          {item.qty} in stock
                        </div>
                        {isLowStock && <div className="text-[10px] text-rose-400/70 mt-1">Reorder: {item.reorder}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <span className="text-xs font-medium text-white/70 bg-white/5 px-2 py-1 rounded-md">{item.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-white/30 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
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
