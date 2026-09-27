import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  Copy,
  Check,
  MapPin,
  Clock,
  Phone,
  AlertCircle,
  FileText
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
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
  } = useCart();

  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleInputChange = (field: keyof typeof customerDetails, value: any) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      setErrorMsg('Please add at least one item to your order.');
      return;
    }
    if (!customerDetails.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!customerDetails.phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }
    if (customerDetails.orderType === 'delivery' && !customerDetails.address.trim()) {
      setErrorMsg('Please enter your delivery address or landmark in Perinthalmanna / Angadippuram.');
      return;
    }

    const whatsappUrl = generateWhatsAppUrl();
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyOrder = () => {
    const text = getOrderSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#130d09] border-l border-[#2e1d14] flex flex-col shadow-2xl text-white">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#2d1c14] flex items-center justify-between bg-[#19100b]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-black uppercase text-white">
                  Your Order
                </h3>
                <span className="text-xs text-neutral-400">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="p-2 rounded-lg text-neutral-400 hover:text-red-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  title="Clear Cart"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-lg text-neutral-400 hover:text-white bg-[#261710] border border-[#3b2419] cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content: Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            
            {/* Empty state */}
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#1e130c] border border-[#382318] flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="font-bold text-neutral-300">Your cart is empty</div>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Add Shawaya chicken combos, Bishavari rice or refreshing mojitos to begin ordering.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Order Items
                  </div>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-[#1b120c] border border-[#322016] flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-white truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-neutral-400 flex items-center gap-2 mt-0.5">
                          {item.size !== 'Standard' && (
                            <span className="font-semibold text-orange-400 bg-orange-950/80 px-1.5 py-0.2 rounded border border-orange-800/40 text-[10px]">
                              {item.size}
                            </span>
                          )}
                          <span>₹{item.price} each</span>
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1.5 bg-[#120a06] p-1 rounded-lg border border-[#2b1910]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#281810]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#281810]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right shrink-0 min-w-16">
                        <div className="font-display font-black text-sm text-amber-400">
                          ₹{item.price * item.quantity}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[10px] text-neutral-500 hover:text-red-400 mt-0.5 inline-block"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Bill breakdown */}
                <div className="p-3.5 rounded-xl bg-[#18100b] border border-[#2e1c13] space-y-2">
                  <div className="flex justify-between text-xs text-neutral-300">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Delivery Charge</span>
                    <span className="text-neutral-400 italic">
                      {customerDetails.orderType === 'delivery'
                        ? 'Payable to delivery rider'
                        : 'Free pickup'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#2d1b12] flex justify-between items-center text-sm font-black text-white">
                    <span>Total Amount</span>
                    <span className="font-display text-xl text-amber-400">₹{subtotal}</span>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-4 pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Customer & Delivery Details
                  </div>

                  {/* Order Type Toggle */}
                  <div className="grid grid-cols-2 gap-2 bg-[#120a06] p-1 rounded-xl border border-[#29180f]">
                    <button
                      type="button"
                      onClick={() => handleInputChange('orderType', 'delivery')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        customerDetails.orderType === 'delivery'
                          ? 'bg-orange-600 text-white shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      🚚 Home Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('orderType', 'pickup')}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        customerDetails.orderType === 'pickup'
                          ? 'bg-orange-600 text-white shadow'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      🛍️ Takeaway / Pickup
                    </button>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mohammed / Rahul"
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18100b] border border-[#2d1c14] text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18100b] border border-[#2d1c14] text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Delivery Address (if Delivery) */}
                  {customerDetails.orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Delivery Address & Landmark *
                      </label>
                      <textarea
                        rows={2}
                        placeholder="House / Flat name, Street, Landmark in Perinthalmanna / Angadippuram"
                        value={customerDetails.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#18100b] border border-[#2d1c14] text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-orange-500 resize-none"
                      />
                    </div>
                  )}

                  {/* Special Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Cooking or Packing Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Extra garlic toum, less ice, well-done roasted"
                      value={customerDetails.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18100b] border border-[#2d1c14] text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Select WhatsApp Line */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Send Order To WhatsApp Number:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {RESTAURANT_INFO.phones.map((phone, idx) => (
                        <button
                          key={phone.raw}
                          type="button"
                          onClick={() => handleInputChange('phoneIndex', idx)}
                          className={`p-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                            customerDetails.phoneIndex === idx
                              ? 'bg-amber-600/30 text-amber-300 border-amber-500/60'
                              : 'bg-[#18100b] text-neutral-400 border-[#2d1c14] hover:text-white'
                          }`}
                        >
                          Line {idx + 1}: {phone.display}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Preview message */}
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{showPreview ? 'Hide WhatsApp Message Preview' : 'Show WhatsApp Message Preview'}</span>
                  </button>

                  {showPreview && (
                    <div className="p-3 bg-[#0d0705] rounded-xl border border-[#2c1a12] text-[11px] font-mono whitespace-pre-wrap text-neutral-300 max-h-48 overflow-y-auto">
                      {getOrderSummaryText()}
                    </div>
                  )}

                  {/* Error banner */}
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </div>
              </>
            )}

          </div>

          {/* Footer with Place Order Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#2e1d14] bg-[#160e0a] space-y-2.5">
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>PLACE ORDER ON WHATSAPP (₹{subtotal})</span>
              </button>

              <div className="flex items-center justify-between text-xs text-neutral-400">
                <button
                  onClick={handleCopyOrder}
                  className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Order Text</span>
                    </>
                  )}
                </button>

                <span>Instant direct reply</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
