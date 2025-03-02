// Import polyfills first
import './polyfills.js';  // Make sure the path is correct based on where you created the file

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChatbotProvider } from './context/ChatbotContext';
import { NearWalletProvider } from './context/NearWalletContext';

console.log("Hello from src/main.tsx");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NearWalletProvider>
      <ChatbotProvider>
        <App />
      </ChatbotProvider>
    </NearWalletProvider>
  </React.StrictMode>
);
