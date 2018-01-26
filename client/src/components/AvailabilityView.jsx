import React from 'react';
import ReactDOM from 'react-dom';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);
    this.dateClick = this.dateClick.bind(this);
    this.state = {
      dateSelected: undefined,
    };
  }

  dateClick(day) {
    this.setState({ dateSelected: day })
  }

  render () {
    return (
      <div>
        <DayPicker onDayClick= { this.dateClick} />
        { this.state.dateSelected ? (
          <p>You picked { this.state.dateSelected.toLocaleDateString()}</p>
        ) : (
          <p>Choose a date</p>
        )}
        <DayPickerInput />
      </div>
    );
  }
}

export default AvailabilityView;
