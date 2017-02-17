/**
 * Import dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Import application root container
 */
import App from './components/App';

/**
 * Import and apply global styles
 */
import './index.css';

/**
 * Render app into the DOM
 */
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
