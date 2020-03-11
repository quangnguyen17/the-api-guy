import React from 'react';
import { Router } from '@reach/router';
// Components
import Main from './components/Main';
import { NavBar, ComingSoon } from './components/Components';
// CSS, Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Main path="/" />
        <Main path="/get-started" />
        <ComingSoon path="/coming-soon/:page" />
      </Router>
    </div>
  );
}

export default App;