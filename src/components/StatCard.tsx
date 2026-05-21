import React from 'react';
import type { LucideIcon } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, subtitle, color = 'var(--accent-primary)' }) => {
  return (
    <div className="glass-panel stat-card">
      <div className="stat-card-header">
        <div className="stat-icon-wrapper" style={{ backgroundColor: `${color}20`, color: color }}>
          <Icon size={24} />
        </div>
        <h3 className="stat-title">{title}</h3>
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};

export default StatCard;
