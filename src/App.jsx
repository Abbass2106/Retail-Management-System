import { useState } from "react";
import { LogOut } from "lucide-react";
import { PRODUCTS, USERS, SUPPLIERS, NAV, seedSales, dayStr } from "./data";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Users from "./pages/Users";

export default function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [sales, setSales] = useState(seedSales);
  const [log, setLog] = useState([{ date: dayStr(1), name: "Rice 1kg", type: "Stock received", qty: 50, note: SUPPLIERS[1] }]);
  const [users, setUsers] = useState(USERS);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState("dashboard");

  const user = users.find((u) => u.id === userId);
  const signIn = (u) => { setUserId(u.id); setPage(u.role === "Cashier" ? "sales" : "dashboard"); };
  const signOut = () => setUserId(null);
  if (!user) return <Login users={users} onLogin={signIn} />;

  const nav = NAV.filter((n) => n.roles.includes(user.role));
  const current = nav.find((n) => n.id === page) || nav[0];

  const completeSale = (cart, method, ref, u, totals) => {
    const sale = { id: "TRX-" + (1001 + sales.length), date: dayStr(0), time: new Date().toTimeString().slice(0, 5), items: cart, ...totals, discount: totals.itemDiscount + totals.saleDiscount, method, ref, cashier: u.name, status: "Completed" };
    setSales((s) => [...s, sale]);
    setProducts((l) => l.map((p) => { const i = cart.find((c) => c.id === p.id); return i ? { ...p, qty: p.qty - i.qty } : p; }));
    return sale;
  };
  const moveStock = (id, qty, type, note) => {
    const p = products.find((x) => x.id === id);
    setProducts(products.map((x) => (x.id === id ? { ...x, qty: Math.max(0, x.qty + qty) } : x)));
    setLog([{ date: dayStr(0), name: p.name, type, qty, note }, ...log]);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 text-slate-800">
      <Sidebar nav={nav} current={current.id} onSelect={setPage} user={user} onSignOut={signOut} />
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
        <header className="z-20 flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
          <h1 className="text-lg font-semibold text-slate-900">{current.label}</h1>
          <div className="flex items-center gap-3 md:hidden">
            <select aria-label="Navigate to page" value={current.id} onChange={(e) => setPage(e.target.value)} className="max-w-[10rem] rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm">{nav.map((n) => <option key={n.id} value={n.id}>{n.label}</option>)}</select>
            <button onClick={signOut} aria-label="Sign out" className="rounded-md border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-600"><LogOut size={16} /></button>
          </div>
          <p className="hidden text-sm text-slate-500 md:block">{user.name} · {user.role}</p>
        </header>
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain p-3 sm:p-6">
          {current.id === "dashboard" && <Dashboard products={products} sales={sales} />}
          {current.id === "sales" && <Sales products={products} sales={sales} user={user} onComplete={completeSale} />}
          {current.id === "products" && <Products products={products} setProducts={setProducts} />}
          {current.id === "inventory" && <Inventory products={products} log={log} onStock={moveStock} />}
          {current.id === "reports" && <Reports products={products} sales={sales} />}
          {current.id === "users" && <Users users={users} setUsers={setUsers} />}
        </main>
      </div>
    </div>
  );
}
