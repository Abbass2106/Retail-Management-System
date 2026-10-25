import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Card, Btn, Badge, Field, inp, Modal, Table, Th, Td, stockTone } from "../components/ui";
import { fmt } from "../data";

export default function Products({ products, setProducts }) {
  const [q, setQ] = useState(""); const [edit, setEdit] = useState(null);
  const cats = [...new Set(products.map((p) => p.category))];
  const save = (e) => {
    e.preventDefault(); const f = Object.fromEntries(new FormData(e.target));
    const p = { ...edit, name: f.name, category: f.category, price: +f.price, cost: +f.cost, min: +f.min, qty: edit.id ? edit.qty : +f.qty };
    setProducts((l) => (edit.id ? l.map((x) => (x.id === edit.id ? p : x)) : [...l, { ...p, id: Date.now() }])); setEdit(null);
  };
  const shown = products.filter((p) => (p.name + p.category).toLowerCase().includes(q.toLowerCase()));
  return (
    <Card title="Product list" action={<Btn onClick={() => setEdit({ name: "", category: cats[0], price: "", cost: "", qty: 0, min: 10 })}><Plus size={15} />Add product</Btn>}>
      <div className="relative mb-4 max-w-sm"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input className={inp + " pl-9"} placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <Table head={<><Th>Product</Th><Th>Category</Th><Th right>Selling price</Th><Th right>Cost price</Th><Th right>In stock</Th><Th right>Min</Th><Th /></>}>
        {shown.map((p) => (<tr key={p.id}><Td className="font-medium text-slate-900">{p.name}</Td><Td>{p.category}</Td><Td right>{fmt(p.price)}</Td><Td right>{fmt(p.cost)}</Td><Td right><Badge tone={stockTone(p)}>{p.qty}</Badge></Td><Td right>{p.min}</Td>
          <Td right><Btn kind="secondary" onClick={() => setEdit(p)}>Edit</Btn> <Btn kind="danger" onClick={() => window.confirm(`Remove ${p.name}?`) && setProducts(products.filter((x) => x.id !== p.id))}>Remove</Btn></Td></tr>))}
      </Table>
      {edit && (
        <Modal title={edit.id ? "Edit product" : "Add product"} onClose={() => setEdit(null)}>
          <form onSubmit={save} className="space-y-3">
            <Field label="Name"><input name="name" required className={inp} defaultValue={edit.name} /></Field>
            <Field label="Category"><input name="category" required list="cats" className={inp} defaultValue={edit.category} /><datalist id="cats">{cats.map((c) => <option key={c} value={c} />)}</datalist></Field>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><Field label="Selling price"><input name="price" type="number" min="0" required className={inp} defaultValue={edit.price} /></Field><Field label="Cost price"><input name="cost" type="number" min="0" required className={inp} defaultValue={edit.cost} /></Field>
              {!edit.id && <Field label="Opening quantity"><input name="qty" type="number" min="0" required className={inp} defaultValue={0} /></Field>}<Field label="Minimum stock level"><input name="min" type="number" min="0" required className={inp} defaultValue={edit.min} /></Field></div>
            <Btn className="w-full">Save product</Btn>
          </form>
        </Modal>)}
    </Card>
  );
}
