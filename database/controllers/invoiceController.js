const db = require('../models/index');

const saveInvoice = (newInvoice, callback) => {
  console.log('save invoice has been called');
  const invoice = new db.Invoice({
    name: newInvoice.name,
    email: newInvoice.email,
    address: newInvoice.address,
    city: newInvoice.city,
    state: newInvoice.state,
    zip: newInvoice.zip,
    dueDate: newInvoice.dueDate,
    notes: newInvoice.notes,
    lineItems: newInvoice.lineItems,
    total: newInvoice.total,
  });
  invoice.save(newInvoice, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
};

const getInvoices = (callback) => {
  console.log('get invoices has been called');
  db.Invoice.find({ deleted: false }, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports.saveInvoice = saveInvoice;
module.exports.getInvoices = getInvoices;
