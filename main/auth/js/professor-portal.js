/**
 * University Management System - Professor Portal
 * Handles functionality for the professor interface
 */

// DOM elements
const mainLayout = document.getElementById('mainLayout');
const sidebarToggle = document.getElementById('sidebarToggle');
const createCourseBtn = document.getElementById('createCourseBtn');
const createCourseModal = document.getElementById('createCourseModal');
const modalClose = document.querySelector('.modal-close');

// Sample course data
const professorCourses = [
    {
        id: 'cs101',
        code: 'CS101',
        title: 'Introduction to Computer Science',
        description: 'Foundational concepts of computer science, including algorithms, data structures, and basic programming.',
        status: 'active',
        semester: 'Fall 2023',
        students: 45,
        assignments: 8,
        materials: 12
    },
    {
        id: 'cs201',
        code: 'CS201',
        title: 'Data Structures and Algorithms',
        description: 'Advanced data structures and algorithm design, analysis, and implementation.',
        status: 'active',
        semester: 'Fall 2023',
        students: 32,
        assignments: 6,
        materials: 9
    },
    {
        id: 'cs350',
        code: 'CS350',
        title: 'Database Systems',
        description: 'Introduction to database design, implementation, and management systems.',
        status: 'draft',
        semester: 'Spring 2024',
        students: 0,
        assignments: 2,
        materials: 5
    }
];

// Sample student data
const students = [
    { id: 'STU001', name: 'John Doe', email: 'john.doe@university.edu', status: 'active', major: 'Computer Science', year: 'Senior', gpa: 3.8 },
    { id: 'STU002', name: 'Jane Smith', email: 'jane.smith@university.edu', status: 'active', major: 'Computer Science', year: 'Junior', gpa: 3.9 },
    { id: 'STU003', name: 'Alex Johnson', email: 'alex.johnson@university.edu', status: 'active', major: 'Computer Engineering', year: 'Sophomore', gpa: 3.5 },
    { id: 'STU004', name: 'Maria Garcia', email: 'maria.garcia@university.edu', status: 'pending', major: 'Computer Science', year: 'Freshman', gpa: 3.7 },
    { id: 'STU005', name: 'David Lee', email: 'david.lee@university.edu', status: 'inactive', major: 'Information Technology', year: 'Senior', gpa: 3.2 }
];

// Expose necessary functions and variables to window object
window.initCourseManagement = initCourseManagement;
window.initModals = initModals;
window.createCourseModal = createCourseModal;
window.handleCreateCourse = handleCreateCourse;

// Initialize the professor portal
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    
    // Initialize course management
    initCourseManagement();
    
    // Initialize modal functionality
    initModals();
    
    // Check authentication
    checkAuth();
    
    // Add event listeners for quick actions in My Courses
    const coursesSection = document.getElementById('coursesSection');
    if (coursesSection) {
        coursesSection.addEventListener('click', (e) => {
            const btn = e.target.closest('button.quick-action-btn');
            if (!btn) return;
            if (btn.textContent.includes('Course Schedule')) {
                showCourseSchedule();
            }
            if (btn.textContent.includes('Manage Students')) {
                showManageStudents();
            }
            if (btn.textContent.includes('Course Settings')) {
                showCourseSettings();
            }
        });
    }
});

