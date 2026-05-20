import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { formatCurrency } from "../utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, Cell } from 'recharts';
import { DollarSign, ShieldAlert } from "lucide-react";

export const FinancialsView: React.FC = () => {
  const { transactions, menu, isAdminAuthenticated } = useAppContext();

  const metrics = useMemo(() => {
    const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);
    
    // Calculate estimated COGS (Cost of Goods Sold) based on menu item definitions
    let cogs = 0;
    transactions.forEach(t => {
      t.items.forEach(item => {
        const menuItem = menu.find(m => m.id === item.menuItemId);
        if (menuItem) {
          cogs += menuItem.estimatedCost * item.quantity;
        }
      });
    });

    const fixedExpenses = 2500; // Mock fixed monthly overhead
    const variableExpenses = cogs;
    const grossProfit = totalRevenue - variableExpenses;
    const netProfit = grossProfit - fixedExpenses;

    return { totalRevenue, fixedExpenses, variableExpenses, grossProfit, netProfit };
  }, [transactions, menu]);

  const pnldata = [
    { name: 'Revenue', value: metrics.totalRevenue, type: 'income' },
    { name: 'Variable Cost', value: metrics.variableExpenses, type: 'expense' },
    { name: 'Gross Profit', value: metrics.grossProfit, type: 'profit' },
    { name: 'Fixed Overhead', value: metrics.fixedExpenses, type: 'expense' },
    { name: 'Net Profit', value: metrics.netProfit, type: 'final' }
  ];

  if (!isAdminAuthenticated) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-yellow-500 mb-6 opacity-80" />
        <h2 className="text-2xl font-bold text-white mb-2">Restricted Access</h2>
        <p className="text-gray-400 mb-6 max-w-sm">
          The Financial Engine contains sensitive P&L data. Please log in via the Admin Portal to view.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">Financial Engine</h2>
        <p className="text-gray-400 mt-1">High-level P&L and expense visualization.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 shrink-0">
        <div className="bg-[#111111] p-5 rounded-2xl border border-white/10 shadow-sm">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(metrics.totalRevenue)}</p>
        </div>
        <div className="bg-[#111111] p-5 rounded-2xl border border-white/10 shadow-sm">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">Variable Costs (COGS)</p>
          <p className="text-2xl font-bold text-red-400">{formatCurrency(metrics.variableExpenses)}</p>
        </div>
        <div className="bg-[#111111] p-5 rounded-2xl border border-white/10 shadow-sm">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-medium">Gross Profit</p>
          <p className="text-2xl font-bold text-green-400">{formatCurrency(metrics.grossProfit)}</p>
        </div>
        <div className="bg-blue-600/10 p-5 rounded-2xl border border-blue-500/30 shadow-sm">
          <p className="text-xs text-blue-400 mb-2 uppercase tracking-wider font-medium">Net Profit</p>
          <p className="text-2xl font-bold text-blue-400">{formatCurrency(metrics.netProfit)}</p>
        </div>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex-1 min-h-[450px]">
        <h3 className="text-lg font-medium text-white mb-8">Profit & Loss Waterfall</h3>
        <div className="w-full h-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pnldata} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
              <XAxis dataKey="name" stroke="#888" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
              <YAxis stroke="#888" tickFormatter={(val) => `$${val}`} tick={{fill: '#888'}} axisLine={false} tickLine={false} />
              <RTooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {pnldata.map((entry, index) => {
                  let color = "#3b82f6"; // default blue
                  if (entry.type === "expense") color = "#f87171"; // red
                  if (entry.type === "profit") color = "#4ade80"; // green
                  if (entry.type === "final") color = "#60a5fa"; // light blue
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
