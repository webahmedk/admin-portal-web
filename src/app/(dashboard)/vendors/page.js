'use client';

import { useState } from 'react';

const mockVendors = [
  { id: 'v1', name: 'Bosch Distributors India', contact: 'Rajeev Sharma', phone: '+91 9898989898', dues: 45000, status: 'Active' },
  { id: 'v2', name: 'NGK Spark Plugs Authorized', contact: 'Amit Patel', phone: '+91 8787878787', dues: 0, status: 'Active' },
  { id: 'v3', name: 'Local Spares Hub', contact: 'Imran', phone: '+91 7676767676', dues: 12500, status: 'Inactive' },
];

export default function VendorsPage() {
  return (
    <div className="flex flex-col h-full bg-transparent">
      <header className="h-16 border-b border-white/5 flex items-center px-8 sticky top-0 z-10 bg-white/[0.02] backdrop-blur-md">
        <h1 className="font-semibold text-lg tracking-tight text-white">Vendors & Procurement</h1>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Supplier Management</h2>
            <p className="text-white/50 text-sm mt-1">Manage vendor accounts, purchase orders, and inwards</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 border border-white/10">
              Receive Stock
            </button>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Vendor
            </button>
          </div>
        </div>

        {/* Top Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Vendor Dues', value: '₹57,500', isCaution: true },
            { label: 'Pending Purchase Orders', value: '3', isCaution: false },
            { label: 'Total Inward (This Month)', value: '₹1,24,000', isCaution: false },
            { label: 'Active Vendors', value: '2', isCaution: false },
          ].map((stat, i) => (
             <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6">
                <h3 className="text-white/50 font-medium mb-2 text-sm">{stat.label}</h3>
                <span className={`text-2xl font-bold ${stat.isCaution ? 'text-amber-400' : 'text-white'}`}>{stat.value}</span>
             </div>
          ))}
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/5 text-white/50 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Vendor Details</th>
                  <th className="px-6 py-4 font-medium">Contact Person</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Total Dues</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockVendors.map(vendor => (
                  <tr key={vendor.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                       <div className="font-semibold text-white/90">{vendor.name}</div>
                       <div className="text-xs text-white/40">ID: {vendor.id}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="text-white/70">{vendor.contact}</div>
                       <div className="text-xs text-indigo-400">{vendor.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm ${vendor.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/50'}`}>
                         {vendor.status}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      {vendor.dues > 0 ? (
                         <div className="font-bold text-amber-400">₹{vendor.dues.toLocaleString()}</div>
                      ) : (
                         <div className="font-bold text-white/30">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="text-indigo-400 hover:bg-indigo-500/10 px-3 py-1 rounded-lg text-xs font-semibold transition-colors border border-indigo-500/20">
                         Create PO
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
