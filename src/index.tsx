import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);

root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);

reportWebVitals();
