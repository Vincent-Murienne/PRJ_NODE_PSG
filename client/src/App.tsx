import './App.css'

import React from 'react';

import Router from './service/router';
import { RouterProvider } from 'react-router-dom';

const App: React.FC = () => {
  return <RouterProvider router={ new Router().getRouter() } />
};

export default App;
