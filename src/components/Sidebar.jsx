import { Store, LogOut } from "lucide-react";

export default function Sidebar({ nav, current, onSelect, user, onSignOut }) {
  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col bg-gradient-to-b from-teal-950 via-teal-900 to-emerald-950 text-teal-50 md:flex">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-400 text-teal-950"><Store size={19} /></div>
        <span className="text-sm font-semibold leading-tight">Retail Management System</span>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((n) => (
          <button key={n.id} onClick={() => onSelect(n.id)} className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition ${current === n.id ? "bg-gradient-to-r from-teal-600 to-emerald-500 font-medium text-white" : "text-teal-100 hover:bg-teal-800/60"}`}>
            <n.icon size={17} />{n.label}
          </button>
        ))}
      </nav>
      <div className="border-t border-teal-800 p-4">
        <p className="text-sm font-medium text-white">{user.name}</p>
        <p className="mb-3 text-xs text-teal-300">{user.role}</p>
        <button onClick={onSignOut} className="flex w-full items-center justify-center gap-2 rounded-md border border-teal-700 px-3 py-1.5 text-sm text-teal-50 hover:bg-teal-800/60"><LogOut size={15} />Sign out</button>
      </div>
    </aside>
  );
}
