import React, { useState } from 'react';
import axios from 'axios';

function HistoryFeed() {
  const [userId, setUserId] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUserHistory = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setHasFetched(false);

    if (!userId) {
      setErrorMessage("Please enter a valid User ID target.");
      return;
    }

    try {
      const [metricsResponse, workoutsResponse] = await Promise.all([
        axios.get(`http://localhost:8080/api/users/${userId}/metrics`),
        axios.get(`http://localhost:8080/api/users/${userId}/workouts`)
      ]);

      setMetrics(metricsResponse.data);
      setWorkouts(workoutsResponse.data);
      setHasFetched(true);
    } catch (error) {
      console.error("History fetch failure:", error);
      setErrorMessage("Could not retrieve logs. Check that the User ID exists and the backend is live.");
    }
  };

  return (
    <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '30px', gridColumn: '1 / -1' }}>
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '8px', marginBottom: '20px' }}>
        🔍 Retrospective Activity Feed
      </h2>

      <form onSubmit={fetchUserHistory} style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '25px' }}>
        <label style={{ fontWeight: 'bold' }}>Fetch Timeline for User ID:</label>
        <input 
          type="number" 
          placeholder="e.g. 1" 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ padding: '8px', width: '100px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Load Dashboard Data
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>}

      {hasFetched && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          <div style={{ background: '#fcfcfc', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
            <h3 style={{ color: '#0056b3', marginTop: '0' }}>Daily Biometrics Timeline</h3>
            {metrics.length === 0 ? (
              <p style={{ color: '#777', fontStyle: 'italic' }}>No biometric markers logged for this profile.</p> // Fixed 'italic' syntax error
            ) : (
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {metrics.map((m) => (
                  <li key={`metric-${m.id}`} style={{ padding: '10px 0', borderBottom: '1px solid #eef', fontSize: '15px' }}>
                    📅 <strong>{m.logDate}</strong> — Weight: <span style={{ color: '#28a745', fontWeight: 'bold' }}>{m.weightLbs} lbs</span> | Calories: <strong>{m.caloriesConsumed} kcal</strong>
                    {m.notes && (
                      <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#666', fontStyle: 'italic', background: '#f1f1f1', padding: '6px', borderRadius: '4px' }}>
                        📝 {m.notes}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ background: '#fcfcfc', padding: '15px', borderRadius: '6px', border: '1px solid #eee' }}>
            <h3 style={{ color: '#28a745', marginTop: '0' }}>Workout Logs Timeline</h3>
            {workouts.length === 0 ? (
              <p style={{ color: '#777', fontStyle: 'italic' }}>No workout sessions found for this profile.</p> // Fixed 'italic' syntax error
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {workouts.map((w) => (
                  <div key={`workout-${w.id}`} style={{ background: '#fff', padding: '12px', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '6px', borderBottom: '1px dashed #eee', paddingBottom: '4px' }}>
                      🏋️ Session Log #{w.id} on {w.workoutDate}
                    </div>
                    {w.notes && (
                      <p style={{ margin: '4px 0 10px 0', fontSize: '13px', color: '#555', fontStyle: 'italic', background: '#f5fafd', padding: '6px', borderRadius: '4px', borderLeft: '3px solid #007BFF' }}>
                        📝 {w.notes}
                      </p>
                    )}
                    <ul style={{ paddingLeft: '20px', margin: '0', fontSize: '14px', color: '#555' }}>
                      {w.exerciseLogs && w.exerciseLogs.map((log) => (
                        <li key={`ex-log-${log.id}`} style={{ marginBottom: '4px' }}>
                          <strong>{log.exerciseDefinition?.name || `Exercise ID: ${log.exerciseDefinition?.id}`}</strong>: {log.sets} sets × {log.reps} reps @ {log.weightLbs} lbs
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default HistoryFeed;
