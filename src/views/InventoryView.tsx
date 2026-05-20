import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { PackageSearch, AlertTriangle, Plus, PenSquare } from "lucide-react";
import { formatCurrency, cn } from "../utils";

export const InventoryView: React.FC = () => {
  const { inventory } = useAppContext();
  const [activeTab, setActiveTab] = useState<"stock" | "mappings">("stock");

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Supply Engine</h2>
          <p className="text-gray-400 mt-1">Manage raw materials and menu mappings.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-white/10 pb-px">
        <button 
          onClick={() => setActiveTab("stock")}
          className={cn(
            "pb-3 text-sm font-medium transition-colors border-b-2 relative top-px",
            activeTab === "stock" ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"
          )}
        >
          Raw Materials Stock
        </button>
        <button 
          onClick={() => setActiveTab("mappings")}
          className={cn(
            "pb-3 text-sm font-medium transition-colors border-b-2 relative top-px",
            activeTab === "mappings" ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"
          )}
        >
          Ingredient Mappings
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "stock" ? (
          <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-[#0A0A0A] border-b border-white/10">
                <tr>
                  <th className="p-4 text-sm font-medium text-gray-400">Material Name</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Current Stock</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Threshold</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Unit Cost</th>
                  <th className="p-4 text-sm font-medium text-gray-400">Vendor</th>
                  <th className="p-4 text-sm font-medium text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inventory.map(item => {
                  const isLow = item.quantity <= item.threshold;
                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <span className="text-gray-200 font-medium tracking-tight">{item.name}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-semibold", isLow ? "text-red-400" : "text-gray-200")}>
                            {item.quantity} {item.unit}
                          </span>
                          {isLow && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">{item.threshold} {item.unit}</td>
                      <td className="p-4 text-gray-300">{formatCurrency(item.costPerUnit)}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-white/5 text-gray-400 rounded-md text-xs border border-white/10">
                          {item.vendor}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                          <PenSquare className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
             <PackageSearch className="w-12 h-12 text-gray-600 mb-4" />
             <h3 className="text-xl font-medium text-white mb-2">Ingredient Mappings</h3>
             <p className="text-gray-400 max-w-md mx-auto mb-6">
               Map your raw materials to specific menu items so that theoretical stock is deducted automatically when sales are made at the POS.
             </p>
             <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-medium transition-all">
               Configure Mappings
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
