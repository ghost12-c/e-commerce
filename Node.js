const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QRE0vHDdVbopsxsBopa0R0Vt7Zy2z1pqqFEmrHW0PyxYVZKw28HxW8lfgzuNsIi6a0jSzfpPxDYhMIyPwHKMp0R00lYFxwvRp'); // Replace with your Stripe secret key

const app = express();
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const { product, price } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product,
                        },
                        unit_amount: Math.round(price * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://yourdomain.com/success.html',
            cancel_url: 'http://yourdomain.com/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
