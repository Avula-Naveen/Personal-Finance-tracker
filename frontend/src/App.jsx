


import { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import MonthlyBarChart from './components/MonthlyBarChart';
import CategoryPieChart from './components/CategoryPieChart';
import Dashboard from './components/Dashboard';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('https://personal-finance-tracker-backend-7xyj.onrender.com/transactions')
      .then(res => res.json())
      .then(setTransactions);
  }, []);

  const handleAdd = (newTx) => {
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleDelete = async (id) => {
    await fetch(`https://personal-finance-tracker-backend-7xyj.onrender.com/transactions/${id}`, { method: 'DELETE' });
    setTransactions(prev => prev.filter(tx => tx._id !== id));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Personal Finance Visualizer</h1>
      <TransactionForm onAdd={handleAdd} />
      <Dashboard transactions={transactions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <MonthlyBarChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  );
}

export default App;









