
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background animate-fade-in">
      {!isMobile && <Sidebar />}
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
        <footer className="p-4 text-center text-sm text-muted-foreground border-t">
          <p>DeFi Yield Optimizer Agent © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
