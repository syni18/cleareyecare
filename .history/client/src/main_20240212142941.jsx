import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from '../store/store.js'
import pkgstore from '../src/store/pkgstore.js';
import {Provider} from 'react-redux';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={pkgstore}>
      <App />
    </Provider>
  </React.StrictMode>
);
