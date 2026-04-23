'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [splashFade, setSplashFade] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
      return;
    }
    
    // Animation timing logic
    const fadeTimer = setTimeout(() => {
      setSplashFade(true); // Trigger fade out
    }, 1500); // Wait 1.5 seconds before fading out

    const hideTimer = setTimeout(() => {
      setShowSplash(false); // Remove from DOM after fade out completes
    }, 2500); // 1.5s + 1s fade duration

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative selection:bg-indigo-500/30">
      {/* Dynamic Background Elements for aesthetic depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {showSplash ? (
        // Splash Screen
        <div 
          className={`flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out z-10 ${
            splashFade ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
        >
          <div className="overflow-hidden mb-4">
            <h1 className="text-5xl md:text-7xl tracking-tighter font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 drop-shadow-sm animate-[slideUp_0.8s_ease-out]">
              Admin Panel
            </h1>
          </div>
          <p className="text-indigo-200/80 font-medium tracking-widest uppercase text-sm animate-[fadeIn_1.2s_ease-out]">
            Bike Spare Parts
          </p>
        </div>
      ) : (
        // Login Form UI - A bright card on a dark background guarantees readability
        <div className="w-full max-w-md bg-white border border-neutral-200 shadow-2xl rounded-3xl p-8 z-10 animate-[fadeIn_0.5s_ease-out_forwards] flex flex-col items-center">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-xl">BP</span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-neutral-500">Sign in to your shop control center</p>
          </div>
          <LoginForm />
        </div>
      )}
    </div>
  );
}


