// Course data (this would typically come from a database)
const coursesData = [
    {
        id: 1,
        title: 'Graphic Designs',
        category: 'Designs',
        description: 'Graphic design focuses on visual communication and presentation through typography, photography, iconography, and illustration. This course covers the fundamentals of design theory, color psychology, layout principles, and industry-standard software.',
        price: 320,
        modules: 8,
        lessons: 28
    },
    {
        id: 2,
        title: 'UX/UI Designs',
        category: 'Designs',
        description: 'UX/UI design focuses on creating intuitive and engaging digital experiences for users. UX (User Experience) design emphasizes understanding user needs, usability, and functionality, while UI (User Interface) design concentrates on the visual aspects, ensuring the interface is aesthetically pleasing and interactive.',
        price: 350,
        modules: 8,
        lessons: 32
    },
    {
        id: 3,
        title: 'Motion Designs',
        category: 'Designs',
        description: 'Motion design combines graphic design principles with animation techniques to create dynamic visual content. This course covers animation fundamentals, timing, easing, transitions, and industry tools for creating engaging motion graphics.',
        price: 380,
        modules: 9,
        lessons: 36
    },
    {
        id: 4,
        title: 'Mobile Designs',
        category: 'Designs',
        description: 'Mobile design focuses on creating user interfaces specifically for mobile devices. This course covers responsive design principles, mobile-first approaches, touch interactions, and best practices for designing across different screen sizes and operating systems.',
        price: 340,
        modules: 7,
        lessons: 30
    },
    {
        id: 5,
        title: 'React',
        category: 'Programming',
        description: 'React is a JavaScript library for building user interfaces. This course covers component-based architecture, state management, hooks, context API, and building single-page applications with React Router.',
        price: 400,
        modules: 10,
        lessons: 42
    },
    {
        id: 6,
        title: 'Node.js',
        category: 'Programming',
        description: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine. This course covers server-side JavaScript, building RESTful APIs, working with databases, authentication, and deployment strategies.',
        price: 420,
        modules: 9,
        lessons: 38
    },
    {
        id: 7,
        title: 'Mongo DB',
        category: 'Programming',
        description: 'MongoDB is a NoSQL document database that provides high performance, high availability, and easy scalability. This course covers document modeling, CRUD operations, indexing, aggregation, and integration with application frameworks.',
        price: 380,
        modules: 7,
        lessons: 32
    },
    {
        id: 8,
        title: 'JavaScript',
        category: 'Programming',
        description: 'JavaScript is the programming language of the web. This comprehensive course covers fundamentals, DOM manipulation, asynchronous programming, ES6+ features, and modern JavaScript development practices.',
        price: 360,
        modules: 12,
        lessons: 48
    },
    {
        id: 9,
        title: 'TypeScript',
        category: 'Programming',
        description: 'TypeScript is a strongly typed programming language that builds on JavaScript. This course covers type systems, interfaces, generics, decorators, and integrating TypeScript with popular frameworks and libraries.',
        price: 390,
        modules: 8,
        lessons: 34
    }
];

// Function to toggle module content visibility
function toggleModule(element) {
    // Find the content element
    const content = element.parentElement.querySelector('.module-content');
    const icon = element.querySelector('svg');
    
    // Toggle visibility
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-45');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-45');
    }
}

// Function to navigate to checkout
function goToCheckout() {
    // The course ID is already stored in localStorage from the main page
    window.location.href = 'checkout.html';
}

// Function to load course details
function loadCourseDetails() {
    // Get the selected course ID from localStorage
    const courseId = parseInt(localStorage.getItem('selectedCourseId'));
    
    // Find the course in our data
    const course = coursesData.find(c => c.id === courseId) || coursesData[1]; // Default to UX/UI if not found
    
    // Update the page with course details
    document.title = `${course.title} - EduLearn`;
    
    // Update breadcrumb
    const breadcrumb = document.querySelector('nav span:last-child');
    if (breadcrumb) breadcrumb.textContent = course.title;
    
    // Update course header
    const courseCategory = document.querySelector('.text-sm.text-gray-500.mb-2');
    if (courseCategory) courseCategory.textContent = course.category;
    
    const courseTitle = document.querySelector('h1.text-3xl');
    if (courseTitle) courseTitle.textContent = course.title;
    
    const courseDescription = document.querySelector('p.text-gray-600.mb-6');
    if (courseDescription) courseDescription.textContent = course.description;
    
    // Update course stats
    const moduleCount = document.querySelectorAll('.flex.items-center.space-x-2 span.text-sm')[0];
    if (moduleCount) moduleCount.textContent = `${course.modules} modules`;
    
    const lessonCount = document.querySelectorAll('.flex.items-center.space-x-2 span.text-sm')[1];
    if (lessonCount) lessonCount.textContent = `${course.lessons} lessons`;
    
    // Update price
    const price = document.querySelector('.text-2xl.font-bold.text-gray-900');
    if (price) price.textContent = `${course.price}$`;
    
    // Update course program title
    const programTitle = document.querySelector('h2.text-2xl.font-bold.text-purple-500');
    if (programTitle) programTitle.textContent = `${course.title} Course Program`;
    
    // Add click event to buy button
    const buyButton = document.querySelector('button.bg-purple-500');
    if (buyButton) {
        buyButton.addEventListener('click', goToCheckout);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadCourseDetails();
    console.log('Single course page loaded');
});