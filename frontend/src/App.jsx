

import { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch('http://localhost:5000/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = (tx) => setTransactions([tx, ...transactions]);
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/transactions/${id}`, { method: 'DELETE' });
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-4xl text-center">Personal Finance Tracker</h1>
      <TransactionForm onAdd={handleAdd} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
      <ExpenseChart transactions={transactions} />
    </div>
  );
}
