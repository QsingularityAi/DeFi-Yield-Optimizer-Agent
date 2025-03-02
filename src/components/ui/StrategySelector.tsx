
import React from 'react';
import { Shield, Dumbbell, Zap } from 'lucide-react';

interface StrategySelectorProps {
  selected: 'conservative' | 'balanced' | 'aggressive';
  onChange: (strategy: 'conservative' | 'balanced' | 'aggressive') => void;
}

const StrategySelector = ({ selected, onChange }: StrategySelectorProps) => {
  const strategies = [
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Lower returns with minimal risk exposure',
      icon: Shield,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Moderate returns with controlled risk',
      icon: Dumbbell,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: 'Higher returns with increased risk tolerance',
      icon: Zap,
      color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {strategies.map((strategy) => {
        const isSelected = selected === strategy.id;
        
        return (
          <div
            key={strategy.id}
            className={`
              p-4 rounded-xl cursor-pointer transition-all duration-200
              ${isSelected 
                ? `border-2 ${strategy.border} shadow-sm` 
                : 'border border-border hover:border-muted'}
            `}
            onClick={() => onChange(strategy.id as any)}
          >
            <div className={`p-2 rounded-full w-fit ${strategy.color} mb-3`}>
              <strategy.icon size={18} />
            </div>
            <h3 className="font-medium">{strategy.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StrategySelector;
