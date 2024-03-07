import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fortawesome/fontawesome-free/css/all.css";
import { Provider as ReduxProvider } from "react-redux";
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import store from "./Store/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <FluentProvider theme={teamsLightTheme}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </FluentProvider>,
)