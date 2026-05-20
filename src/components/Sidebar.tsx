import React from "react";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  LineChart, 
  Sparkles,
  ShieldAlert,
  LogOut
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { cn } from "../utils";

export const Sidebar: React.FC = () => {
  const { view, setView } = useAppContext();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pos", label: "Staff POS", icon: ShoppingCart },
    { id: "inventory", label: "Supply Engine", icon: Package },
    { id: "finance", label: "Financial Engine", icon: LineChart },
    { id: "ai-tools", label: "AI Tools", icon: Sparkles },
    { id: "admin", label: "Admin Portal", icon: ShieldAlert },
  ] as const;

  return (
    <div className="w-64 h-screen bg-[#111111] border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
           <span className="text-white font-bold text-xl">P</span>
        </div>
        <h1 className="text-lg font-bold tracking-tight">PRIME <span className="text-blue-500">POS</span></h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as import("../types").ViewState)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-blue-600/10 text-blue-500 border border-blue-500/30" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-blue-500" : "text-gray-500")} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 w-full transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
