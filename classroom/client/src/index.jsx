import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Workspace from './components/Workspace.jsx';
import Dashboard from './components/Dashboard.jsx';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/room/:id" component={Workspace} />
    </Switch>
  </Router>,
  document.querySelector('#app'));