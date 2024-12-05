import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './utils/errorBoundary';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <LazyMotion features={domAnimation} strict>
          <AnimatePresence mode="wait">
            <App />
          </AnimatePresence>
        </LazyMotion>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
