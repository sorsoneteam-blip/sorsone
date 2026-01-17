// ==================== SORSONE ICE ROLLER - FIXED FRONTEND SCRIPT ====================
// This script handles all frontend functionality including order submission, validation,
// and communication with Google Apps Script backend
// **PRODUCTION-READY VERSION** - CORS Issue FIXED

// ==================== CONFIGURATION ====================
const CONFIG = {
    // ✅ FIX: Add your actual backend URL here
    BACKEND_URL: 'https://script.google.com/macros/s/AKfycbxSQ47c_qs27a9xdI0bBEdNt2jgV1leGUjsIaalmUlAB4H4lnSP8zKaYzlwG0dUvvdG/exec',
    
    // Product configuration
    PRODUCTS: {
        'blue': 'Cool Breeze Silicon Ice Roller (Blue)',
        'green': 'Fresh Mint Silicon Ice Roller (Green)',
        'pink': 'Berry Bliss Silicon Ice Roller (Pink)',
        'purple': 'Lavender Dream Silicon Ice Roller (Purple)'
    }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Validate email address format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (10 digits)
 */
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

/**
 * Validate pincode (6 digits)
 */
function validatePincode(pincode) {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
}

/**
 * Show alert message to user
 * ✅ FIX: Improved alert system with auto-dismiss
 */
function showAlert(type, message) {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) {
        console.error('Alert container not found');
        alert(message); // Fallback to browser alert
        return;
    }
    
    // Remove existing alerts
    alertContainer.innerHTML = '';
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.cssText = `
        padding: 1rem 1.5rem;
        margin-bottom: 1.5rem;
        border-radius: 10px;
        font-weight: 500;
        animation: slideDown 0.3s ease;
    `;
    
    // Set colors based on type
    if (type === 'success') {
        alertDiv.style.background = '#d4edda';
        alertDiv.style.color = '#155724';
        alertDiv.style.border = '2px solid #c3e6cb';
    } else if (type === 'error') {
        alertDiv.style.background = '#f8d7da';
        alertDiv.style.color = '#721c24';
        alertDiv.style.border = '2px solid #f5c6cb';
    } else if (type === 'info') {
        alertDiv.style.background = '#d1ecf1';
        alertDiv.style.color = '#0c5460';
        alertDiv.style.border = '2px solid #bee5eb';
    }
    
    alertDiv.textContent = message;
    alertContainer.appendChild(alertDiv);
    
    // Scroll to alert
    alertContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-dismiss success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            alertDiv.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
    }
}

/**
 * Send data to backend (Google Apps Script)
 * ✅ MAJOR FIX: Changed Content-Type to text/plain to avoid CORS preflight
 */
async function sendToBackend(action, data) {
    try {
        console.log('Sending to backend:', action, data);
        
        // Validate backend URL
        if (!CONFIG.BACKEND_URL || CONFIG.BACKEND_URL.includes('YOUR_')) {
            throw new Error('Backend URL not configured. Please update CONFIG.BACKEND_URL in script.js');
        }
        
        // Add action to data
        const payload = {
            ...data,
            action: action
        };
        
        // ✅ CRITICAL FIX: Use text/plain instead of application/json to avoid CORS preflight
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const response = await fetch(CONFIG.BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // ✅ CHANGED FROM application/json
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
            redirect: 'follow'
        });
        
        clearTimeout(timeoutId);
        
        // Check if response is OK
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
        
        // Parse JSON response
        const result = await response.json();
        console.log('Backend response:', result);
        
        return result;
        
    } catch (error) {
        console.error('Backend communication error:', error);
        
        // Provide user-friendly error messages
        if (error.name === 'AbortError') {
            throw new Error('Request timeout. Please check your internet connection and try again.');
        } else if (error.message.includes('Failed to fetch')) {
            throw new Error('Unable to connect to server. Please check your internet connection.');
        } else {
            throw error;
        }
    }
}

// ==================== NAVIGATION ====================

/**
 * Handle mobile menu toggle
 */
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// ==================== SCROLL ANIMATIONS ====================

/**
 * Fade in elements on scroll
 */
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', handleScrollAnimations);

// ==================== SMOOTH SCROLLING ====================

/**
 * Smooth scroll for anchor links
 */
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==================== FORM VALIDATION STYLES ====================

/**
 * Add error styling to form fields
 */
function addFormValidationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-group.error input,
        .form-group.error textarea,
        .form-group.error select {
            border-color: #dc3545 !important;
            background-color: #fff5f5 !important;
        }
        
        .form-group.error .form-error {
            display: block;
            color: #dc3545;
            font-size: 0.85rem;
            margin-top: 0.25rem;
        }
        
        .form-error {
            display: none;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize form validation styles
document.addEventListener('DOMContentLoaded', addFormValidationStyles);

// ==================== PREVENT DUPLICATE SUBMISSIONS ====================

/**
 * Prevent form double submission
 */
let isSubmitting = false;

function preventDoubleSubmit(formElement) {
    if (isSubmitting) {
        return false;
    }
    isSubmitting = true;
    
    // Reset after 10 seconds as a safety measure
    setTimeout(() => {
        isSubmitting = false;
    }, 10000);
    
    return true;
}

function resetSubmitLock() {
    isSubmitting = false;
}

// ==================== LOADING INDICATOR ====================

/**
 * Show/hide loading indicator
 */
function showLoading(show = true) {
    let loader = document.getElementById('globalLoader');
    
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #7CB342;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                "></div>
                <p style="color: #7CB342; font-weight: 600;">Processing...</p>
            </div>
        `;
        document.body.appendChild(loader);
        
        // Add spin animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
    }
    
    loader.style.display = show ? 'flex' : 'none';
}

// ==================== EXPORT FOR USE IN OTHER SCRIPTS ====================

// Make functions globally available
window.CONFIG = CONFIG;
window.validateEmail = validateEmail;
window.validatePhone = validatePhone;
window.validatePincode = validatePincode;
window.showAlert = showAlert;
window.sendToBackend = sendToBackend;
window.preventDoubleSubmit = preventDoubleSubmit;
window.resetSubmitLock = resetSubmitLock;
window.showLoading = showLoading;

console.log('✅ Sorsone script.js loaded successfully - CORS FIXED');
console.log('📡 Backend URL:', CONFIG.BACKEND_URL);