import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './Redux/Store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <Provider store={configureStore()} stabilityCheck="never">
      <BrowserRouter>
      <GoogleOAuthProvider clientId="1092580957784-r82al86ukm4g1skc9kvcno8gdvaiinek.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider> 
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
