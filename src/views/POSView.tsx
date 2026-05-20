import React, { useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { MenuItem } from "../types";
import { formatCurrency, cn } from "../utils";
import { Search, Plus, Minus, Trash2, Send, CreditCard, Banknote, ShoppingCart } from "lucide-react";

interface CartItem extends MenuItem {
  cartQuantity: number;
}

export const POSView: React.FC = () => {
  const { menu, addTransaction } = useAppContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "UPI">("UPI");
  const [showSMSAlert, setShowSMSAlert] = useState(false);

  const categories = ["All", ...Array.from(new Set(menu.map(m => m.category)))];

  const filteredMenu = useMemo(() => {
    return menu.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = filter === "All" || m.category === filter;
      return matchSearch && matchCat;
    });
  }, [menu, search, filter]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, cartQuantity: i.cartQuantity + 1 } : i);
      }
      return [...prev, { ...item, cartQuantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const next = i.cartQuantity + delta;
        return { ...i, cartQuantity: Math.max(0, next) };
      }
      return i;
    }).filter(i => i.cartQuantity > 0));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.cartQuantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    addTransaction({
      id: `trx-${Math.floor(Math.random() * 100000)}`,
      items: cart.map(c => ({ menuItemId: c.id, quantity: c.cartQuantity, price: c.price })),
      total,
      timestamp: new Date().toISOString(),
      method: paymentMethod
    });
    
    setCart([]);
    setShowSMSAlert(true);
    setTimeout(() => setShowSMSAlert(false), 3000);
  };

  return (
    <div className="flex h-full gap-6">
      {/* Menu Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Staff POS</h2>
          
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#111111] border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 w-64"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 shrink-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors border",
                filter === cat 
                  ? "bg-blue-600/10 text-blue-500 border-blue-500/30" 
                  : "bg-[#111111] border-white/10 text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          {filteredMenu.map(item => (
            <div 
              key={item.id} 
              onClick={() => addToCart(item)}
              className="bg-[#111111] border border-white/10 p-5 rounded-2xl cursor-pointer hover:border-blue-500/30 shadow-sm hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-200 group-hover:text-blue-500 transition-colors">{item.name}</h3>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{item.category}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-white text-lg">{formatCurrency(item.price)}</span>
                <span className="w-8 h-8 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Area */}
      <div className="w-[380px] bg-[#111111] border border-white/10 rounded-2xl flex flex-col shrink-0 shadow-sm relative overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="font-semibold text-lg text-white">Current Order</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
              <ShoppingCart className="w-12 h-12 opacity-20" />
              <p>Cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 bg-[#0A0A0A] p-3 rounded-xl border border-white/5">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-200 truncate">{item.name}</p>
                  <p className="text-sm font-semibold text-blue-500">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-2 bg-[#111111] rounded-lg p-1 border border-white/5">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white/10 rounded-md text-gray-400">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.cartQuantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white/10 rounded-md text-gray-400">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-[#111111]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 uppercase tracking-wider text-xs font-medium">Total</span>
            <span className="text-3xl font-bold text-white tracking-tight">{formatCurrency(total)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              onClick={() => setPaymentMethod("UPI")}
              className={cn(
                "flex flex-col items-center justify-center gap-2 py-3 rounded-xl border transition-all",
                paymentMethod === "UPI" 
                  ? "bg-blue-600/10 border-blue-500/30 text-blue-500 font-medium" 
                  : "bg-[#0A0A0A] border-white/10 text-gray-400 hover:bg-white/5"
              )}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-xs">Card/UPI</span>
            </button>
            <button 
              onClick={() => setPaymentMethod("Cash")}
              className={cn(
                "flex flex-col items-center justify-center gap-2 py-3 rounded-xl border transition-all",
                paymentMethod === "Cash" 
                  ? "bg-blue-600/10 border-blue-500/30 text-blue-500 font-medium" 
                  : "bg-[#0A0A0A] border-white/10 text-gray-400 hover:bg-white/5"
              )}
            >
              <Banknote className="w-5 h-5" />
              <span className="text-xs">Cash</span>
            </button>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Process Payment
          </button>
          
          {showSMSAlert && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center gap-2 text-green-400 text-sm animate-in fade-in slide-in-from-bottom-2">
              <Send className="w-4 h-4" />
              Receipt sent via SMS
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
