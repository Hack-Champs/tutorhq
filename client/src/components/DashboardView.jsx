import React from 'react';
import ReactDOM from 'react-dom';

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render () {
    return (
      <div>
        <AvailabilityView />
      </div>
    )
  }
}

export default DashboardView;
