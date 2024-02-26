import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.css";
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import { Provider as ReduxProvider } from "react-redux";
import store from "./Store/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider theme={teamsTheme}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </Provider>,
)