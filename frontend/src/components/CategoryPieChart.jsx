

import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const categories = ['Food', 'Transport', 'Health', 'Entertainment', 'Bills', 'Other'];

export default function CategoryPieChart({ transactions }) {
  // Map categories to sum up amounts based on category
  const data = categories.map(cat => ({
    name: cat,
    value: transactions
      .filter(t => t.category === cat)  // Ensure category matches
      .reduce((sum, t) => sum + t.amount, 0)  // Sum amounts for each category
  })).filter(d => d.value > 0);  // Only include categories with values > 0

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx={150}
        cy={150}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
