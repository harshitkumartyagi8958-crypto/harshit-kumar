import { CartItem } from './product';

export interface UserAccount {
  id: string; // e.g. "DH-USER-10001"
  name: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string;
  createdAt: number;
}

export interface CustomerAddress {
  id: string;
  fullName: string;
  mobile: string;
  houseFlat: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault?: boolean;
}

export interface OrderProductItem {
  productId: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerOrder {
  id: string; // e.g. "DHORD-88219"
  date: string;
  timestamp: number;
  products: OrderProductItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryCharge: number;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Cash on Delivery' | 'Pending';
  orderStatus: 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  expectedDelivery: string;
  deliveryAddress: string;
}

export interface WalletTransaction {
  id: string;
  date: string;
  desc: string;
  amount: number;
  type: 'Credit' | 'Debit';
}

export interface CustomerSpecificData {
  cart: CartItem[];
  wishlist: string[];
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  coupons: string[];
  recentlyViewed: string[];
  preferredCategory?: string;
  preferredGender?: string;
}
