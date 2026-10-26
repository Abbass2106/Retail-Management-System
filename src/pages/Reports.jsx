import { useState, useMemo } from "react";
import { Download } from "lucide-react";
import { Card, Btn, Badge, Stat, Table, Th, Td } from "../components/ui";
import { PAY, fmt, dayStr } from "../data";
import { bestSellers, profit, revenue } from "../utils";

export default function Reports({ products, sales }) {
  const [days, setDays] = useState(7);
  const from = dayStr(days - 1);
  const inRange = useMemo(() => sales.filter((s) => s.date >= from), [sales, from]);
  const done = inRange.filter((s) => s.status === "Completed");
  const byPay = PAY.map((m) => [m, done.filter((s) => s.method === m).reduce((t, s) => t + s.total, 0)]);
  const maxPay = Math.max(...byPay.map((x) => x[1]), 1);
  const exportCsv = () => {
    const rows = [["Transaction", "Date", "Payment", "Cashier", "Subtotal", "Discount", "Total", "Status"], ...inRange.map((s) => [s.id, s.date, s.method, s.cashier, s.subtotal ?? s.total + (s.discount || 0), s.discount || 0, s.total, s.status])];
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" })); a.download = "sales-report.csv"; a.click();
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-md border border-slate-300 bg-white p-0.5">{[["Daily", 1], ["Weekly", 7], ["Monthly", 30]].map(([l, d]) => (
          <button key={l} onClick={() => setDays(d)} className={`rounded px-4 py-1.5 text-sm ${days === d ? "bg-gradient-to-r from-teal-700 to-emerald-600 text-white" : "text-slate-700 hover:bg-slate-50"}`}>{l}</button>))}</div>
        <Btn kind="secondary" onClick={exportCsv}><Download size={15} />Export CSV</Btn>
      </div>
      <div className="grid gap-4 sm:grid-cols-3"><Stat highlight label="Revenue" value={fmt(revenue(done))} /><Stat label="Estimated gross profit" value={fmt(profit(done))} note="Selling price minus cost price" /><Stat label="Completed sales" value={done.length} /></div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Payment-method breakdown"><ul className="space-y-3">{byPay.map(([m, v]) => (<li key={m} className="text-sm"><div className="mb-1 flex justify-between"><span>{m}</span><span className="text-slate-500">{fmt(v)}</span></div><div className="h-1.5 rounded bg-slate-100"><div className="h-1.5 rounded bg-gradient-to-r from-teal-600 to-emerald-400" style={{ width: `${(v / maxPay) * 100}%` }} /></div></li>))}</ul></Card>
        <Card title="Best sellers"><ul className="divide-y divide-slate-100">{bestSellers(done).slice(0, 6).map(([n, q]) => (<li key={n} className="flex justify-between py-2 text-sm"><span>{n}</span><span className="text-slate-500">{q} units</span></li>))}</ul></Card>
      </div>
      <Card title="Inventory & low-stock report"><p className="mb-3 text-sm text-slate-600">Stock value at cost: <b>{fmt(products.reduce((t, p) => t + p.qty * p.cost, 0))}</b> · Low-stock items: <b>{products.filter((p) => p.qty <= p.min).map((p) => p.name).join(", ") || "None"}</b></p></Card>
      <Card title="Transactions">
        <Table head={<><Th>Transaction</Th><Th>Date</Th><Th>Payment</Th><Th>Status</Th><Th right>Discount</Th><Th right>Total</Th></>}>
          {[...inRange].reverse().map((s) => (<tr key={s.id}><Td>{s.id}</Td><Td>{s.date}</Td><Td>{s.method}</Td><Td><Badge tone={s.status === "Completed" ? "green" : "red"}>{s.status}</Badge></Td><Td right>{fmt(s.discount || 0)}</Td><Td right>{fmt(s.total)}</Td></tr>))}
        </Table>
      </Card>
    </div>
  );
}
