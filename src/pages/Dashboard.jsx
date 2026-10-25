import { AlertTriangle } from "lucide-react";
import { Card, Table, Th, Td, Stat } from "../components/ui";
import { fmt, dayStr } from "../data";
import { bestSellers, revenue } from "../utils";

export default function Dashboard({ products, sales }) {
  const today = sales.filter((s) => s.date === dayStr(0));
  const low = products.filter((p) => p.qty <= p.min);
  const top = bestSellers(sales).slice(0, 5);
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total sales (all time)" value={fmt(revenue(sales))} />
        <Stat highlight label="Today's revenue" value={fmt(revenue(today))} />
        <Stat label="Transactions today" value={today.filter((s) => s.status === "Completed").length} />
        <Stat label="Low-stock products" value={low.length} note="At or below minimum level" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Low stock">
          {low.length === 0 ? <p className="text-sm text-slate-500">All products are above their minimum level.</p> : (
            <ul className="divide-y divide-slate-100">{low.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2.5 text-sm"><span className="flex items-center gap-2 text-slate-800"><AlertTriangle size={15} className="text-red-600" />{p.name}</span><span className="text-slate-500">{p.qty} left (min {p.min})</span></li>
            ))}</ul>)}
        </Card>
        <Card title="Best-selling products">
          <ul className="space-y-3">{top.map(([name, q]) => (
            <li key={name} className="text-sm"><div className="mb-1 flex justify-between"><span className="text-slate-800">{name}</span><span className="text-slate-500">{q} sold</span></div><div className="h-1.5 rounded bg-slate-100"><div className="h-1.5 rounded bg-gradient-to-r from-teal-600 to-emerald-400" style={{ width: `${(q / top[0][1]) * 100}%` }} /></div></li>
          ))}</ul>
        </Card>
      </div>
      <Card title="Recent transactions">
        <Table head={<><Th>Transaction</Th><Th>Date</Th><Th>Payment</Th><Th>Cashier</Th><Th right>Total</Th></>}>
          {[...sales].reverse().slice(0, 6).map((s) => (<tr key={s.id}><Td>{s.id}</Td><Td>{s.date}</Td><Td>{s.method}</Td><Td>{s.cashier}</Td><Td right>{fmt(s.total)}</Td></tr>))}
        </Table>
      </Card>
    </div>
  );
}

