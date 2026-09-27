import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, RESTAURANT_INFO } from '../data/menuData';

export interface CartItem {
  id: string; // unique key: itemId_size
  menuItemId: string;
  name: string;
  size: 'Full' | 'Half' | 'Quarter' | 'Standard';
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  orderType: 'delivery' | 'pickup';
  address: string;
  notes: string;
  phoneIndex: number; // 0 for 9747 36 21 01, 1 for 9747 36 21 02
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, size?: 'Full' | 'Half' | 'Quarter' | 'Standard') => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  generateWhatsAppUrl: () => string;
  getOrderSummaryText: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'yamama_cart_v1';
const CUSTOMER_STORAGE_KEY = 'yamama_customer_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            phone: '',
            orderType: 'delivery',
            address: '',
            notes: '',
            phoneIndex: 0,
          };
    } catch {
      return {
        name: '',
        phone: '',
        orderType: 'delivery',
        address: '',
        notes: '',
        phoneIndex: 0,
      };
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerDetails));
    } catch (e) {
      console.warn('Failed to save customer details to localStorage', e);
    }
  }, [customerDetails]);

  const addToCart = (item: MenuItem, sizePreference?: 'Full' | 'Half' | 'Quarter' | 'Standard') => {
    const selectedPortion = sizePreference
      ? item.portions.find((p) => p.size === sizePreference) || item.portions[0]
      : item.portions[0];

    const uniqueId = `${item.id}_${selectedPortion.size}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: uniqueId,
            menuItemId: item.id,
            name: item.name,
            size: selectedPortion.size,
            price: selectedPortion.price,
            quantity: 1,
            category: item.category,
            image: item.image,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getOrderSummaryText = () => {
    const lines: string[] = [];
    lines.push(`🔥 *NEW ORDER - YAMAMA SHAWAYA* 🔥`);
    lines.push(`_“REFILL YOUR ENERGY”_`);
    lines.push(`📍 Perinthalmanna / Angadippuram, Kerala\n`);

    lines.push(`📋 *ORDER ITEMS:*`);
    cart.forEach((item, index) => {
      const sizeTag = item.size !== 'Standard' ? ` (${item.size})` : '';
      const itemTotal = item.price * item.quantity;
      lines.push(`${index + 1}. *${item.name}*${sizeTag} x ${item.quantity} = ₹${itemTotal}`);
    });

    lines.push(`\n💰 *Total Amount:* ₹${subtotal}`);
    lines.push(`🚚 *Order Preference:* ${customerDetails.orderType === 'delivery' ? 'Home Delivery' : 'Takeaway / Pickup'}`);

    if (customerDetails.name) {
      lines.push(`👤 *Customer Name:* ${customerDetails.name}`);
    }
    if (customerDetails.phone) {
      lines.push(`📞 *Customer Phone:* ${customerDetails.phone}`);
    }
    if (customerDetails.orderType === 'delivery' && customerDetails.address) {
      lines.push(`🏠 *Delivery Address / Landmark:* ${customerDetails.address}`);
    }
    if (customerDetails.notes) {
      lines.push(`📝 *Special Notes:* ${customerDetails.notes}`);
    }

    lines.push(`\n_Order placed via Yamama Shawaya Online App_`);
    return lines.join('\n');
  };

  const generateWhatsAppUrl = () => {
    const rawPhone = RESTAURANT_INFO.phones[customerDetails.phoneIndex]?.raw || RESTAURANT_INFO.phones[0].raw;
    const message = getOrderSummaryText();
    return `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        customerDetails,
        setCustomerDetails,
        generateWhatsAppUrl,
        getOrderSummaryText,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
