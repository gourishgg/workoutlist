import React, { useMemo } from 'react';
import type { WorkoutEntry, DailyStat } from '../types';
import StatCard from './StatCard';
import WorkoutChart from './WorkoutChart';
import WorkoutForm from './WorkoutForm';
import WorkoutHistory from './WorkoutHistory';
import { Flame, Clock, Activity, Target } from 'lucide-react';
import './Dashboard.css';

interface DashboardProps {
  workouts: WorkoutEntry[];
  onAddWorkout: (workout: Omit<WorkoutEntry, 'id'>) => void;
  onDeleteWorkout: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ workouts, onAddWorkout, onDeleteWorkout }) => {
  // Compute top level stats
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  
  const workoutsWithHR = workouts.filter(w => w.avgHeartRate > 0);
  const avgHR = workoutsWithHR.length > 0 
    ? Math.round(workoutsWithHR.reduce((sum, w) => sum + w.avgHeartRate, 0) / workoutsWithHR.length) 
    : 0;

  // Process data for the chart (aggregate by date)
  const chartData = useMemo(() => {
    const dailyMap = new Map<string, DailyStat>();
    
    // Sort workouts by date ascending
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    sortedWorkouts.forEach(w => {
      const existing = dailyMap.get(w.date);
      if (existing) {
        existing.totalDuration += w.duration;
        existing.totalCalories += w.calories;
        // Simple average for HR if present in multiple workouts on same day
        if (w.avgHeartRate) {
          existing.avgHeartRate = existing.avgHeartRate === 0 
            ? w.avgHeartRate 
            : Math.round((existing.avgHeartRate + w.avgHeartRate) / 2);
        }
      } else {
        dailyMap.set(w.date, {
          date: new Date(w.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          totalDuration: w.duration,
          totalCalories: w.calories,
          avgHeartRate: w.avgHeartRate || 0,
        });
      }
    });

    return Array.from(dailyMap.values());
  }, [workouts]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="text-gradient">Daily Workout Analyzer</h1>
        <p>Track your fitness journey with professional insights.</p>
      </header>

      <div className="stats-grid">
        <StatCard 
          title="Total Workouts" 
          value={totalWorkouts} 
          icon={Target} 
          color="#3b82f6" 
        />
        <StatCard 
          title="Total Calories" 
          value={totalCalories.toLocaleString()} 
          subtitle="kcal burned"
          icon={Flame} 
          color="#ef4444" 
        />
        <StatCard 
          title="Total Active Time" 
          value={totalDuration.toLocaleString()} 
          subtitle="minutes"
          icon={Clock} 
          color="#10b981" 
        />
        <StatCard 
          title="Avg Heart Rate" 
          value={avgHR > 0 ? `${avgHR} bpm` : '-'} 
          icon={Activity} 
          color="#8b5cf6" 
        />
      </div>

      <div className="dashboard-content">
        <div className="main-col">
          <WorkoutChart data={chartData} />
          <WorkoutHistory workouts={[...workouts].reverse()} onDeleteWorkout={onDeleteWorkout} />
        </div>
        <div className="side-col">
          <WorkoutForm onAddWorkout={onAddWorkout} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
