import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ViewState, MenuItem, InventoryItem, Transaction, IngredientMapping } from "../types";
import { initialMenu, initialInventory, ingredientMappings as initialMappings, generateRecentTransactions } from "../data";

interface AppContextType {
  view: ViewState;
  setView: (v: ViewState) => void;
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  mappings: IngredientMapping[];
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<ViewState>("dashboard");
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mappings, setMappings] = useState<IngredientMapping[]>(initialMappings);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    setTransactions(generateRecentTransactions());
  }, []);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
    
    // Deduct from theoretical stock
    const newInventory = [...inventory];
    tx.items.forEach(itemConfig => {
      // Find mappings for this menu item
      const itemMappings = mappings.filter(m => m.menuItemId === itemConfig.menuItemId);
      itemMappings.forEach(mapping => {
        const invIndex = newInventory.findIndex(i => i.id === mapping.inventoryItemId);
        if (invIndex >= 0) {
           newInventory[invIndex] = {
             ...newInventory[invIndex],
             quantity: Math.max(0, newInventory[invIndex].quantity - (mapping.quantityUsed * itemConfig.quantity))
           };
        }
      });
    });
    setInventory(newInventory);
  };

  return (
    <AppContext.Provider value={{
      view, setView,
      menu, setMenu,
      inventory, setInventory,
      transactions, addTransaction,
      mappings,
      isAdminAuthenticated, setIsAdminAuthenticated
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
