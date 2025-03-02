
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from './MobileMenu';
import WalletConnection from '@/components/wallet/WalletConnection';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-sm bg-background/80 transition-all duration-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {isMobile && (
          <button 
            onClick={toggleMobileMenu}
            className="p-2 -ml-2 rounded-full text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">YO</span>
            <span className="font-display text-lg font-semibold tracking-tight">Yield Optimizer</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <WalletConnection />
          <button className="p-2 rounded-full text-foreground hover:bg-secondary transition-colors" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <Link to="/settings" className="p-2 rounded-full text-foreground hover:bg-secondary transition-colors">
            <Settings size={20} />
          </Link>
        </div>
      </div>
      
      {isMobile && <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Navbar;
