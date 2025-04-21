
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { LearnProgressProvider } from './hooks/useLearnProgress';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LearnProgressProvider>
      <App />
    </LearnProgressProvider>
  </React.StrictMode>,
);