// Initialize navigation between sections
function initNavigation() {
    // Get all elements needed for navigation
    const menuLinks = document.querySelectorAll('.sidebar-menu-link');
    const pageSections = document.querySelectorAll('.page-section');
    const headerTitle = document.querySelector('.header-left h1');
    const breadcrumb = document.querySelector('.breadcrumb');
    
    // Set up click event for menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('onclick') || link.getAttribute('href')?.includes('html')) {
                return; // Skip for logout and external links
            }
            
            e.preventDefault();
            
            // Get the page identifier
            const pageId = link.getAttribute('data-page');
            
            // Update active menu item
            menuLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
            
            // Hide all page sections
            pageSections.forEach(section => {
                section.classList.remove('active');
                section.style.display = 'none';
            });
            
            // Show the selected section with animation
            const selectedSection = document.getElementById(pageId + 'Section');
            if (selectedSection) {
                selectedSection.style.display = 'block';
                selectedSection.style.opacity = '0';
                
                // Add animation
                setTimeout(() => {
                    selectedSection.style.opacity = '1';
                    selectedSection.classList.add('active');
                }, 50);
            }
            
            // Update page title with smooth transition
            const pageTitle = link.querySelector('.sidebar-menu-text').textContent;
            headerTitle.style.opacity = '0';
            setTimeout(() => {
                headerTitle.textContent = pageTitle;
                headerTitle.style.opacity = '1';
            }, 200);
            
            // Update breadcrumb
            breadcrumb.textContent = `Home / Professor Portal / ${pageTitle}`;
            
            // Initialize section-specific components
            initializeSection(pageId);
        });
    });
}

// Initialize course management
function initCourseManagement() {
    const coursesSection = document.getElementById('coursesSection');
    
    // Create course grid container if it doesn't exist
    let courseGrid = coursesSection.querySelector('.course-management-grid');
    if (!courseGrid) {
        courseGrid = document.createElement('div');
        courseGrid.className = 'course-management-grid';
        coursesSection.appendChild(courseGrid);
    }
    
    // Hide the 'Create New Course' button
    const createBtn = document.getElementById('createCourseBtn');
    if (createBtn) {
        createBtn.style.display = 'none';
    }
    
    // Clear the grid
    courseGrid.innerHTML = '';
    
    // Add courses to the grid
    professorCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        courseGrid.appendChild(courseCard);
    });
}

