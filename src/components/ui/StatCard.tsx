
import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive?: boolean;
  };
  icon?: ReactNode;
  className?: string;
}

const StatCard = ({ title, value, change, icon, className }: StatCardProps) => {
  return (
    <div className={`p-5 rounded-xl bg-card border shadow-sm hover-lift ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {change && (
            <p className={`text-xs mt-1 flex items-center ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
              <span className="mr-1">{change.positive ? '↑' : '↓'}</span>
              {change.value}
            </p>
          )}
        </div>
        
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
