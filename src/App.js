import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/HomePage';

const HatsPage = () => {
  return (
    <div>
      <h1>Hats Page</h1>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/hats' component={HatsPage} />
    </BrowserRouter>
  );
}

export default App;