// Create a course card element
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-management-card';
    card.setAttribute('data-course-id', course.id);
    
    // Course status label
    const statusLabel = course.status === 'active' ? 'Active' : 'Draft';
    const statusClass = course.status === 'active' ? 'active' : 'draft';
    
    card.innerHTML = `
        <div class="course-header">
            <div class="course-code">${course.code}</div>
            <h3 class="course-title">${course.title}</h3>
            <span class="course-status ${statusClass}">${statusLabel}</span>
            <div class="course-meta">
                <div class="course-meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>${course.semester}</span>
                </div>
            </div>
        </div>
        <div class="course-body">
            <p class="course-description">${course.description}</p>
            
            <div class="course-stats">
                <div class="course-stat">
                    <span class="course-stat-value">${course.students}</span>
                    <span class="course-stat-label">Students</span>
                </div>
                <div class="course-stat">
                    <span class="course-stat-value">${course.assignments}</span>
                    <span class="course-stat-label">Assignments</span>
                </div>
                <div class="course-stat">
                    <span class="course-stat-value">${course.materials}</span>
                    <span class="course-stat-label">Materials</span>
                </div>
            </div>
            
            <div class="course-actions">
                <button class="course-btn primary" data-action="manage" data-course-id="${course.id}">
                    <i class="fas fa-cog"></i>
                    Manage
                </button>
                <button class="course-btn secondary" data-action="view" data-course-id="${course.id}">
                    <i class="fas fa-eye"></i>
                    View
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    card.querySelectorAll('.course-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = btn.getAttribute('data-action');
            const courseId = btn.getAttribute('data-course-id');
            
            if (action === 'manage') {
                // Handle manage course action
                console.log(`Managing course: ${courseId}`);
                loadCourseManagement(courseId);
            } else if (action === 'view') {
                // Handle view course action
                showCourseViewModal(courseId);
            }
        });
    });
    
    return card;
}

// Initialize modals
function initModals() {
    // Show create course modal
    if (createCourseBtn) {
        createCourseBtn.addEventListener('click', () => {
            createCourseModal.classList.add('active');
            
            // Populate form if needed
            const createCourseForm = document.getElementById('createCourseForm');
            if (createCourseForm) {
                createCourseForm.innerHTML = `
                    <div class="form-group">
                        <label for="courseCode" class="form-label">Course Code</label>
                        <input type="text" id="courseCode" class="form-control" placeholder="e.g., CS101" required>
                    </div>
                    <div class="form-group">
                        <label for="courseTitle" class="form-label">Course Title</label>
                        <input type="text" id="courseTitle" class="form-control" placeholder="e.g., Introduction to Computer Science" required>
                    </div>
                    <div class="form-group">
                        <label for="courseSemester" class="form-label">Semester</label>
                        <select id="courseSemester" class="form-control" required>
                            <option value="Fall 2023">Fall 2023</option>
                            <option value="Spring 2024">Spring 2024</option>
                            <option value="Summer 2024">Summer 2024</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="courseDescription" class="form-label">Course Description</label>
                        <textarea id="courseDescription" class="form-control" rows="4" placeholder="Enter course description..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Course Status</label>
                        <div style="display: flex; gap: 15px;">
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="radio" name="courseStatus" value="draft" checked>
                                <span>Save as Draft</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="radio" name="courseStatus" value="active">
                                <span>Publish Immediately</span>
                            </label>
                        </div>
                    </div>
                    <div class="form-actions" style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                        <button type="button" class="course-btn secondary" id="cancelCourseBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Create Course</button>
                    </div>
                `;
                
                // Add form submission handler
                createCourseForm.addEventListener('submit', handleCreateCourse);
                
                // Add cancel button handler
                const cancelBtn = document.getElementById('cancelCourseBtn');
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                        createCourseModal.classList.remove('active');
                    });
                }
            }
        });
    }
    
    // Close modal on close button click
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
            });
        });
    }
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// Handle create course form submission
function handleCreateCourse(e) {
    e.preventDefault();
    
    // Get form values
    const code = document.getElementById('courseCode').value;
    const title = document.getElementById('courseTitle').value;
    const semester = document.getElementById('courseSemester').value;
    const description = document.getElementById('courseDescription').value;
    const status = document.querySelector('input[name="courseStatus"]:checked').value;
    
    // Create new course object
    const newCourse = {
        id: code.toLowerCase(),
        code: code,
        title: title,
        description: description,
        status: status,
        semester: semester,
        students: 0,
        assignments: 0,
        materials: 0
    };
    
    // Add to courses array
    professorCourses.push(newCourse);
    
    // Refresh the course list
    initCourseManagement();
    
    // Close modal
    createCourseModal.classList.remove('active');
    
    // Show success message
    showNotification('Course created successfully!', 'success');
}

// Initialize specific section
function initializeSection(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            // Dashboard is static for now
            break;
        case 'courses':
            initCourseManagement();
            break;
        case 'announcements':
            loadAnnouncementsSection();
            break;
        case 'students':
            initStudentRoster();
            break;
        case 'grading':
            initGradingInterface();
            break;
        case 'materials':
            initMaterialUpload();
            break;
    }
}

// Authentication check
function checkAuth() {
    // Check if user is logged in and is a professor
    const userData = SessionManager.getSession();
    
    if (!userData) {
        // Redirect to login page
        NavigationController.navigateTo('login');
        return;
    }
    
    if (userData.role !== 'professor') {
        // Show unauthorized message
        alert('You are not authorized to access the professor portal.');
        // Redirect to appropriate page based on role
        NavigationController.navigateByRole();
        return;
    }
    
    // Update UI with professor data
    updateProfessorUI(userData);
}

// Update UI with professor data
function updateProfessorUI(userData) {
    // Update name and initials
    const userNameElement = document.getElementById('userName');
    const profileNameElement = document.getElementById('profileName');
    const userInitialsElement = document.getElementById('userInitials');
    const profileInitialsElement = document.getElementById('profileInitials');
    const profileIdElement = document.getElementById('profileId');
    
    if (userNameElement) userNameElement.textContent = userData.name;
    if (profileNameElement) profileNameElement.textContent = userData.name;
    
    // Get initials from name
    const initials = userData.name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase();
    
    if (userInitialsElement) userInitialsElement.textContent = initials;
    if (profileInitialsElement) profileInitialsElement.textContent = initials;
    if (profileIdElement) profileIdElement.textContent = userData.id;
}

// Show notification message
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('active');
        
        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Add close button handler
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('active');
            
            // Remove from DOM after animation
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
}

// Add a reusable modal function for quick actions
function showQuickActionModal(title, message) {
    // Remove any existing quick action modal
    const existing = document.getElementById('quickActionModal');
    if (existing) existing.remove();
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'quickActionModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close modal on close button or outside click
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function showCourseSchedule() {
    // Remove any existing modal
    const existing = document.getElementById('courseScheduleModal');
    if (existing) existing.remove();
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'courseScheduleModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Course Schedule</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="schedule-calendar">
                    <div class="schedule-controls">
                        <button class="course-btn secondary"><i class="fas fa-chevron-left"></i></button>
                        <h3>October 2023</h3>
                        <button class="course-btn secondary"><i class="fas fa-chevron-right"></i></button>
                    </div>
                    <div class="schedule-week-header">
                        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                    </div>
                    <div class="schedule-days">
                        <!-- Calendar days (static for now) -->
                        <div class="schedule-day">1</div><div class="schedule-day">2</div><div class="schedule-day">3</div><div class="schedule-day">4</div><div class="schedule-day">5</div><div class="schedule-day">6</div><div class="schedule-day">7</div>
                        <div class="schedule-day">8</div><div class="schedule-day">9</div><div class="schedule-day">10</div><div class="schedule-day">11</div><div class="schedule-day">12</div><div class="schedule-day">13</div><div class="schedule-day">14</div>
                        <div class="schedule-day">15</div><div class="schedule-day">16</div><div class="schedule-day">17</div><div class="schedule-day">18</div><div class="schedule-day">19</div><div class="schedule-day">20</div><div class="schedule-day">21</div>
                        <div class="schedule-day">22</div><div class="schedule-day">23</div><div class="schedule-day">24</div><div class="schedule-day">25</div><div class="schedule-day">26</div><div class="schedule-day">27</div><div class="schedule-day">28</div>
                        <div class="schedule-day">29</div><div class="schedule-day">30</div><div class="schedule-day">31</div>
                    </div>
                </div>
                <div class="schedule-events" style="margin-top: 24px;">
                    <h3>Scheduled Events</h3>
                    <div class="schedule-event">
                        <div class="event-time">9:00 AM - 10:30 AM</div>
                        <div class="event-details">
                            <div class="event-title">CS101 - Introduction to Computer Science</div>
                            <div class="event-location">Science Building, Room 302</div>
                        </div>
                    </div>
                    <div class="schedule-event">
                        <div class="event-time">1:00 PM - 2:30 PM</div>
                        <div class="event-details">
                            <div class="event-title">CS201 - Data Structures and Algorithms</div>
                            <div class="event-location">Engineering Building, Room 105</div>
                        </div>
                    </div>
                    <button class="course-btn primary" style="margin-top: 15px;" id="addEventBtn">
                        <i class="fas fa-plus"></i> Add New Event
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close modal
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    // Add event handler for Add New Event
    modal.querySelector('#addEventBtn').onclick = () => {
        showNotification('Add event functionality coming soon!', 'info');
    };
}

function showManageStudents() {
    // Switch to Students section and show roster
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const studentsSection = document.getElementById('studentsSection');
    studentsSection.classList.add('active');
    if (typeof window.initStudentRoster === 'function') {
        window.initStudentRoster();
    }
}

function showCourseSettings() {
    // Remove any existing modal
    const existing = document.getElementById('courseSettingsModal');
    if (existing) existing.remove();
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'courseSettingsModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Course Settings</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="settings-tabs">
                    <button class="settings-tab active" data-tab="general">General</button>
                    <button class="settings-tab" data-tab="enrollment">Enrollment</button>
                    <button class="settings-tab" data-tab="grading">Grading</button>
                    <button class="settings-tab" data-tab="appearance">Appearance</button>
                </div>
                <div class="settings-content">
                    <div class="settings-panel active" id="generalPanel">
                        <h3>General Settings</h3>
                        <form id="generalSettingsForm">
                            <div class="form-group">
                                <label class="form-label">Course Visibility</label>
                                <select class="form-control">
                                    <option>Visible to all enrolled students</option>
                                    <option>Visible to specific students</option>
                                    <option>Hidden (Draft)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Course Start Date</label>
                                <input type="date" class="form-control" value="2023-09-01">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Course End Date</label>
                                <input type="date" class="form-control" value="2023-12-15">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Course Format</label>
                                <select class="form-control">
                                    <option>Weekly format</option>
                                    <option>Topic format</option>
                                    <option>Single activity format</option>
                                </select>
                            </div>
                            <button type="submit" class="course-btn primary">Save Changes</button>
                        </form>
                    </div>
                    <div class="settings-panel" id="enrollmentPanel">
                        <h3>Enrollment Settings</h3>
                        <form id="enrollmentSettingsForm">
                            <div class="form-group">
                                <label class="form-label">Enrollment Method</label>
                                <select class="form-control">
                                    <option>Self enrollment (Student can enroll)</option>
                                    <option>Manual enrollment (Only by professors)</option>
                                    <option>Bulk enrollment (CSV upload)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Enrollment Key</label>
                                <input type="text" class="form-control" placeholder="Optional enrollment key">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Enrollment Period</label>
                                <div style="display: flex; gap: 10px;">
                                    <input type="date" class="form-control" style="flex: 1;" value="2023-08-15">
                                    <span style="line-height: 40px;">to</span>
                                    <input type="date" class="form-control" style="flex: 1;" value="2023-09-05">
                                </div>
                            </div>
                            <button type="submit" class="course-btn primary">Save Changes</button>
                        </form>
                    </div>
                    <div class="settings-panel" id="gradingPanel">
                        <h3>Grading Settings</h3>
                        <form id="gradingSettingsForm">
                            <div class="form-group">
                                <label class="form-label">Grading Method</label>
                                <select class="form-control">
                                    <option>Points</option>
                                    <option>Scale</option>
                                    <option>Percentage</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Grade Display Type</label>
                                <select class="form-control">
                                    <option>Letter (A, B, C, D, F)</option>
                                    <option>Percentage</option>
                                    <option>Points</option>
                                    <option>Complete/Incomplete</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Grade Categories</label>
                                <div class="grade-categories">
                                    <div class="grade-category">
                                        <input type="text" class="form-control" value="Assignments" style="flex: 2;">
                                        <input type="number" class="form-control" value="40" min="0" max="100" style="flex: 1;">
                                        <span style="line-height: 40px;">%</span>
                                    </div>
                                    <div class="grade-category">
                                        <input type="text" class="form-control" value="Quizzes" style="flex: 2;">
                                        <input type="number" class="form-control" value="20" min="0" max="100" style="flex: 1;">
                                        <span style="line-height: 40px;">%</span>
                                    </div>
                                    <div class="grade-category">
                                        <input type="text" class="form-control" value="Exams" style="flex: 2;">
                                        <input type="number" class="form-control" value="40" min="0" max="100" style="flex: 1;">
                                        <span style="line-height: 40px;">%</span>
                                    </div>
                                </div>
                                <button type="button" class="course-btn secondary" style="margin-top: 10px;">
                                    <i class="fas fa-plus"></i> Add Category
                                </button>
                            </div>
                            <button type="submit" class="course-btn primary">Save Changes</button>
                        </form>
                    </div>
                    <div class="settings-panel" id="appearancePanel">
                        <h3>Appearance Settings</h3>
                        <form id="appearanceSettingsForm">
                            <div class="form-group">
                                <label class="form-label">Course Theme</label>
                                <select class="form-control">
                                    <option>Default</option>
                                    <option>Modern</option>
                                    <option>Classic</option>
                                    <option>Minimal</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Course Color</label>
                                <input type="color" class="form-control" value="#3b82f6">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Course Image</label>
                                <div class="file-upload-area">
                                    <div class="upload-preview" style="height: 120px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-image" style="font-size: 48px; color: #94a3b8;"></i>
                                    </div>
                                    <button type="button" class="course-btn secondary" style="margin-top: 10px;">
                                        <i class="fas fa-upload"></i> Upload Image
                                    </button>
                                </div>
                            </div>
                            <button type="submit" class="course-btn primary">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close modal
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    // Tab switching
    const tabs = modal.querySelectorAll('.settings-tab');
    const panels = modal.querySelectorAll('.settings-panel');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            modal.querySelector(`#${targetPanel}Panel`).classList.add('active');
        });
    });
    // Save changes (just show notification)
    modal.querySelectorAll('form').forEach(form => {
        form.onsubmit = (e) => {
            e.preventDefault();
            showNotification('Settings saved successfully!', 'success');
        };
    });
} 

