


import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import AddButton from './AddButton';

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date || !description) return;
    const res = await fetch('http://localhost:5000/transactions', {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseFloat(amount), date, description }),
    });
    const data = await res.json();
    onAdd(data);
    setAmount('');
    setDate('');
    setDescription('');
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-2">

      <Input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        placeholder="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* <Button type="submit">Add Transaction</Button> */}
      <AddButton type='submit'/>
    </form>
  );
}
