
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart3, PieChart, Wallet, Settings, RefreshCw } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BarChart3, label: 'Market Analysis', path: '/market-analysis' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: RefreshCw, label: 'Rebalance', path: '/rebalance' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Menu</h2>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                onClick={onClose}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