// --- ANNOUNCEMENTS SECTION ---
function loadAnnouncementsSection() {
    const feed = document.getElementById('announcementsFeed');
    let announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    feed.innerHTML = '';
    if (announcements.length === 0) {
        feed.innerHTML = '<div class="empty-state">No announcements yet.</div>';
        return;
    }
    announcements.slice().reverse().forEach(a => {
        const item = document.createElement('div');
        item.className = 'announcement-item fade-in';
        item.innerHTML = `
            <div class="announcement-meta">
                <span class="announcement-author">${a.author}</span>
                <span class="announcement-time">${a.time}</span>
            </div>
            <div class="announcement-text">${a.text}</div>
        `;
        feed.appendChild(item);
    });
}
// Auto-update announcements if changed in another tab
window.addEventListener('storage', (e) => {
    if (e.key === 'announcements') {
        loadAnnouncementsSection();
    }
});
// --- END ANNOUNCEMENTS SECTION --- 

// Add a function to show the course view modal
function showCourseViewModal(courseId) {
    // Find the course by ID
    const course = professorCourses.find(c => c.id === courseId);
    if (!course) return;

    // Remove any existing view modal
    const existing = document.getElementById('courseViewModal');
    if (existing) existing.remove();

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'courseViewModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 style=\"color:#fff;\">Course Overview</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="course-view-details">
                    <div><strong>Course Code:</strong> ${course.code}</div>
                    <div><strong>Title:</strong> ${course.title}</div>
                    <div><strong>Semester:</strong> ${course.semester}</div>
                    <div><strong>Status:</strong> <span class="course-status ${course.status}">${course.status.charAt(0).toUpperCase() + course.status.slice(1)}</span></div>
                    <div><strong>Students:</strong> ${course.students}</div>
                    <div><strong>Assignments:</strong> ${course.assignments}</div>
                    <div><strong>Materials:</strong> ${course.materials}</div>
                    <div style="margin-top: 1em;"><strong>Description:</strong><br>${course.description}</div>
                </div>
                <button class="course-btn primary" id="editCourseBtn" style="margin-top: 28px; float: right;">Edit Course</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close modal on close button or outside click
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    // Add Edit Course button functionality
    modal.querySelector('#editCourseBtn').onclick = function() {
        showEditCourseModal(course);
    };
}

