import { useState } from "react";
import { Card, Btn, Field, inp, Table, Th, Td, Badge, stockTone } from "../components/ui";
import { SUPPLIERS } from "../data";

export default function Inventory({ products, log, onStock }) {
  const [form, setForm] = useState({ type: "Stock received", id: "", qty: "", note: SUPPLIERS[0] });
  const submit = (e) => { e.preventDefault(); onStock(+form.id, form.type === "Adjustment" ? +form.qty : Math.abs(+form.qty), form.type, form.note); setForm({ ...form, qty: "" }); };
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-3">
      <div className="min-w-0 space-y-6 lg:col-span-2">
        <Card title="Stock levels">
          <Table head={<><Th>Product</Th><Th right>Quantity</Th><Th right>Minimum</Th><Th>Status</Th></>}>
            {[...products].sort((a, b) => a.qty - a.min - (b.qty - b.min)).map((p) => (<tr key={p.id}><Td className="font-medium text-slate-900">{p.name}</Td><Td right>{p.qty}</Td><Td right>{p.min}</Td><Td><Badge tone={stockTone(p)}>{p.qty <= p.min ? "Low stock" : p.qty <= p.min * 1.5 ? "Running low" : "OK"}</Badge></Td></tr>))}
          </Table>
        </Card>
        <Card title="Stock history">
          <Table head={<><Th>Date</Th><Th>Product</Th><Th>Type</Th><Th right>Change</Th><Th>Note</Th></>}>
            {log.slice(0, 12).map((l, i) => (<tr key={i}><Td>{l.date}</Td><Td>{l.name}</Td><Td>{l.type}</Td><Td right className={l.qty < 0 ? "text-red-700" : "text-emerald-700"}>{l.qty > 0 ? "+" : ""}{l.qty}</Td><Td>{l.note}</Td></tr>))}
          </Table>
        </Card>
      </div>
      <Card title="Record stock movement" className="h-fit w-full min-w-0">
        <form onSubmit={submit} className="w-full min-w-0 space-y-3">
          <Field label="Movement type"><select className={inp} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value, note: e.target.value === "Adjustment" ? "Damaged goods" : SUPPLIERS[0] })}><option>Stock received</option><option>Adjustment</option></select></Field>
          <Field label="Product"><select required className={inp} value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })}><option value="">Select a product</option>{products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></Field>
          <Field label={form.type === "Adjustment" ? "Quantity change (use - to reduce)" : "Quantity received"}><input required type="number" className={inp} value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} /></Field>
          {form.type === "Stock received" ? <Field label="Supplier"><select className={inp} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })}>{SUPPLIERS.map((s) => <option key={s}>{s}</option>)}</select></Field>
            : <Field label="Reason"><input required className={inp} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>}
          <Btn className="w-full">Save movement</Btn>
        </form>
      </Card>
    </div>
  );
}
