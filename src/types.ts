export type WorkoutType = 'Running' | 'Cycling' | 'Weightlifting' | 'Yoga' | 'HIIT' | 'Swimming' | 'Other';

export interface WorkoutEntry {
  id: string;
  date: string; // ISO date string
  type: WorkoutType;
  duration: number; // in minutes
  calories: number; // in kcal
  avgHeartRate: number; // in bpm
  notes?: string;
  intensity?: 'Low' | 'Medium' | 'High';
}

export interface DailyStat {
  date: string;
  totalDuration: number;
  totalCalories: number;
  avgHeartRate: number;
}
