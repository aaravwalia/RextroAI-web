import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { formatCurrency, cn } from "../utils";
import { TrendingUp, Activity, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DashboardView: React.FC = () => {
  const { transactions, inventory, view, setView } = useAppContext();

  // Metrics calculation
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const todayTransactions = transactions.filter(t => t.timestamp.startsWith(todayStr));
  const todaySales = todayTransactions.reduce((acc, t) => acc + t.total, 0);
  const totalOrders = todayTransactions.length;

  const lowStockItems = inventory.filter(i => i.quantity <= i.threshold);

  // Generate chart data matching transactions
  const chartData = useMemo(() => {
    // Generate last 7 days chart data
    const data = [];
    for(let i=6; i>=0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];
      const dailySales = transactions
        .filter(t => t.timestamp.startsWith(dStr))
        .reduce((sum, t) => sum + t.total, 0);
        
      data.push({
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        sales: Number(dailySales.toFixed(2))
      });
    }
    return data;
  }, [transactions]);

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Executive Dashboard</h2>
          <p className="text-gray-400 mt-1">Today's overview and real-time alerts.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        <div className="bg-[#111111] p-5 rounded-2xl border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Today's Sales</p>
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">{formatCurrency(todaySales)}</h3>
          <p className="text-xs text-green-500 mt-2 font-medium flex items-center gap-1">
             <Activity className="w-4 h-4" /> ↑ 12% from yesterday
          </p>
        </div>
        
        <div className="bg-[#111111] p-5 rounded-2xl border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Orders</p>
            <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">{totalOrders}</h3>
          <p className="text-xs text-blue-400 mt-2 font-medium">Active tables & takeaways</p>
        </div>

        <div 
          onClick={() => setView('inventory')}
          className="bg-[#111111] border border-red-900/30 rounded-2xl p-5 shadow-sm cursor-pointer hover:border-red-500/50 transition-colors group"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Stock Warnings</p>
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-red-500">{lowStockItems.length} <span className="text-sm text-gray-500 font-normal">items low</span></h3>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors mb-1" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Theoretical vs Actual mismatch</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        {/* Chart */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">Revenue Trend (Last 7 Days)</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded bg-[#0A0A0A] text-[10px] border border-white/10 uppercase tracking-wider text-gray-400">Sales</span>
            </div>
          </div>
          <div className="flex-1 w-full h-full min-h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                 <XAxis dataKey="name" stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} />
                 <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                   itemStyle={{ color: '#fff' }}
                 />
                 <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* AI Alerts */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
               <Sparkles className="w-3 h-3 text-white" />
            </div>
            <h3 className="text-lg font-medium text-white">Gemini Engine</h3>
          </div>
          
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
             <div className="p-3 rounded-xl bg-[#0A0A0A] border border-white/5 text-sm">
               <p className="text-xs text-gray-400 font-bold uppercase mb-1 tracking-tighter">Discrepancy Alert</p>
               <p className="text-sm text-gray-300 leading-relaxed">
                 Avocado: Expected 22 pcs remaining based on POS transactions, but actual might be lower.
               </p>
             </div>
             
             <div className="p-3 rounded-xl bg-blue-600/5 border border-blue-500/10 text-sm">
               <p className="text-xs text-blue-400 font-bold uppercase mb-1 tracking-tighter">Menu Optimization</p>
               <p className="text-sm text-gray-300 leading-relaxed">
                 Truffle Fries sales up 45%. Recommend adjusting prep levels for evening shift.
               </p>
             </div>

             <div className="p-3 rounded-xl bg-[#0A0A0A] border border-white/5 text-sm">
               <p className="text-xs text-gray-400 font-bold uppercase mb-1 tracking-tighter">Weather Impact</p>
               <p className="text-sm text-gray-300 leading-relaxed">
                 Heavy rain forecasted for tomorrow. Expect 20% drop in footfall.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
