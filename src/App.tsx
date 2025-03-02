
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import MarketAnalysis from "./pages/MarketAnalysis";
import Portfolio from "./pages/Portfolio";
import Rebalance from "./pages/Rebalance";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ChatbotButton from "./components/chatbot/ChatbotButton";
import { ChatbotProvider } from "./context/ChatbotContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ChatbotProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/market-analysis" element={<MainLayout><MarketAnalysis /></MainLayout>} />
            <Route path="/portfolio" element={<MainLayout><Portfolio /></MainLayout>} />
            <Route path="/rebalance" element={<MainLayout><Rebalance /></MainLayout>} />
            <Route path="/wallet" element={<MainLayout><Wallet /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotButton />
        </BrowserRouter>
      </ChatbotProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
