import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { ShieldCheck, LockKeyhole } from "lucide-react";

export const AdminView: React.FC = () => {
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useAppContext();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") { // Mock standard PIN
      setIsAdminAuthenticated(true);
      setError("");
    } else {
      setError("Invalid PIN. Please try again.");
    }
    setPin("");
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
  };

  if (isAdminAuthenticated) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <ShieldCheck className="w-16 h-16 text-green-500 mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2">Admin Authenticated</h2>
        <p className="text-gray-400 mb-8 max-w-sm text-center">
          You currently have access to sensitive financial metrics and management tools.
        </p>
        <button 
          onClick={handleLogout}
          className="bg-[#111111] hover:bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl transition-all"
        >
          Lock Session
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="bg-[#111111] border border-white/10 p-8 rounded-2xl w-full max-w-sm shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
            <LockKeyhole className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white text-center mb-2">Admin Portal</h2>
        <p className="text-gray-400 text-center text-sm mb-6">Enter your 4-digit PIN to access financials.</p>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input 
              type="password" 
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
          
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            Unlock
          </button>
        </form>
        
        <p className="text-xs text-gray-500 text-center mt-6">Hint: Use PIN 1234 for demo</p>
      </div>
    </div>
  );
};
