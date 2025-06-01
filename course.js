// Course data
const courses = [
    {
        id: 1,
        category: 'designs',
        title: 'Graphic Designs',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Designs'
    },
    {
        id: 2,
        category: 'designs',
        title: 'UX/UI Designs',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Designs'
    },
    {
        id: 3,
        category: 'designs',
        title: 'Motion Designs',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Designs'
    },
    {
        id: 4,
        category: 'designs',
        title: 'Mobile Designs',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Designs'
    },
    {
        id: 5,
        category: 'programming',
        title: 'React',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Programming'
    },
    {
        id: 6,
        category: 'programming',
        title: 'Node.js',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Programming'
    },
    {
        id: 7,
        category: 'programming',
        title: 'Mongo DB',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Programming'
    },
    {
        id: 8,
        category: 'programming',
        title: 'JavaScript',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Programming'
    },
    {
        id: 9,
        category: 'designs',
        title: 'TypeScript',
        seats: '7/12',
        startDate: 'January 18',
        duration: '2-5 months',
        categoryLabel: 'Designs'
    }
];

// DOM elements
const courseGrid = document.getElementById('courseGrid');
const filterTabs = document.querySelectorAll('.filter-tab');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('aside');
const navItems = document.querySelectorAll('.nav-item');

// Create course card HTML
function createCourseCard(course) {
    return `
        <div class="course-card bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden transition-transform hover:scale-105 cursor-pointer" 
             data-category="${course.category}" 
             data-id="${course.id}"
             onclick="openCourseDetail(${course.id})">
            <div class="relative z-10">
                <span class="inline-block bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full mb-4">
                    ${course.categoryLabel}
                </span>
                <h3 class="text-xl font-bold mb-6">${course.title}</h3>
                <div class="space-y-2 text-sm">
                    <p>Seats: ${course.seats}</p>
                    <p>Start: ${course.startDate}</p>
                    <p>${course.duration}</p>
                </div>
            </div>
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30">
                <div class="w-20 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                    </svg>
                </div>
            </div>
        </div>
    `;
}

// Function to open course detail page
function openCourseDetail(courseId) {
    // Store the selected course ID in localStorage so the detail page can access it
    localStorage.setItem('selectedCourseId', courseId);
    
    // Navigate to the generic single course page
    window.location.href = 'single-course.html';
}

// Render courses
function renderCourses(coursesToRender = courses) {
    courseGrid.innerHTML = coursesToRender.map(course => createCourseCard(course)).join('');
    
    // Add click event listeners to course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            const courseId = card.getAttribute('data-id');
            openCourseDetail(courseId);
        });
    });
}

// Filter courses
function filterCourses(category) {
    if (category === 'all') {
        renderCourses(courses);
    } else {
        const filteredCourses = courses.filter(course => course.category === category);
        renderCourses(filteredCourses);
    }
}

// Handle tab clicks
filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => {
            t.classList.remove('active', 'bg-purple-500', 'text-white');
            t.classList.add('bg-white', 'text-gray-700');
        });
        
        // Add active class to clicked tab
        tab.classList.add('active', 'bg-purple-500', 'text-white');
        tab.classList.remove('bg-white', 'text-gray-700');
        
        // Filter courses
        const filter = tab.getAttribute('data-filter');
        filterCourses(filter);
    });
});

// Search functionality
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm) ||
        course.categoryLabel.toLowerCase().includes(searchTerm)
    );
    renderCourses(filteredCourses);
});

// Mobile sidebar toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
});

// Sidebar navigation active state
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items
        navItems.forEach(nav => {
            nav.classList.remove('active', 'bg-purple-50', 'text-purple-700');
            nav.classList.add('text-gray-700');
        });
        
        // Add active class to clicked item
        item.classList.add('active', 'bg-purple-50', 'text-purple-700');
        item.classList.remove('text-gray-700');
    });
});

// Close sidebar on mobile when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth < 1024) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            sidebar.classList.add('-translate-x-full');
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        sidebar.classList.remove('-translate-x-full');
    } else {
        sidebar.classList.add('-translate-x-full');
    }
});

// Initial render
renderCourses();

// Set initial sidebar state for mobile
if (window.innerWidth < 1024) {
    sidebar.classList.add('-translate-x-full');
}