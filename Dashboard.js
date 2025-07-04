import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Dashboard.css';

// Animated number count hook
function useAnimatedCount(endValue, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    if (endValue === 0) return;
    const increment = endValue / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        start = endValue;
        clearInterval(timer);
      }
      setCount(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [endValue, duration]);
  return count;
}

const Dashboard = () => {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const monthlyIncome = parseFloat(localStorage.getItem('monthlyIncome')) || 0;
  const monthlyBudget = parseFloat(localStorage.getItem('monthlyBudget')) || monthlyIncome;

  // Summary per category including unexpected charges
  const summary = expenses.reduce((acc, curr) => {
    const total = curr.amount + (curr.unexpected || 0);
    const index = acc.findIndex((item) => item.category === curr.category);
    if (index !== -1) {
      acc[index].amount += total;
    } else {
      acc.push({ category: curr.category, amount: total });
    }
    return acc;
  }, []);

  const totalExpenses = expenses.reduce(
    (sum, curr) => sum + curr.amount + (curr.unexpected || 0),
    0
  );

  const balance = monthlyIncome - totalExpenses;
  const budgetUsedPercent = (totalExpenses / monthlyBudget) * 100;

  // Animated counts
  const animatedIncome = useAnimatedCount(monthlyIncome);
  const animatedExpenses = useAnimatedCount(totalExpenses);
  //const animatedBalance = useAnimatedCount(Math.max(balance, 0));

  // Dynamic progress bar color
  let progressBarColor = '#34d399'; // green
  if (budgetUsedPercent > 90) progressBarColor = '#f97316'; // orange
  if (budgetUsedPercent > 100) progressBarColor = '#ef4444'; // red

  // Smart tips (could be AI-generated)
  const tips = [];
  if (budgetUsedPercent > 100) tips.push("⚠️ You've exceeded your budget! Immediate attention needed.");
  else if (budgetUsedPercent > 90) tips.push("⚠️ Approaching budget limit. Watch spending closely.");
  else tips.push("👍 You're managing your budget well. Keep it up!");

  // Pie label formatter to show % of total expenses
  const pieLabel = (entry) =>
    `${entry.category}: ₹${entry.amount.toFixed(0)} (${((entry.amount / totalExpenses) * 100).toFixed(1)}%)`;

  const COLORS = ['#3b82f6', '#10b981', '#fbbf24', '#f87171', '#8b5cf6', '#ec4899'];

  return (
    <div className="dashboard-container enhanced">
      <header className="dashboard-header">
        <h1 className="dashboard-title">📊 AI Budget Dashboard</h1>
        <p className="dashboard-description">Visualize your spending with smart insights.</p>
      </header>

      <div className="dashboard-summary enhanced-summary">
        <div className="summary-item">
          <p className="summary-label">Monthly Income</p>
          <p className="summary-value income">₹{animatedIncome.toLocaleString()}</p>
        </div>
        <div className="summary-item">
          <p className="summary-label">Monthly Budget</p>
          <p className="summary-value budget">₹{monthlyBudget.toLocaleString()}</p>
        </div>
        <div className="summary-item">
          <p className="summary-label">Total Expenses</p>
          <p className="summary-value expenses">₹{animatedExpenses.toLocaleString()}</p>
        </div>
        <div className="summary-item">
          <p className="summary-label">Remaining Balance</p>
          <p className={`summary-value balance ${balance < 0 ? 'negative' : ''}`}>
            ₹{balance < 0 ? '-' : ''}{Math.abs(balance).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="budget-progress-bar-container">
        <div
          className="budget-progress-bar"
          style={{ backgroundColor: '#374151' }}
          aria-label="Budget usage progress"
          role="progressbar"
          aria-valuenow={Math.min(budgetUsedPercent, 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="budget-progress-bar-fill"
            style={{ width: `${Math.min(budgetUsedPercent, 100)}%`, backgroundColor: progressBarColor }}
          />
        </div>
        <p className="budget-progress-label">
          {budgetUsedPercent.toFixed(1)}% of budget used
        </p>
      </div>

      {summary.length === 0 ? (
        <p className="no-data">No expenses added yet. Start by adding your first expense!</p>
      ) : (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <Pie
                data={summary}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label={pieLabel}
                labelLine={false}
                isAnimationActive={true}
              >
                {summary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toFixed(2)}`}
                contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none', color: '#e0e7ff' }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ color: '#94a3b8', fontSize: '14px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <section className="smart-tips enhanced-tips" aria-live="polite">
        <h2>💡 Smart Tips</h2>
        <ul>
          {tips.map((tip, i) => (
            <li key={i} className={tip.includes('⚠️') ? 'alert-tip' : ''}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
