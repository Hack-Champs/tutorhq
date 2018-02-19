import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  Icon,
  Input,
  Table,
  TextArea
} from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import numeral from 'numeral';
import axios from 'axios';

class InvoiceCreateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      dueDate: '',
      description: '',
      rate: '',
      hours: '',
      amount: '',
      total: 0,
      lineItems: [],
      lineItemCount: 0,
      notes: '',
    };
    this.captureName = this.captureName.bind(this);
    this.captureEmail = this.captureEmail.bind(this);
    this.captureAddress = this.captureAddress.bind(this);
    this.captureCity = this.captureCity.bind(this);
    this.captureState = this.captureState.bind(this);
    this.captureZip = this.captureZip.bind(this);
    this.captureDescription = this.captureDescription.bind(this);
    this.captureRate = this.captureRate.bind(this);
    this.captureHours = this.captureHours.bind(this);
    this.captureNotes = this.captureNotes.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.addLineItem = this.addLineItem.bind(this);
    this.removeLineItem = this.removeLineItem.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
    this.cancelInvoice = this.cancelInvoice.bind(this);
  }

  captureName(e) {
    this.setState({ name: e.target.value });
  }

  captureEmail(e) {
    this.setState({ email: e.target.value });
  }

  captureAddress(e) {
    this.setState({ address: e.target.value });
  }

  captureCity(e) {
    this.setState({ city: e.target.value });
  }

  captureState(e) {
    this.setState({ state: e.target.value });
  }

  captureZip(e) {
    this.setState({ zip: e.target.value });
  }

  captureDescription(e) {
    this.setState({ description: e.target.value });
  }

  captureRate(e) {
    this.setState({ rate: e.target.value });
  }

  captureHours(e) {
    this.setState({ hours: e.target.value });
  }

  captureNotes(e) {
    this.setState({ notes: e.target.value });
  }

  handleDayChange(day) {
    this.setState({ dueDate: day });
  }

  addLineItem() {
    var newLineItem = {
      id: this.state.lineItemCount,
      description: this.state.description,
      rate: this.state.rate,
      hours: this.state.hours,
      amount: document.getElementById('lineItemAmount').value,
    };
    this.setState({
      lineItems: [...this.state.lineItems, newLineItem],
      lineItemCount: (this.state.lineItemCount += 1),
      description: '',
      rate: '',
      hours: '',
      total: (this.state.total += this.state.rate * this.state.hours),
    });
  }

  removeLineItem(e) {
    var newLineItems = this.state.lineItems.slice();
    newLineItems.splice(e.target.id, 1);
    this.setState({
      lineItems: newLineItems,
      lineItemCount: (this.state.lineItemCount -= 1),
    });
  }

  saveInvoice() {
    var newInvoice = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      dueDate: this.state.dueDate.toLocaleDateString(),
      notes: this.state.notes,
      lineItems: this.state.lineItems,
      total: this.state.total,
    };
    axios.post('/users/:username/invoices', newInvoice);
  }

  cancelInvoice() {}

  render() {
    return (
      <Container>
        <h1>New Invoice</h1>
        <Form>
          {/* Student Info Field */}
          <Form.Group widths="equal">
            <Form.Field>
              <label>Due Date</label>
              <DayPickerInput onDayChange={this.handleDayChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Name"
              onChange={this.captureName}
            />
            <Form.Field
              control={Input}
              label="Email"
              onChange={this.captureEmail}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Address"
              onChange={this.captureAddress}
            />
            <Form.Field
              control={Input}
              label="City"
              onChange={this.captureCity}
            />
            <Form.Field
              control={Input}
              label="State"
              onChange={this.captureState}
            />
            <Form.Field
              control={Input}
              label="Zip"
              onChange={this.captureZip}
            />
          </Form.Group>

          {/* Line Item Field */}
          <div className="invoiceDescription">
            <Form.Group>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Rate ($/hr)</Table.HeaderCell>
                    <Table.HeaderCell>Hours</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.lineItems.map((lineItem, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>{lineItem.description}</Table.Cell>
                      <Table.Cell>{lineItem.rate}</Table.Cell>
                      <Table.Cell>{lineItem.hours}</Table.Cell>
                      <Table.Cell>{lineItem.amount}</Table.Cell>
                      <Table.Cell>
                        <Button
                          id={lineItem.id}
                          color="red"
                          onClick={this.removeLineItem}
                        >
                          <Icon
                            className="trashButton"
                            name="trash outline"
                            size="large"
                          />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field
                        control={Input}
                        value={this.state.description}
                        placeholder="Enter line item"
                        onChange={this.captureDescription}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Field
                        control={Input}
                        value={this.state.rate}
                        placeholder="Enter rate"
                        onChange={this.captureRate}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Field
                        control={Input}
                        value={this.state.hours}
                        placeholder="Enter hours"
                        onChange={this.captureHours}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Field
                        id="lineItemAmount"
                        control={Input}
                        placeholder="Total"
                        value={numeral(
                          this.state.rate * this.state.hours
                        ).format('$0,0.00')}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button color="green" onClick={this.addLineItem}>
                        <Icon id="addLineItemButton" name="add" size="large" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Form.Group>
          </div>
        </Form>

        {/* Total Due Field*/}
        <Table id="totalDueTable" color="green" key="green">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Total Due</Table.Cell>
              <Table.Cell>
                {numeral(this.state.total).format('$0,0.00')}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        {/* Additional Notes Field */}
        <Form>
          <Form.TextArea
            label="Notes"
            placeholder="Additional Notes"
            onChange={this.captureNotes}
          />
        </Form>

        {/* Form Submit / Cancel Field */}
        <div id="invoiceButtons">
          <Button color="red" as={Link} to="/invoiceList">
            Cancel
          </Button>
          <Button
            color="green"
            onClick={this.saveInvoice}
            as={Link}
            to="/invoiceList"
          >
            Save
          </Button>
        </div>
      </Container>
    );
  }
}

export default InvoiceCreateView;
