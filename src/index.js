import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestModeContextProvider } from './Context/TestModeContext'
import { ThemeContextProvider } from './Context/ThemeContext'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TestModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals