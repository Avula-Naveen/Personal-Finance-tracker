


import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function ExpenseChart({ transactions }) {
  const monthlyData = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month, total,
  }));

  
  return (
    <BarChart width={500} height={300} data={chartData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  );
}
