import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DailyStat } from '../types';
import './WorkoutChart.css';

interface WorkoutChartProps {
  data: DailyStat[];
}

const WorkoutChart: React.FC<WorkoutChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="glass-panel chart-container empty-chart">
        <p>No workout data available yet. Start sweating!</p>
      </div>
    );
  }

  return (
    <div className="glass-panel chart-container">
      <h3 className="chart-title">Activity Trends</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickLine={false} axisLine={false} dy={10} />
            <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickLine={false} axisLine={false} dx={-10} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} tickLine={false} axisLine={false} dx={10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 17, 26, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Area yAxisId="left" type="monotone" dataKey="totalCalories" name="Calories (kcal)" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorCalories)" />
            <Area yAxisId="right" type="monotone" dataKey="totalDuration" name="Duration (min)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDuration)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutChart;
