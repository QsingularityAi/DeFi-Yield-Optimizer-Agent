
import React, { useState, useEffect } from 'react';
import { Save, Shield, Dumbbell, Zap } from 'lucide-react';
import StrategySelector from '@/components/ui/StrategySelector';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [strategy, setStrategy] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');
  const [minimumAPY, setMinimumAPY] = useState(4);
  const [rebalanceThreshold, setRebalanceThreshold] = useState(10);
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [notifications, setNotifications] = useState(true);
  
  useEffect(() => {
    // Simulate API loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] animate-fade-in">
        <div className="text-center">
          <div className="loading-dots mx-auto">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your yield optimizer agent</p>
        </div>
        
        <button 
          onClick={handleSave}
          className={`
            py-2 px-4 rounded-lg flex items-center
            ${saving 
              ? 'bg-secondary text-muted-foreground cursor-not-allowed' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90'}
            transition-colors
          `}
          disabled={saving}
        >
          {saving ? (
            <>
              <div className="loading-dots mr-2">
                <div></div>
                <div></div>
                <div></div>
              </div>
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>
      
      {saveSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg border border-green-200 dark:border-green-800 animate-fade-in">
          Settings successfully saved!
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Strategy Settings</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Risk Profile</h3>
              <StrategySelector selected={strategy} onChange={setStrategy} />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Optimization Parameters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Minimum APY Threshold (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={minimumAPY}
                    onChange={(e) => setMinimumAPY(parseFloat(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">0%</span>
                    <span className="text-sm font-medium">{minimumAPY}%</span>
                    <span className="text-xs text-muted-foreground">20%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Protocols with APY below this threshold will not be considered for allocation.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rebalance Threshold (%)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={rebalanceThreshold}
                    onChange={(e) => setRebalanceThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">1%</span>
                    <span className="text-sm font-medium">{rebalanceThreshold}%</span>
                    <span className="text-xs text-muted-foreground">25%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    The agent will suggest a rebalance when allocation drifts by this percentage.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Automation Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-Rebalance</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Automatically rebalance portfolio when threshold is reached
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={autoRebalance}
                      onChange={() => setAutoRebalance(!autoRebalance)}
                    />
                    <div className={`
                      w-11 h-6 rounded-full peer 
                      ${autoRebalance ? 'bg-primary' : 'bg-muted'} 
                      peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                      after:bg-white after:border-gray-300 after:border after:rounded-full
                      after:h-5 after:w-5 after:transition-all
                      ${autoRebalance ? 'after:translate-x-5' : ''}
                    `}></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Receive notifications for important events and actions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications}
                      onChange={() => setNotifications(!notifications)}
                    />
                    <div className={`
                      w-11 h-6 rounded-full peer 
                      ${notifications ? 'bg-primary' : 'bg-muted'} 
                      peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/30
                      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                      after:bg-white after:border-gray-300 after:border after:rounded-full
                      after:h-5 after:w-5 after:transition-all
                      ${notifications ? 'after:translate-x-5' : ''}
                    `}></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
