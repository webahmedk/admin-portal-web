'use client';

import { useState } from 'react';

const mockWarehouse = [
  { id: 'r1', name: 'Rack A (Engine Parts)', shelves: [
    { id: 's1', name: 'Shelf 1', bins: [{id: 'b1', name: 'Bin A1', items: 12}, {id: 'b2', name: 'Bin A2', items: 4}] },
    { id: 's2', name: 'Shelf 2', bins: [{id: 'b3', name: 'Bin A3', items: 8}] },
  ]},
  { id: 'r2', name: 'Rack B (Electrical)', shelves: [
    { id: 's3', name: 'Shelf 1', bins: [{id: 'b4', name: 'Bin B1', items: 15}] },
  ]}
];

export default function WarehousePage() {
  const [activeRack, setActiveRack] = useState(mockWarehouse[0].id);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <header className="h-16 border-b border-white/5 flex items-center px-8 sticky top-0 z-10 bg-white/[0.02] backdrop-blur-md">
        <h1 className="font-semibold text-lg tracking-tight text-white">Warehouse Management</h1>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Storage Layout</h2>
            <p className="text-white/50 text-sm mt-1">Manage Racks, Shelves, and Bins</p>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Rack
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Rack Selector */}
          <div className="col-span-1 border-r border-white/5 pr-6 space-y-3">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Racks</h3>
            {mockWarehouse.map(rack => (
              <button 
                key={rack.id}
                onClick={() => setActiveRack(rack.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${activeRack === rack.id ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.05]'}`}
              >
                <div className="flex items-center gap-3">
                  <svg className={`w-5 h-5 ${activeRack === rack.id ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className={`font-medium text-sm ${activeRack === rack.id ? 'text-indigo-300' : 'text-white/70'}`}>{rack.name}</span>
                </div>
                <span className="text-xs bg-black/40 px-2 py-1 rounded-md text-white/50">{rack.shelves.length} Shelves</span>
              </button>
            ))}
          </div>

          {/* Shelves and Bins */}
          <div className="col-span-3">
            {mockWarehouse.find(r => r.id === activeRack)?.shelves.map(shelf => (
              <div key={shelf.id} className="mb-8">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                  <h3 className="text-lg font-bold text-white/80">{shelf.name}</h3>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">+ Add Bin</button>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {shelf.bins.map(bin => (
                    <div key={bin.id} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:bg-white/[0.08] transition-colors relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.02] rounded-full -mr-8 -mt-8 group-hover:bg-indigo-500/10 transition-colors"></div>
                      <h4 className="font-semibold text-white/90 mb-1">{bin.name}</h4>
                      <p className="text-xs text-white/40">{bin.items} items stored</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-sm uppercase tracking-wider font-bold">Active</span>
                        <button className="text-white/30 hover:text-white/80 transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="bg-transparent border border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-all hover:bg-white/[0.01]">
                    <svg className="w-6 h-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    <span className="text-sm font-medium">New Bin</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
