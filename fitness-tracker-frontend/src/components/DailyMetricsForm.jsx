import React, { useState } from 'react';
import axios from 'axios';

function DailyMetricsForm() {
  const [userId, setUserId] = useState('');
  const [calories, setCalories] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState(''); 
  const [statusMessage, setStatusMessage] = useState('');

  const handleMetricSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      const response = await axios.post(`http://localhost:8080/api/users/${userId}/metrics`, {
        caloriesConsumed: parseInt(calories) || 0,
        weightLbs: parseFloat(weight) || null,
        logDate: new Date().toLocaleDateString('en-CA'),
        notes: notes.trim() || null 
      });

      if (response.status === 200 || response.status === 201) {
        setStatusMessage(`Successfully saved health metrics for User ID: ${userId}!`);
        setCalories('');
        setWeight('');
        setNotes(''); 
      }
    } catch (error) {
      console.error("Metric submission error:", error);
      setStatusMessage("Failed to log metrics. Ensure User ID exists and backend is running!");
    }
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h3>Log Daily Metrics</h3>
      <form onSubmit={handleMetricSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>User ID Profile Target:</label>
          <input 
            type="number" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            required 
            placeholder="e.g. 1"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Calories Consumed:</label>
          <input 
            type="number" 
            value={calories} 
            onChange={(e) => setCalories(e.target.value)} 
            placeholder="e.g. 2400"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Current Weight (lbs):</label>
          <input 
            type="number" 
            step="0.1" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            placeholder="e.g. 175.5"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Daily Notes:</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="How do you feel? (e.g., Slept poorly, energy was low)"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '60px', resize: 'vertical' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', background: '#28A745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Save Metrics Log
        </button>
      </form>

      {statusMessage && <p style={{ marginTop: '12px', fontSize: '14px', color: '#333' }}>{statusMessage}</p>}
    </div>
  );
}

export default DailyMetricsForm;
