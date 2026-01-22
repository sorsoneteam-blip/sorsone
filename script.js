// ===== SORSONE - JavaScript for Oversized T-Shirts =====

// Product Data - Updated with new pricing ₹299 (77% OFF from ₹1299)
const products = [
    { 
        id: 1, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'black', 
        colorName: 'Black', 
        description: 'Classic & Timeless',
        image: 'images/black-front.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
        id: 2, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'cool-blue', 
        colorName: 'Cool Blue', 
        description: 'Fresh & Vibrant',
        image: 'images/cool-blue.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
        id: 3, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'lavender', 
        colorName: 'Lavender', 
        description: 'Soft & Elegant',
        image: 'images/lavender.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
        id: 4, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'navy-blue', 
        colorName: 'Navy Blue', 
        description: 'Deep & Sophisticated',
        image: 'images/navy-blue.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
        id: 5, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'old-olive', 
        colorName: 'Old Olive', 
        description: 'Earthy & Natural',
        image: 'images/old-olive.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
        id: 6, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'rocky-maroon', 
        colorName: 'Rocky Maroon', 
        description: 'Rich & Bold',
        image: 'images/maroon.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
        id: 7, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'rose-wood', 
        colorName: 'Rose Wood', 
        description: 'Warm & Refined',
        image: 'images/rose-wood.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
        id: 8, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'steel-grey', 
        colorName: 'Steel Grey', 
        description: 'Modern & Versatile',
        image: 'images/steel-grey.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    },
    { 
        id: 9, 
        name: 'Premium Oversized T-Shirt', 
        price: 299,
        originalPrice: 1299,
        discount: 77,
        color: 'white', 
        colorName: 'White', 
        description: 'Pure & Clean',
        image: 'images/white-front.jpg', 
        sizes: ['S', 'M', 'L', 'XL', 'XXL'] 
    }
];

// Shopping Cart
let cart = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadCartFromStorage();
    updateCartCount();
});

function initializeWebsite() {
    // Load products if on homepage
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        loadProducts();
    }
    
    // Setup navigation
    setupNavigation();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Setup scroll animations
    setupScrollAnimations();
}

// ===== PRODUCT FUNCTIONS =====

function loadProducts(filter = 'all') {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.color === filter);
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 3rem;">No products found in this color.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.color = product.color;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.colorName} T-Shirt" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <i class="fas fa-tshirt product-placeholder" style="display: none;"></i>
        </div>
        <div class="product-info">
            <div class="product-color-label">${product.colorName}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-specs">100% Premium Cotton | Oversized Fit | GSM 220</p>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                    <span class="offer-price">₹${product.price}</span>
                    <span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                </div>
                <span class="discount-badge">🔥 ${product.discount}% OFF</span>
            </div>
            <div class="size-options">
                ${product.sizes.map(size => `
                    <button class="size-btn" data-size="${size}">${size}</button>
                `).join('')}
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-bag"></i> Add to Cart
            </button>
        </div>
    `;
    
    // Setup size selection
    const sizeButtons = card.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            sizeButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Select M size by default
    const defaultSize = card.querySelector('.size-btn[data-size="M"]');
    if (defaultSize) defaultSize.classList.add('selected');
    
    return card;
}

function filterProducts(color) {
    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.toLowerCase().replace(/ /g, '-').replace('all-colors', 'all');
        if (btnText === color) {
            btn.classList.add('active');
        }
    });
    
    // Load filtered products
    loadProducts(color);
    
    // Smooth scroll to products
    const productSection = document.getElementById('products');
    if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Find the product card to get selected size
    const productCards = document.querySelectorAll('.product-card');
    let selectedSize = 'M'; // default
    
    productCards.forEach(card => {
        const addBtn = card.querySelector('.add-to-cart-btn');
        if (addBtn && addBtn.getAttribute('onclick').includes(productId.toString())) {
            const selectedSizeBtn = card.querySelector('.size-btn.selected');
            if (selectedSizeBtn) {
                selectedSize = selectedSizeBtn.dataset.size;
            }
        }
    });
    
    // Check if item already in cart
    const existingItem = cart.find(item => item.id === productId && item.size === selectedSize);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            colorName: product.colorName,
            price: product.price,
            originalPrice: product.originalPrice,
            size: selectedSize,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartCount();
    showAddToCartNotification(product.colorName, selectedSize);
    
    // Redirect to add-to-cart.html page
    setTimeout(() => {
        window.location.href = 'add-to-cart.html';
    }, 1000);
}

function showAddToCartNotification(colorName, size) {
    // Create notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 150px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <strong style="display: block; font-size: 1.1rem;">Added to Cart!</strong>
                <span style="font-size: 0.9rem; opacity: 0.9;">${colorName} T-Shirt - Size ${size}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount, #mobileCartCount');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

function saveCartToStorage() {
    localStorage.setItem('sorsoneCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('sorsoneCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// ===== NAVIGATION FUNCTIONS =====

function setupNavigation() {
    // Search icon
    const searchIcon = document.getElementById('searchIcon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            alert('🔍 Search Feature\n\nQuick search coming soon!\n\nFor now, you can:\n• Browse by color using the filter buttons\n• Scroll through all products\n• Use the color showcase section');
        });
    }
    
    // User icon
    const userIcon = document.getElementById('userIcon');
    const mobileUserIcon = document.getElementById('mobileUserIcon');
    
    [userIcon, mobileUserIcon].forEach(icon => {
        if (icon) {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                alert('👤 Account Features\n\nComing Soon:\n• Create your account\n• Save favorites\n• Track orders\n• Order history\n• Manage profile\n\nStay tuned!');
            });
        }
    });
    
    // Cart icon - now redirects to add-to-cart.html
    const cartIcon = document.getElementById('cartIcon');
    const mobileCartIcon = document.getElementById('mobileCartIcon');
    
    [cartIcon, mobileCartIcon].forEach(icon => {
        if (icon) {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                if (cart.length === 0) {
                    alert('🛍️ Your Cart is Empty\n\nBrowse our collection and add some awesome oversized t-shirts to your cart!');
                    window.location.href = '#products';
                } else {
                    window.location.href = 'add-to-cart.html';
                }
            });
        }
    });
}

function setupMobileMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    if (menuIcon && mobileMenu) {
        menuIcon.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Close menu when clicking links
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
}

// ===== SCROLL ANIMATIONS =====

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.product-card, .color-card, .feature-card, .collection-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== CONSOLE BRANDING =====

console.log('%c╔═══════════════════════════════════╗', 'color: #D32F2F; font-weight: bold;');
console.log('%c║     SORSONE                       ║', 'color: #D32F2F; font-weight: bold; font-size: 16px;');
console.log('%c║     Premium Oversized T-Shirts    ║', 'color: #666; font-size: 12px;');
console.log('%c╚═══════════════════════════════════╝', 'color: #D32F2F; font-weight: bold;');
console.log('%cWebsite: https://www.sorsone.com', 'color: #666;');
console.log('%cEmail: sorsone.team@gmail.com', 'color: #666;');
console.log('%cPhone: +91 7907090396', 'color: #666;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #D32F2F;');