'use client';

import { useState } from 'react';

const mockProducts = [
  { id: '1', sku: 'PRD-001', name: 'Brake Pad Set', price: 850, stock: 12, location: 'Rack A-1-A1' },
  { id: '2', sku: 'PRD-002', name: 'Spark Plug', price: 150, stock: 3, location: 'Rack A-2-A3' },
];

export default function SalesPage() {
  const [cart, setCart] = useState([]);
  const [paymentMode, setPaymentMode] = useState('Cash');

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.qty >= product.stock) return; // Prevent over-sale
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.18; // 18% GST mock
  const total = subtotal + tax;

  return (
    <div className="flex flex-col h-full bg-transparent">
      <header className="h-16 border-b border-white/5 flex items-center px-8 sticky top-0 z-10 bg-white/[0.02] backdrop-blur-md justify-between">
        <h1 className="font-semibold text-lg tracking-tight text-white">Point of Sale</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-400 font-medium">Terminal Online</span>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-hidden flex flex-col md:flex-row gap-6">
        
        {/* Left Side: Product Selection */}
        <div className="flex-1 flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden h-full">
          <div className="p-4 border-b border-white/5 bg-white/[0.01]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Scan barcode or search by Name / SKU..." 
                className="w-full bg-black/40 border border-indigo-500/30 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                autoFocus
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Quick Add Products</h3>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              {mockProducts.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => addToCart(product)}
                  className="bg-white/[0.03] border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 rounded-xl p-4 cursor-pointer transition-all group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-white/40">{product.sku}</span>
                    <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-white/70 group-hover:bg-indigo-500 group-hover:text-white transition-colors">{product.stock} left</span>
                  </div>
                  <h4 className="font-semibold text-white/90 mb-1">{product.name}</h4>
                  <p className="text-lg font-bold text-white mb-3">₹{product.price}</p>
                  
                  <div className="border-t border-white/10 pt-2 flex items-center gap-1.5 mt-auto">
                    <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 group-hover:text-indigo-300">{product.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Cart / Checkout */}
        <div className="w-full md:w-96 flex flex-col bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden h-full shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="p-4 border-b border-white/5 bg-black/20 flex justify-between items-center z-10">
            <h2 className="font-bold text-lg">Current Order</h2>
            <button className="text-xs text-rose-400 font-medium hover:text-rose-300 transition-colors" onClick={() => setCart([])}>Clear</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 z-10">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/30">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <p>Cart is empty</p>
                <p className="text-xs mt-1">Scan an item to start</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <p className="text-xs text-white/40">{item.sku}</p>
                      <div className="text-xs text-indigo-400 mt-1 font-medium">{item.location} <span className="text-white/30">• Bin</span></div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between">
                      <p className="font-bold">₹{item.price * item.qty}</p>
                      <div className="flex items-center gap-2 bg-black/40 rounded-lg overflow-hidden border border-white/10">
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 transition-colors" onClick={() => setCart(cart.map(c => c.id === item.id ? { ...c, qty: Math.max(1, c.qty - 1) } : c))}>-</button>
                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 transition-colors" onClick={() => addToCart(item)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/5 p-4 z-10 bg-black/40 backdrop-blur-md pb-6 md:pb-4">
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between text-white/60"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-white/60"><span>Tax (18%)</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10 mt-2">
                <span>Total</span><span className="text-indigo-400">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {['Cash', 'UPI', 'Card', 'Credit'].map(mode => (
                <button 
                  key={mode} 
                  onClick={() => setPaymentMode(mode)}
                  className={`text-xs font-medium py-2 rounded-lg border transition-all ${paymentMode === mode ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'}`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center gap-2 transition-all ${cart.length === 0 ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-[1.02] shadow-indigo-500/25'}`} disabled={cart.length === 0}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Charge ₹{total.toFixed(0)}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
