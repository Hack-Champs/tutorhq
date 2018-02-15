import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Grid } from 'semantic-ui-react';
import StudentTableViewEntry from './StudentTableViewEntry.jsx';

class StudentTableView extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    let sessionInfo;
    if (this.props.booking[this.props.student]) {
      sessionInfo = (
        <div>{this.props.booking[this.props.student].sessions.map((session, i) => (
          <StudentTableViewEntry
            session={session}
            student={this.props.student}
            booking={this.props.booking}
            key={i}
          />
        ))}
        </div>
      );
    } else {
      sessionInfo = (
        <Grid.Row>
          <Grid.Column width={12}>
          </Grid.Column>
        </Grid.Row>
      );
    }
    return (
      <Grid columns={1} celled='internally'>
        {sessionInfo}
      </Grid>
    );
  }
}

export default StudentTableView;
