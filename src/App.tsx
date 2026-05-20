import React from "react";
import { ArrowRight, Sparkles, LineChart, Package, ShoppingCart, ShieldCheck, CheckCircle2, LayoutDashboard, Menu, Receipt, Database, BarChart3, Building2, Calculator, Settings, Key, Users, TrendingUp, Activity, ShieldAlert, LogOut, Home, AlertCircle, Clock, Smartphone, CloudLightning, Phone, Mail } from "lucide-react";

import { Logo } from "./components/Logo";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            <h1 className="text-base md:text-xl font-bold tracking-tight">REXTRO <span className="text-blue-500">AI</span></h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400 flex-1 justify-center">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#ai" className="hover:text-white transition-colors">AI Intelligence</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
             <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-xs font-medium transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
              Contact Sales
            </a>
          </div>
        </div>
        
        {/* Mobile Navigation Links */}
        <div className="md:hidden border-t border-white/5 py-3 px-4 flex items-center justify-between text-[11px] sm:text-xs font-medium text-gray-400 overflow-x-auto hide-scrollbar gap-4">
           <a href="#features" className="hover:text-white transition-colors whitespace-nowrap">Features</a>
           <a href="#ai" className="hover:text-white transition-colors whitespace-nowrap">AI Intelligence</a>
           <a href="#pricing" className="hover:text-white transition-colors whitespace-nowrap">Pricing</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" /> Waitlist Open for V2.0
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            The complete operating system for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">modern cafes and restaurants</span>.
          </h1>
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Forecast sales, track inventory, and handle billing all in one place—powered by intelligent insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:aaravwalia82@gmail.com" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-500/20">
              Start Your Free Trial <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="w-full sm:w-auto bg-[#111111] hover:bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center text-sm">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Mockup / Dashboard Preview */}
      <section className="px-6 pb-24 max-w-6xl mx-auto relative z-10 w-full">
        <div className="bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl relative overflow-hidden flex w-full" style={{ aspectRatio: '16/9' }}>
          
          {/* Sidebar */}
          <div className="w-[200px] lg:w-[240px] bg-[#0A0A0A] border-r border-white/5 flex flex-col pt-8 pb-4 shrink-0 hidden md:flex">
            <div className="px-6 flex items-center gap-3 mb-10">
              <Logo className="w-8 h-8 rounded shrink-0 bg-[#000000]" />
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight leading-tight">Rextro AI</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Waffledarth</span>
              </div>
            </div>
            
            <div className="px-4 flex-1 flex flex-col gap-1.5 overflow-y-auto hide-scrollbar">
               <div className="flex items-center gap-3 px-3 py-2.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-medium border border-blue-500/20">
                 <LayoutDashboard className="w-4 h-4" /> Dashboard
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-auto" />
               </div>
               <div className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-200 rounded-lg text-xs font-medium transition-colors cursor-pointer">
                 <Menu className="w-4 h-4" /> Menu & Recipes
               </div>
               <div className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-200 rounded-lg text-xs font-medium transition-colors cursor-pointer">
                 <Receipt className="w-4 h-4" /> Purchases & Bills
               </div>
               <div className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-200 rounded-lg text-xs font-medium transition-colors cursor-pointer">
                 <Database className="w-4 h-4" /> Inventory (Stock)
               </div>
               <div onClick={() => document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-3 px-3 py-2.5 text-blue-400 hover:bg-blue-500/10 rounded-lg text-xs font-medium transition-colors cursor-pointer group">
                 <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" /> AI Forecast
               </div>
               <div className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-200 rounded-lg text-xs font-medium transition-colors cursor-pointer">
                 <Calculator className="w-4 h-4" /> Profit & Loss
               </div>
               <div className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-200 rounded-lg text-xs font-medium transition-colors cursor-pointer">
                 <Building2 className="w-4 h-4" /> Billing & Plans
               </div>
               <div className="flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:text-gray-200 rounded-lg text-xs font-medium transition-colors cursor-pointer">
                 <Settings className="w-4 h-4" /> Platform Admin
               </div>
            </div>

            <div className="px-4 mt-auto pt-4 border-t border-white/5 flex flex-col gap-2">
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg text-xs font-medium border border-blue-500/20 transition-colors">
                <Home className="w-3.5 h-3.5" /> Go to Staff POS
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-gray-500 hover:text-gray-300 rounded-lg text-xs font-medium transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          </div>
          
          {/* Main Area */}
          <div className="flex-1 bg-[#0A0A0A] p-6 md:p-10 flex flex-col overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12">
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">Dashboard</h2>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5 text-gray-300 transition-colors">
                   <Key className="w-3.5 h-3.5 text-blue-500" /> Admin PIN
                </button>
                <button className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5 text-gray-300 transition-colors">
                   <Users className="w-3.5 h-3.5" /> Staff PIN
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
              <div className="bg-[#111111] rounded-xl border border-white/5 p-6 flex flex-col relative overflow-hidden group">
                <div className="text-[10px] font-bold text-blue-400 mb-6 tracking-wider uppercase">TODAY'S SALES</div>
                <div className="mt-auto">
                  <div className="text-3xl lg:text-4xl font-bold tracking-tight mb-1">₹0.00</div>
                  <div className="text-xs text-blue-500 font-medium">0 Orders</div>
                </div>
                <TrendingUp className="w-32 h-32 text-blue-500/5 absolute -bottom-8 -right-8 group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="bg-[#111111] rounded-xl border border-white/5 p-6 flex flex-col relative overflow-hidden group">
                <div className="text-[10px] font-bold text-gray-400 mb-6 tracking-wider uppercase">ITEMS IN STOCK</div>
                <div className="mt-auto">
                  <div className="text-3xl lg:text-4xl font-bold tracking-tight">22</div>
                </div>
                <Activity className="w-32 h-32 text-white/5 absolute -bottom-8 -right-8 group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="bg-[#111111] rounded-xl border border-red-500/10 p-6 flex flex-col relative overflow-hidden group">
                <div className="text-[10px] font-bold text-gray-400 mb-6 tracking-wider uppercase">STOCK WARNINGS</div>
                <div className="mt-auto">
                  <div className="text-3xl lg:text-4xl font-bold text-red-500 tracking-tight">0</div>
                </div>
                <ShieldAlert className="w-32 h-32 text-red-500/5 absolute -bottom-8 -right-8 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            <div className="w-full max-w-3xl bg-[#111111] rounded-xl border border-white/5 p-6 md:p-8 flex flex-col">
               <div className="flex items-center gap-2 mb-8 md:mb-12">
                 <span className="font-bold text-sm md:text-base tracking-tight">Stock Discrepancies</span>
                 <span className="text-[10px] md:text-xs text-gray-500 font-medium">(Needs Checking)</span>
               </div>
               
               <div className="flex-1 flex flex-col items-center justify-center py-6">
                 <div className="w-12 h-12 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center mb-5">
                   <CheckCircle2 className="w-6 h-6 text-green-500" />
                 </div>
                 <p className="text-sm text-gray-400 font-medium text-center leading-relaxed">
                   All systems normal. No missing items or extra<br className="hidden md:block"/> wastage detected today.
                 </p>
               </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="features" className="py-24 bg-[#111111] border-y border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 space-y-32">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-xl mx-auto">A seamless workflow from front-of-house to backend forecasting. Here is what Rextro AI does for you.</p>
          </div>

          {/* Feature 1 */}
          <div id="ai" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-32">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-[40px] pointer-events-none" />
              <div className="bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl overflow-hidden p-6 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-sm">AI Growth & Stock Forecast</span>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-[10px] font-bold border border-green-500/20 hidden sm:block">Simulated Data</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#111] rounded-lg p-4 border border-white/5 relative overflow-hidden">
                    <CloudLightning className="w-16 h-16 text-white/5 absolute -bottom-4 -right-4" />
                    <div className="text-[10px] text-gray-500 font-bold mb-2">WED, JUN 10</div>
                    <div className="text-xl font-bold">₹5586</div>
                    <div className="text-[10px] text-gray-400 mb-4">24 Orders</div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-2">
                      <div className="text-[9px] text-blue-400 font-bold mb-1 flex items-center gap-1"><Sparkles className="w-2 h-2"/> STRATEGY</div>
                      <div className="text-[10px] text-gray-300">Prep more perishables.</div>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-lg p-4 border border-white/5 relative overflow-hidden">
                    <Activity className="w-16 h-16 text-white/5 absolute -bottom-4 -right-4" />
                    <div className="text-[10px] text-gray-500 font-bold mb-2">THU, JUN 11</div>
                    <div className="text-xl font-bold">₹3718</div>
                    <div className="text-[10px] text-gray-400 mb-4">15 Orders</div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-2 flex flex-col justify-end">
                      <div className="text-[9px] text-blue-400 font-bold mb-1 flex items-center gap-1"><Sparkles className="w-2 h-2"/> STRATEGY</div>
                      <div className="text-[10px] text-gray-300">Reduce waste by 20%.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:pl-10">
              <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-xl text-blue-500 mb-6">
                 <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Predict the Future with AI</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Don't guess what to prep. Rextro AI analyzes local weather and historical data to predict sales and suggest exactly what raw materials you need to reorder.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-10">
              <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-xl text-blue-500 mb-6">
                 <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Effortless Billing & Staff POS</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                A lightning-fast, mobile-friendly POS system designed specifically for your staff. Process cash and UPI payments in seconds with secure PIN access.
              </p>
            </div>
            <div className="relative flex justify-center">
               <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none w-64 h-64 mx-auto" />
               <div className="w-[280px] h-[550px] bg-black rounded-[40px] border-[8px] border-[#222] overflow-hidden relative shadow-2xl">
                 <div className="absolute top-0 inset-x-0 h-6 bg-[#222] rounded-b-xl w-32 mx-auto z-20" />
                 <div className="bg-[#0A0A0A] h-full w-full flex flex-col">
                   <div className="pt-8 pb-3 px-4 border-b border-white/10 flex items-center justify-between bg-[#111]">
                     <span className="font-bold text-sm">Staff POS</span>
                     <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center"><Users className="w-3 h-3 text-blue-400"/></div>
                   </div>
                   <div className="flex-1 p-3 grid grid-cols-2 gap-3 overflow-hidden h-0 bg-[#0A0A0A]">
                      <div className="bg-[#111] rounded-lg p-2 border border-white/5 flex flex-col">
                        <div className="w-full h-16 bg-white/5 rounded pl-1 pt-1"><div className="w-5 h-5 rounded-md bg-green-500/20"/></div>
                        <div className="text-[10px] font-bold mt-2">Veg Burger</div>
                        <div className="text-[10px] text-gray-400">₹120</div>
                      </div>
                      <div className="bg-[#111] rounded-lg p-2 flex flex-col border-blue-500/50 bg-blue-500/5">
                        <div className="w-full h-16 bg-white/5 rounded pl-1 pt-1"><div className="w-5 h-5 rounded-md bg-yellow-500/20"/></div>
                        <div className="text-[10px] font-bold mt-2">French Fries</div>
                        <div className="text-[10px] text-blue-400">1 x ₹90</div>
                      </div>
                      <div className="bg-[#111] rounded-lg p-2 border border-white/5 flex flex-col">
                        <div className="w-full h-16 bg-white/5 rounded pl-1 pt-1"><div className="w-5 h-5 rounded-md bg-orange-500/20"/></div>
                        <div className="text-[10px] font-bold mt-2">Cold Coffee</div>
                        <div className="text-[10px] text-gray-400">₹150</div>
                      </div>
                   </div>
                   <div className="bg-[#111] p-4 rounded-t-2xl mt-auto border-t border-white/10 z-10">
                     <div className="flex justify-between text-white font-bold mb-4">
                       <span className="text-gray-400">Cart (1 item)</span>
                       <span className="text-lg">₹90.00</span>
                     </div>
                     <div className="bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20 cursor-pointer">Charge ₹90</div>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-red-500/10 rounded-3xl blur-[40px] pointer-events-none" />
              <div className="bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl overflow-hidden relative">
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#111]">
                  <div className="flex items-center gap-2"><Database className="w-4 h-4 text-blue-400" /><span className="font-bold text-sm">Smart Inventory</span></div>
                </div>
                <table className="w-full text-left text-[10px]">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="p-4 font-bold text-gray-500">Raw Material</th>
                      <th className="p-4 font-bold text-gray-500 hidden sm:table-cell">Expected</th>
                      <th className="p-4 font-bold text-gray-500">Actual Stock</th>
                      <th className="p-4 font-bold text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-4"><span className="font-bold text-xs block text-white">Veeba Mayonnaise</span><span className="text-gray-500">Linked</span></td>
                      <td className="p-4 font-medium text-gray-400 hidden sm:table-cell">1.00 Pkt</td>
                      <td className="p-4 font-bold text-white text-xs">1.00 Pkt</td>
                      <td className="p-4"><span className="bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-1 rounded-md flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3"/> Verified</span></td>
                    </tr>
                    <tr className="hover:bg-red-500/[0.02]">
                      <td className="p-4"><span className="font-bold text-xs block text-white">Milky Mozzarella</span><span className="text-gray-500">Unlinked</span></td>
                      <td className="p-4 font-medium text-gray-400 hidden sm:table-cell">2.50 Kg</td>
                      <td className="p-4 font-bold text-red-400 text-xs">0.00 Kg</td>
                      <td className="p-4"><span className="bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-1 rounded-md flex items-center gap-1 w-max"><AlertCircle className="w-3 h-3"/> Empty</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:pl-10">
              <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-xl text-blue-500 mb-6">
                 <Package className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Airtight Inventory & Supply Chain</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Link your raw materials directly to your menu. Track theoretical vs. actual stock, monitor purchases, and catch wastage before it eats into your profits.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-10">
              <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-xl text-blue-500 mb-6">
                 <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Complete Financial Control</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Track every penny. Monitor fixed expenses, one-time investments, and daily sales to get a crystal-clear picture of your true profit margins.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-green-500/10 rounded-3xl blur-[40px] pointer-events-none" />
              <div className="bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl p-6 relative overflow-hidden flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-sm">Profit & Loss (P&L)</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#111] border border-white/5 rounded-xl p-4">
                    <div className="text-[9px] text-gray-500 font-bold mb-2 break-words">FIXED EXPENSES</div>
                    <div className="text-xl md:text-2xl font-bold text-white">₹22,000</div>
                  </div>
                  <div className="bg-[#111] border border-white/5 rounded-xl p-4">
                    <div className="text-[9px] text-gray-500 font-bold mb-2 break-words">RAW MATERIAL</div>
                    <div className="text-xl md:text-2xl font-bold text-red-400">₹3,493</div>
                  </div>
                </div>
                <div className="bg-[#111] border border-white/5 rounded-xl p-4 mt-2">
                   <div className="text-[9px] text-gray-500 font-bold mb-3">MANUAL EXPENSES</div>
                   <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                     <span className="text-xs font-bold text-gray-300">Rent</span>
                     <span className="text-xs font-medium">₹5,000.00</span>
                   </div>
                   <div className="flex justify-between items-center py-2.5">
                     <span className="text-xs font-bold text-gray-300">Cook Staff</span>
                     <span className="text-xs font-medium">₹17,000.00</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center rounded-3xl bg-blue-600/5 border border-blue-500/10 p-10 md:p-16">
           <Building2 className="w-8 h-8 text-blue-500 mx-auto mb-6" />
           <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">Who is it for?</h2>
           <p className="text-lg text-gray-300 max-w-2xl mx-auto">
             Perfect for Quick Service Restaurants (QSRs), Cafes, Drive-thrus, and Food Trucks.
           </p>
        </div>
      </section>

      {/* Pricing Target */}
      <section id="pricing" className="py-24 bg-[#111] border-y border-white/5 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-center md:text-left">Billing & Plans</h2>
          <p className="text-gray-400 text-sm md:text-base mb-12 text-center md:text-left">Choose the right plan for your restaurant's growth.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left">
            {/* Pro Plan */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-white">Pro Plan</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold tracking-tight text-white">₹499</span>
                <span className="text-gray-500 text-xs font-bold"> / month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Full POS & Inventory Access</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">1,000 AI Requests / Month</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Standard Analytics & Reports</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Email Support</span>
                </li>
              </ul>
              <a href="#contact" className="w-full block text-center bg-[#1A1C23] hover:bg-[#23252E] text-slate-400 py-3 text-sm font-bold rounded-xl transition-all">
                Contact Sales
              </a>
            </div>
            
            {/* Premium Level */}
            <div className="bg-[#0D111D] border border-blue-500 rounded-3xl p-6 flex flex-col relative shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-bold mb-3 text-white flex items-center gap-2">
                Premium Level <Sparkles className="w-4 h-4 text-blue-400" />
              </h3>
              <div className="mb-6">
                <span className="text-3xl font-bold tracking-tight text-white">₹899</span>
                <span className="text-gray-500 text-xs font-bold"> / month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-white font-bold text-xs">Everything in Pro</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Unlimited AI Forecasts & Analysis</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Automated Supply Chain Reordering</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Multi-outlet Support</span>
                </li>
              </ul>
              <a href="#contact" className="w-full block text-center bg-blue-600/30 hover:bg-blue-600/40 text-blue-400 py-3 text-sm font-bold rounded-xl transition-all border border-blue-500/0">
                Contact Sales
              </a>
            </div>

            {/* Enterprise */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col hover:border-white/20 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-white leading-tight">Enterprise<br/>Custom</h3>
              <div className="mb-6 mt-8">
                {/* Spacer to match heights */}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Everything in Premium</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Dedicated Account Manager</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">Custom AI Model Fine-tuning</span>
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-gray-300 text-xs font-medium">SLA Guarantee</span>
                </li>
              </ul>
              <a href="#contact" className="w-full block text-center bg-transparent border border-white/20 hover:bg-white/5 text-white py-3 text-sm font-bold rounded-xl transition-all">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Get in Touch</h2>
          <p className="text-gray-400 text-sm md:text-base mb-10">We're here to help you get started with unified restaurant intelligence.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 flex flex-col items-center hover:border-white/20 transition-colors">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <Phone className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Call Us</h3>
              <a href="tel:+918988159401" className="text-gray-300 hover:text-white text-xs transition-colors block">+91 89881 59401</a>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 flex flex-col items-center hover:border-white/20 transition-colors">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Support Email</h3>
              <a href="mailto:rextrooai@gmail.com" className="text-gray-300 hover:text-white text-xs transition-colors block break-all">rextrooai@gmail.com</a>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 flex flex-col items-center hover:border-white/20 transition-colors">
              <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-xs font-bold text-white mb-1">Sales Email</h3>
              <a href="mailto:aaravwalia82@gmail.com" className="text-gray-300 hover:text-white text-[11px] sm:text-xs transition-colors block break-all">aaravwalia82@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6" />
            <span className="font-bold text-xs tracking-tight">REXTRO <span className="text-blue-500">AI</span></span>
          </div>
          <div className="text-xs text-gray-500">
            &copy; 2026 Rextro AI Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
      <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
    </div>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
      <span className="text-gray-300 text-xs">{text}</span>
    </li>
  );
}

