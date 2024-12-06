const express = require('express');
const path = require('path');
const stripe = require('stripe')('sk_test_51QRE0vHDdVbopsxsBopa0R0Vt7Zy2z1pqqFEmrHW0PyxYVZKw28HxW8lfgzuNsIi6a0jSzfpPxDYhMIyPwHKMp0R00lYFxwvRp');  // Stripe Secret Key
const bodyParser = require('body-parser');

const app = express();
const port = 4242;

// Serve static files from the public folder
app.use(express.static('public'));  
app.use(bodyParser.json());

// Serve the main page (fashion.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'fashion.html'));
});

// Create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Fashion Item 1',
                        },
                        unit_amount: 2000,  // Amount in cents (e.g., $20.00)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:${port}/success`,
            cancel_url: `http://localhost:${port}/cancel`,
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for the success page (after successful payment)
app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

// Route for the cancel page (if payment is canceled)
app.get('/cancel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cancel.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
