import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Table, TextArea } from 'semantic-ui-react';

class InvoiceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>New Invoice</h1>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Student Name'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field control={ Input } label='Address'/>
            <Form.Field control={ Input } label='City'/>
            <Form.Field control={ Input } label='State'/>
            <Form.Field control={ Input } label='Zip'/>
          </Form.Group>
          <div className="invoiceDescription">
            <Form.Field control={ TextArea } label='Description'/>
          </div>
        </Form>
      </div>
    )
  }
}

export default InvoiceView;
