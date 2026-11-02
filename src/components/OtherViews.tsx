import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { DuffleBagIcon } from './DuffleBagIcon';
import { PRODUCTS_DATA } from '../data/products';
import {
  Wallet,
  Package,
  User,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  PlusCircle,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Tag,
  Gift,
  Eye,
  Settings,
  HelpCircle,
  LogOut,
  Edit2,
  Trash2,
  Plus,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { CustomerAddress } from '../types/auth';

// 1. WALLET VIEW (Prompt Item 15)
export const WalletPreviewView: React.FC = () => {
  const { addToast } = useShop();
  const { customerData, updateCustomerData, currentUser } = useAuth();

  const balance = customerData.walletBalance;
  const transactions = customerData.walletTransactions || [];

  const [amountToAdd, setAmountToAdd] = useState<number>(500);

  const handleAddMoney = () => {
    const newTx = {
      id: `tx-dep-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      desc: 'Wallet Top-up Deposit',
      amount: amountToAdd,
      type: 'Credit' as const
    };

    updateCustomerData((prev) => ({
      ...prev,
      walletBalance: prev.walletBalance + amountToAdd,
      walletTransactions: [newTx, ...prev.walletTransactions]
    }));

    addToast(`Added ₹${amountToAdd} to DUFFLEHUB Wallet (Demo)`, 'success');
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Wallet Balance Hero Card */}
        <div className="bg-neutral-900 rounded-2xl p-6 sm:p-8 text-white border border-neutral-800 shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Wallet className="w-4 h-4" />
              <span>DUFFLEHUB Wallet · {currentUser?.id || 'DH-USER-10001'}</span>
            </div>
            <div className="text-xs sm:text-sm text-neutral-400">Current Available Balance</div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white mt-1 tabular-nums">
              ₹{balance.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-neutral-400 mt-2 max-w-sm">
              Use your wallet for 1-click checkout, instant cashback credits, and direct return refunds.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 bg-neutral-800 p-4 rounded-xl border border-neutral-700 min-w-64">
            <span className="text-xs text-neutral-300 font-semibold">Simulate Add Money:</span>
            <div className="flex items-center gap-2">
              {[250, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmountToAdd(amt)}
                  className={`flex-1 py-1 rounded text-xs font-mono font-bold border transition-colors ${
                    amountToAdd === amt
                      ? 'bg-amber-500 text-neutral-950 border-amber-500'
                      : 'bg-neutral-700 text-neutral-300 border-neutral-600 hover:bg-neutral-600'
                  }`}
                >
                  +₹{amt}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddMoney}
              className="mt-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add ₹{amountToAdd}</span>
            </button>
          </div>
        </div>

        {/* Transaction History (Prompt Item 15) */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-neutral-150 flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-neutral-900">
              Transaction History
            </h3>
            <span className="text-xs text-neutral-400 font-medium">Customer ID: {currentUser?.id}</span>
          </div>

          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-neutral-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-150">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="py-3 px-4 text-neutral-600 whitespace-nowrap">{tx.date}</td>
                      <td className="py-3 px-4 text-neutral-900 font-medium">{tx.desc}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.type === 'Credit'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-right font-mono font-bold tabular-nums ${
                        tx.type === 'Credit' ? 'text-emerald-700' : 'text-neutral-900'
                      }`}>
                        {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-400 text-xs">
              No transactions yet for this account. Top up money to begin.
            </div>
          )}
        </div>

        <div className="mt-4 text-[10px] text-neutral-400 text-center">
          Note: Simulated wallet balance for academic demo purposes.
        </div>
      </div>
    </div>
  );
};

