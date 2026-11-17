import React, { useState } from 'react';
import axios from 'axios';

function WorkoutForm() {
  const [userId, setUserId] = useState('');
  const [notes, setNotes] = useState(''); 
  const [exerciseLogs, setExerciseLogs] = useState([
    { exerciseDefinition: { id: 1 }, sets: '', reps: '', weightLbs: '' }
  ]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleExerciseChange = (index, field, value) => {
    setExerciseLogs(prevLogs => prevLogs.map((log, idx) => {
      if (idx !== index) return log;
      if (field === 'exerciseDefId') {
        return {
          ...log,
          exerciseDefinition: { ...log.exerciseDefinition, id: parseInt(value) || 1 }
        };
      }
      return { ...log, [field]: value };
    }));
  };

  const addExerciseRow = () => {
    setExerciseLogs([
      ...exerciseLogs,
      { exerciseDefinition: { id: 1 }, sets: '', reps: '', weightLbs: '' }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    const sanitizedLogs = exerciseLogs.map(log => ({
      exerciseDefinition: { id: log.exerciseDefinition.id },
      sets: parseInt(log.sets) || 0,
      reps: parseInt(log.reps) || 0,
      weightLbs: parseFloat(log.weightLbs) || 0.0
    }));

    try {
      const response = await axios.post(`http://localhost:8080/api/users/${userId}/workouts`, {
        workoutDate: new Date().toLocaleDateString('en-CA'),
        exerciseLogs: sanitizedLogs,
        notes: notes.trim() || null 
      });

      if (response.status === 200 || response.status === 201) {
        setStatusMessage(`Workout logged successfully! Session ID: ${response.data.id}`);
        setExerciseLogs([{ exerciseDefinition: { id: 1 }, sets: '', reps: '', weightLbs: '' }]);
        setNotes(''); 
      }
    } catch (error) {
      console.error("Workout submission error:", error);
      setStatusMessage("Failed to log workout. Ensure User ID and Exercise IDs exist!");
    }
  };

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '30px' }}>
      <h3>Log a Workout Session</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
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

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Session Notes:</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="e.g., Focused on heavy triples, felt strong today."
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '60px', resize: 'vertical' }}
          />
        </div>

        <h4>Exercises Performed</h4>
        {exerciseLogs.map((log, index) => (
          <div key={`exercise-row-${index}`} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
            <select 
              value={log.exerciseDefinition.id}
              onChange={(e) => handleExerciseChange(index, 'exerciseDefId', e.target.value)}
              style={{ padding: '8px' }}
            >
              <option value="1">Bench Press (ID: 1)</option>
              <option value="2">Barbell Squat (ID: 2)</option>
              <option value="3">Deadlift (ID: 3)</option>
              <option value="4">Overhead Press (ID: 4)</option>
            </select>

            <input 
              type="number" 
              placeholder="Sets" 
              value={log.sets} 
              onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
              required
              style={{ width: '70px', padding: '8px' }}
            />

            <input 
              type="number" 
              placeholder="Reps" 
              value={log.reps} 
              onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
              required
              style={{ width: '70px', padding: '8px' }}
            />

            <input 
              type="number" 
              step="any"
              placeholder="Lbs" 
              value={log.weightLbs} 
              onChange={(e) => handleExerciseChange(index, 'weightLbs', e.target.value)}
              required
              style={{ width: '80px', padding: '8px' }}
            />
          </div>
        ))}

        <button type="button" onClick={addExerciseRow} style={{ padding: '6px 12px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px', marginRight: '10px' }}>
          + Add Exercise Row
        </button>

        <button type="submit" style={{ padding: '6px 12px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Save Full Workout
        </button>
      </form>

      {statusMessage && <p style={{ marginTop: '12px', fontSize: '14px' }}>{statusMessage}</p>}
    </div>
  );
}

export default WorkoutForm;
