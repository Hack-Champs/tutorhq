import React from 'react';
import ReactDOM from 'react-dom';

class InvoiceListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    }
  }

  componentDidMount() {
    // axios get all invoices
  }

  render() {
    return (
      <div>
        <h1>My Invoices</h1>
        <Table>
          
        </Table>
      </div>
    )
  }
}
