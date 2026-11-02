import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DuffleBagIcon } from './DuffleBagIcon';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { HERO_IMAGE, LEATHER_DUFFLE_IMG } from '../data/products';

// 1. SPLASH SCREEN (Prompt Item 14)
export const SplashScreen: React.FC = () => {
  const { showSplash, dismissSplash } = useAuth();

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="flex flex-col items-center text-center max-w-sm">
        {/* Animated Brand Duffle Bag Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-2xl ring-1 ring-amber-500/20">
            <DuffleBagIcon className="w-11 h-11 text-amber-400" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500" />
          </span>
        </div>

        {/* Brand Name */}
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white">
          DUFFLEHUB
        </h1>

        {/* Tagline */}
        <p className="font-sans text-sm font-semibold tracking-wider text-amber-400 uppercase mt-1">
          Carry More. Travel Better.
        </p>

        <p className="text-xs text-neutral-400 mt-3 max-w-xs">
          Premium Duffle Bags & Engineered Luggage Architecture
        </p>

        {/* Loading Bar */}
        <div className="w-36 h-1 bg-neutral-800 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full animate-pulse w-3/4" />
        </div>

        {/* Skip button */}
        <button
          onClick={dismissSplash}
          className="mt-6 text-[11px] text-neutral-500 hover:text-neutral-300 underline underline-offset-4"
        >
          Skip into App →
        </button>
      </div>
    </div>
  );
};

