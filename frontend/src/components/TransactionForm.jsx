
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import AddButton from './AddButton';

const categories = ["Food", "Transport", "Health", "Entertainment", "Other"];

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!amount) newErrors.amount = "Amount is required";
    if (!date) newErrors.date = "Date is required";
    if (!description) newErrors.description = "Description is required";
    if (!category) newErrors.category = "Category is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const res = await fetch("http://localhost:5000/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(amount),
        date,
        description,
        category,
      }),
    });

    const data = await res.json();
    onAdd(data);
    setAmount("");
    setDate("");
    setDescription("");
    setCategory("Food");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-lg">
      <div>
        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
      </div>

      <div>
        <Input
          placeholder="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      <div>
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <AddButton type="submit" />
    </form>
  );
}





