import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(rootElement).render(<App />);
