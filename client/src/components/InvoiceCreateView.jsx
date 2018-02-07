import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Form, Icon, Input, Table, TextArea } from 'semantic-ui-react';
import numeral from 'numeral';

class InvoiceCreateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      rate: '',
      hours: '',
      amount: '',
      total: 0,
      lineItems: [],
      lineItemCount: 0
    };
    this.captureDescription = this.captureDescription.bind(this);
    this.captureRate = this.captureRate.bind(this);
    this.captureHours = this.captureHours.bind(this);
    this.addLineItem = this.addLineItem.bind(this);
    this.removeLineItem = this.removeLineItem.bind(this);
  }

  captureDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  captureRate(e) {
    this.setState({
      rate: e.target.value
    })
  }

  captureHours(e) {
    this.setState({
      hours: e.target.value
    })
  }

  addLineItem() {
    var newLineItem = {
      id: this.state.lineItemCount,
      description: this.state.description,
      rate: this.state.rate,
      hours: this.state.hours,
      amount: document.getElementById('lineItemAmount').value
    }
    this.setState({
      lineItems: [...this.state.lineItems, newLineItem],
      lineItemCount: this.state.lineItemCount += 1,
      description: '',
      rate: '',
      hours: '',
      total: this.state.total += this.state.rate * this.state.hours
    })
  }

  removeLineItem(e) {
    var newLineItems = this.state.lineItems.slice();
    newLineItems.splice(e.target.id, 1);
    this.setState({
      lineItems: newLineItems,
      lineItemCount: this.state.lineItemCount -= 1
    })
  }

  render() {
    return (
      <Container>
        <h1>New Invoice</h1>
        <Form>
          {/* Student Info Field */}
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Name'/>
            <Form.Field control={ Input } label='Email'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Address'/>
            <Form.Field control={ Input } label='City'/>
            <Form.Field control={ Input } label='State'/>
            <Form.Field control={ Input } label='Zip'/>
          </Form.Group>

          {/* Line Item Field */}
          <div className='invoiceDescription'>
            <Form.Group>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Rate ($/hr)</Table.HeaderCell>
                    <Table.HeaderCell>Hours</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  { this.state.lineItems.map((lineItem, i) =>
                    <Table.Row key={ i }>
                      <Table.Cell>{ lineItem.description }</Table.Cell>
                      <Table.Cell>{ lineItem.rate }</Table.Cell>
                      <Table.Cell>{ lineItem.hours }</Table.Cell>
                      <Table.Cell>{ lineItem.amount }</Table.Cell>
                      <Table.Cell>
                        <Button id={ lineItem.id } color='red' onClick={ this.removeLineItem }>
                          <Icon className='trashButton' name='trash outline' size='large' />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  )}
                  <Table.Row>
                    <Table.Cell>
                      <Form.Field
                        control={ Input }
                        value={ this.state.description }
                        placeholder='Enter line item'
                        onChange={ this.captureDescription } />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Field
                        control={ Input }
                        value={ this.state.rate }
                        placeholder='Enter rate'
                        onChange={ this.captureRate } />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Field
                        control={ Input }
                        value={ this.state.hours }
                        placeholder='Enter hours'
                        onChange={ this.captureHours } />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Field
                        id='lineItemAmount'
                        control={ Input }
                        placeholder='Total'
                        value={ numeral(this.state.rate * this.state.hours).format('$0,0.00') } />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color='green'
                        onClick={ this.addLineItem }>
                        <Icon id='addLineItemButton' name='add' size='large' />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Form.Group>
          </div>
        </Form>

        {/* Total Due Field*/}
        <Table id='totalDueTable' color='green' key='green'>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Total Due</Table.Cell>
              <Table.Cell>{ numeral(this.state.total).format('$0,0.00') }</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        {/* Additional Notes Field */}
        <Form>
          <Form.TextArea label='Notes' placeholder='Additional Notes' />
        </Form>

        {/* Form Submit / Cancel Field */}
        <div id='invoiceButtons'>
          <Button color='red'>Cancel</Button>
          <Button color='green'>Save</Button>
        </div>
      </Container>
    )
  }
}

export default InvoiceCreateView;
