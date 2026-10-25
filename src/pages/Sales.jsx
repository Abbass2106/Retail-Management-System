import { useState } from "react";
import { Search, Plus, Minus, Trash2 } from "lucide-react";
import { Card, Btn, Badge, Field, inp, stockTone, Table, Th, Td } from "../components/ui";
import { PAY, fmt } from "../data";
import Receipt from "./Receipt";

export default function Sales({ products, sales, user, onComplete }) {
  const [q, setQ] = useState(""); const [cart, setCart] = useState([]); const [method, setMethod] = useState(""); const [ref, setRef] = useState(""); const [receipt, setReceipt] = useState(null);
  const list = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()));
  const stockOf = (id) => products.find((p) => p.id === id).qty;
  const add = (p) => setCart((c) => { const e = c.find((i) => i.id === p.id); if (e) return e.qty < p.qty ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i)) : c; return p.qty > 0 ? [...c, { id: p.id, name: p.name, price: p.price, cost: p.cost, qty: 1 }] : c; });
  const chg = (id, d) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(stockOf(id), i.qty + d)) } : i)));
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const recentSales = [...sales].reverse().filter((sale) => sale.cashier === user.name).slice(0, 10);
  const complete = () => {
    const sale = onComplete(cart, method, ref, user);
    setReceipt(sale); setCart([]); setMethod(""); setRef("");
  };
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="relative mb-4"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input className={inp + " pl-9"} placeholder="Search products by name or category" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <button key={p.id} disabled={p.qty === 0} onClick={() => add(p)} className="rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-40">
                <p className="text-sm font-medium text-slate-900">{p.name}</p><p className="text-xs text-slate-500">{p.category}</p>
                <div className="mt-3 flex items-end justify-between"><span className="font-semibold text-teal-800">{fmt(p.price)}</span><Badge tone={stockTone(p)}>{p.qty} in stock</Badge></div>
              </button>
            ))}
            {list.length === 0 && <p className="text-sm text-slate-500">No products match "{q}". Try a different name.</p>}
          </div>
        </div>
        <Card title="Current sale" className="h-fit lg:col-span-2">
          {cart.length === 0 ? <p className="text-sm text-slate-500">The cart is empty. Select products to start a sale.</p> : (
            <ul className="divide-y divide-slate-100">{cart.map((i) => (
              <li key={i.id} className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-3 text-sm sm:flex">
                <div className="min-w-0"><p className="break-words font-medium text-slate-800">{i.name}</p><p className="text-xs text-slate-500">{fmt(i.price)} each</p></div>
                <button aria-label="Remove" onClick={() => setCart(cart.filter((x) => x.id !== i.id))} className="justify-self-end text-slate-400 hover:text-red-600 sm:order-last"><Trash2 size={15} /></button>
                <div className="flex items-center gap-1"><button aria-label="Decrease" onClick={() => chg(i.id, -1)} className="rounded border border-slate-300 p-1 hover:bg-slate-50"><Minus size={13} /></button><span className="w-7 text-center">{i.qty}</span><button aria-label="Increase" onClick={() => chg(i.id, 1)} className="rounded border border-slate-300 p-1 hover:bg-slate-50"><Plus size={13} /></button></div>
                <span className="w-24 text-right font-medium sm:ml-auto">{fmt(i.qty * i.price)}</span>
              </li>))}</ul>)}
          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4"><span className="text-sm text-slate-600">Total</span><span className="text-xl font-semibold text-slate-900">{fmt(total)}</span></div>
          <p className="mb-2 mt-5 text-sm font-medium text-slate-700">Payment method</p>
          <div className="grid grid-cols-2 gap-2">{PAY.map((m) => (
            <button key={m} onClick={() => setMethod(m)} className={`rounded-md border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-teal-500 ${method === m ? "border-teal-700 bg-gradient-to-r from-teal-50 to-emerald-50 font-medium text-teal-900" : "border-slate-300 text-slate-700 hover:bg-slate-50"}`}>{m}</button>
          ))}</div>
          {method && method !== "Cash" && <div className="mt-3"><Field label="Transaction reference (optional)"><input className={inp} value={ref} onChange={(e) => setRef(e.target.value)} placeholder="e.g. message ID from the customer's phone" /></Field></div>}
          <p className="mt-3 rounded-md bg-amber-50 p-3 text-xs text-amber-900">Selecting a payment method only records it. Confirm the money was received before completing the sale.</p>
          <Btn className="mt-4 w-full" disabled={!cart.length || !method} onClick={complete}>Complete sale</Btn>
        </Card>
      </div>
      <Card title="Recent transactions">
        {recentSales.length === 0 ? <p className="text-sm text-slate-500">No transactions have been recorded by you yet. Completed sales will appear here.</p> : (
          <Table head={<><Th>Transaction</Th><Th>Date &amp; time</Th><Th>Payment</Th><Th>Status</Th><Th right>Total</Th></>}>
            {recentSales.map((sale) => (
              <tr key={sale.id}>
                <Td className="font-medium text-slate-900">{sale.id}</Td>
                <Td>{sale.date} {sale.time}</Td>
                <Td>{sale.method}</Td>
                <Td><Badge tone={sale.status === "Completed" ? "green" : "red"}>{sale.status}</Badge></Td>
                <Td right className="font-medium">{fmt(sale.total)}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
      {receipt && <Receipt sale={receipt} onClose={() => setReceipt(null)} />}
    </div>
  );
}
