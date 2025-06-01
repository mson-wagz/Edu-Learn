// Course data (same as in single-course.js)
const coursesData = [
    {
        id: 1,
        title: 'Graphic Designs',
        category: 'Designs',
        price: 320,
        modules: 8,
        lessons: 28,
        icon: '🎨'
    },
    {
        id: 2,
        title: 'UX/UI Designs',
        category: 'Designs',
        price: 350,
        modules: 8,
        lessons: 32,
        icon: '🎨'
    },
    {
        id: 3,
        title: 'Motion Designs',
        category: 'Designs',
        price: 380,
        modules: 9,
        lessons: 36,
        icon: '🎬'
    },
    {
        id: 4,
        title: 'Mobile Designs',
        category: 'Designs',
        price: 340,
        modules: 7,
        lessons: 30,
        icon: '📱'
    },
    {
        id: 5,
        title: 'React',
        category: 'Programming',
        price: 400,
        modules: 10,
        lessons: 42,
        icon: '⚛️'
    },
    {
        id: 6,
        title: 'Node.js',
        category: 'Programming',
        price: 420,
        modules: 9,
        lessons: 38,
        icon: '🟢'
    },
    {
        id: 7,
        title: 'Mongo DB',
        category: 'Programming',
        price: 380,
        modules: 7,
        lessons: 32,
        icon: '🍃'
    },
    {
        id: 8,
        title: 'JavaScript',
        category: 'Programming',
        price: 360,
        modules: 12,
        lessons: 48,
        icon: '💛'
    },
    {
        id: 9,
        title: 'TypeScript',
        category: 'Programming',
        price: 390,
        modules: 8,
        lessons: 34,
        icon: '🔷'
    }
];

// Global variables
let selectedCourse = null;
let currentPaymentMethod = 'card';

// Initialize checkout page
function initializeCheckout() {
    // Get course ID from localStorage
    const courseId = parseInt(localStorage.getItem('selectedCourseId'));
    selectedCourse = coursesData.find(c => c.id === courseId) || coursesData[1];
    
    // Load course details
    loadCourseDetails();
    
    // Calculate pricing
    calculatePricing();
    
    // Setup event listeners
    setupEventListeners();
    
    // Generate transfer reference
    generateTransferReference();
}

// Load course details into the order summary
function loadCourseDetails() {
    document.getElementById('courseTitle').textContent = selectedCourse.title;
    document.getElementById('courseCategory').textContent = selectedCourse.category;
    document.getElementById('courseModules').textContent = `${selectedCourse.modules} modules`;
    document.getElementById('courseLessons').textContent = `${selectedCourse.lessons} lessons`;
    document.getElementById('courseIcon').textContent = selectedCourse.icon;
    document.getElementById('courseBreadcrumb').textContent = selectedCourse.title;
}

// Calculate and display pricing
function calculatePricing() {
    const coursePrice = selectedCourse.price;
    const platformFee = 15;
    const discountPercent = 10;
    const discount = Math.round(coursePrice * (discountPercent / 100));
    const total = coursePrice + platformFee - discount;
    
    document.getElementById('coursePrice').textContent = `$${coursePrice}`;
    document.getElementById('platformFee').textContent = `$${platformFee}`;
    document.getElementById('discount').textContent = `-$${discount}`;
    document.getElementById('totalPrice').textContent = `$${total}`;
}

// Setup all event listeners
function setupEventListeners() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', handlePaymentMethodChange);
    });
    
    // Form validation
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    setupRealTimeValidation();
    
    // Card number formatting
    setupCardFormatting();
}

// Handle payment method changes
function handlePaymentMethodChange(e) {
    currentPaymentMethod = e.target.value;
    
    // Hide all payment details
    document.querySelectorAll('.payment-details').forEach(detail => {
        detail.classList.add('hidden');
    });
    
    // Show selected payment method details
    const detailsMap = {
        'card': 'cardDetails',
        'paypal': 'paypalDetails',
        'bank': 'bankDetails'
    };
    
    const selectedDetails = document.getElementById(detailsMap[currentPaymentMethod]);
    if (selectedDetails) {
        selectedDetails.classList.remove('hidden');
    }
    
    // Update submit button text
    const btnText = document.getElementById('btnText');
    const buttonTexts = {
        'card': 'Complete Purchase',
        'paypal': 'Continue with PayPal',
        'bank': 'Confirm Order'
    };
    btnText.textContent = buttonTexts[currentPaymentMethod];
}

