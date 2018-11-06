const configureStripe = require('stripe');
const stripe = configureStripe(process.env.STRIPE_SECRET_KEY);
const router = require('express').Router();

const postStripeCharge = (res) => (stripeErr, stripeRes) => {
	if (stripeRes) {
		res.status(200).send({ success: stripeRes, response: res.body });
	} else {
		console.log('what is Res', stripeRes, 'error', stripeErr);
		res.status(500).send({ error: stripeErr });
	}
};

router.get('/', (req, res, next) => {
	res.send({ message: 'Hello server!', timestamp: new Date().toISOString() });
});

router.post('/', (req, res, next) => {
	stripe.charges.create(req.body, postStripeCharge(res));
});

module.exports = router;
