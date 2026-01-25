// ===== CHECKOUT.JS (SORSONE) =====

const RAZORPAY_KEY_ID = 'rzp_live_S7dLsK39ZbKgt2';
const BACKEND_URL = https://script.google.com/macros/s/AKfycbzFxOtW0-pZK9Vt80teJDlSrlrubXSj11QFtLkOQjpAJDhda_XkPpw1bL_INDjqkKXd9A/exec

let pricing = {
    1: { offer: 299 },
    2: { offer: 499 },
    3: { offer: 799 }
};

document.addEventListener('DOMContentLoaded', () => {
    updateCheckoutCart();
    document.getElementById('paymentButton')?.addEventListener('click', handlePayment);
});

function updateCheckoutCart() {
    const cart = JSON.parse(localStorage.getItem('sorsoneCart')) || [];
    if (cart.length === 0) {
        document.getElementById('checkoutContent').style.display = 'none';
        document.getElementById('emptyCart').style.display = 'block';
    }
}

function handlePayment() {
    const cart = JSON.parse(localStorage.getItem('sorsoneCart')) || [];
    if (cart.length === 0) return alert('Cart is empty');

    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
    const price = pricing[totalQty] || pricing[3];

    const options = {
        key: RAZORPAY_KEY_ID,
        amount: price.offer * 100,
        currency: 'INR',
        name: 'SORSONE',
        description: `Order for ${totalQty} T-Shirt(s)`,
        image: 'images/favicon.jpg',
        handler: (response) => paymentSuccess(response, cart, price),
        theme: { color: '#D32F2F' }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

function paymentSuccess(response, cart, price) {
    localStorage.removeItem('sorsoneCart');
    window.location.href =
        `Paymentsuccess.html?payment_id=${response.razorpay_payment_id}&amount=${price.offer}`;
}
