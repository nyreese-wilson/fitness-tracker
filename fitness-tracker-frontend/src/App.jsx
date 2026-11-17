import React, { useState } from 'react';
import axios from 'axios';
import DailyMetricsForm from './components/DailyMetricsForm';
import WorkoutForm from './components/WorkoutForm';
import HistoryFeed from './components/HistoryFeed'; 
function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8080/api/users', {
        username,
        email
      });
      if (response.status === 200) {
        setMessage(`Success! Created Profile for ${response.data.username} with ID: ${response.data.id}`);
        setUsername('');
        setEmail('');
      }
    } catch (error) {
      console.error("Profile creation failure:", error);
      setMessage("Failed to create user. Username or email might be taken.");
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        🏋️ Full-Stack Fitness Portfolio Tracker
      </h1>
      
      {message && (
        <p style={{ textAlign: 'center', color: '#007BFF', fontWeight: 'bold', background: '#e6f2ff', padding: '10px', borderRadius: '4px' }}>
          {message}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3>Create User Profile</h3>
            <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px' }}>Username:</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px' }}>Email Address:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" style={{ padding: '8px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Register Account
              </button>
            </form>
          </div>

          <DailyMetricsForm />
        </div>

        <div>
          <WorkoutForm />
        </div>

      </div> 

      <HistoryFeed />

    </div>
  );
}

export default App;