// 2. MY ORDERS & TRACKING VIEW (Prompt Item 18 & 19)
export const OrdersPreviewView: React.FC = () => {
  const { setActiveView } = useShop();
  const { customerData, currentUser } = useAuth();

  const orders = customerData.orders || [];
  const trackingSteps = ['Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStepIndex = (status: string) => {
    const idx = trackingSteps.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-neutral-900">
              My Orders & Live Tracking
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Account: {currentUser?.name} ({currentUser?.id})
            </p>
          </div>
          <button
            onClick={() => setActiveView('shop')}
            className="text-xs font-bold text-neutral-900 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Explore More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((ord) => {
              const currentStep = getStepIndex(ord.orderStatus);

              return (
                <div key={ord.id} className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-150 text-xs">
                    <div>
                      <span className="text-neutral-500">Order ID:</span>{' '}
                      <strong className="font-mono text-neutral-900">{ord.id}</strong>
                    </div>
                    <div className="text-neutral-500">
                      Date: <strong className="text-neutral-800">{ord.date}</strong>
                    </div>
                    <div className="text-neutral-500">
                      Payment: <strong className="text-neutral-800">{ord.paymentMethod}</strong>
                    </div>
                    <div className="font-mono font-bold text-neutral-900">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Products in this order */}
                  <div className="py-4 divide-y divide-neutral-100">
                    {ord.products.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-sm text-neutral-900">
                            {item.name}
                          </h4>
                          <span className="text-xs text-neutral-500">
                            Color: {item.color} · Size: {item.size} · Qty: {item.quantity}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-sm text-neutral-900 tabular-nums">
                          ₹{item.unitPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="text-xs text-neutral-500 mb-3 flex items-center justify-between pt-2 border-t border-neutral-100">
                    <div>
                      Ship to: <strong className="text-neutral-800">{ord.deliveryAddress}</strong>
                    </div>
                    <div>
                      Expected Delivery: <strong className="text-neutral-800">{ord.expectedDelivery}</strong>
                    </div>
                  </div>

                  {/* Order Tracking Progress (Prompt Item 18) */}
                  <div className="pt-3 border-t border-neutral-150 bg-neutral-50 p-3.5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                        Order Status: <span className="text-amber-600">{ord.orderStatus}</span>
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Stage {currentStep + 1} of 6
                      </span>
                    </div>

                    <div className="grid grid-cols-6 gap-1 text-[10px] text-center font-medium">
                      {trackingSteps.map((st, idx) => {
                        const isPassed = idx <= currentStep;
                        return (
                          <div key={st} className="flex flex-col items-center">
                            <div
                              className={`w-full h-1.5 rounded-full mb-1.5 transition-colors ${
                                isPassed ? 'bg-amber-500' : 'bg-neutral-200'
                              }`}
                            />
                            <span className={`line-clamp-1 ${isPassed ? 'text-neutral-900 font-bold' : 'text-neutral-400'}`}>
                              {st}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center max-w-md mx-auto">
            <Package className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-neutral-900">No Orders Yet</h3>
            <p className="text-xs text-neutral-500 mt-1">
              You haven't placed any duffle bag orders on this account yet.
            </p>
            <button
              onClick={() => setActiveView('shop')}
              className="mt-5 px-5 py-2.5 rounded-lg bg-neutral-900 text-white font-semibold text-xs uppercase"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. COMPREHENSIVE CUSTOMER ACCOUNT PAGE (Prompt Item 8)
export const AccountPreviewView: React.FC = () => {
  const { setActiveView, addToast, resetDemoData } = useShop();
  const { currentUser, setLogoutModalOpen, customerData, updateCustomerData } = useAuth();

  const [activeTab, setActiveTab] = useState<
    | 'profile'
    | 'orders'
    | 'wishlist'
    | 'wallet'
    | 'addresses'
    | 'coupons'
    | 'rewards'
    | 'settings'
    | 'support'
  >('profile');

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || 'Harshit Tyagi');
  const [email, setEmail] = useState(currentUser?.email || 'customer@dufflehub.demo');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');

  // Address add state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newHouse, setNewHouse] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPin, setNewPin] = useState('');

  const handleSaveProfile = () => {
    setIsEditing(false);
    addToast('Profile updated successfully', 'success');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHouse || !newStreet || !newCity || !newPin) {
      addToast('Please fill in required address fields', 'error');
      return;
    }

    const newAddr: CustomerAddress = {
      id: `addr-${Date.now()}`,
      fullName: name,
      mobile: phone,
      houseFlat: newHouse,
      street: newStreet,
      city: newCity,
      state: newState || 'Karnataka',
      pinCode: newPin,
      isDefault: (customerData.addresses || []).length === 0
    };

    updateCustomerData((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), newAddr]
    }));

    setShowAddAddress(false);
    setNewHouse('');
    setNewStreet('');
    setNewCity('');
    setNewPin('');
    addToast('New delivery address saved', 'success');
  };

  const handleDeleteAddress = (id: string) => {
    updateCustomerData((prev) => ({
      ...prev,
      addresses: (prev.addresses || []).filter((a) => a.id !== id)
    }));
    addToast('Address removed', 'info');
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package, badge: customerData.orders?.length || 0 },
    { id: 'wishlist', label: 'Wishlist', icon: Tag, badge: customerData.wishlist?.length || 0 },
    { id: 'wallet', label: 'Wallet', icon: Wallet, extra: `₹${customerData.walletBalance}` },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'coupons', label: 'Coupons', icon: Tag, badge: customerData.coupons?.length || 0 },
    { id: 'rewards', label: 'Rewards', icon: Gift, extra: '320 Pts' },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Help & Support', icon: HelpCircle }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Profile Summary (Prompt Item 8) */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile Avatar with Initial */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-neutral-900 text-amber-400 font-display font-extrabold text-3xl flex items-center justify-center shadow-lg border border-neutral-800">
                {name.charAt(0)}
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active Account">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h2 className="font-display font-bold text-2xl text-neutral-900">
                  {name}
                </h2>
                <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Customer ID: {currentUser?.id || 'DH-USER-10001'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                {email} · {phone}
              </p>
            </div>

            {/* Logout Action */}
            <button
              onClick={() => setLogoutModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Account Body: Left Sidebar + Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Navigation Menu (Prompt Item 8) */}
          <div className="bg-white rounded-xl border border-neutral-200 p-2 shadow-xs lg:col-span-1 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'orders') {
                      setActiveView('orders');
                    } else if (item.id === 'wallet') {
                      setActiveView('wallet');
                    } else if (item.id === 'wishlist') {
                      setActiveView('wishlist');
                    } else {
                      setActiveTab(item.id as any);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.extra && (
                    <span className={`font-mono text-[11px] font-bold ${
                      isActive ? 'text-amber-400' : 'text-emerald-700'
                    }`}>
                      {item.extra}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Content Tab Details */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-150 mb-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-neutral-900">
                      My Profile
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Manage your personal details and contact preferences.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        handleSaveProfile();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="text-neutral-500 font-medium block mb-1">Full Name</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-800 disabled:opacity-80"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-500 font-medium block mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-800 disabled:opacity-80"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-500 font-medium block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg p-2.5 text-neutral-800 disabled:opacity-80"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-500 font-medium block mb-1">Customer Identifier</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser?.id || 'DH-USER-10001'}
                      className="w-full bg-neutral-100 border border-neutral-200 rounded-lg p-2.5 text-neutral-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-150 mb-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-neutral-900">
                      Saved Delivery Addresses
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Addresses used for express duffle dispatch.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddAddress(!showAddAddress)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={handleAddAddress} className="mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 text-xs">
                    <h4 className="font-bold text-neutral-900">New Address Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-600 mb-1">House / Flat No.</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Flat 301, Tower B"
                          value={newHouse}
                          onChange={(e) => setNewHouse(e.target.value)}
                          className="w-full bg-white p-2 rounded border border-neutral-200"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-600 mb-1">Street / Area</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 5th Main, Koramangala"
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          className="w-full bg-white p-2 rounded border border-neutral-200"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-600 mb-1">City</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bengaluru"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full bg-white p-2 rounded border border-neutral-200"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-600 mb-1">PIN Code</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 560034"
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          className="w-full bg-white p-2 rounded border border-neutral-200"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddAddress(false)}
                        className="px-3 py-1.5 rounded border border-neutral-200 text-neutral-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded bg-amber-500 text-neutral-950 font-bold"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {(customerData.addresses || []).map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-xl border border-neutral-200 flex items-start justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="font-bold text-neutral-900">{addr.fullName}</strong>
                          {addr.isDefault && (
                            <span className="bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-600 mt-1">
                          {addr.houseFlat}, {addr.street}, {addr.city}, {addr.state} — {addr.pinCode}
                        </p>
                        <span className="text-neutral-500 text-[11px] block mt-1">
                          Mobile: {addr.mobile}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-neutral-400 hover:text-rose-600 p-1"
                        title="Delete Address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COUPONS TAB */}
            {activeTab === 'coupons' && (
              <div>
                <div className="pb-4 border-b border-neutral-150 mb-6">
                  <h3 className="font-display font-bold text-lg text-neutral-900">
                    Active Discount Coupons
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Coupons linked to your customer profile for checkout.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { code: 'WELCOME10', desc: '10% OFF on all travel duffles', min: 'No min' },
                    { code: 'DUFFLE20', desc: '20% OFF on 48-Hour Weekenders', min: 'Min ₹1,499' },
                    { code: 'TRAVEL15', desc: '15% OFF on TSA Cabin Luggage', min: 'Min ₹2,000' },
                    { code: 'FESTIVE25', desc: '25% OFF Festive Campaign Special', min: 'Min ₹2,999' }
                  ].map((c) => (
                    <div key={c.code} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-amber-700 text-sm">{c.code}</span>
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                          Active
                        </span>
                      </div>
                      <p className="text-neutral-700 font-medium">{c.desc}</p>
                      <span className="text-neutral-400 text-[10px] block mt-2">{c.min}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REWARDS TAB */}
            {activeTab === 'rewards' && (
              <div>
                <div className="pb-4 border-b border-neutral-150 mb-6">
                  <h3 className="font-display font-bold text-lg text-neutral-900">
                    Traveler Rewards Program
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Earn 1 reward point for every ₹10 spent on handcrafted bags.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-neutral-950 mb-6 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Total Reward Points
                    </span>
                    <div className="font-mono text-4xl font-extrabold mt-1">320 Pts</div>
                    <span className="text-xs text-amber-950 font-medium mt-1 block">
                      Equivalent to ₹320 in wallet cash
                    </span>
                  </div>
                  <Gift className="w-12 h-12 text-amber-900/40" />
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div>
                <div className="pb-4 border-b border-neutral-150 mb-6">
                  <h3 className="font-display font-bold text-lg text-neutral-900">
                    Account & Privacy Settings
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Configure notifications, currency, and language.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                    <div>
                      <strong className="text-neutral-900 block font-semibold">SMS & WhatsApp Delivery Alerts</strong>
                      <span className="text-neutral-500">Receive live dispatch tracking updates</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                    <div>
                      <strong className="text-neutral-900 block font-semibold">Festive Sale & Offer Notifications</strong>
                      <span className="text-neutral-500">Early access alerts for seasonal campaigns</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-500" />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <strong className="text-neutral-900 block font-semibold">Display Currency</strong>
                      <span className="text-neutral-500">Indian Rupee (INR ₹)</span>
                    </div>
                    <span className="font-mono font-bold text-neutral-800">INR ₹</span>
                  </div>
                </div>
              </div>
            )}

            {/* HELP & SUPPORT TAB */}
            {activeTab === 'support' && (
              <div>
                <div className="pb-4 border-b border-neutral-150 mb-6">
                  <h3 className="font-display font-bold text-lg text-neutral-900">
                    Customer Help & Support
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Assistance with bag dimensions, flight cabin regulations & returns.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200">
                    <strong className="text-neutral-900 block font-semibold">How do 7-day returns work?</strong>
                    <p className="text-neutral-500 mt-1 leading-relaxed">
                      We offer doorstep pickup across 19,000+ Indian PIN codes. Refunds are credited instantly to your DUFFLEHUB Wallet or back to your original payment method.
                    </p>
                  </div>

                  <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200">
                    <strong className="text-neutral-900 block font-semibold">Are DUFFLEHUB bags IATA cabin compliant?</strong>
                    <p className="text-neutral-500 mt-1 leading-relaxed">
                      Yes! All our Cabin Duffle Bags (under 30L) fit comfortably under commercial flight seats or in overhead luggage bins.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Demo reset footer */}
        <div className="mt-8 text-center">
          <button
            onClick={resetDemoData}
            className="text-xs text-neutral-400 hover:text-rose-600 transition-colors underline"
          >
            Reset All Demo Data (Clear LocalStorage)
          </button>
        </div>
      </div>
    </div>
  );
};
