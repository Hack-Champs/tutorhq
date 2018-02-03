import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

const TutorsViewEntry = ({ tutor }) => (
  <Item as={Link} to={`/tutors/${tutor.username}`} replace>
    <Item.Content header={tutor.name} meta={tutor.subjects.join(', ')} description={tutor.description} />
  </Item>
);

export default TutorsViewEntry;

