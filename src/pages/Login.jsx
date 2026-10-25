import { useState } from "react";
import { Store } from "lucide-react";
import { Field, inp, Btn } from "../components/ui";

export default function Login({ users, onLogin }) {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const u = users.find((x) => x.username === username.trim().toLowerCase() && x.password === password);
    if (u) onLogin(u); else setError("Incorrect username or password. Check both and try again.");
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 p-4">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-100/60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-700 to-emerald-500 text-white shadow-lg shadow-teal-900/15"><Store size={26} /></div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Retail Management System</h1>
          <p className="mt-1 text-sm text-slate-600">Sign in to continue</p>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-6">
          <Field label="Username"><input autoFocus required className={inp} value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} autoComplete="username" /></Field>
          <Field label="Password"><input required type="password" className={inp} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} autoComplete="current-password" /></Field>
          {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <Btn className="w-full">Sign in</Btn>
        </form>
        <div className="mt-4 rounded-xl border border-slate-200 bg-white/80 p-3 text-xs text-slate-600 shadow-sm sm:p-4">
          <p className="mb-2 font-semibold text-slate-700">Demo accounts</p>
          <p className="mb-3 text-slate-500">Select an account to fill in its credentials.</p>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-1 border-b border-slate-200 px-2 pb-2 font-semibold text-slate-500 sm:gap-2 sm:px-3">
            <span>Role</span><span>Username</span><span>Password</span>
          </div>
          <div className="mt-1 space-y-1">
            {users.map((u) => (<button key={u.id} type="button" onClick={() => { setUsername(u.username); setPassword(u.password); setError(""); }} className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-1 rounded-lg px-2 py-2 text-left transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-600 sm:gap-2 sm:px-3"><span className="min-w-0 break-words font-medium text-slate-700">{u.role}</span><span className="min-w-0 break-words text-slate-600">{u.username}</span><span className="min-w-0 break-words text-slate-500">{u.password}</span></button>))}
          </div>
        </div>
      </div>
    </div>
  );
}