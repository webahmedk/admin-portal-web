'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  
  // UI State
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Data State
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  
  const otpRefs = useRef([]);

  // Timer side-effect for Resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handlePhoneChange = (e) => {
    // Only allow numbers, spaces, parens, dashes
    const val = e.target.value.replace(/[^\d() -]/g, '');
    setPhone(val);
    if (errorMsg) setErrorMsg('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Basic production-level validation for phone
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setIsLoading(true);

    // Mock API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setResendTimer(30); // 30 second timeout to resend
      setOtp(['', '', '', '', '', '']);
      
      // Auto-focus first OTP field
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }, 1000);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length < 6) return;
    
    setErrorMsg('');
    setIsLoading(true);

    // Mock API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      // Simulated Error condition
      if (otpCode === '000000') {
        setErrorMsg('Invalid verification code. Please try again.');
        setOtp(['', '', '', '', '', '']);
        otpRefs.current[0]?.focus();
        return;
      }
      
      // Success condition
      localStorage.setItem('token', 'bike-shop-admin-token');
      router.push('/');
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (errorMsg) setErrorMsg('');
    // Ensure only digits
    const digit = value.replace(/\D/g, '');
    if (!digit && value !== '') return;
    
    const newOtp = [...otp];
    
    // Allow pasting a full block
    if (digit.length > 1) {
      const pastedData = digit.slice(0, 6).split('');
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      // Focus appropriate input
      const nextFocus = Math.min(pastedData.length, 5);
      otpRefs.current[nextFocus]?.focus();
      return;
    }

    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (resendTimer > 0 || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResendTimer(30);
    }, 1000);
  };

  if (step === 'otp') {
    return (
      <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5 w-full max-w-sm animate-[fadeIn_0.3s_ease-out]">
        <div className="text-center mb-2 animate-[slideUp_0.4s_ease-out]">
          <p className="text-neutral-600 text-sm mb-1">Enter the 6-digit verification code sent to</p>
          <p className="font-semibold text-neutral-900">{phone}</p>
        </div>

        <div className="flex justify-between gap-2 mt-2" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (otpRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              className={`w-12 h-14 text-center text-xl font-bold rounded-xl outline-none transition-all duration-300 ${
                errorMsg 
                  ? 'bg-red-50 border-red-300 text-red-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                  : 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10'
              }`}
              aria-label={`Digit ${index + 1}`}
              required
            />
          ))}
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm font-medium text-center animate-[fadeIn_0.2s]">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || otp.some(d => d === '')}
          className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl px-4 py-3 shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="w-5 h-5 block rounded-full border-2 border-white/30 border-t-white animate-spin" aria-label="Loading"></span>
          ) : (
            'Verify & Login'
          )}
        </button>
        
        <div className="flex flex-col items-center gap-2 mt-2">
          <button 
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0 || isLoading}
            className="text-sm text-neutral-500 hover:text-blue-600 font-medium transition-colors disabled:text-neutral-400 disabled:hover:text-neutral-400"
          >
            {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
          </button>

          <button 
            type="button"
            onClick={() => {
              setStep('phone');
              setErrorMsg('');
              setResendTimer(0);
            }}
            className="text-sm text-neutral-500 hover:text-neutral-800 font-medium transition-colors"
          >
            Change Phone Number
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendOtp} className="flex flex-col gap-5 w-full max-w-sm animate-[fadeIn_0.3s_ease-out]">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-neutral-700" htmlFor="phone">Phone Number</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-medium flex items-center pr-3 border-r border-neutral-300">
            +1
          </span>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            required
            className={`w-full pl-[4.5rem] pr-4 py-3 outline-none transition-all duration-300 rounded-xl ${
              errorMsg 
                ? 'bg-red-50 border border-red-300 text-red-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'bg-neutral-50 border border-neutral-300 text-neutral-900 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10'
            }`}
            placeholder="(555) 000-0000"
            aria-invalid={!!errorMsg}
          />
        </div>
        {errorMsg && (
          <p className="text-red-500 text-sm font-medium mt-1 animate-[fadeIn_0.2s]">{errorMsg}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !phone}
        className="mt-2 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-700 text-white font-semibold rounded-xl px-4 py-3 shadow-lg shadow-neutral-900/20 active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="w-5 h-5 block rounded-full border-2 border-white/30 border-t-white animate-spin" aria-label="Loading"></span>
        ) : (
          'Send Verification Code'
        )}
      </button>
    </form>
  );
}
