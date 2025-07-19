import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './Redux/Store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToAnchor from './Components/Common/ScrollToAchor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <Provider store={store} stabilityCheck="never">
      <BrowserRouter>
      <ScrollToAnchor />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
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
