import React from 'react';
import ReactDOM from 'react-dom';
import TutorsViewEntry from './TutorsViewEntry.jsx';
import { Container, Header, Item } from 'semantic-ui-react';
import axios from 'axios';

class TutorsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutors: [],
    };
  }

  componentWillMount() {
    axios.get('/tutors')
      .then((response) => {
        this.setState({
          tutors: response.data,
        });
      })
      .catch((error) => {
        console.error('GET request error: ', error);
      });
  }

  render () {
    return (
      <div>
        <Container>
          <h1 className="viewHeader">Tutors</h1>
          <Item.Group divided>
            {this.state.tutors.map((tutor, i) =>
              <TutorsViewEntry key={i} tutor={this.state.tutors[i]} />
            )}
          </Item.Group>
        </Container>
      </div>
    );
  }
}

export default TutorsView;
