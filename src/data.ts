import { InventoryItem, MenuItem, IngredientMapping, Transaction } from "./types";

export const initialInventory: InventoryItem[] = [
  { id: "inv-1", name: "Premium Coffee Beans", quantity: 12, unit: "kg", threshold: 15, vendor: "RoastMasters", costPerUnit: 25 },
  { id: "inv-2", name: "Organic Milk", quantity: 8, unit: "L", threshold: 20, vendor: "DairyFresh", costPerUnit: 1.5 },
  { id: "inv-3", name: "Sourdough Buns", quantity: 45, unit: "pcs", threshold: 50, vendor: "Local Bakery", costPerUnit: 0.8 },
  { id: "inv-4", name: "Wagyu Beef Patties", quantity: 20, unit: "pcs", threshold: 30, vendor: "PrimeMeats", costPerUnit: 4.5 },
  { id: "inv-5", name: "Avocado", quantity: 60, unit: "pcs", threshold: 40, vendor: "GreenFarms", costPerUnit: 1.2 },
];

export const initialMenu: MenuItem[] = [
  { id: "m-1", name: "Wagyu Truffle Burger", price: 18.99, category: "Mains", estimatedCost: 6.5 },
  { id: "m-2", name: "Avocado Toast", price: 12.50, category: "Breakfast", estimatedCost: 3.2 },
  { id: "m-3", name: "Artisan Latte", price: 5.99, category: "Beverages", estimatedCost: 1.8 },
  { id: "m-4", name: "Iced Cold Brew", price: 4.50, category: "Beverages", estimatedCost: 1.2 },
  { id: "m-5", name: "Truffle Fries", price: 8.99, category: "Sides", estimatedCost: 2.1 },
];

export const ingredientMappings: IngredientMapping[] = [
  { menuItemId: "m-1", inventoryItemId: "inv-3", quantityUsed: 1 },
  { menuItemId: "m-1", inventoryItemId: "inv-4", quantityUsed: 1 },
  { menuItemId: "m-3", inventoryItemId: "inv-1", quantityUsed: 0.05 }, // 50g
  { menuItemId: "m-3", inventoryItemId: "inv-2", quantityUsed: 0.25 }, // 250ml
  { menuItemId: "m-2", inventoryItemId: "inv-5", quantityUsed: 1 },
];

// Generate some fake recent transactions for the dashboard
export const generateRecentTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();
  for (let i = 0; i < 50; i++) {
    const timestamp = new Date(now.getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000));
    transactions.push({
      id: `trx-${i.toString().padStart(4, '0')}`,
      items: [
        { menuItemId: "m-1", quantity: 1, price: 18.99 },
        { menuItemId: "m-3", quantity: 2, price: 5.99 }
      ],
      total: 30.97,
      timestamp: timestamp.toISOString(),
      method: Math.random() > 0.5 ? "Cash" : "UPI"
    });
  }
  return transactions;
};
