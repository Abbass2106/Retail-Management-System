export const bestSellers = (sales) => {
  const m = {};
  sales.filter((s) => s.status === "Completed").forEach((s) => s.items.forEach((i) => { m[i.name] = (m[i.name] || 0) + i.qty; }));
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
};
export const profit = (sales) => sales.filter((s) => s.status === "Completed").reduce((t, s) => t + s.items.reduce((x, i) => x + i.qty * (i.price - i.cost), 0) - (s.discount || 0), 0);
export const revenue = (sales) => sales.filter((s) => s.status === "Completed").reduce((t, s) => t + s.total, 0);
