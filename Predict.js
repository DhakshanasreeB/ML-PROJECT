import React, { useState } from 'react';
import './Predict.css';

const Predict = () => {
  const [amount, setAmount] = useState('');
  const [unexpected, setUnexpected] = useState('');
  const [thirdFeature, setThirdFeature] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setError('');
    setResult(null);

    if (!amount || !unexpected || !thirdFeature) {
      setError('Please enter all three values.');
      return;
    }

    if (parseFloat(amount) < 0 || parseFloat(unexpected) < 0 || parseFloat(thirdFeature) < 0) {
      setError('Values cannot be negative.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          unexpected: parseFloat(unexpected),
          third_feature: parseFloat(thirdFeature),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Prediction request failed');
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      setError('Error making prediction. Please check your input and backend status.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="predict-container" role="main" aria-label="Expense prediction form">
      <header className="predict-header">
        <h1 className="predict-title">🧠 ML Expense Predictor</h1>
        <p className="predict-description">
          Enter your expense details to get an AI-based prediction.
        </p>
      </header>

      <form
        className="predict-form"
        onSubmit={(e) => {
          e.preventDefault();
          handlePredict();
        }}
        noValidate
      >
        <label htmlFor="amount" className="predict-label">
          Amount (₹)
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            className="predict-input"
            placeholder="e.g. 1500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <label htmlFor="unexpected" className="predict-label">
          Unexpected Expense (₹)
          <input
            id="unexpected"
            type="number"
            min="0"
            step="0.01"
            className="predict-input"
            placeholder="e.g. 200"
            value={unexpected}
            onChange={(e) => setUnexpected(e.target.value)}
            required
          />
        </label>

        <label htmlFor="thirdFeature" className="predict-label">
          Third Feature
          <input
            id="thirdFeature"
            type="number"
            min="0"
            step="0.01"
            className="predict-input"
            placeholder="Enter value"
            value={thirdFeature}
            onChange={(e) => setThirdFeature(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="predict-btn"
          disabled={loading}
          aria-busy={loading}
          aria-label={loading ? 'Predicting expense' : 'Predict expense'}
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {error && <p role="alert" className="predict-error">{error}</p>}

      {result !== null && (
        <section className="predict-result" aria-live="polite" aria-atomic="true">
          <p>
            🧾 Prediction Result: <strong>₹ {parseFloat(result).toFixed(2)}</strong>
          </p>
        </section>
      )}
    </main>
  );
};

export default Predict;
