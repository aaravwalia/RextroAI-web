export type ViewState = "dashboard" | "pos" | "inventory" | "finance" | "ai-tools" | "admin";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  estimatedCost: number;
  image?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  threshold: number;
  vendor: string;
  costPerUnit: number;
}

export interface Transaction {
  id: string;
  items: { menuItemId: string; quantity: number; price: number }[];
  total: number;
  timestamp: string;
  method: "Cash" | "UPI";
}

export interface IngredientMapping {
  menuItemId: string;
  inventoryItemId: string;
  quantityUsed: number;
}