// Add a function to show the edit course modal
function showEditCourseModal(course) {
    // Remove any existing edit modal
    const existing = document.getElementById('editCourseModal');
    if (existing) existing.remove();

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'editCourseModal';
    modal.innerHTML = `
        <div class=\"modal-content\">
            <div class=\"modal-header\">
                <h2>Edit Course</h2>
                <button class=\"modal-close\">&times;</button>
            </div>
            <div class=\"modal-body\">
                <form id=\"editCourseForm\">
                    <div class=\"form-group\">
                        <label for=\"editCourseCode\" class=\"form-label\">Course Code</label>
                        <input type=\"text\" id=\"editCourseCode\" class=\"form-control\" value=\"${course.code}\" required>
                    </div>
                    <div class=\"form-group\">
                        <label for=\"editCourseTitle\" class=\"form-label\">Course Title</label>
                        <input type=\"text\" id=\"editCourseTitle\" class=\"form-control\" value=\"${course.title}\" required>
                    </div>
                    <div class=\"form-group\">
                        <label for=\"editCourseSemester\" class=\"form-label\">Semester</label>
                        <select id=\"editCourseSemester\" class=\"form-control\" required>
                            <option value=\"Fall 2023\" ${course.semester === 'Fall 2023' ? 'selected' : ''}>Fall 2023</option>
                            <option value=\"Spring 2024\" ${course.semester === 'Spring 2024' ? 'selected' : ''}>Spring 2024</option>
                            <option value=\"Summer 2024\" ${course.semester === 'Summer 2024' ? 'selected' : ''}>Summer 2024</option>
                        </select>
                    </div>
                    <div class=\"form-group\">
                        <label for=\"editCourseDescription\" class=\"form-label\">Course Description</label>
                        <textarea id=\"editCourseDescription\" class=\"form-control\" rows=\"4\">${course.description}</textarea>
                    </div>
                    <div class=\"form-group\">
                        <label class=\"form-label\">Course Status</label>
                        <div style=\"display: flex; gap: 15px;\">
                            <label style=\"display: flex; align-items: center; gap: 8px;\">
                                <input type=\"radio\" name=\"editCourseStatus\" value=\"draft\" ${course.status === 'draft' ? 'checked' : ''}>
                                <span>Save as Draft</span>
                            </label>
                            <label style=\"display: flex; align-items: center; gap: 8px;\">
                                <input type=\"radio\" name=\"editCourseStatus\" value=\"active\" ${course.status === 'active' ? 'checked' : ''}>
                                <span>Publish Immediately</span>
                            </label>
                        </div>
                    </div>
                    <div class=\"form-actions\" style=\"display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;\">
                        <button type=\"button\" class=\"course-btn secondary\" id=\"cancelEditCourseBtn\">Cancel</button>
                        <button type=\"submit\" class=\"course-btn primary\">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close modal on close button or outside click
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    // Cancel button
    modal.querySelector('#cancelEditCourseBtn').onclick = () => modal.remove();
    // Handle form submission
    modal.querySelector('#editCourseForm').onsubmit = function(e) {
        e.preventDefault();
        // Get updated values
        const code = document.getElementById('editCourseCode').value;
        const title = document.getElementById('editCourseTitle').value;
        const semester = document.getElementById('editCourseSemester').value;
        const description = document.getElementById('editCourseDescription').value;
        const status = modal.querySelector('input[name="editCourseStatus"]:checked').value;
        // Update the course in professorCourses
        const idx = professorCourses.findIndex(c => c.id === course.id);
        if (idx !== -1) {
            professorCourses[idx].code = code;
            professorCourses[idx].title = title;
            professorCourses[idx].semester = semester;
            professorCourses[idx].description = description;
            professorCourses[idx].status = status;
        }
        // Refresh the course list
        initCourseManagement();
        // Close modal
        modal.remove();
        // Show notification
        showNotification('Course updated successfully!', 'success');
    };
} 