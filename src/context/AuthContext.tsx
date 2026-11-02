import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserAccount,
  CustomerSpecificData,
  CustomerAddress,
  CustomerOrder,
  WalletTransaction
} from '../types/auth';

const DEMO_USER_ID = 'DH-USER-10001';

const INITIAL_DEMO_ACCOUNT: UserAccount = {
  id: DEMO_USER_ID,
  name: 'Harshit Tyagi',
  email: 'customer@dufflehub.demo',
  phone: '+91 98765 43210',
  password: 'Demo@123',
  createdAt: Date.now() - 30 * 86400000
};

const INITIAL_CUSTOMER_DATA: CustomerSpecificData = {
  cart: [],
  wishlist: ['dh-001', 'dh-004'],
  walletBalance: 1250,
  walletTransactions: [
    { id: 'tx-1', date: '28 Sep 2026', desc: 'Festive Cashback Credit', amount: 100, type: 'Credit' },
    { id: 'tx-2', date: '22 Sep 2026', desc: 'Order Payment #DHORD-88219', amount: 500, type: 'Debit' },
    { id: 'tx-3', date: '15 Sep 2026', desc: 'Wallet Top-up Deposit', amount: 1000, type: 'Credit' },
    { id: 'tx-4', date: '04 Sep 2026', desc: 'Return Refund for Sizing', amount: 650, type: 'Credit' }
  ],
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Harshit Tyagi',
      mobile: '+91 98765 43210',
      houseFlat: 'Apt 402, Highline Residency',
      street: 'Outer Ring Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      isDefault: true
    }
  ],
  orders: [
    {
      id: 'DHORD-781923',
      date: '27 Sep 2026',
      timestamp: Date.now() - 3 * 86400000,
      products: [
        {
          productId: 'dh-001',
          name: 'Executive Leather Weekender',
          image: '/src/assets/images/product_leather_duffle_1790830736172.jpg',
          color: 'Brown',
          size: 'Standard',
          quantity: 1,
          unitPrice: 5499
        }
      ],
      totalAmount: 5499,
      discountAmount: 2500,
      deliveryCharge: 0,
      paymentMethod: 'UPI (Google Pay)',
      paymentStatus: 'Paid',
      orderStatus: 'Shipped',
      expectedDelivery: '3 Oct 2026',
      deliveryAddress: 'Apt 402, Highline Residency, Indiranagar, Bengaluru 560038'
    },
    {
      id: 'DHORD-621004',
      date: '14 Sep 2026',
      timestamp: Date.now() - 16 * 86400000,
      products: [
        {
          productId: 'dh-002',
          name: 'Pro Gym & Training Duffle',
          image: '/src/assets/images/product_gym_waterproof_1790830748198.jpg',
          color: 'Black',
          size: 'Standard',
          quantity: 1,
          unitPrice: 1799
        }
      ],
      totalAmount: 1799,
      discountAmount: 1200,
      deliveryCharge: 0,
      paymentMethod: 'DUFFLEHUB Wallet',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
      expectedDelivery: '18 Sep 2026',
      deliveryAddress: 'Apt 402, Highline Residency, Indiranagar, Bengaluru 560038'
    }
  ],
  coupons: ['WELCOME10', 'DUFFLE20', 'TRAVEL15', 'FESTIVE25'],
  recentlyViewed: ['dh-001', 'dh-002', 'dh-003']
};

const GUEST_INITIAL_DATA: CustomerSpecificData = {
  cart: [],
  wishlist: [],
  walletBalance: 0,
  walletTransactions: [],
  addresses: [],
  orders: [],
  coupons: ['WELCOME10', 'DUFFLE20'],
  recentlyViewed: []
};

