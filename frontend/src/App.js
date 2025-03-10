import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/reservation" component={Reservation} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;