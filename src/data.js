import { LayoutDashboard, ShoppingCart, Package, Boxes, BarChart3, Users } from "lucide-react";

/* ---------- constants & built-in data ---------- */
export const PAY = ["M-Pesa", "Mixx by Yas", "HaloPesa", "Airtel Money", "Cash"];
export const SUPPLIERS = ["Azam Distributors", "Bakhresa Foods", "Coca-Cola Kwanza", "Local Wholesalers"];
export const fmt = (n) => "TSh " + Math.round(n).toLocaleString();
export const dayStr = (back) => { const d = new Date(); d.setDate(d.getDate() - back); return d.toISOString().slice(0, 10); };

export const PRODUCTS = [
  [1, "Sugar 1kg", "Groceries", 3200, 2700, 80, 20], [2, "Cooking Oil 1L", "Groceries", 5500, 4600, 45, 15],
  [3, "Rice 1kg", "Groceries", 3000, 2400, 12, 25], [4, "Wheat Flour 2kg", "Groceries", 4800, 4000, 60, 20],
  [5, "Bottled Water 500ml", "Drinks", 800, 500, 150, 40], [6, "Soda 500ml", "Drinks", 1200, 850, 8, 30],
  [7, "Bread Loaf", "Bakery", 2000, 1500, 25, 10], [8, "Laundry Soap Bar", "Household", 2500, 1900, 40, 15],
  [9, "Toothpaste 100ml", "Personal Care", 3500, 2700, 30, 10], [10, "Tea Leaves 250g", "Groceries", 2800, 2100, 5, 12],
].map(([id, name, category, price, cost, qty, min]) => ({ id, name, category, price, cost, qty, min }));

export const USERS = [
  { id: 1, name: "Amina Hassan", username: "admin", password: "admin123", role: "Administrator" },
  { id: 2, name: "Juma Mwakyusa", username: "juma", password: "manager123", role: "Manager" },
  { id: 3, name: "Neema Joseph", username: "neema", password: "cashier123", role: "Cashier" },
  { id: 4, name: "Baraka Mushi", username: "baraka", password: "cashier123", role: "Cashier" },
];

export const seedSales = () => {
  const out = []; let n = 1000;
  for (let d = 6; d >= 0; d--) for (let k = 0; k < 4; k++) {
    const items = [0, 1].map((j) => { const p = PRODUCTS[(d * 3 + k * 2 + j * 5) % PRODUCTS.length]; return { id: p.id, name: p.name, qty: 1 + ((d + k + j) % 3), price: p.price, cost: p.cost }; });
    out.push({ id: "TRX-" + ++n, date: dayStr(d), time: `${9 + k * 2}:${10 + j2(d, k)}`, items, total: items.reduce((s, i) => s + i.qty * i.price, 0), method: PAY[(d + k) % 5], cashier: USERS[2 + (k % 2)].name, status: "Completed" });
  }
  return out;
};
export const j2 = (a, b) => String((a * 7 + b * 13) % 50 + 10);

export const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["Administrator", "Manager"] },
  { id: "sales", label: "Sales", icon: ShoppingCart, roles: ["Manager", "Cashier"] },
  { id: "products", label: "Products", icon: Package, roles: ["Administrator", "Manager"] },
  { id: "inventory", label: "Inventory", icon: Boxes, roles: ["Administrator", "Manager"] },
  { id: "reports", label: "Reports", icon: BarChart3, roles: ["Administrator", "Manager"] },
  { id: "users", label: "Users", icon: Users, roles: ["Administrator"] },
];
