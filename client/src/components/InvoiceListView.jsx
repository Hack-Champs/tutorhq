import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, Table } from 'semantic-ui-react';
import axios from 'axios';
import numeral from 'numeral';
import AOS from 'aos';

class InvoiceListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    }
    this.deleteInvoice = this.deleteInvoice.bind(this);
  }

  componentDidMount() {
    axios.get('/users/:username/invoices')
      .then(response => {
        this.setState({
          invoices: response.data
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteInvoice(e) {
    const invoiceID = e.target.id;
    axios.put(`/users/${this.props.tutor}/invoices/${invoiceID}`, {invoiceID: invoiceID})
      .then(response => {
        var activeInvoices = this.state.invoices.filter((invoice) => {
          return invoice._id !== invoiceID;
        });
        this.setState({
          invoices: activeInvoices
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const statusOptions = [ { value: 'Paid', text: 'Paid' }, { value: 'Unpaid', text: 'Unpaid' } ]
    return (
      <Container>
        <h1 className="profileHeader">My Invoices</h1>
        <Button as={Link} to='/createInvoice' color='green' replace>New Invoice</Button>
        <Table color={'black'} data-aos="fade-right">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
              <Table.HeaderCell>Student</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.state.invoices.map((invoice, i) =>
              <Table.Row key={ i }>
                <Table.Cell>{ invoice.dueDate }</Table.Cell>
                <Table.Cell>{ invoice.name }</Table.Cell>
                <Table.Cell>{ invoice.notes }</Table.Cell>
                <Table.Cell>{ numeral(invoice.total).format('$0,0.00') }</Table.Cell>
                <Table.Cell><Dropdown placeholder='Status' search selection options={statusOptions} /></Table.Cell>
                <Table.Cell>
                  <Button
                    id={invoice._id}
                    color='red'
                    onClick={this.deleteInvoice}
                  >
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default InvoiceListView;
