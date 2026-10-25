import { useState } from "react";
import { Card, Btn, Field, inp, Table, Th, Td } from "../components/ui";

export default function Users({ users, setUsers }) {
  const [name, setName] = useState(""); const [role, setRole] = useState("Cashier");
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState("");
  const addUser = (e) => {
    e.preventDefault(); const un = username.trim().toLowerCase();
    if (users.some((u) => u.username === un)) return setError("That username is already taken. Choose another.");
    setUsers([...users, { id: Date.now(), name, username: un, password, role }]); setName(""); setUsername(""); setPassword(""); setError("");
  };
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card title="User accounts" className="lg:col-span-2">
        <Table head={<><Th>Name</Th><Th>Username</Th><Th>Role</Th><Th /></>}>
          {users.map((u) => (<tr key={u.id}><Td className="font-medium text-slate-900">{u.name}</Td><Td>{u.username}</Td>
            <Td><select className={inp + " max-w-[10rem]"} value={u.role} onChange={(e) => setUsers(users.map((x) => (x.id === u.id ? { ...x, role: e.target.value } : x)))}><option>Administrator</option><option>Manager</option><option>Cashier</option></select></Td>
            <Td right><Btn kind="danger" disabled={u.role === "Administrator"} onClick={() => setUsers(users.filter((x) => x.id !== u.id))}>Remove</Btn></Td></tr>))}
        </Table>
      </Card>
      <Card title="Add user" className="h-fit">
        <form className="space-y-3" onSubmit={addUser}>
          <Field label="Full name"><input required className={inp} value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field label="Username"><input required className={inp} value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} /></Field>
          <Field label="Password"><input required minLength={6} type="password" className={inp} value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <Field label="Role"><select className={inp} value={role} onChange={(e) => setRole(e.target.value)}><option>Manager</option><option>Cashier</option></select></Field>
          <p className="text-xs text-slate-500">Managers handle sales, products, inventory and reports. Cashiers process sales and record payments.</p>
          <Btn className="w-full">Create account</Btn>
        </form>
      </Card>
    </div>
  );
}

