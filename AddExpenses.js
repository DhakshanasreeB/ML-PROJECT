import React, { useState, useEffect } from 'react';
import './AddExpenses.css';

const AddExpenses = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [unexpected, setUnexpected] = useState('');
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (amount && category) {
      const newExpense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category,
        unexpected: unexpected ? parseFloat(unexpected) : 0
      };
      setExpenses([...expenses, newExpense]);
      setAmount('');
      setCategory('');
      setUnexpected('');
    }
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalUnexpected = expenses.reduce((sum, exp) => sum + exp.unexpected, 0);
  const balance = monthlyIncome ? (parseFloat(monthlyIncome) - totalSpent - totalUnexpected) : 0;

  return (
    <div className="add-expenses-container">
      <h2>Monthly Expense Analyzer</h2>

      <input
        type="number"
        placeholder="Enter Monthly Income"
        value={monthlyIncome}
        onChange={(e) => setMonthlyIncome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount Spent"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Category (e.g., Rent, Food)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Unexpected Charges (optional)"
        value={unexpected}
        onChange={(e) => setUnexpected(e.target.value)}
      />

   
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
  <button onClick={handleAddExpense}>Add Expense</button>
</div>


      <div className="expense-summary">
        <h3>Expense Overview</h3>
        <ul>
          {expenses.map(({ id, category, amount, unexpected }) => (
            <li key={id}>
              <div>
                <strong>{category}</strong>: ₹{amount.toFixed(2)}
                {unexpected > 0 && (
                  <span style={{ color: '#facc15', marginLeft: '10px' }}>
                    (+₹{unexpected.toFixed(2)} Unexpected)
                  </span>
                )}
              </div>
              <button className="delete-button" onClick={() => handleDelete(id)}>🗑</button>
            </li>
          ))}
        </ul>

        <div className="analysis">
          <p><strong>Total Spent:</strong> ₹{totalSpent.toFixed(2)}</p>
          <p><strong>Unexpected Expenses:</strong> ₹{totalUnexpected.toFixed(2)}</p>
          <p><strong>Remaining Balance:</strong> ₹{balance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AddExpenses;
