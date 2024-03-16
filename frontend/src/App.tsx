import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import Router from './router/router';

function App() {

  const Routers=useRoutes(Router);
  return (
    <div className="App">
      {Routers}
    </div>
  );
}

export default App;
