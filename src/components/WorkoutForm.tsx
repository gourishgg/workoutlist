import React, { useState } from 'react';
import type { WorkoutType, WorkoutEntry } from '../types';
import './WorkoutForm.css';

interface WorkoutFormProps {
  onAddWorkout: (workout: Omit<WorkoutEntry, 'id'>) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onAddWorkout }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<WorkoutType>('Running');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [avgHeartRate, setAvgHeartRate] = useState('');
  const [notes, setNotes] = useState('');
  const [intensity, setIntensity] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!duration || !calories) return;

    onAddWorkout({
      date,
      type,
      duration: Number(duration),
      calories: Number(calories),
      avgHeartRate: avgHeartRate ? Number(avgHeartRate) : 0,
      notes,
      intensity
    });

    // Reset form mostly
    setDuration('');
    setCalories('');
    setAvgHeartRate('');
    setNotes('');
  };

  const workoutTypes: WorkoutType[] = ['Running', 'Cycling', 'Weightlifting', 'Yoga', 'HIIT', 'Swimming', 'Other'];

  return (
    <div className="glass-panel form-container">
      <h3 className="form-title">Log New Workout</h3>
      <form onSubmit={handleSubmit} className="workout-form">
        <div className="form-group row">
          <div className="input-field">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="input-field">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as WorkoutType)}>
              {workoutTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <div className="input-field">
            <label>Duration (mins)</label>
            <input type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} required placeholder="e.g. 45" />
          </div>
          <div className="input-field">
            <label>Calories (kcal)</label>
            <input type="number" min="1" value={calories} onChange={(e) => setCalories(e.target.value)} required placeholder="e.g. 350" />
          </div>
          <div className="input-field">
            <label>Avg Heart Rate (bpm)</label>
            <input type="number" min="40" max="220" value={avgHeartRate} onChange={(e) => setAvgHeartRate(e.target.value)} placeholder="e.g. 140 (optional)" />
          </div>
        </div>

        <div className="form-group row">
          <div className="input-field">
            <label>Intensity</label>
            <div className="radio-group">
              {(['Low', 'Medium', 'High'] as const).map(level => (
                <label key={level} className="radio-label">
                  <input 
                    type="radio" 
                    name="intensity" 
                    value={level} 
                    checked={intensity === level} 
                    onChange={(e) => setIntensity(e.target.value as any)} 
                  />
                  <span className="radio-custom"></span>
                  {level}
                </label>
              ))}
            </div>
          </div>

          <div className="input-field">
            <label>Notes (optional)</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did it feel?" />
          </div>
        </div>

        <button type="submit" className="submit-btn">Save Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
