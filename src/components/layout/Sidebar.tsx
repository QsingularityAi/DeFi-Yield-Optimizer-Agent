
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, PieChart, Wallet, Settings, RefreshCw } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BarChart3, label: 'Market Analysis', path: '/market-analysis' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: RefreshCw, label: 'Rebalance', path: '/rebalance' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <aside className="w-64 border-r bg-background hidden md:block">
      <div className="h-full flex flex-col py-4">
        <div className="px-4 py-2 mb-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">YO</span>
            <span className="font-display text-lg font-semibold tracking-tight">Yield Optimizer</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                    ${isActive(item.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-secondary'}
                  `}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="px-4 mt-auto">
          <div className="p-4 rounded-lg bg-secondary/50">
            <h4 className="font-medium mb-1 text-sm">Connected Account</h4>
            <p className="text-xs text-muted-foreground truncate">demo.testnet.near</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
