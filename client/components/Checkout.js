import Axios from 'axios';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const PAYMENT_SERVER_URL =
	process.env.NODE_ENV === 'production' ? 'http://hauntEz.herokuapp.com' : 'http://localhost:8080/checkout';

const CURRENCY = 'USD';
const fromDollarToCent = (amount) => amount * 100;
const successPayment = (data) => {
	alert('Payment Successful');
};

const errorPayment = (data) => {
	alert('Payment Error');
};

const onToken = (amount, description) => (token) =>
	Axios.post(TBD, {
		description,
		source: token.id,
		currency: CURRENCY,
		amount: fromDollarToCent(amount)
	})
		.then(successPayment)
		.catch(errorPayment);

const Checkout = ({ name, description, amount }) => {
	return (
		<StripeCheckout
			name={name}
			description={description}
			amount={fromDollarToCent(amount)}
			token={onToken(amount, description)}
			currency={CURRENCY}
			stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
		/>
	);
};

export default Checkout;
