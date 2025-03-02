
import React from 'react';

interface ProtocolCardProps {
  name: string;
  apy: number;
  tvl: string;
  risk: 'Low' | 'Medium' | 'High';
  allocation?: number;
  logo?: string;
  dailyChange?: number;
  weeklyChange?: number;
  category?: string;
  volume?: string;
  userCount?: string;
  description?: string;
  onClick?: () => void;
}

const ProtocolCard = ({ 
  name, 
  apy, 
  tvl, 
  risk, 
  allocation = 0, 
  logo, 
  dailyChange, 
  weeklyChange, 
  category,
  volume,
  userCount,
  description,
  onClick 
}: ProtocolCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'High': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <div 
      className="p-4 rounded-xl bg-card border shadow-sm hover-lift cursor-pointer transition-all"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
          {logo ? (
            <img src={logo} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            name.substring(0, 2).toUpperCase()
          )}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskColor(risk)}`}>
              {risk} Risk
            </span>
            {category && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/80">
                {category}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{description}</p>
      )}
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">APY</p>
          <div className="flex items-center">
            <p className="font-semibold">{apy.toFixed(2)}%</p>
            {dailyChange !== undefined && (
              <span className={`ml-1 text-xs ${dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {dailyChange >= 0 ? '↑' : '↓'} {Math.abs(dailyChange).toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="text-muted-foreground">TVL</p>
          <p className="font-semibold">{tvl}</p>
        </div>
        
        {volume && (
          <div>
            <p className="text-muted-foreground">Volume</p>
            <p className="font-semibold">{volume}</p>
          </div>
        )}
        
        {userCount && (
          <div>
            <p className="text-muted-foreground">Users</p>
            <p className="font-semibold">{userCount}</p>
          </div>
        )}
        
        {allocation > 0 && (
          <div className="col-span-2 mt-2">
            <p className="text-muted-foreground text-xs mb-1">Your Allocation</p>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${allocation}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1">{allocation}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProtocolCard;