// 2. MAIN AUTHENTICATION SCREEN / MODAL (Login, Register, Forgot Password)
export const AuthModalOrScreen: React.FC = () => {
  const {
    authScreenMode,
    openAuthScreen,
    closeAuthScreen,
    login,
    register,
    resetPasswordDemo,
    continueAsGuest
  } = useAuth();

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgreed, setRegAgreed] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot password states
  const [forgotId, setForgotId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Status & validation states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!authScreenMode) return null;

  const handleFillDemoCredentials = () => {
    setIdentifier('customer@dufflehub.demo');
    setPassword('Demo@123');
    setErrorMsg(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!identifier.trim()) {
      setErrorMsg('Please enter your email address or mobile number.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);
    const result = await login(identifier, password);
    setIsLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Invalid credentials');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword) {
      setErrorMsg('Please fill in all required registration fields.');
      return;
    }

    // Basic email format check
    if (!regEmail.includes('@') || !regEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!regAgreed) {
      setErrorMsg('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    const result = await register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword
    });
    setIsLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to create account.');
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!forgotId.trim()) {
      setErrorMsg('Please provide your registered email or mobile number.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const result = await resetPasswordDemo(forgotId, newPassword);
    setIsLoading(false);

    if (result.success) {
      setSuccessMsg('Password updated successfully! You can now sign in.');
      setTimeout(() => {
        openAuthScreen('login');
        setIdentifier(forgotId);
        setPassword(newPassword);
        setSuccessMsg(null);
      }, 1500);
    } else {
      setErrorMsg(result.error || 'Could not reset password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 my-auto flex flex-col md:flex-row">
        {/* Close / Guest Escape Button */}
        <button
          onClick={continueAsGuest}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
          title="Continue as Guest"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Desktop Left Side: Duffle Bag & Travel Visual (Prompt Item 18) */}
        <div className="hidden md:flex md:w-5/12 bg-neutral-900 text-white relative flex-col justify-between p-8 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src={HERO_IMAGE}
              alt="Duffle Bag Collection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 text-amber-400 flex items-center justify-center shadow-md">
                <DuffleBagIcon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl tracking-tight text-white block">
                  DUFFLEHUB
                </span>
                <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold block">
                  Carry More. Travel Better.
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-16">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Membership Benefits</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white leading-snug">
              Unlock Your Dedicated Luggage Hub
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Simulated ₹1,250 Demo Wallet Balance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Live Order Tracking & 6-Stage Progress</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Personalized Wishlists & Exclusive Coupons</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-[10px] text-neutral-400">
              Demo Application · Customer ID generated per registration
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-between max-h-[92vh] overflow-y-auto">
          {/* Mobile Header Brand Lockup */}
          <div className="md:hidden flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-amber-400 flex items-center justify-center">
              <DuffleBagIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-neutral-900 leading-none block">
                DUFFLEHUB
              </span>
              <span className="text-[10px] uppercase tracking-wider text-amber-600 font-bold">
                Carry More. Travel Better.
              </span>
            </div>
          </div>

          {/* Form Content: Mode Switcher */}
          {authScreenMode === 'login' && (
            <div>
              <div className="mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
                  Welcome to DUFFLEHUB
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Sign in to continue shopping
                </p>
              </div>

              {/* Demo Account Box (Prompt Item 5) */}
              <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="flex items-center gap-1.5 text-amber-800">
                    <Info className="w-4 h-4 text-amber-600" />
                    Demo Customer Account
                  </span>
                  <button
                    type="button"
                    onClick={handleFillDemoCredentials}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-2 py-0.5 rounded transition-colors"
                  >
                    Auto-Fill
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] mt-1.5 font-mono">
                  <div>
                    <span className="text-amber-700 font-sans block text-[10px]">Email:</span>
                    <strong className="select-all">customer@dufflehub.demo</strong>
                  </div>
                  <div>
                    <span className="text-amber-700 font-sans block text-[10px]">Password:</span>
                    <strong className="select-all">Demo@123</strong>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Email / Mobile Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. customer@dufflehub.demo or 9876543210"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full bg-neutral-50 hover:bg-white focus:bg-white text-xs pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-neutral-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => openAuthScreen('forgot_password')}
                      className="text-[11px] font-semibold text-amber-600 hover:text-amber-700"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-neutral-50 hover:bg-white focus:bg-white text-xs pl-9 pr-10 py-2.5 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>LOGIN</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={continueAsGuest}
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs transition-colors"
                  >
                    CONTINUE AS GUEST
                  </button>
                </div>
              </form>

              {/* Switch to Register */}
              <div className="mt-6 pt-5 border-t border-neutral-150 text-center text-xs text-neutral-600">
                <span>New to DUFFLEHUB? </span>
                <button
                  onClick={() => openAuthScreen('register')}
                  className="font-bold text-neutral-900 hover:text-amber-600 underline underline-offset-2"
                >
                  Create New Account
                </button>
              </div>
            </div>
          )}

          {/* REGISTER MODE (Prompt Item 3) */}
          {authScreenMode === 'register' && (
            <div>
              <div className="mb-5">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
                  Create New Account
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Join DUFFLEHUB and receive a unique Customer ID + ₹500 welcome credit
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. Aryan Sharma"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-neutral-50 text-xs pl-9 pr-3 py-2 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-neutral-50 text-xs pl-9 pr-3 py-2 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="+91 98765 00000"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full bg-neutral-50 text-xs pl-9 pr-3 py-2 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        placeholder="Min 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full bg-neutral-50 text-xs pl-9 pr-10 py-2 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                      >
                        {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        placeholder="Re-type password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="w-full bg-neutral-50 text-xs pl-9 pr-3 py-2 rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Checkbox (Prompt Item 3) */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-neutral-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regAgreed}
                      onChange={(e) => setRegAgreed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-neutral-300"
                    />
                    <span>
                      I agree to the <strong className="text-neutral-900">Terms & Conditions</strong> and <strong className="text-neutral-900">Privacy Policy</strong>
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    {isLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>CREATE ACCOUNT</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-5 pt-4 border-t border-neutral-150 text-center text-xs text-neutral-600">
                <span>Already have an account? </span>
                <button
                  onClick={() => openAuthScreen('login')}
                  className="font-bold text-neutral-900 hover:text-amber-600 underline underline-offset-2"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {/* FORGOT PASSWORD MODE */}
          {authScreenMode === 'forgot_password' && (
            <div>
              <div className="mb-5">
                <h2 className="font-display text-2xl font-bold text-neutral-900">
                  Reset Password
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Enter your registered email or phone to reset your password.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleForgotSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Registered Email / Phone
                  </label>
                  <input
                    type="text"
                    placeholder="customer@dufflehub.demo"
                    value={forgotId}
                    onChange={(e) => setForgotId(e.target.value)}
                    className="w-full bg-neutral-50 text-xs p-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-neutral-50 text-xs p-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full bg-neutral-50 text-xs p-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    {isLoading ? 'Updating...' : 'RESET PASSWORD'}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => openAuthScreen('login')}
                  className="text-xs text-neutral-500 hover:text-neutral-900 underline"
                >
                  ← Back to Sign In
                </button>
              </div>
            </div>
          )}

          {/* Security / MBA Demo Disclaimer (Prompt Item 16) */}
          <div className="mt-6 pt-4 border-t border-neutral-150 text-[10px] text-neutral-400 text-center leading-relaxed">
            Demo Application — Authentication and transactions are simulated unless connected to real backend services.
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. PROTECTED ACTION PROMPT MODAL (Prompt Item 9 & 10)
export const LoginRequiredPromptModal: React.FC = () => {
  const { loginPromptOpen, setLoginPromptOpen, loginPromptDesc, openAuthScreen } = useAuth();

  if (!loginPromptOpen) return null;

  const handleLoginClick = () => {
    setLoginPromptOpen(false);
    openAuthScreen('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-200 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="font-display font-bold text-xl text-neutral-900">
          Please login to continue
        </h3>

        <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
          {loginPromptDesc ? (
            <>You need an active customer account to {loginPromptDesc}.</>
          ) : (
            <>Please sign in or create an account to access this section.</>
          )}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setLoginPromptOpen(false)}
            className="py-2.5 px-4 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            CONTINUE SHOPPING
          </button>

          <button
            onClick={handleLoginClick}
            className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. LOGOUT CONFIRMATION MODAL (Prompt Item 6)
export const LogoutConfirmModal: React.FC = () => {
  const { logoutModalOpen, setLogoutModalOpen, logout } = useAuth();

  if (!logoutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-neutral-200 text-center">
        <div className="w-12 h-12 rounded-xl bg-neutral-100 text-neutral-600 flex items-center justify-center mx-auto mb-4">
          <DuffleBagIcon className="w-6 h-6" />
        </div>

        <h3 className="font-display font-bold text-lg text-neutral-900">
          Are you sure you want to logout?
        </h3>

        <p className="text-xs text-neutral-500 mt-2">
          Your current cart, saved bags, and simulated wallet balance will be securely preserved for your next visit.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => setLogoutModalOpen(false)}
            className="py-2.5 px-4 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={logout}
            className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
