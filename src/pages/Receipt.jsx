import { Store, Printer } from "lucide-react";
import { Modal, Btn } from "../components/ui";
import { fmt } from "../data";

export default function Receipt({ sale, onClose }) {
  return (
    <Modal title="Receipt" onClose={onClose}>
      <div className="text-center"><Store className="mx-auto text-teal-700" /><p className="mt-1 font-semibold">Retail Management System</p><p className="text-xs text-slate-500">{sale.id} · {sale.date} {sale.time}</p></div>
      <ul className="my-4 divide-y divide-dashed divide-slate-200 border-y border-dashed border-slate-300">{sale.items.map((i) => (
        <li key={i.id} className="flex justify-between py-2 text-sm"><span>{i.qty} × {i.name}<span className="block text-xs text-slate-500">{fmt(i.price)} each</span></span><span>{fmt(i.qty * i.price)}</span></li>))}</ul>
      <div className="flex justify-between font-semibold"><span>Total</span><span>{fmt(sale.total)}</span></div>
      <p className="mt-1 flex justify-between text-sm text-slate-600"><span>Paid with</span><span>{sale.method}</span></p>
      {sale.ref && <p className="flex justify-between text-sm text-slate-600"><span>Reference</span><span>{sale.ref}</span></p>}
      <p className="flex justify-between text-sm text-slate-600"><span>Served by</span><span>{sale.cashier}</span></p>
      <div className="mt-5 flex gap-2"><Btn kind="secondary" className="flex-1" onClick={() => window.print()}><Printer size={15} />Print</Btn><Btn className="flex-1" onClick={onClose}>Done</Btn></div>
    </Modal>
  );
}

