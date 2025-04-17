import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyBarChart({ transactions }) {
  const monthlyData = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    const found = acc.find(item => item.month === month);
    if (found) {
      found.amount += tx.amount;
    } else {
      acc.push({ month, amount: tx.amount });
    }
    return acc;
  }, []);

  const sortedData = monthlyData.sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sortedData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
