import React, { useEffect, useState } from 'react';
import './SparksBackground.css';

interface Spark {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const SparksBackground: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const colors = ['#f59e0b', '#fbbf24', '#f87171', '#60a5fa']; // Amber, Yellow, Light Red, Light Blue
    
    const newSparks = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 4 + Math.random() * 6,
      size: 1 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setSparks(newSparks);
  }, []);

  return (
    <div className="sparks-container">
      {sparks.map(spark => (
        <div 
          key={spark.id} 
          className="spark" 
          style={{
            left: `${spark.left}%`,
            animationDelay: `${spark.delay}s`,
            animationDuration: `${spark.duration}s`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            boxShadow: `0 0 ${spark.size * 3}px ${spark.size}px ${spark.color}80`
          }} 
        />
      ))}
    </div>
  );
};

export default SparksBackground;
