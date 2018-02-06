var InputField = React.createClass({
  render: function() {
    return (
      <div className="field">
        <label>{this.props.label}</label>
        <input type="text" placeholder={this.props.placeholder} />
      </div>
    )
  }
});

var PaymentForm = React.createClass({
  render: function() {
    return (
      <form>
        <ul className="card-list">
          <li className="card visa"></li>
          <li className="card mastercard"></li>
          <li className="card amex"></li>
        </ul>
        <InputField label="Name on Card" />
        <InputField label="Card number" />
        <InputField label="Expiry Date" placeholder="MM / YY" />
        <InputField label="Security code" />
        <button>Pay $400.00</button>
      </form>
    )
  }
})

ReactDOM.render(
  <PaymentForm />,
  document.getElementById('page')
);

// https://codepen.io/pandaduc/pen/zGawdY
