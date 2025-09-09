import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found in DOM - check if index.html has a div with id="root"');
  throw new Error('Root element not found in DOM');
}

// Error reporting
window.onerror = (msg, url, line, col, error) => {
  console.error('Global error:', { msg, url, line, col, error });
  return false;
};

// React error reporting
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
});

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
