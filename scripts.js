// Function to toggle the menu for mobile devices
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Function for searching products
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value;
    // You can add logic to filter products dynamically (e.g., via an API or client-side search).
    alert('Searching for: ' + searchTerm); // Placeholder for now
}

// Function to add a product to the cart
function addToCart(productName) {
    alert(productName + ' has been added to your cart.');
}

// Function to add a product to the wishlist
function addToWishlist(productName) {
    alert(productName + ' has been added to your wishlist.');
}

// Function to update order status (for order tracking)
document.getElementById('order-tracking-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const orderNumber = document.getElementById('order-number').value;
    const orderStatusElement = document.getElementById('order-status');

    // Simulate a request to check order status
    if (orderNumber === '1234') {
        orderStatusElement.textContent = 'Your order is on the way!';
    } else {
        orderStatusElement.textContent = 'Order not found. Please check the order number.';
    }
});

// Function to handle profile form submission (user updates)
document.getElementById('profile-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const email = document.getElementById('profile-email').value;
    const password = document.getElementById('password').value;

    alert('Profile updated for ' + username + '\nEmail: ' + email);
    // Additional logic to update the user profile can be added here (e.g., via API).
});

// Function to handle review form submission
document.getElementById('review-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;

    alert('Review submitted by ' + name + ' with rating ' + rating + '\n' + 'Review: ' + review);
    // You can send this data to a server here.
});