interface AuthContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  showSplash: boolean;
  dismissSplash: () => void;
  
  // Auth Screen Flow
  authScreenMode: 'login' | 'register' | 'forgot_password' | null;
  openAuthScreen: (mode?: 'login' | 'register' | 'forgot_password') => void;
  closeAuthScreen: () => void;
  
  // Login / Register / Logout actions
  login: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  resetPasswordDemo: (identifier: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  continueAsGuest: () => void;
  
  // Protected Action Checker
  requireAuth: (actionDescription: string, onSuccessCallback?: () => void) => boolean;
  
  // Prompt Modal States
  loginPromptOpen: boolean;
  setLoginPromptOpen: (open: boolean) => void;
  loginPromptDesc: string;
  logoutModalOpen: boolean;
  setLogoutModalOpen: (open: boolean) => void;

  // Customer-Specific Data Access
  customerData: CustomerSpecificData;
  updateCustomerData: (updater: (prev: CustomerSpecificData) => CustomerSpecificData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Splash Screen: show on first load
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Check if splash was already viewed in this session
    return sessionStorage.getItem('dufflehub_splash_shown') !== 'true';
  });

  // 2. Active Session
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem('dufflehub_active_session');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isGuest, setIsGuest] = useState<boolean>(() => {
    return localStorage.getItem('dufflehub_is_guest') === 'true';
  });

  // 3. Stored accounts list
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem('dufflehub_all_users');
      if (stored) {
        return JSON.parse(stored);
      }
      // Seed with initial demo account
      localStorage.setItem('dufflehub_all_users', JSON.stringify([INITIAL_DEMO_ACCOUNT]));
      return [INITIAL_DEMO_ACCOUNT];
    } catch {
      return [INITIAL_DEMO_ACCOUNT];
    }
  });

  // 4. Customer-specific data state
  const [customerData, setCustomerData] = useState<CustomerSpecificData>(() => {
    try {
      if (currentUser) {
        const stored = localStorage.getItem(`dufflehub_customer_${currentUser.id}`);
        if (stored) return JSON.parse(stored);
        if (currentUser.id === DEMO_USER_ID) {
          localStorage.setItem(`dufflehub_customer_${DEMO_USER_ID}`, JSON.stringify(INITIAL_CUSTOMER_DATA));
          return INITIAL_CUSTOMER_DATA;
        }
      }
      return GUEST_INITIAL_DATA;
    } catch {
      return GUEST_INITIAL_DATA;
    }
  });

  // Auth Screen View
  const [authScreenMode, setAuthScreenMode] = useState<'login' | 'register' | 'forgot_password' | null>(() => {
    // If not logged in and not explicitly guest, show login on startup
    const hasSession = localStorage.getItem('dufflehub_active_session');
    const isGuestUser = localStorage.getItem('dufflehub_is_guest') === 'true';
    if (!hasSession && !isGuestUser) {
      return 'login';
    }
    return null;
  });

  // Protected prompts
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [loginPromptDesc, setLoginPromptDesc] = useState('');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [pendingActionCallback, setPendingActionCallback] = useState<(() => void) | null>(null);

  // Auto-dismiss splash screen after short brand presentation
  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('dufflehub_splash_shown', 'true');
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Sync customer data to localStorage whenever currentUser or customerData changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`dufflehub_customer_${currentUser.id}`, JSON.stringify(customerData));
    }
  }, [customerData, currentUser]);

  // Update customer data when user switches
  const loadDataForUser = (user: UserAccount | null) => {
    if (!user) {
      setCustomerData(GUEST_INITIAL_DATA);
      return;
    }
    try {
      const stored = localStorage.getItem(`dufflehub_customer_${user.id}`);
      if (stored) {
        setCustomerData(JSON.parse(stored));
      } else if (user.id === DEMO_USER_ID) {
        localStorage.setItem(`dufflehub_customer_${DEMO_USER_ID}`, JSON.stringify(INITIAL_CUSTOMER_DATA));
        setCustomerData(INITIAL_CUSTOMER_DATA);
      } else {
        // Fresh registered user gets a welcome bundle
        const freshData: CustomerSpecificData = {
          cart: [],
          wishlist: [],
          walletBalance: 500, // ₹500 welcome bonus for new signups!
          walletTransactions: [
            {
              id: `tx-welcome-${Date.now()}`,
              date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
              desc: 'Welcome Sign-up Bonus Credit',
              amount: 500,
              type: 'Credit'
            }
          ],
          addresses: [],
          orders: [],
          coupons: ['WELCOME10', 'DUFFLE20'],
          recentlyViewed: []
        };
        localStorage.setItem(`dufflehub_customer_${user.id}`, JSON.stringify(freshData));
        setCustomerData(freshData);
      }
    } catch {
      setCustomerData(GUEST_INITIAL_DATA);
    }
  };

  const dismissSplash = () => {
    setShowSplash(false);
    sessionStorage.setItem('dufflehub_splash_shown', 'true');
  };

  const openAuthScreen = (mode: 'login' | 'register' | 'forgot_password' = 'login') => {
    setAuthScreenMode(mode);
  };

  const closeAuthScreen = () => {
    setAuthScreenMode(null);
  };

  const login = async (identifier: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Artificial slight delay for authentic UX loading state
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (!cleanId || !cleanPass) {
      return { success: false, error: 'Please enter both your email/mobile and password.' };
    }

    const foundUser = accounts.find((u) => {
      const matchEmail = u.email.toLowerCase() === cleanId;
      const matchPhone = u.phone.replace(/[^0-9]/g, '').includes(cleanId.replace(/[^0-9]/g, ''));
      return (matchEmail || matchPhone) && u.password === cleanPass;
    });

    if (!foundUser) {
      return {
        success: false,
        error: 'Invalid email/mobile number or password. Check credentials and try again.'
      };
    }

    setCurrentUser(foundUser);
    setIsGuest(false);
    localStorage.setItem('dufflehub_active_session', JSON.stringify(foundUser));
    localStorage.removeItem('dufflehub_is_guest');
    loadDataForUser(foundUser);
    closeAuthScreen();

    // Execute pending action if any was requested
    if (pendingActionCallback) {
      pendingActionCallback();
      setPendingActionCallback(null);
    }

    return { success: true };
  };

  const register = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPhone = data.phone.trim();
    const cleanName = data.name.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !data.password) {
      return { success: false, error: 'All fields are required to register.' };
    }

    // Check duplicate
    const exists = accounts.some(
      (u) => u.email.toLowerCase() === cleanEmail || u.phone === cleanPhone
    );
    if (exists) {
      return { success: false, error: 'An account with this email or mobile number already exists.' };
    }

    // Generate unique Customer ID: DH-USER-XXXXX
    const randomSuffix = Math.floor(10002 + accounts.length * 13 + Math.random() * 80);
    const newId = `DH-USER-${randomSuffix}`;

    const newUser: UserAccount = {
      id: newId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password: data.password,
      createdAt: Date.now()
    };

    const updatedAccounts = [...accounts, newUser];
    setAccounts(updatedAccounts);
    localStorage.setItem('dufflehub_all_users', JSON.stringify(updatedAccounts));

    // Automatically authenticate the new user
    setCurrentUser(newUser);
    setIsGuest(false);
    localStorage.setItem('dufflehub_active_session', JSON.stringify(newUser));
    localStorage.removeItem('dufflehub_is_guest');
    loadDataForUser(newUser);
    closeAuthScreen();

    return { success: true };
  };

  const resetPasswordDemo = async (identifier: string, newPass: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanId = identifier.trim().toLowerCase();
    const index = accounts.findIndex(
      (u) => u.email.toLowerCase() === cleanId || u.phone.includes(cleanId)
    );

    if (index === -1) {
      return { success: false, error: 'No account registered with that email or mobile number.' };
    }

    const updated = [...accounts];
    updated[index].password = newPass;
    setAccounts(updated);
    localStorage.setItem('dufflehub_all_users', JSON.stringify(updated));

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsGuest(true);
    localStorage.removeItem('dufflehub_active_session');
    localStorage.setItem('dufflehub_is_guest', 'true');
    loadDataForUser(null);
    setLogoutModalOpen(false);
    openAuthScreen('login');
  };

  const continueAsGuest = () => {
    setCurrentUser(null);
    setIsGuest(true);
    localStorage.removeItem('dufflehub_active_session');
    localStorage.setItem('dufflehub_is_guest', 'true');
    loadDataForUser(null);
    closeAuthScreen();
  };

  const requireAuth = (actionDescription: string, onSuccessCallback?: () => void): boolean => {
    if (currentUser) {
      return true;
    }
    setLoginPromptDesc(actionDescription);
    setLoginPromptOpen(true);
    if (onSuccessCallback) {
      setPendingActionCallback(() => onSuccessCallback);
    }
    return false;
  };

  const updateCustomerData = (updater: (prev: CustomerSpecificData) => CustomerSpecificData) => {
    setCustomerData((prev) => {
      const next = updater(prev);
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isGuest,
        showSplash,
        dismissSplash,
        authScreenMode,
        openAuthScreen,
        closeAuthScreen,
        login,
        register,
        resetPasswordDemo,
        logout,
        continueAsGuest,
        requireAuth,
        loginPromptOpen,
        setLoginPromptOpen,
        loginPromptDesc,
        logoutModalOpen,
        setLogoutModalOpen,
        customerData,
        updateCustomerData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
