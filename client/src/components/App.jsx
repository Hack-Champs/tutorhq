import React from 'react';
import ReactDOM from 'react-dom';
import DashboardView from './DashboardView.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render () {
    return (
      <div>
        <DashboardView />
      </div>
    )
  }
}

export default App;
