

import DeleteButton from "./DeleteButton";



export default function TransactionList({ transactions, onDelete }) {
    return (
      <div className="space-y-2 mt-4">

        {transactions.map((tx) => (
          <div key={tx._id} className="p-2 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{tx.description}</p>
              <p className="text-sm text-gray-600">{new Date(tx.date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-4">
              <span>₹{tx.amount}</span>

              <DeleteButton onClick={() => onDelete(tx._id)} />
              

            </div>
          </div>
        ))}
      </div>
    );
  }
  