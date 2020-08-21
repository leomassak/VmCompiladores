import React from 'react';

import { HashRouter as Router, Route } from 'react-router-dom';

import WelcomeScreen from './screens/WelcomeScreen';
import TesteScreen from './screens/RoutesTestScreen';

function Routes() {
  return (
    <Router basename="/">
      <Route exact path="/" component={WelcomeScreen} />
      <Route exact path="/teste" component={TesteScreen} />
    </Router>
  );
}

export default Routes;