// Setup real-time form validation
function setupRealTimeValidation() {
    const fields = [
        { id: 'firstName', validator: validateName },
        { id: 'lastName', validator: validateName },
        { id: 'email', validator: validateEmail },
        { id: 'cardNumber', validator: validateCardNumber },
        { id: 'expiryDate', validator: validateExpiryDate },
        { id: 'cvv', validator: validateCVV },
        { id: 'cardName', validator: validateName }
    ];
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            element.addEventListener('blur', () => {
                validateField(field.id, field.validator);
            });
            element.addEventListener('input', () => {
                clearFieldError(field.id);
            });
        }
    });
}

// Setup card number formatting
function setupCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    if (expiryDate) {
        expiryDate.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    if (cvv) {
        cvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
}

// Validation functions
function validateName(value) {
    return value.trim().length >= 2;
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function validateCardNumber(value) {
    const cleanValue = value.replace(/\s/g, '');
    return cleanValue.length >= 13 && cleanValue.length <= 19 && /^\d+$/.test(cleanValue);
}

function validateExpiryDate(value) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(value)) return false;
    
    const [month, year] = value.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const now = new Date();
    return expiry > now;
}

function validateCVV(value) {
    return /^\d{3,4}$/.test(value);
}

// Field validation helper
function validateField(fieldId, validator) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!validator(field.value)) {
        field.classList.add('border-red-500');
        errorElement.classList.remove('hidden');
        return false;
    } else {
        field.classList.remove('border-red-500');
        errorElement.classList.add('hidden');
        return true;
    }
}

// Clear field error
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = field.parentElement.querySelector('.error-message');
    field.classList.remove('border-red-500');
    errorElement.classList.add('hidden');
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate form based on payment method
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    try {
        // Simulate payment processing
        await processPayment();
        
        // Show success and redirect
        showSuccessMessage();
        
        // Redirect to success page after delay
        setTimeout(() => {
            window.location.href = 'course-success.html';
        }, 2000);
        
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideLoadingState();
    }
}

// Validate entire form
function validateForm() {
    let isValid = true;
    
    // Validate personal information
    isValid &= validateField('firstName', validateName);
    isValid &= validateField('lastName', validateName);
    isValid &= validateField('email', validateEmail);
    
    // Validate payment method specific fields
    if (currentPaymentMethod === 'card') {
        isValid &= validateField('cardNumber', validateCardNumber);
        isValid &= validateField('expiryDate', validateExpiryDate);
        isValid &= validateField('cvv', validateCVV);
        isValid &= validateField('cardName', validateName);
    }
    
    // Validate terms checkbox
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('Please accept the terms and conditions');
        isValid = false;
    }
    
    return Boolean(isValid);
}

// Show loading state
function showLoadingState() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
}

// Hide loading state
function hideLoadingState() {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    
    submitBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
}

// Simulate payment processing
function processPayment() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure for demo
            if (Math.random() > 0.1) { // 90% success rate
                resolve();
            } else {
                reject(new Error('Payment failed. Please try again.'));
            }
        }, 3000);
    });
}

// Show success message
function showSuccessMessage() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.classList.remove('bg-purple-500', 'hover:bg-purple-600');
    submitBtn.classList.add('bg-green-500');
    document.getElementById('btnText').textContent = 'Payment Successful!';
}

// Show error message
function showErrorMessage(message) {
    alert(message); // In a real app, you'd use a proper notification system
}

// Generate transfer reference
function generateTransferReference() {
    const ref = `EDU-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    const element = document.getElementById('transferReference');
    if (element) {
        element.textContent = ref;
    }
}

// Go back function
function goBack() {
    window.history.back();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeCheckout);