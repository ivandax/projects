import React from 'react';
import {BrowserRouter as Router,
  Switch, Route} from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Details from './pages/Details';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/movie/:id" component={Details}></Route>
          <Route path="/Favorites"><Favorites /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
