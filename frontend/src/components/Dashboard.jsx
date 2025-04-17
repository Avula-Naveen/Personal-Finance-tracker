

import { Card, CardContent } from "../components/ui/card";

export default function Dashboard({ transactions }) {
  const categories = ["Food", "Transport", "Health", "Entertainment", "Other"];

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const categoryBreakdown = categories.map((cat) => {
    const catTotal = transactions
      .filter((tx) => tx.category === cat)
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { category: cat, total: catTotal };
  });

  const recent = transactions.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <Card>
        <CardContent className="p-4">
          <p className="font-bold text-lg">Total Expenses</p>
          <p className="text-2xl font-semibold text-red-500">₹{total}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="font-bold text-lg">Category Breakdown</p>
          <ul className="mt-2">
            {categoryBreakdown.map((c) => (
              <li key={c.category}>
                {c.category}: ₹{c.total}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="font-bold text-lg">Recent Transactions</p>
          <ul className="mt-2">
            {recent.map((tx) => (
              <li key={tx._id}>
                {tx.description} - ₹{tx.amount}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
