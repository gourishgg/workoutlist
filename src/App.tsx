import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import type { WorkoutEntry } from './types';
import './App.css';

function App() {
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>(() => {
    const saved = localStorage.getItem('workout-data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse workout data', e);
        return [];
      }
    }
    // Initial sample data if empty
    return [
      {
        id: '1',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        type: 'Running',
        duration: 45,
        calories: 420,
        avgHeartRate: 145,
        notes: 'Felt great!'
      },
      {
        id: '2',
        date: new Date(Date.now() - 86400000 * 1).toISOString(),
        type: 'Weightlifting',
        duration: 60,
        calories: 300,
        avgHeartRate: 110,
        notes: 'Upper body focus'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('workout-data', JSON.stringify(workouts));
  }, [workouts]);

  const handleAddWorkout = (newWorkout: Omit<WorkoutEntry, 'id'>) => {
    const workout: WorkoutEntry = {
      ...newWorkout,
      id: crypto.randomUUID()
    };
    setWorkouts(prev => [...prev, workout]);
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="app-container">
      <Dashboard 
        workouts={workouts} 
        onAddWorkout={handleAddWorkout} 
        onDeleteWorkout={handleDeleteWorkout} 
      />
    </div>
  );
}

export default App;
