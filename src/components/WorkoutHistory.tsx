import React from 'react';
import type { WorkoutEntry } from '../types';
import { Trash2 } from 'lucide-react';
import './WorkoutHistory.css';

interface WorkoutHistoryProps {
  workouts: WorkoutEntry[];
  onDeleteWorkout: (id: string) => void;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts, onDeleteWorkout }) => {
  return (
    <div className="glass-panel history-container">
      <h3 className="history-title">Recent Workouts</h3>
      
      {workouts.length === 0 ? (
        <p className="empty-history">No workouts logged yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Avg HR</th>
                <th>Intensity</th>
                <th>Notes</th>
                <th className="actions-cell"></th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(workout => (
                <tr key={workout.id}>
                  <td>{new Date(workout.date).toLocaleDateString()}</td>
                  <td>
                    <span className="type-badge" data-type={workout.type}>
                      {workout.type}
                    </span>
                  </td>
                  <td>{workout.duration} min</td>
                  <td>{workout.calories} kcal</td>
                  <td>{workout.avgHeartRate ? `${workout.avgHeartRate} bpm` : '-'}</td>
                  <td>
                    {workout.intensity ? (
                      <span className={`intensity-badge ${workout.intensity.toLowerCase()}`}>
                        {workout.intensity}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="notes-cell">{workout.notes || '-'}</td>
                  <td className="actions-cell">
                    <button 
                      className="delete-btn" 
                      onClick={() => onDeleteWorkout(workout.id)}
                      title="Delete workout"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
