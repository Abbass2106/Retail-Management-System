import { X } from "lucide-react";

/* ---------- small UI pieces ---------- */
export const Card = ({ title, action, children, className = "" }) => (
  <section className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
    {title && <header className="flex items-center justify-between gap-3 rounded-t-xl border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3"><h3 className="text-sm font-semibold text-slate-800">{title}</h3>{action}</header>}
    <div className="p-5">{children}</div>
  </section>
);
export const Btn = ({ kind = "primary", className = "", ...p }) => (
  <button {...p} className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 ${kind === "primary" ? "bg-gradient-to-r from-teal-700 to-emerald-600 text-white hover:from-teal-800 hover:to-emerald-700" : kind === "danger" ? "text-red-700 hover:bg-red-50" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"} ${className}`} />
);
export const Badge = ({ tone = "slate", children }) => {
  const t = { slate: "bg-slate-100 text-slate-700", red: "bg-red-50 text-red-700", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-800" }[tone];
  return <span className={`rounded px-2 py-0.5 text-xs font-medium ${t}`}>{children}</span>;
};
export const Field = ({ label, children }) => (<label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">{label}</span>{children}</label>);
export const inp = "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20";
export const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
    <div className="max-h-[90vh] w-full max-w-md overflow-auto rounded-xl bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3"><h3 className="font-semibold text-slate-900">{title}</h3><button onClick={onClose} aria-label="Close" className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600"><X size={18} /></button></div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);
export const Stat = ({ label, value, note, highlight }) => (
  <div className={`rounded-xl border p-5 shadow-sm ${highlight ? "border-transparent bg-gradient-to-br from-teal-700 to-emerald-500 text-white" : "border-slate-200 bg-white"}`}>
    <p className={`text-sm ${highlight ? "text-teal-50" : "text-slate-500"}`}>{label}</p>
    <p className={`mt-1 text-2xl font-semibold ${highlight ? "text-white" : "text-slate-900"}`}>{value}</p>
    {note && <p className={`mt-1 text-xs ${highlight ? "text-teal-100" : "text-slate-500"}`}>{note}</p>}
  </div>
);
export const Th = ({ children, right }) => <th className={`px-4 py-2.5 text-xs font-medium text-slate-500 ${right ? "text-right" : "text-left"}`}>{children}</th>;
export const Td = ({ children, right, className = "" }) => <td className={`px-4 py-3 text-sm text-slate-700 ${right ? "text-right" : ""} ${className}`}>{children}</td>;
export const Table = ({ head, children }) => (
  <div className="overflow-x-auto"><table className="w-full min-w-[640px]"><thead className="bg-slate-50"><tr>{head}</tr></thead><tbody className="divide-y divide-slate-100">{children}</tbody></table></div>
);
export const stockTone = (p) => (p.qty <= p.min ? "red" : p.qty <= p.min * 1.5 ? "amber" : "green");
