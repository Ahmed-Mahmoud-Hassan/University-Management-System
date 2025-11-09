/**
 * University Management System - Student Portal
 * Handles functionality for the student interface
 */

// Sample student data
const studentData = {
    courses: [
        {
            id: 'cs101',
            code: 'CS101',
            title: 'Introduction to Computer Science',
            instructor: 'Dr. Johnson',
            semester: 'Fall 2023',
            progress: 75,
            grade: 'A-',
            credits: 3,
            dueSoon: 2,
            category: 'cs',
            imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
        },
        {
            id: 'cs201',
            code: 'CS201',
            title: 'Data Structures and Algorithms',
            instructor: 'Dr. Williams',
            semester: 'Fall 2023',
            progress: 60,
            grade: 'B+',
            credits: 4,
            dueSoon: 1,
            category: 'cs',
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
        },
        {
            id: 'cs350',
            code: 'CS350',
            title: 'Database Systems',
            instructor: 'Prof. Chen',
            semester: 'Fall 2023',
            progress: 50,
            grade: 'A-',
            credits: 4,
            dueSoon: 2,
            category: 'cs',
            imageUrl: 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04'
        },
        {
            id: 'eng105',
            code: 'ENG105',
            title: 'Academic Writing',
            instructor: 'Prof. Williams',
            semester: 'Fall 2023',
            progress: 85,
            grade: 'B',
            credits: 3,
            dueSoon: 1,
            category: 'arts',
            imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a'
        }
    ],
    assignments: [
        {
            id: 'a1',
            title: 'Programming Basics',
            course: 'CS101',
            dueDate: 'Oct 15, 2023',
            status: 'pending',
            priority: 'high'
        },
        {
            id: 'a2',
            title: 'Data Structures Quiz',
            course: 'CS201',
            dueDate: 'Oct 18, 2023',
            status: 'pending',
            priority: 'medium'
        },
        {
            id: 'a3',
            title: 'Database Design',
            course: 'CS350',
            dueDate: 'Oct 22, 2023',
            status: 'pending',
            priority: 'medium'
        },
        {
            id: 'a4',
            title: 'Research Paper Outline',
            course: 'ENG105',
            dueDate: 'Oct 25, 2023',
            status: 'pending',
            priority: 'medium'
        }
    ],
    grades: [
        {
            id: 'g1',
            title: 'Algorithms Quiz',
            course: 'CS201',
            date: 'Oct 10, 2023',
            score: 95,
            grade: 'A'
        },
        {
            id: 'g2',
            title: 'Programming Lab #2',
            course: 'CS101',
            date: 'Oct 8, 2023',
            score: 88,
            grade: 'B+'
        },
        {
            id: 'g3',
            title: 'Database Concepts',
            course: 'CS350',
            date: 'Oct 5, 2023',
            score: 92,
            grade: 'A-'
        },
        {
            id: 'g4',
            title: 'Essay Draft',
            course: 'ENG105',
            date: 'Oct 3, 2023',
            score: 85,
            grade: 'B'
        }
    ],
    schedule: [
        {
            id: 's1',
            course: 'CS101',
            title: 'Introduction to Programming',
            location: 'Science Building, Room 203',
            startTime: '09:00 AM',
            endTime: '10:30 AM',
            days: ['Monday', 'Wednesday', 'Friday']
        },
        {
            id: 's2',
            course: 'CS201',
            title: 'Data Structures',
            location: 'Engineering Building, Room 105',
            startTime: '11:00 AM',
            endTime: '12:30 PM',
            days: ['Monday', 'Wednesday', 'Friday']
        },
        {
            id: 's3',
            course: 'CS350',
            title: 'Database Systems',
            location: 'Science Building, Room 105',
            startTime: '02:00 PM',
            endTime: '03:30 PM',
            days: ['Tuesday', 'Thursday']
        },
        {
            id: 's4',
            course: 'ENG105',
            title: 'Academic Writing',
            location: 'Humanities Building, Room 210',
            startTime: '04:00 PM',
            endTime: '05:30 PM',
            days: ['Tuesday', 'Thursday']
        }
    ]
};

// Initialize the student portal
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    
    // Initialize dashboard
    loadDashboard();
    
    // Initialize courses section
    loadCoursesSection();
    
    // Initialize sidebar toggle
    initSidebarToggle();
    
    // Initialize dropdown menus
    initDropdowns();
    
    // Initialize notification functionality
    initNotifications();
    
    // Initialize profile functionality
    initProfileDropdown();
    
    // Check authentication
    checkAuth();
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
            if (link.getAttribute('onclick')) {
                return; // Skip for logout links
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
            breadcrumb.textContent = `Home / Student Portal / ${pageTitle}`;
            
            // Initialize section-specific components
            initializeSection(pageId);
        });
    });
    
    // Also handle widget links
    document.querySelectorAll('.widget-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            if (targetPage) {
                // Find and click the corresponding sidebar link
                const sidebarLink = document.querySelector(`.sidebar-menu-link[data-page="${targetPage}"]`);
                if (sidebarLink) {
                    sidebarLink.click();
                }
            }
        });
    });
}

// Initialize sidebar toggle
// function initSidebarToggle() {
//     const sidebarToggle = document.getElementById('sidebarToggle');
//     const mainLayout = document.getElementById('mainLayout');
//     const toggleIcon = document.getElementById('toggleIcon');
//     if (sidebarToggle && mainLayout) {
//         sidebarToggle.addEventListener('click', () => {
//             mainLayout.classList.toggle('sidebar-collapsed');
//             if (toggleIcon) {
//                 toggleIcon.classList.toggle('fa-chevron-right');
//                 toggleIcon.classList.toggle('fa-chevron-left');
//             }
//         });
//     }
// }

// Initialize dropdown menus
function initDropdowns() {
    // User profile dropdown
    const userProfile = document.getElementById('userProfile');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (userProfile && profileDropdown) {
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
    }
    
    // Notification dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
        });
    }
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', () => {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
    
    // Prevent dropdown close when clicking inside dropdown
    document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
    
    // Close button in dropdowns
    document.querySelectorAll('.dropdown-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const dropdown = closeBtn.closest('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        });
    });
}

// Load dashboard content
function loadDashboard() {
    // Update welcome name
    const welcomeName = document.getElementById('welcomeName');
    if (welcomeName) {
        const userData = SessionManager.getSession();
        if (userData) {
            welcomeName.textContent = userData.name.split(' ')[0];
        }
    }
    
    // Assignments widget is already populated in the HTML
    
    // Schedule widget is already populated in the HTML
    
    // Additional dynamic content can be added here
}

// Load courses section
function loadCoursesSection() {
    const coursesGrid = document.querySelector('.courses-grid');
    if (!coursesGrid) return;
    
    // Clear existing content
    coursesGrid.innerHTML = '';
    
    // Add course cards
    studentData.courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

// Enhanced function to create course cards with click functionality
function createCourseCard(course) {
    const progressWidth = course.progress + '%';
    const card = document.createElement('div');
    card.className = `course-card ${course.category}`;
    card.dataset.courseId = course.id;
    
    card.innerHTML = `
        <div class="course-banner">
            <img src="${course.imageUrl}" alt="${course.title}">
        </div>
        <div class="course-content">
            <div class="course-meta">
                <div class="course-code">${course.code}</div>
                <div class="course-semester">${course.semester}</div>
            </div>
            <h3 class="course-title">${course.title}</h3>
            <div class="course-instructor">${course.instructor}</div>
            <div class="course-progress">
                <div class="course-progress-label">
                    <div class="course-progress-text">Progress</div>
                    <div class="course-progress-value">${course.progress}%</div>
                </div>
                <div class="course-progress-bar">
                    <div class="course-progress-fill" style="width: ${progressWidth}; background: var(--primary-blue);"></div>
                </div>
            </div>
            <div class="course-stats">
                <div class="course-stat">
                    <div class="course-stat-value">${course.grade}</div>
                    <div class="course-stat-label">Grade</div>
                </div>
                <div class="course-stat">
                    <div class="course-stat-value">${course.credits}</div>
                    <div class="course-stat-label">Credits</div>
                </div>
                <div class="course-stat">
                    <div class="course-stat-value">${course.dueSoon}</div>
                    <div class="course-stat-label">Due Soon</div>
                </div>
            </div>
        </div>
    `;
    
    // Add click event listener to show course details
    card.addEventListener('click', () => showCourseDetails(course));
    
    return card;
}

// Function to show course details in a modal
function showCourseDetails(course) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content slide-in-up';
    
    // Populate modal with course details
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${course.title}</h2>
            <button class="modal-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="modal-body">
            <div class="course-detail-banner">
                <img src="${course.imageUrl}" alt="${course.title}">
            </div>
            <div class="course-detail-info">
                <div class="course-detail-item">
                    <span class="detail-label">Course Code:</span>
                    <span class="detail-value">${course.code}</span>
                </div>
                <div class="course-detail-item">
                    <span class="detail-label">Instructor:</span>
                    <span class="detail-value">${course.instructor}</span>
                </div>
                <div class="course-detail-item">
                    <span class="detail-label">Semester:</span>
                    <span class="detail-value">${course.semester}</span>
                </div>
                <div class="course-detail-item">
                    <span class="detail-label">Credits:</span>
                    <span class="detail-value">${course.credits}</span>
                </div>
                <div class="course-detail-item">
                    <span class="detail-label">Current Grade:</span>
                    <span class="detail-value grade-${course.grade.charAt(0).toLowerCase()}">${course.grade}</span>
                </div>
            </div>
            
            <div class="course-detail-section">
                <h3>Course Progress</h3>
                <div class="course-progress">
                    <div class="course-progress-label">
                        <div class="course-progress-text">Overall Progress</div>
                        <div class="course-progress-value">${course.progress}%</div>
                    </div>
                    <div class="course-progress-bar">
                        <div class="course-progress-fill" style="width: ${course.progress}%; background: var(--primary-blue);"></div>
                    </div>
                </div>
            </div>
            
            <div class="course-detail-section">
                <h3>Upcoming Assignments</h3>
                <div class="course-assignments">
                    ${getCourseAssignments(course.code)}
                </div>
            </div>
            
            <div class="course-detail-section">
                <h3>Recent Grades</h3>
                <div class="course-grades">
                    ${getCourseGrades(course.code)}
                </div>
            </div>
            
            <div class="course-detail-section">
                <h3>Schedule</h3>
                <div class="course-schedule">
                    ${getCourseSchedule(course.code)}
                </div>
            </div>
            
            <div class="course-detail-actions">
                <button class="btn-primary" id="accessMaterialsBtn"><i class="fas fa-book-open"></i> Access Course Materials</button>
                <button class="btn-secondary" id="contactInstructorBtn"><i class="fas fa-envelope"></i> Contact Instructor</button>
            </div>
        </div>
    `;
    
    // Append modal to body
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Add event listener to close modal
    modalContent.querySelector('.modal-close').addEventListener('click', () => {
        modalOverlay.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
            }, 300);
        }
    });

    // Add event listener for Access Course Materials button
    const accessMaterialsBtn = modalContent.querySelector('#accessMaterialsBtn');
    accessMaterialsBtn.addEventListener('click', () => {
        // Create materials modal
        const materialsModal = document.createElement('div');
        materialsModal.className = 'modal-overlay';
        materialsModal.innerHTML = `
            <div class="modal-content slide-in-up">
                <div class="modal-header">
                    <h2>Course Materials - ${course.code}</h2>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="materials-grid">
                        <div class="material-card">
                            <div class="material-icon">
                                <i class="fas fa-file-pdf"></i>
                            </div>
                            <div class="material-content">
                                <h4>Course Syllabus</h4>
                                <p>Course overview and requirements</p>
                                <div class="material-meta">
                                    <span><i class="fas fa-clock"></i> Added 2 weeks ago</span>
                                    <span><i class="fas fa-download"></i> 45 downloads</span>
                                </div>
                            </div>
                            <div class="material-actions">
                                <button class="btn-secondary">Preview</button>
                                <button class="btn-primary">Download</button>
                            </div>
                        </div>
                        <div class="material-card">
                            <div class="material-icon">
                                <i class="fas fa-file-powerpoint"></i>
                            </div>
                            <div class="material-content">
                                <h4>Lecture Slides - Week 1</h4>
                                <p>Introduction to ${course.title}</p>
                                <div class="material-meta">
                                    <span><i class="fas fa-clock"></i> Added 1 week ago</span>
                                    <span><i class="fas fa-download"></i> 38 downloads</span>
                                </div>
                            </div>
                            <div class="material-actions">
                                <button class="btn-secondary">Preview</button>
                                <button class="btn-primary">Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(materialsModal);

        // Close materials modal
        materialsModal.querySelector('.modal-close').addEventListener('click', () => {
            materialsModal.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(materialsModal);
            }, 300);
        });

        // Close materials modal when clicking outside
        materialsModal.addEventListener('click', (e) => {
            if (e.target === materialsModal) {
                materialsModal.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(materialsModal);
                }, 300);
            }
        });

        // Add event listeners for material action buttons
        materialsModal.querySelectorAll('.material-actions button').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.textContent.trim();
                const materialTitle = btn.closest('.material-card').querySelector('h4').textContent;
                showNotification(`${action}ing ${materialTitle}...`, 'info');
            });
        });
    });

    // Add event listener for Contact Instructor button
    const contactInstructorBtn = modalContent.querySelector('#contactInstructorBtn');
    contactInstructorBtn.addEventListener('click', () => {
        // Create message modal
        const messageModal = document.createElement('div');
        messageModal.className = 'modal-overlay';
        messageModal.innerHTML = `
            <div class="modal-content slide-in-up">
                <div class="modal-header">
                    <h2>Contact ${course.instructor}</h2>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <form id="contactInstructorForm" class="contact-form">
                        <div class="form-group">
                            <label for="messageSubject">Subject</label>
                            <input type="text" id="messageSubject" class="form-control" placeholder="Enter message subject" required>
                        </div>
                        <div class="form-group">
                            <label for="messageContent">Message</label>
                            <textarea id="messageContent" class="form-control" rows="5" placeholder="Type your message here..." required></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" id="cancelMessageBtn">Cancel</button>
                            <button type="submit" class="btn-primary">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(messageModal);

        // Close message modal
        messageModal.querySelector('.modal-close').addEventListener('click', () => {
            messageModal.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(messageModal);
            }, 300);
        });

        // Cancel button
        messageModal.querySelector('#cancelMessageBtn').addEventListener('click', () => {
            messageModal.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(messageModal);
            }, 300);
        });

        // Form submission
        messageModal.querySelector('#contactInstructorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = messageModal.querySelector('#messageSubject').value;
            const content = messageModal.querySelector('#messageContent').value;
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Close the modal
            messageModal.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(messageModal);
            }, 300);
        });

        // Close message modal when clicking outside
        messageModal.addEventListener('click', (e) => {
            if (e.target === messageModal) {
                messageModal.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(messageModal);
                }, 300);
            }
        });
    });
}

// Function to get assignments for a specific course
function getCourseAssignments(courseCode) {
    const assignments = studentData.assignments.filter(assignment => assignment.course === courseCode);
    
    if (assignments.length === 0) {
        return '<p class="empty-state">No upcoming assignments for this course.</p>';
    }
    
    return assignments.map(assignment => `
        <div class="assignment-item">
            <div class="assignment-icon ${assignment.priority === 'high' ? 'urgent' : ''}">
                <i class="fas fa-clipboard-list"></i>
            </div>
            <div class="assignment-details">
                <h4>${assignment.title}</h4>
                <p>Due: ${assignment.dueDate}</p>
            </div>
            <div class="assignment-status">
                <span class="status-badge ${assignment.status}">${assignment.status}</span>
            </div>
        </div>
    `).join('');
}

// Function to get grades for a specific course
function getCourseGrades(courseCode) {
    const grades = studentData.grades.filter(grade => grade.course === courseCode);
    
    if (grades.length === 0) {
        return '<p class="empty-state">No grades available for this course yet.</p>';
    }
    
    return grades.map(grade => `
        <div class="grade-item ${grade.grade.charAt(0).toLowerCase()}">
            <div class="grade-details">
                <h4>${grade.title}</h4>
                <p>${grade.date}</p>
            </div>
            <div class="grade-value ${getGradeClass(grade.grade)}">${grade.score}% (${grade.grade})</div>
        </div>
    `).join('');
}

// Function to get schedule for a specific course
function getCourseSchedule(courseCode) {
    const scheduleItems = studentData.schedule.filter(item => item.course === courseCode);
    
    if (scheduleItems.length === 0) {
        return '<p class="empty-state">No schedule information available for this course.</p>';
    }
    
    return scheduleItems.map(item => `
        <div class="schedule-item">
            <div class="schedule-time">${item.startTime} - ${item.endTime}</div>
            <div class="schedule-days">${item.days.join(', ')}</div>
            <div class="schedule-location">${item.location}</div>
        </div>
    `).join('');
}

// Helper function to get grade class
function getGradeClass(grade) {
    const firstLetter = grade.charAt(0).toLowerCase();
    if (firstLetter === 'a') return 'excellent';
    if (firstLetter === 'b') return 'good';
    if (firstLetter === 'c') return 'average';
    return 'poor';
}

// Function to initialize notification functionality
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
            
            // Mark notifications as read when opened
            if (notificationDropdown.classList.contains('active')) {
                const badge = notificationBtn.querySelector('.notification-badge');
                if (badge) {
                    // Animate the badge disappearing
                    badge.style.animation = 'fadeOut 0.5s ease forwards';
                    setTimeout(() => {
                        badge.style.display = 'none';
                    }, 500);
                }
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            notificationDropdown.classList.remove('active');
        });
        
        // Prevent dropdown from closing when clicking inside
        notificationDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close button functionality
        const closeBtn = notificationDropdown.querySelector('.dropdown-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notificationDropdown.classList.remove('active');
            });
        }
    }
}

// Function to initialize profile dropdown functionality
function initProfileDropdown() {
    const userProfile = document.getElementById('userProfile');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (userProfile && profileDropdown) {
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            profileDropdown.classList.remove('active');
        });
        
        // Prevent dropdown from closing when clicking inside
        profileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close button functionality
        const closeBtn = profileDropdown.querySelector('.dropdown-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                profileDropdown.classList.remove('active');
            });
        }
    }
}

// Initialize specific section
function initializeSection(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'courses':
            loadCoursesSection();
            break;
        case 'assignments':
            loadAssignmentsSection();
            break;
        case 'grades':
            loadGradesSection();
            break;
        case 'schedule':
            loadScheduleSection();
            break;
        case 'planner':
            loadStudyPlannerSection();
            break;
        case 'messages':
            if (window.loadMessagesSection) window.loadMessagesSection();
            break;
        case 'resources':
            if (window.loadResourcesSection) window.loadResourcesSection();
            break;
        case 'settings':
            if (window.loadSettingsSection) window.loadSettingsSection();
            break;
        case 'announcements':
            loadAnnouncementsSection();
            break;
        // Additional sections can be added here
    }
}

// Load assignments section
function loadAssignmentsSection() {
    const assignmentsSection = document.getElementById('assignmentsSection');
    if (!assignmentsSection) return;
    
    // Add quick actions
    let quickActions = assignmentsSection.querySelector('.quick-actions');
    if (!quickActions) {
        quickActions = document.createElement('div');
        quickActions.className = 'quick-actions';
        quickActions.innerHTML = `
            <button class="quick-action-btn primary" id="filterAssignmentsBtn">
                <i class="fas fa-filter"></i>
                Filter Assignments
            </button>
            <button class="quick-action-btn" id="sortAssignmentsBtn">
                <i class="fas fa-sort"></i>
                Sort by Due Date
            </button>
            <button class="quick-action-btn" id="viewCompletedBtn">
                <i class="fas fa-check-circle"></i>
                View Completed
            </button>
            <button class="quick-action-btn" id="exportListBtn">
                <i class="fas fa-download"></i>
                Export List
            </button>
        `;
        assignmentsSection.prepend(quickActions);
    }
    
    // Create assignments list if not exists
    let assignmentsList = assignmentsSection.querySelector('.assignments-list');
    if (!assignmentsList) {
        // Create assignments container
        const assignmentsContainer = document.createElement('div');
        assignmentsContainer.className = 'assignments-container';
        
        assignmentsList = document.createElement('div');
        assignmentsList.className = 'assignments-list';
        
        // Add assignments to the list
        studentData.assignments.forEach(assignment => {
            const assignmentItem = document.createElement('div');
            assignmentItem.className = 'assignment-item';
            
            // Determine if assignment is urgent
            const isUrgent = assignment.priority === 'high';
            
            assignmentItem.innerHTML = `
                <div class="assignment-icon ${isUrgent ? 'urgent' : ''}">
                    <i class="fas ${isUrgent ? 'fa-exclamation-circle' : 'fa-clipboard-list'}"></i>
                </div>
                <div class="assignment-details">
                    <h4>${assignment.title}</h4>
                    <p>${assignment.course} - Due ${assignment.dueDate}</p>
                </div>
                <div class="assignment-status">
                    <span class="status-badge ${assignment.status}">${assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}</span>
                </div>
                <div class="assignment-actions">
                    <button class="student-action-btn" title="View Details" data-id="${assignment.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="student-action-btn" title="Submit Assignment" data-id="${assignment.id}">
                        <i class="fas fa-upload"></i>
                    </button>
                </div>
            `;
            
            assignmentsList.appendChild(assignmentItem);
        });
        
        assignmentsContainer.appendChild(assignmentsList);
        assignmentsSection.appendChild(assignmentsContainer);
    }

    // Add event listeners for quick action buttons
    const filterBtn = assignmentsSection.querySelector('#filterAssignmentsBtn');
    const sortBtn = assignmentsSection.querySelector('#sortAssignmentsBtn');
    const viewCompletedBtn = assignmentsSection.querySelector('#viewCompletedBtn');
    const exportBtn = assignmentsSection.querySelector('#exportListBtn');

    // Filter Assignments
    filterBtn.addEventListener('click', () => {
        const filterModal = document.createElement('div');
        filterModal.className = 'modal-overlay';
        filterModal.innerHTML = `
            <div class="modal-content slide-in-up">
                <div class="modal-header">
                    <h2>Filter Assignments</h2>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <form id="filterForm">
                        <div class="form-group">
                            <label>Course</label>
                            <select class="form-control" id="filterCourse">
                                <option value="">All Courses</option>
                                ${[...new Set(studentData.assignments.map(a => a.course))].map(course => 
                                    `<option value="${course}">${course}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select class="form-control" id="filterStatus">
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="overdue">Overdue</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Priority</label>
                            <select class="form-control" id="filterPriority">
                                <option value="">All Priorities</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" id="resetFilter">Reset</button>
                            <button type="submit" class="btn-primary">Apply Filter</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(filterModal);

        // Close modal
        filterModal.querySelector('.modal-close').addEventListener('click', () => {
            filterModal.classList.add('fade-out');
            setTimeout(() => filterModal.remove(), 300);
        });

        // Reset filter
        filterModal.querySelector('#resetFilter').addEventListener('click', () => {
            filterModal.querySelector('#filterCourse').value = '';
            filterModal.querySelector('#filterStatus').value = '';
            filterModal.querySelector('#filterPriority').value = '';
        });

        // Apply filter
        filterModal.querySelector('#filterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const course = filterModal.querySelector('#filterCourse').value;
            const status = filterModal.querySelector('#filterStatus').value;
            const priority = filterModal.querySelector('#filterPriority').value;

            const filteredAssignments = studentData.assignments.filter(assignment => {
                return (!course || assignment.course === course) &&
                       (!status || assignment.status === status) &&
                       (!priority || assignment.priority === priority);
            });

            updateAssignmentsList(filteredAssignments);
            filterModal.classList.add('fade-out');
            setTimeout(() => filterModal.remove(), 300);
        });
    });

    // Sort Assignments
    sortBtn.addEventListener('click', () => {
        const sortedAssignments = [...studentData.assignments].sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return dateA - dateB;
        });
        updateAssignmentsList(sortedAssignments);
        showNotification('Assignments sorted by due date', 'info');
    });

    // View Completed
    viewCompletedBtn.addEventListener('click', () => {
        const completedAssignments = studentData.assignments.filter(a => a.status === 'completed');
        updateAssignmentsList(completedAssignments);
        showNotification('Showing completed assignments', 'info');
    });

    // Export List
    exportBtn.addEventListener('click', () => {
        const csvContent = [
            ['Title', 'Course', 'Due Date', 'Status', 'Priority'],
            ...studentData.assignments.map(a => [
                a.title,
                a.course,
                a.dueDate,
                a.status,
                a.priority
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'assignments.csv';
        link.click();
        showNotification('Assignments exported successfully', 'success');
    });

    // View Assignment Details
    assignmentsList.querySelectorAll('.student-action-btn[title="View Details"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const assignmentId = btn.dataset.id;
            const assignment = studentData.assignments.find(a => a.id === assignmentId);
            if (assignment) {
                showAssignmentDetails(assignment);
            }
        });
    });

    // Submit Assignment
    assignmentsList.querySelectorAll('.student-action-btn[title="Submit Assignment"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const assignmentId = btn.dataset.id;
            const assignment = studentData.assignments.find(a => a.id === assignmentId);
            if (assignment) {
                showSubmitAssignmentModal(assignment);
            }
        });
    });
}

// Function to update assignments list
function updateAssignmentsList(assignments) {
    const assignmentsList = document.querySelector('.assignments-list');
    if (!assignmentsList) return;

    assignmentsList.innerHTML = '';
    assignments.forEach(assignment => {
        const assignmentItem = document.createElement('div');
        assignmentItem.className = 'assignment-item';
        const isUrgent = assignment.priority === 'high';
        
        assignmentItem.innerHTML = `
            <div class="assignment-icon ${isUrgent ? 'urgent' : ''}">
                <i class="fas ${isUrgent ? 'fa-exclamation-circle' : 'fa-clipboard-list'}"></i>
            </div>
            <div class="assignment-details">
                <h4>${assignment.title}</h4>
                <p>${assignment.course} - Due ${assignment.dueDate}</p>
            </div>
            <div class="assignment-status">
                <span class="status-badge ${assignment.status}">${assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}</span>
            </div>
            <div class="assignment-actions">
                <button class="student-action-btn" title="View Details" data-id="${assignment.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="student-action-btn" title="Submit Assignment" data-id="${assignment.id}">
                    <i class="fas fa-upload"></i>
                </button>
            </div>
        `;
        
        assignmentsList.appendChild(assignmentItem);
    });

    // Reattach event listeners
    attachAssignmentEventListeners();
}

// Function to show assignment details
function showAssignmentDetails(assignment) {
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal-overlay';
    detailsModal.innerHTML = `
        <div class="modal-content slide-in-up">
            <div class="modal-header">
                <h2>${assignment.title}</h2>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="assignment-detail-info">
                    <div class="detail-item">
                        <label>Course:</label>
                        <span>${assignment.course}</span>
                    </div>
                    <div class="detail-item">
                        <label>Due Date:</label>
                        <span>${assignment.dueDate}</span>
                    </div>
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="status-badge ${assignment.status}">${assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Priority:</label>
                        <span class="priority-badge ${assignment.priority}">${assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}</span>
                    </div>
                </div>
                <div class="assignment-description">
                    <h3>Description</h3>
                    <p>This is a detailed description of the assignment. It includes all the requirements and guidelines for completion.</p>
                </div>
                <div class="assignment-requirements">
                    <h3>Requirements</h3>
                    <ul>
                        <li>Complete all tasks as specified</li>
                        <li>Follow the formatting guidelines</li>
                        <li>Submit before the deadline</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(detailsModal);

    // Close modal
    detailsModal.querySelector('.modal-close').addEventListener('click', () => {
        detailsModal.classList.add('fade-out');
        setTimeout(() => detailsModal.remove(), 300);
    });

    // Close when clicking outside
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.classList.add('fade-out');
            setTimeout(() => detailsModal.remove(), 300);
        }
    });
}

// Function to show submit assignment modal
function showSubmitAssignmentModal(assignment) {
    const submitModal = document.createElement('div');
    submitModal.className = 'modal-overlay';
    submitModal.innerHTML = `
        <div class="modal-content slide-in-up">
            <div class="modal-header">
                <h2>Submit Assignment - ${assignment.title}</h2>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="submitAssignmentForm">
                    <div class="form-group">
                        <label>Upload Files</label>
                        <div class="file-upload-area">
                            <input type="file" id="assignmentFile" multiple>
                            <div class="file-upload-content">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <p>Drag files here or click to browse</p>
                                <span class="file-upload-subtext">Max file size: 10MB</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="assignmentComment">Comments (Optional)</label>
                        <textarea id="assignmentComment" class="form-control" rows="3" placeholder="Add any comments or notes about your submission"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" id="cancelSubmit">Cancel</button>
                        <button type="submit" class="btn-primary">Submit Assignment</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(submitModal);

    // Handle file upload
    const fileInput = submitModal.querySelector('#assignmentFile');
    const uploadArea = submitModal.querySelector('.file-upload-area');
    
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            uploadArea.classList.add('has-files');
            uploadArea.querySelector('p').textContent = `${files.length} file(s) selected`;
        }
    });

    // Form submission
    submitModal.querySelector('#submitAssignmentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const comment = submitModal.querySelector('#assignmentComment').value;
        
        // Simulate file upload
        showNotification('Uploading files...', 'info');
        
        setTimeout(() => {
            // Update assignment status
            assignment.status = 'completed';
            updateAssignmentsList(studentData.assignments);
            
            // Show success message
            showNotification('Assignment submitted successfully!', 'success');
            
            // Close modal
            submitModal.classList.add('fade-out');
            setTimeout(() => submitModal.remove(), 300);
        }, 2000);
    });

    // Close modal
    submitModal.querySelector('.modal-close').addEventListener('click', () => {
        submitModal.classList.add('fade-out');
        setTimeout(() => submitModal.remove(), 300);
    });

    // Cancel button
    submitModal.querySelector('#cancelSubmit').addEventListener('click', () => {
        submitModal.classList.add('fade-out');
        setTimeout(() => submitModal.remove(), 300);
    });

    // Close when clicking outside
    submitModal.addEventListener('click', (e) => {
        if (e.target === submitModal) {
            submitModal.classList.add('fade-out');
            setTimeout(() => submitModal.remove(), 300);
        }
    });
}

// Function to attach event listeners to assignment actions
function attachAssignmentEventListeners() {
    // View Assignment Details
    document.querySelectorAll('.student-action-btn[title="View Details"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const assignmentId = btn.dataset.id;
            const assignment = studentData.assignments.find(a => a.id === assignmentId);
            if (assignment) {
                showAssignmentDetails(assignment);
            }
        });
    });

    // Submit Assignment
    document.querySelectorAll('.student-action-btn[title="Submit Assignment"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const assignmentId = btn.dataset.id;
            const assignment = studentData.assignments.find(a => a.id === assignmentId);
            if (assignment) {
                showSubmitAssignmentModal(assignment);
            }
        });
    });
}

// Load grades section
function loadGradesSection() {
    const gradesSection = document.getElementById('gradesSection');
    if (!gradesSection) return;
    
    // Add quick actions
    let quickActions = gradesSection.querySelector('.quick-actions');
    if (!quickActions) {
        quickActions = document.createElement('div');
        quickActions.className = 'quick-actions';
        quickActions.innerHTML = `
            <button class="quick-action-btn primary" id="gpaCalculatorBtn">
                <i class="fas fa-calculator"></i>
                GPA Calculator
            </button>
            <button class="quick-action-btn" id="filterGradesBtn">
                <i class="fas fa-filter"></i>
                Filter Grades
            </button>
            <button class="quick-action-btn" id="sortGradesBtn">
                <i class="fas fa-sort"></i>
                Sort by Date
            </button>
            <button class="quick-action-btn" id="exportGradesBtn">
                <i class="fas fa-download"></i>
                Export Grades
            </button>
            <button class="quick-action-btn" id="viewTranscriptBtn">
                <i class="fas fa-file-alt"></i>
                View Transcript
            </button>
        `;
        gradesSection.prepend(quickActions);
    }
    
    // Create grades container if not exists
    let gradesContainer = gradesSection.querySelector('.grades-container');
    if (!gradesContainer) {
        gradesContainer = document.createElement('div');
        gradesContainer.className = 'grades-container';
        
        // Add grade summary
        const gradeSummary = document.createElement('div');
        gradeSummary.className = 'grade-summary';
        gradeSummary.innerHTML = `
            <div class="grade-summary-card">
                <div class="grade-value excellent">3.9</div>
                <div class="grade-label">Current GPA</div>
            </div>
            <div class="grade-summary-card">
                <div class="grade-value good">85%</div>
                <div class="grade-label">Semester Average</div>
            </div>
            <div class="grade-summary-card">
                <div class="grade-value">12</div>
                <div class="grade-label">Courses Completed</div>
            </div>
        `;
        gradesContainer.appendChild(gradeSummary);
        
        // Add course selector
        const courseSelector = document.createElement('div');
        courseSelector.className = 'grades-selector-container';
        courseSelector.innerHTML = `
            <select class="grades-selector" id="courseSelector">
                <option value="all">All Courses</option>
                <option value="CS101">CS101 - Introduction to Programming</option>
                <option value="CS201">CS201 - Data Structures</option>
                <option value="CS350">CS350 - Database Systems</option>
            </select>
        `;
        gradesContainer.appendChild(courseSelector);
        
        // Add grades list
        const gradesList = document.createElement('div');
        gradesList.className = 'grades-list';
        gradesList.innerHTML = `
            <div class="grade-item a">
                <div class="grade-item-header">
                    <div class="grade-item-title">Algorithms Quiz</div>
                    <div class="grade-item-score">95%</div>
                </div>
                <div class="grade-item-meta">
                    <span>CS201</span>
                    <span>Oct 10, 2023</span>
                </div>
                <div class="grade-progress">
                    <div class="grade-progress-fill a" style="width: 95%"></div>
                </div>
            </div>
            <div class="grade-item b">
                <div class="grade-item-header">
                    <div class="grade-item-title">Programming Lab #2</div>
                    <div class="grade-item-score">88%</div>
                </div>
                <div class="grade-item-meta">
                    <span>CS101</span>
                    <span>Oct 8, 2023</span>
                </div>
                <div class="grade-progress">
                    <div class="grade-progress-fill b" style="width: 88%"></div>
                </div>
            </div>
            <div class="grade-item a">
                <div class="grade-item-header">
                    <div class="grade-item-title">Database Concepts</div>
                    <div class="grade-item-score">92%</div>
                </div>
                <div class="grade-item-meta">
                    <span>CS350</span>
                    <span>Oct 5, 2023</span>
                </div>
                <div class="grade-progress">
                    <div class="grade-progress-fill a" style="width: 92%"></div>
                </div>
            </div>
        `;
        gradesContainer.appendChild(gradesList);
        
        gradesSection.appendChild(gradesContainer);
    }

    // Add event listeners for quick action buttons
    const filterBtn = gradesSection.querySelector('#filterGradesBtn');
    const sortBtn = gradesSection.querySelector('#sortGradesBtn');
    const exportBtn = gradesSection.querySelector('#exportGradesBtn');
    const transcriptBtn = gradesSection.querySelector('#viewTranscriptBtn');
    const courseSelector = gradesSection.querySelector('#courseSelector');

    // Filter Grades
    filterBtn.addEventListener('click', () => {
        const filterModal = document.createElement('div');
        filterModal.className = 'modal-overlay';
        filterModal.innerHTML = `
            <div class="modal-content slide-in-up">
                <div class="modal-header">
                    <h2>Filter Grades</h2>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <form id="filterGradesForm">
                        <div class="form-group">
                            <label>Course</label>
                            <select class="form-control" id="filterCourse">
                                <option value="">All Courses</option>
                                <option value="CS101">CS101 - Introduction to Programming</option>
                                <option value="CS201">CS201 - Data Structures</option>
                                <option value="CS350">CS350 - Database Systems</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Grade Range</label>
                            <select class="form-control" id="filterGradeRange">
                                <option value="">All Grades</option>
                                <option value="a">A (90-100)</option>
                                <option value="b">B (80-89)</option>
                                <option value="c">C (70-79)</option>
                                <option value="d">D (60-69)</option>
                                <option value="f">F (Below 60)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Date Range</label>
                            <div class="date-range">
                                <input type="date" class="form-control" id="filterStartDate">
                                <span>to</span>
                                <input type="date" class="form-control" id="filterEndDate">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" id="resetFilter">Reset</button>
                            <button type="submit" class="btn-primary">Apply Filter</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(filterModal);

        // Close modal
        filterModal.querySelector('.modal-close').addEventListener('click', () => {
            filterModal.classList.add('fade-out');
            setTimeout(() => filterModal.remove(), 300);
        });
    
        // Reset filter
        filterModal.querySelector('#resetFilter').addEventListener('click', () => {
            filterModal.querySelector('#filterCourse').value = '';
            filterModal.querySelector('#filterGradeRange').value = '';
            filterModal.querySelector('#filterStartDate').value = '';
            filterModal.querySelector('#filterEndDate').value = '';
        });

        // Apply filter
        filterModal.querySelector('#filterGradesForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const course = filterModal.querySelector('#filterCourse').value;
            const gradeRange = filterModal.querySelector('#filterGradeRange').value;
            const startDate = filterModal.querySelector('#filterStartDate').value;
            const endDate = filterModal.querySelector('#filterEndDate').value;

            // Update grades list based on filters
            updateGradesList(course, gradeRange, startDate, endDate);
            
            filterModal.classList.add('fade-out');
            setTimeout(() => filterModal.remove(), 300);
        });
    });

    // Sort Grades
    sortBtn.addEventListener('click', () => {
        const gradesList = gradesSection.querySelector('.grades-list');
        const gradeItems = Array.from(gradesList.children);
        
        gradeItems.sort((a, b) => {
            const dateA = new Date(a.querySelector('.grade-item-meta span:last-child').textContent);
            const dateB = new Date(b.querySelector('.grade-item-meta span:last-child').textContent);
            return dateB - dateA;
        });
        
        gradesList.innerHTML = '';
        gradeItems.forEach(item => gradesList.appendChild(item));
        
        showNotification('Grades sorted by date', 'info');
    });

    // Export Grades
    exportBtn.addEventListener('click', () => {
        const gradesList = gradesSection.querySelector('.grades-list');
        const gradeItems = gradesList.querySelectorAll('.grade-item');
        
        const csvContent = [
            ['Course', 'Assignment', 'Grade', 'Date'],
            ...Array.from(gradeItems).map(item => [
                item.querySelector('.grade-item-meta span:first-child').textContent,
                item.querySelector('.grade-item-title').textContent,
                item.querySelector('.grade-item-score').textContent,
                item.querySelector('.grade-item-meta span:last-child').textContent
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'grades.csv';
        link.click();
        
        showNotification('Grades exported successfully', 'success');
    });

    // View Transcript
    transcriptBtn.addEventListener('click', () => {
        const transcriptModal = document.createElement('div');
        transcriptModal.className = 'modal-overlay';
        transcriptModal.innerHTML = `
            <div class="modal-content slide-in-up">
            <div class="modal-header">
                    <h2>Academic Transcript</h2>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                    <div class="transcript-header">
                        <div class="student-info">
                            <h3>Jane Smith</h3>
                            <p>Student ID: STU002</p>
                            <p>Major: Computer Science</p>
            </div>
                        <div class="transcript-summary">
                            <div class="summary-item">
                                <label>Current GPA:</label>
                                <span>3.9</span>
                            </div>
                            <div class="summary-item">
                                <label>Credits Completed:</label>
                                <span>54</span>
                            </div>
                        </div>
                    </div>
                    <div class="transcript-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Title</th>
                                    <th>Credits</th>
                                    <th>Grade</th>
                                    <th>Semester</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CS101</td>
                                    <td>Introduction to Programming</td>
                                    <td>3</td>
                                    <td>A</td>
                                    <td>Fall 2023</td>
                                </tr>
                                <tr>
                                    <td>CS201</td>
                                    <td>Data Structures</td>
                                    <td>3</td>
                                    <td>A-</td>
                                    <td>Fall 2023</td>
                                </tr>
                                <tr>
                                    <td>CS350</td>
                                    <td>Database Systems</td>
                                    <td>3</td>
                                    <td>B+</td>
                                    <td>Fall 2023</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="transcript-actions">
                        <button class="btn-primary" id="printTranscript">
                            <i class="fas fa-print"></i> Print Transcript
                        </button>
                        <button class="btn-secondary" id="downloadTranscript">
                            <i class="fas fa-download"></i> Download PDF
                        </button>
                    </div>
            </div>
        </div>
    `;
        document.body.appendChild(transcriptModal);
    
        // Close modal
        transcriptModal.querySelector('.modal-close').addEventListener('click', () => {
            transcriptModal.classList.add('fade-out');
            setTimeout(() => transcriptModal.remove(), 300);
        });

        // Print transcript
        transcriptModal.querySelector('#printTranscript').addEventListener('click', () => {
            window.print();
        });

        // Download transcript
        transcriptModal.querySelector('#downloadTranscript').addEventListener('click', () => {
            showNotification('Transcript downloaded successfully', 'success');
        });
    });

    // Course selector change
    courseSelector.addEventListener('change', (e) => {
        const selectedCourse = e.target.value;
        updateGradesList(selectedCourse);
    });

    // Add GPA Calculator functionality
    const gpaCalculatorBtn = gradesSection.querySelector('#gpaCalculatorBtn');
    gpaCalculatorBtn.addEventListener('click', () => {
        const calculatorModal = document.createElement('div');
        calculatorModal.className = 'modal-overlay';
        calculatorModal.innerHTML = `
            <div class="modal-content slide-in-up">
            <div class="modal-header">
                    <h2>GPA Calculator</h2>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                    <div class="gpa-calculator">
                        <div class="current-gpa">
                            <h3>Current GPA: <span id="currentGPA">3.9</span></h3>
                            <div class="gpa-scale">
                                <div class="scale-item">
                                    <span class="grade">A</span>
                                    <span class="points">4.0</span>
            </div>
                                <div class="scale-item">
                                    <span class="grade">A-</span>
                                    <span class="points">3.7</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">B+</span>
                                    <span class="points">3.3</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">B</span>
                                    <span class="points">3.0</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">B-</span>
                                    <span class="points">2.7</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">C+</span>
                                    <span class="points">2.3</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">C</span>
                                    <span class="points">2.0</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">C-</span>
                                    <span class="points">1.7</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">D+</span>
                                    <span class="points">1.3</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">D</span>
                                    <span class="points">1.0</span>
                                </div>
                                <div class="scale-item">
                                    <span class="grade">F</span>
                                    <span class="points">0.0</span>
                                </div>
                            </div>
                        </div>
                        <div class="calculator-form">
                            <h3>Calculate Future GPA</h3>
                            <div id="courseInputs">
                                <div class="course-input">
                                    <input type="text" class="form-control" placeholder="Course Name" />
                                    <select class="form-control grade-select">
                                        <option value="">Select Grade</option>
                                        <option value="4.0">A</option>
                                        <option value="3.7">A-</option>
                                        <option value="3.3">B+</option>
                                        <option value="3.0">B</option>
                                        <option value="2.7">B-</option>
                                        <option value="2.3">C+</option>
                                        <option value="2.0">C</option>
                                        <option value="1.7">C-</option>
                                        <option value="1.3">D+</option>
                                        <option value="1.0">D</option>
                                        <option value="0.0">F</option>
                                    </select>
                                    <select class="form-control credits-select">
                                        <option value="">Credits</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    <button class="btn-remove-course"><i class="fas fa-times"></i></button>
                                </div>
                            </div>
                            <button class="btn-secondary" id="addCourseBtn">
                                <i class="fas fa-plus"></i> Add Course
                            </button>
                            <div class="calculator-results">
                                <div class="result-item">
                                    <label>Projected GPA:</label>
                                    <span id="projectedGPA">-</span>
                                </div>
                                <div class="result-item">
                                    <label>Total Credits:</label>
                                    <span id="totalCredits">0</span>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button class="btn-primary" id="calculateGPABtn">Calculate</button>
                                <button class="btn-secondary" id="resetCalculatorBtn">Reset</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    `;
        document.body.appendChild(calculatorModal);

        // Close modal
        calculatorModal.querySelector('.modal-close').addEventListener('click', () => {
            calculatorModal.classList.add('fade-out');
            setTimeout(() => calculatorModal.remove(), 300);
        });

        // Add course input
        const addCourseBtn = calculatorModal.querySelector('#addCourseBtn');
        const courseInputs = calculatorModal.querySelector('#courseInputs');
        
        addCourseBtn.addEventListener('click', () => {
            const courseInput = document.createElement('div');
            courseInput.className = 'course-input';
            courseInput.innerHTML = `
                <input type="text" class="form-control" placeholder="Course Name" />
                <select class="form-control grade-select">
                    <option value="">Select Grade</option>
                    <option value="4.0">A</option>
                    <option value="3.7">A-</option>
                    <option value="3.3">B+</option>
                    <option value="3.0">B</option>
                    <option value="2.7">B-</option>
                    <option value="2.3">C+</option>
                    <option value="2.0">C</option>
                    <option value="1.7">C-</option>
                    <option value="1.3">D+</option>
                    <option value="1.0">D</option>
                    <option value="0.0">F</option>
                </select>
                <select class="form-control credits-select">
                    <option value="">Credits</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <button class="btn-remove-course"><i class="fas fa-times"></i></button>
            `;
            courseInputs.appendChild(courseInput);

            // Add remove button functionality
            courseInput.querySelector('.btn-remove-course').addEventListener('click', () => {
                courseInput.remove();
                calculateGPA();
            });
        });

        // Calculate GPA
        const calculateGPABtn = calculatorModal.querySelector('#calculateGPABtn');
        calculateGPABtn.addEventListener('click', calculateGPA);

        // Reset calculator
        const resetCalculatorBtn = calculatorModal.querySelector('#resetCalculatorBtn');
        resetCalculatorBtn.addEventListener('click', () => {
            courseInputs.innerHTML = '';
            calculatorModal.querySelector('#projectedGPA').textContent = '-';
            calculatorModal.querySelector('#totalCredits').textContent = '0';
            addCourseBtn.click(); // Add one empty course input
        });

        // Initial course input
        addCourseBtn.click();

        function calculateGPA() {
            const inputs = courseInputs.querySelectorAll('.course-input');
            let totalPoints = 0;
            let totalCredits = 0;

            inputs.forEach(input => {
                const grade = parseFloat(input.querySelector('.grade-select').value) || 0;
                const credits = parseInt(input.querySelector('.credits-select').value) || 0;
                totalPoints += grade * credits;
                totalCredits += credits;
            });

            const projectedGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '-';
            calculatorModal.querySelector('#projectedGPA').textContent = projectedGPA;
            calculatorModal.querySelector('#totalCredits').textContent = totalCredits;
        }

        // Add change event listeners to all selects
        courseInputs.addEventListener('change', (e) => {
            if (e.target.classList.contains('grade-select') || e.target.classList.contains('credits-select')) {
                calculateGPA();
            }
        });
    });
}

// Function to update grades list based on filters
function updateGradesList(course = 'all', gradeRange = '', startDate = '', endDate = '') {
    const gradesList = document.querySelector('.grades-list');
    if (!gradesList) return;

    // In a real application, this would fetch filtered data from the server
    // For this demo, we'll just update the UI with the current data
    const gradeItems = gradesList.querySelectorAll('.grade-item');
    
    gradeItems.forEach(item => {
        const itemCourse = item.querySelector('.grade-item-meta span:first-child').textContent;
        const itemGrade = item.className.split(' ')[1]; // a, b, c, etc.
        const itemDate = new Date(item.querySelector('.grade-item-meta span:last-child').textContent);
        
        const courseMatch = course === 'all' || itemCourse === course;
        const gradeMatch = !gradeRange || itemGrade === gradeRange;
        const dateMatch = (!startDate || itemDate >= new Date(startDate)) && 
                         (!endDate || itemDate <= new Date(endDate));
        
        item.style.display = courseMatch && gradeMatch && dateMatch ? 'block' : 'none';
    });
}

// Authentication check
function checkAuth() {
    // Check if user is logged in and is a student
    const userData = SessionManager.getSession();
    
    if (!userData) {
        // Redirect to login page
        NavigationController.navigateTo('login');
        return;
    }
    
    if (userData.role !== 'student') {
        // Show unauthorized message
        alert('You are not authorized to access the student portal.');
        // Redirect to appropriate page based on role
        NavigationController.navigateByRole();
        return;
    }
    
    // Update UI with student data
    updateStudentUI(userData);
}

// Update UI with student data
function updateStudentUI(userData) {
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

// Load schedule section
function loadScheduleSection() {
    const scheduleSection = document.getElementById('scheduleSection');
    if (!scheduleSection) return;
    
    // Clear existing content
    scheduleSection.innerHTML = '';
    
    // Create schedule header with quick actions
    const scheduleHeader = document.createElement('div');
    scheduleHeader.className = 'schedule-header';
    scheduleHeader.innerHTML = `
        <h2 class="section-title">Schedule</h2>
        <div class="quick-actions">
            <button class="quick-action-btn" id="viewWeekBtn">
                <i class="fas fa-calendar-week"></i> Week View
            </button>
            <button class="quick-action-btn" id="viewMonthBtn">
                <i class="fas fa-calendar-alt"></i> Month View
            </button>
            <button class="quick-action-btn" id="addEventBtn">
                <i class="fas fa-plus"></i> Add Event
            </button>
            <button class="quick-action-btn" id="exportScheduleBtn">
                <i class="fas fa-download"></i> Export
            </button>
        </div>
    `;
    scheduleSection.appendChild(scheduleHeader);
    
    // Create schedule container
    const scheduleContainer = document.createElement('div');
    scheduleContainer.className = 'schedule-container';
    
    // Create week view by default
    const weekView = document.createElement('div');
    weekView.className = 'schedule-week-view';
    weekView.innerHTML = `
        <div class="week-header">
            <button class="week-nav-btn" id="prevWeekBtn">
                <i class="fas fa-chevron-left"></i>
            </button>
            <h3 id="currentWeekDisplay">Week of October 15, 2023</h3>
            <button class="week-nav-btn" id="nextWeekBtn">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="week-grid">
            <div class="time-column">
                <div class="time-header"></div>
                ${generateTimeSlots()}
            </div>
            ${generateWeekDays()}
        </div>
    `;
    scheduleContainer.appendChild(weekView);
    scheduleSection.appendChild(scheduleContainer);
    
    // Sample schedule data
    const scheduleData = {
        classes: [
            {
                id: 'class1',
                name: 'CS101: Introduction to Programming',
                instructor: 'Prof. Williams',
                location: 'Science Building, Room 203',
                days: ['Monday', 'Wednesday'],
                startTime: '09:00',
                endTime: '10:30',
                type: 'class'
            },
            {
                id: 'class2',
                name: 'CS201: Data Structures',
                instructor: 'Prof. Johnson',
                location: 'Engineering Building, Room 105',
                days: ['Tuesday', 'Thursday'],
                startTime: '11:00',
                endTime: '12:30',
                type: 'class'
            },
            {
                id: 'class3',
                name: 'CS350: Database Systems',
                instructor: 'Prof. Davis',
                location: 'Science Building, Room 105',
                days: ['Monday', 'Wednesday'],
                startTime: '14:00',
                endTime: '15:30',
                type: 'class'
            }
        ],
        events: [
            {
                id: 'event1',
                name: 'CS Club Meeting',
                location: 'Student Center, Room 101',
                day: 'Wednesday',
                startTime: '16:00',
                endTime: '17:00',
                type: 'event'
            },
            {
                id: 'event2',
                name: 'Study Group',
                location: 'Library, Study Room 3',
                day: 'Thursday',
                startTime: '15:00',
                endTime: '17:00',
                type: 'event'
            }
        ]
    };
    
    // Populate schedule with data
    populateSchedule(scheduleData);
    
    // Add event listeners
    const viewWeekBtn = scheduleSection.querySelector('#viewWeekBtn');
    const viewMonthBtn = scheduleSection.querySelector('#viewMonthBtn');
    const addEventBtn = scheduleSection.querySelector('#addEventBtn');
    const exportScheduleBtn = scheduleSection.querySelector('#exportScheduleBtn');
    const prevWeekBtn = scheduleSection.querySelector('#prevWeekBtn');
    const nextWeekBtn = scheduleSection.querySelector('#nextWeekBtn');
    
    // Week/Month view toggle
    viewWeekBtn.addEventListener('click', () => {
        viewWeekBtn.classList.add('active');
        viewMonthBtn.classList.remove('active');
        scheduleContainer.innerHTML = '';
        scheduleContainer.appendChild(weekView);
        populateSchedule(scheduleData);
    });
    
    viewMonthBtn.addEventListener('click', () => {
        viewMonthBtn.classList.add('active');
        viewWeekBtn.classList.remove('active');
        showMonthView(scheduleContainer);
    });
    
    // Add event
    addEventBtn.addEventListener('click', () => {
        showAddEventModal();
    });
    
    // Export schedule
    exportScheduleBtn.addEventListener('click', () => {
        exportSchedule(scheduleData);
    });
    
    // Week navigation
    let currentWeek = new Date();
    
    prevWeekBtn.addEventListener('click', () => {
        currentWeek.setDate(currentWeek.getDate() - 7);
        updateWeekDisplay(currentWeek);
        populateSchedule(scheduleData);
    });
    
    nextWeekBtn.addEventListener('click', () => {
        currentWeek.setDate(currentWeek.getDate() + 7);
        updateWeekDisplay(currentWeek);
        populateSchedule(scheduleData);
    });
}

// Helper function to generate time slots
function generateTimeSlots() {
    const timeSlots = [];
    for (let hour = 8; hour <= 20; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        timeSlots.push(`<div class="time-slot">${time}</div>`);
    }
    return timeSlots.join('');
}

// Helper function to generate week days
function generateWeekDays() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return days.map(day => `
        <div class="day-column" data-day="${day}">
            <div class="day-header">${day}</div>
            ${generateTimeSlots()}
        </div>
    `).join('');
}

// Helper function to populate schedule
function populateSchedule(scheduleData) {
    const weekGrid = document.querySelector('.week-grid');
    if (!weekGrid) return;
    
    // Clear existing events
    const eventElements = weekGrid.querySelectorAll('.schedule-event');
    eventElements.forEach(element => element.remove());
    
    // Add classes
    scheduleData.classes.forEach(classItem => {
        classItem.days.forEach(day => {
            const dayColumn = weekGrid.querySelector(`[data-day="${day}"]`);
            if (dayColumn) {
                const eventElement = createEventElement(classItem);
                const startTime = classItem.startTime.split(':')[0];
                const timeSlot = dayColumn.querySelector(`.time-slot:nth-child(${parseInt(startTime) - 7})`);
                if (timeSlot) {
                    timeSlot.appendChild(eventElement);
                }
            }
        });
    });
    
    // Add events
    scheduleData.events.forEach(event => {
        const dayColumn = weekGrid.querySelector(`[data-day="${event.day}"]`);
        if (dayColumn) {
            const eventElement = createEventElement(event);
            const startTime = event.startTime.split(':')[0];
            const timeSlot = dayColumn.querySelector(`.time-slot:nth-child(${parseInt(startTime) - 7})`);
            if (timeSlot) {
                timeSlot.appendChild(eventElement);
            }
        }
    });
}

// Helper function to create event element
function createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.className = `schedule-event ${event.type}`;
    eventElement.innerHTML = `
        <div class="event-title">${event.name}</div>
        <div class="event-time">${event.startTime} - ${event.endTime}</div>
        <div class="event-location">${event.location}</div>
        ${event.instructor ? `<div class="event-instructor">${event.instructor}</div>` : ''}
    `;
    return eventElement;
}

// Helper function to show month view
function showMonthView(container) {
    const monthView = document.createElement('div');
    monthView.className = 'schedule-month-view';
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    monthView.innerHTML = `
        <div class="month-header">
            <button class="month-nav-btn" id="prevMonthBtn">
                <i class="fas fa-chevron-left"></i>
            </button>
            <h3 id="currentMonthDisplay">${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
            <button class="month-nav-btn" id="nextMonthBtn">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="month-grid">
            <div class="month-day-header">Sun</div>
            <div class="month-day-header">Mon</div>
            <div class="month-day-header">Tue</div>
            <div class="month-day-header">Wed</div>
            <div class="month-day-header">Thu</div>
            <div class="month-day-header">Fri</div>
            <div class="month-day-header">Sat</div>
            ${generateMonthDays(currentYear, currentMonth)}
        </div>
    `;
    
    container.innerHTML = '';
    container.appendChild(monthView);
    
    // Add event listeners for month navigation
    const prevMonthBtn = monthView.querySelector('#prevMonthBtn');
    const nextMonthBtn = monthView.querySelector('#nextMonthBtn');
    
    prevMonthBtn.addEventListener('click', () => {
        const newDate = new Date(currentYear, currentMonth - 1);
        showMonthView(container);
    });
    
    nextMonthBtn.addEventListener('click', () => {
        const newDate = new Date(currentYear, currentMonth + 1);
        showMonthView(container);
    });
}

// Helper function to generate month days
function generateMonthDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    let daysHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        daysHTML += '<div class="month-day empty"></div>';
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = new Date().getDate() === day && 
                       new Date().getMonth() === month && 
                       new Date().getFullYear() === year;
        
        daysHTML += `
            <div class="month-day ${isToday ? 'today' : ''}">
                <div class="day-number">${day}</div>
                <div class="day-events"></div>
            </div>
        `;
    }
    
    return daysHTML;
}

// Helper function to show add event modal
function showAddEventModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content slide-in-up">
            <div class="modal-header">
                <h2>Add Event</h2>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="addEventForm">
                    <div class="form-group">
                        <label for="eventName">Event Name</label>
                        <input type="text" id="eventName" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="eventType">Event Type</label>
                        <select id="eventType" class="form-control" required>
                            <option value="class">Class</option>
                            <option value="event">Event</option>
                            <option value="exam">Exam</option>
                            <option value="deadline">Deadline</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="eventDay">Day</label>
                        <select id="eventDay" class="form-control" required>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="startTime">Start Time</label>
                            <input type="time" id="startTime" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="endTime">End Time</label>
                            <input type="time" id="endTime" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="eventLocation">Location</label>
                        <input type="text" id="eventLocation" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="eventDescription">Description (Optional)</label>
                        <textarea id="eventDescription" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" id="cancelEvent">Cancel</button>
                        <button type="submit" class="btn-primary">Add Event</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('#cancelEvent').addEventListener('click', () => {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    });
    
    // Handle form submission
    modal.querySelector('#addEventForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically save the event to your data store
        showNotification('Event added successfully', 'success');
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    });
}

// Helper function to export schedule
function exportSchedule(scheduleData) {
    const csvContent = [
        ['Type', 'Name', 'Day', 'Start Time', 'End Time', 'Location', 'Instructor'],
        ...scheduleData.classes.map(c => [
            'Class',
            c.name,
            c.days.join(', '),
            c.startTime,
            c.endTime,
            c.location,
            c.instructor
        ]),
        ...scheduleData.events.map(e => [
            'Event',
            e.name,
            e.day,
            e.startTime,
            e.endTime,
            e.location,
            ''
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'schedule.csv';
    link.click();
    
    showNotification('Schedule exported successfully', 'success');
}

// Helper function to update week display
function updateWeekDisplay(date) {
    const weekDisplay = document.getElementById('currentWeekDisplay');
    if (weekDisplay) {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 4);
        
        weekDisplay.textContent = `Week of ${startOfWeek.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }
}

// Study Planner Section
function loadStudyPlannerSection() {
    const section = document.getElementById('plannerSection');
    if (!section) return;
    
    section.innerHTML = `
        <div class="planner-header">
            <h2 class="section-title">Study Planner</h2>
            <div class="quick-actions">
                <button class="quick-action-btn" id="addTaskBtn">
                    <i class="fas fa-plus"></i> Add Task
                </button>
                <button class="quick-action-btn" id="filterTasksBtn">
                    <i class="fas fa-filter"></i> Filter
                </button>
                <button class="quick-action-btn" id="exportPlanBtn">
                    <i class="fas fa-download"></i> Export
                </button>
            </div>
        </div>
        
        <div class="planner-container">
            <div class="planner-sidebar">
                <div class="plan-info">
                    <h3>Study Goals</h3>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 65%"></div>
                        </div>
                        <div class="progress-label">65% Complete</div>
                    </div>
                    <div class="goal-stats">
                        <div class="stat-item">
                            <span class="stat-value">12</span>
                            <span class="stat-label">Total Tasks</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">8</span>
                            <span class="stat-label">Completed</span>
                        </div>
                    </div>
                </div>
                
                <div class="task-categories">
                    <h3>Categories</h3>
                    <ul class="category-list">
                        <li class="category-item active" data-category="all">
                            <i class="fas fa-list"></i> All Tasks
                        </li>
                        <li class="category-item" data-category="reading">
                            <i class="fas fa-book"></i> Reading
                        </li>
                        <li class="category-item" data-category="assignment">
                            <i class="fas fa-tasks"></i> Assignments
                        </li>
                        <li class="category-item" data-category="exam">
                            <i class="fas fa-file-alt"></i> Exam Prep
                        </li>
                        <li class="category-item" data-category="project">
                            <i class="fas fa-project-diagram"></i> Projects
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="planner-main">
                <div class="task-list" id="taskList">
                    <!-- Tasks will be dynamically added here -->
                </div>
            </div>
        </div>
        
        <!-- Task Modal -->
        <div class="modal-overlay" id="taskModal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Add Study Task</h2>
                    <button class="modal-close" id="closeTaskModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="taskForm">
                        <div class="form-group">
                            <label for="taskTitle">Task Title</label>
                            <input type="text" id="taskTitle" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="taskCategory">Category</label>
                            <select id="taskCategory" class="form-control" required>
                                <option value="reading">Reading</option>
                                <option value="assignment">Assignment</option>
                                <option value="exam">Exam Prep</option>
                                <option value="project">Project</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="taskDate">Due Date</label>
                                <input type="date" id="taskDate" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="taskTime">Due Time</label>
                                <input type="time" id="taskTime" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="taskPriority">Priority</label>
                            <select id="taskPriority" class="form-control" required>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="taskDescription">Description</label>
                            <textarea id="taskDescription" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="taskCourse">Related Course</label>
                            <select id="taskCourse" class="form-control">
                                <option value="">None</option>
                                <option value="CS101">CS101 - Introduction to Programming</option>
                                <option value="CS201">CS201 - Data Structures</option>
                                <option value="CS350">CS350 - Database Systems</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" id="cancelTask">Cancel</button>
                            <button type="submit" class="btn-primary">Save Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Initialize study planner functionality
    initStudyPlanner();
}

// Initialize study planner functionality
function initStudyPlanner() {
    // Sample tasks data
    const tasks = [
        {
            id: 1,
            title: 'Read Chapter 5: Data Structures',
            category: 'reading',
            dueDate: '2024-03-15',
            dueTime: '23:59',
            priority: 'high',
            description: 'Complete reading and take notes on arrays and linked lists',
            course: 'CS201',
            completed: false
        },
        {
            id: 2,
            title: 'Database Design Assignment',
            category: 'assignment',
            dueDate: '2024-03-18',
            dueTime: '23:59',
            priority: 'high',
            description: 'Design ER diagram for library management system',
            course: 'CS350',
            completed: true
        },
        {
            id: 3,
            title: 'Midterm Exam Preparation',
            category: 'exam',
            dueDate: '2024-03-20',
            dueTime: '09:00',
            priority: 'high',
            description: 'Review all chapters and practice problems',
            course: 'CS101',
            completed: false
        }
    ];
    
    // Add event listeners
    document.getElementById('addTaskBtn').addEventListener('click', showAddTaskModal);
    document.getElementById('closeTaskModal').addEventListener('click', hideTaskModal);
    document.getElementById('cancelTask').addEventListener('click', hideTaskModal);
    document.getElementById('taskForm').addEventListener('submit', handleTaskSubmit);
    document.getElementById('filterTasksBtn').addEventListener('click', showFilterModal);
    document.getElementById('exportPlanBtn').addEventListener('click', exportStudyPlan);
    
    // Category filter event listeners
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filterTasks(item.dataset.category);
        });
    });
    
    // Initial render
    renderTasks(tasks);
}

// Render tasks
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-checkbox">
                <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
                <label for="task-${task.id}"></label>
            </div>
            <div class="task-content">
                <div class="task-header">
                    <h4 class="task-title">${task.title}</h4>
                    <span class="task-priority ${task.priority}">${task.priority}</span>
                </div>
                <div class="task-details">
                    <span class="task-category"><i class="fas fa-tag"></i> ${task.category}</span>
                    <span class="task-course"><i class="fas fa-book"></i> ${task.course}</span>
                    <span class="task-due"><i class="fas fa-clock"></i> ${formatDate(task.dueDate)} ${task.dueTime}</span>
                </div>
                <p class="task-description">${task.description}</p>
            </div>
            <div class="task-actions">
                <button class="btn-edit-task" data-id="${task.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete-task" data-id="${task.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for task actions
    attachTaskEventListeners();
}

// Show add task modal
function showAddTaskModal() {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'flex';
    
    // Reset form
    document.getElementById('taskForm').reset();
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDate').value = today;
}

// Hide task modal
function hideTaskModal() {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'none';
}

// Handle task form submission
function handleTaskSubmit(e) {
    e.preventDefault();
    
    const task = {
        id: Date.now(), // Generate unique ID
        title: document.getElementById('taskTitle').value,
        category: document.getElementById('taskCategory').value,
        dueDate: document.getElementById('taskDate').value,
        dueTime: document.getElementById('taskTime').value,
        priority: document.getElementById('taskPriority').value,
        description: document.getElementById('taskDescription').value,
        course: document.getElementById('taskCourse').value,
        completed: false
    };
    
    // Add task to list
    const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
    tasks.push(task);
    localStorage.setItem('studyTasks', JSON.stringify(tasks));
    
    // Update UI
    renderTasks(tasks);
    hideTaskModal();
    showNotification('Task added successfully!', 'success');
}

// Filter tasks
function filterTasks(category) {
    const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
    const filteredTasks = category === 'all' 
        ? tasks 
        : tasks.filter(task => task.category === category);
    renderTasks(filteredTasks);
}

// Export study plan
function exportStudyPlan() {
    const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
    const csv = convertTasksToCSV(tasks);
    downloadCSV(csv, 'study-plan.csv');
    showNotification('Study plan exported successfully!', 'success');
}

// Convert tasks to CSV
function convertTasksToCSV(tasks) {
    const headers = ['Title', 'Category', 'Due Date', 'Due Time', 'Priority', 'Description', 'Course', 'Status'];
    const rows = tasks.map(task => [
        task.title,
        task.category,
        task.dueDate,
        task.dueTime,
        task.priority,
        task.description,
        task.course,
        task.completed ? 'Completed' : 'Pending'
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

// Download CSV file
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Attach task event listeners
function attachTaskEventListeners() {
    // Task completion toggle
    document.querySelectorAll('.task-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskId = parseInt(e.target.closest('.task-item').dataset.id);
            const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem('studyTasks', JSON.stringify(tasks));
                renderTasks(tasks);
                showNotification(`Task marked as ${task.completed ? 'completed' : 'pending'}!`, 'success');
            }
        });
    });
    
    // Edit task
    document.querySelectorAll('.btn-edit-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.closest('.task-item').dataset.id);
            const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                showEditTaskModal(task);
            }
        });
    });
    
    // Delete task
    document.querySelectorAll('.btn-delete-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.closest('.task-item').dataset.id);
            if (confirm('Are you sure you want to delete this task?')) {
                const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
                const updatedTasks = tasks.filter(t => t.id !== taskId);
                localStorage.setItem('studyTasks', JSON.stringify(updatedTasks));
                renderTasks(updatedTasks);
                showNotification('Task deleted successfully!', 'success');
            }
        });
    });
}

// Show edit task modal
function showEditTaskModal(task) {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'flex';
    
    // Fill form with task data
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskCategory').value = task.category;
    document.getElementById('taskDate').value = task.dueDate;
    document.getElementById('taskTime').value = task.dueTime;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskCourse').value = task.course;
    
    // Update form submission handler
    const form = document.getElementById('taskForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        
        // Update task
        const tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks[index] = {
                ...task,
                title: document.getElementById('taskTitle').value,
                category: document.getElementById('taskCategory').value,
                dueDate: document.getElementById('taskDate').value,
                dueTime: document.getElementById('taskTime').value,
                priority: document.getElementById('taskPriority').value,
                description: document.getElementById('taskDescription').value,
                course: document.getElementById('taskCourse').value
            };
            
            localStorage.setItem('studyTasks', JSON.stringify(tasks));
            renderTasks(tasks);
            hideTaskModal();
            showNotification('Task updated successfully!', 'success');
        }
    };
}

// --- MESSAGES SECTION ---
function loadMessagesSection() {
    const section = document.getElementById('messagesSection');
    if (!section) return;
    section.innerHTML = '';

    // Header and actions
    const header = document.createElement('div');
    header.className = 'messages-header';
    header.innerHTML = `
        <h2 class="section-title">Messages</h2>
        <div class="messages-actions">
            <button class="btn-primary" id="composeMsgBtn"><i class="fas fa-edit"></i> Compose</button>
            <input type="text" id="searchMsgInput" class="form-control" placeholder="Search messages..." />
        </div>
    `;
    section.appendChild(header);

    // Message list (inbox)
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    if (messages.length === 0) {
        messages = [
            { id: 1, from: 'Prof. Williams', to: 'Jane Smith', subject: 'Assignment Feedback', date: '2024-06-01', snippet: 'Please review the feedback...', body: 'Please review the feedback for your last assignment. Let me know if you have questions.', read: false },
            { id: 2, from: 'Registrar', to: 'Jane Smith', subject: 'Registration Reminder', date: '2024-05-28', snippet: 'Course registration opens next week.', body: 'Course registration for Fall 2024 opens next week. Please check your eligibility.', read: true },
            { id: 3, from: 'CS Club', to: 'Jane Smith', subject: 'Club Meeting', date: '2024-05-25', snippet: 'Join us for our next meeting...', body: 'Join us for our next meeting on Wednesday at 5:00 PM in Room 101.', read: true }
        ];
        localStorage.setItem('messages', JSON.stringify(messages));
    }
    renderMessagesList(messages, section);

    // Compose button event
    section.querySelector('#composeMsgBtn').onclick = () => openComposeMsgPanel(section);
    // Search event
    section.querySelector('#searchMsgInput').oninput = (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = messages.filter(m => m.subject.toLowerCase().includes(val) || m.from.toLowerCase().includes(val) || m.snippet.toLowerCase().includes(val));
        renderMessagesList(filtered, section);
    };
}

function renderMessagesList(messages, section) {
    let msgList = section.querySelector('.messages-list');
    if (!msgList) {
        msgList = document.createElement('ul');
        msgList.className = 'messages-list';
        section.appendChild(msgList);
    }
    msgList.innerHTML = '';
    if (messages.length === 0) {
        msgList.innerHTML = '<li class="empty-state">No messages found.</li>';
        return;
    }
    messages.forEach(msg => {
        const li = document.createElement('li');
        li.className = 'message-item' + (msg.read ? ' read' : '');
        li.innerHTML = `
            <div class="msg-from">${msg.from}</div>
            <div class="msg-subject">${msg.subject}</div>
            <div class="msg-date">${msg.date}</div>
            <div class="msg-snippet">${msg.snippet}</div>
            <div class="msg-actions">
                <button class="btn-view-msg" data-id="${msg.id}"><i class="fas fa-eye"></i></button>
                <button class="btn-delete-msg" data-id="${msg.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        msgList.appendChild(li);
    });
    // View and delete events
    msgList.querySelectorAll('.btn-view-msg').forEach(btn => {
        btn.onclick = (e) => {
            const id = Number(btn.dataset.id);
            const messages = JSON.parse(localStorage.getItem('messages') || '[]');
            const msg = messages.find(m => m.id === id);
            if (msg) openMsgDetailPanel(msg, section);
        };
    });
    msgList.querySelectorAll('.btn-delete-msg').forEach(btn => {
        btn.onclick = (e) => {
            const id = Number(btn.dataset.id);
            let messages = JSON.parse(localStorage.getItem('messages') || '[]');
            messages = messages.filter(m => m.id !== id);
            localStorage.setItem('messages', JSON.stringify(messages));
            renderMessagesList(messages, section);
            showNotification('Message deleted!', 'success');
        };
    });
}

function openComposeMsgPanel(section) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content slide-in-up">
            <div class="modal-header">
                <h2>Compose Message</h2>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="composeMsgForm">
                    <div class="form-group">
                        <label>To</label>
                        <input type="text" class="form-control" placeholder="Recipient (e.g. Prof. Williams)" required />
                    </div>
                    <div class="form-group">
                        <label>Subject</label>
                        <input type="text" class="form-control" placeholder="Subject" required />
                    </div>
                    <div class="form-group">
                        <label>Message</label>
                        <textarea class="form-control" rows="5" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-primary">Send</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => closeModal(modal);
    modal.querySelector('#composeMsgForm').onsubmit = (e) => {
        e.preventDefault();
        const to = modal.querySelector('input[placeholder^="Recipient"]').value;
        const subject = modal.querySelector('input[placeholder^="Subject"]').value;
        const body = modal.querySelector('textarea').value;
        let messages = JSON.parse(localStorage.getItem('messages') || '[]');
        messages.unshift({ id: Date.now(), from: 'Jane Smith', to, subject, date: new Date().toISOString().split('T')[0], snippet: body.slice(0, 40) + '...', body, read: false });
        localStorage.setItem('messages', JSON.stringify(messages));
        showNotification('Message sent!', 'success');
        closeModal(modal);
        loadMessagesSection();
    };
}

function openMsgDetailPanel(msg, section) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content slide-in-up">
            <div class="modal-header">
                <h2>${msg.subject}</h2>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div><strong>From:</strong> ${msg.from}</div>
                <div><strong>Date:</strong> ${msg.date}</div>
                <div class="msg-body">${msg.body}</div>
                <div class="form-actions" style="margin-top:20px;">
                    <button class="btn-secondary" id="replyMsgBtn"><i class="fas fa-reply"></i> Reply</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => closeModal(modal);
    modal.querySelector('#replyMsgBtn').onclick = () => {
        closeModal(modal);
        openComposeMsgPanel(section);
    };
    // Mark as read
    let messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const idx = messages.findIndex(m => m.id === msg.id);
    if (idx !== -1) {
        messages[idx].read = true;
        localStorage.setItem('messages', JSON.stringify(messages));
        renderMessagesList(messages, section);
    }
}

function closeModal(modal) {
    modal.classList.add('fade-out');
    setTimeout(() => modal.remove(), 300);
}

// --- RESOURCES SECTION ---
function loadResourcesSection() {
    const section = document.getElementById('resourcesSection');
    if (!section) return;
    section.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'resources-header';
    header.innerHTML = `
        <h2 class="section-title">Resources</h2>
        <div class="resources-actions">
            <input type="text" id="searchResInput" class="form-control" placeholder="Search resources..." />
        </div>
    `;
    section.appendChild(header);
    let resources = JSON.parse(localStorage.getItem('resources') || '[]');
    if (resources.length === 0) {
        resources = [
            { id: 1, name: 'CS101 Syllabus', type: 'PDF', link: '#', desc: 'Course outline and policies.' },
            { id: 2, name: 'Library Portal', type: 'Link', link: '#', desc: 'Access digital library.' },
            { id: 3, name: 'Research Paper Template', type: 'DOCX', link: '#', desc: 'Template for academic papers.' }
        ];
        localStorage.setItem('resources', JSON.stringify(resources));
    }
    renderResourcesList(resources, section);
    section.querySelector('#searchResInput').oninput = (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = resources.filter(r => r.name.toLowerCase().includes(val) || r.desc.toLowerCase().includes(val));
        renderResourcesList(filtered, section);
    };
}

function renderResourcesList(resources, section) {
    let resList = section.querySelector('.resources-list');
    if (!resList) {
        resList = document.createElement('ul');
        resList.className = 'resources-list';
        section.appendChild(resList);
    }
    resList.innerHTML = '';
    if (resources.length === 0) {
        resList.innerHTML = '<li class="empty-state">No resources found.</li>';
        return;
    }
    resources.forEach(res => {
        const li = document.createElement('li');
        li.className = 'resource-item';
        li.innerHTML = `
            <div class="res-name">${res.name}</div>
            <div class="res-type">${res.type}</div>
            <div class="res-desc">${res.desc}</div>
            <div class="res-actions">
                <button class="btn-download-res" data-link="${res.link}"><i class="fas fa-download"></i></button>
                <button class="btn-preview-res" data-id="${res.id}"><i class="fas fa-eye"></i></button>
            </div>
        `;
        resList.appendChild(li);
    });
    resList.querySelectorAll('.btn-download-res').forEach(btn => {
        btn.onclick = (e) => {
            showNotification('Download started!', 'info');
        };
    });
    resList.querySelectorAll('.btn-preview-res').forEach(btn => {
        btn.onclick = (e) => {
            const id = Number(btn.dataset.id);
            const resources = JSON.parse(localStorage.getItem('resources') || '[]');
            const res = resources.find(r => r.id === id);
            if (res) openResourcePreview(res);
        };
    });
}

function openResourcePreview(res) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content slide-in-up">
            <div class="modal-header">
                <h2>Preview: ${res.name}</h2>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <p><strong>Type:</strong> ${res.type}</p>
                <p><strong>Description:</strong> ${res.desc}</p>
                <div class="form-actions">
                    <button class="btn-primary" onclick="window.open('${res.link}','_blank')"><i class="fas fa-download"></i> Download</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => closeModal(modal);
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

// --- SETTINGS SECTION ---
function loadSettingsSection() {
    const section = document.getElementById('settingsSection');
    if (!section) return;
    section.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'settings-header';
    header.innerHTML = `<h2 class="section-title">Settings</h2>`;
    section.appendChild(header);
    const form = document.createElement('form');
    form.className = 'settings-form';
    form.innerHTML = `
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" id="settingsName" value="Jane Smith" />
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" id="settingsEmail" value="jane.smith@university.edu" />
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" id="settingsPassword" value="" placeholder="Change password" />
        </div>
        <div class="form-group">
            <label>Notification Preferences</label>
            <select class="form-control" id="settingsNotif">
                <option>Email & SMS</option>
                <option>Email Only</option>
                <option>SMS Only</option>
                <option>None</option>
            </select>
        </div>
        <div class="form-group">
            <label>Theme</label>
            <select class="form-control" id="settingsTheme">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn-primary">Save Changes</button>
        </div>
    `;
    form.onsubmit = (e) => {
        e.preventDefault();
        // Save settings to localStorage (simulate)
        showNotification('Settings saved!', 'success');
    };
    section.appendChild(form);
    // Theme toggle
    form.querySelector('#settingsTheme').onchange = (e) => {
        if (e.target.value === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    };
}

// Register these functions for navigation
window.loadMessagesSection = loadMessagesSection;
window.loadResourcesSection = loadResourcesSection;
window.loadAnnouncementsSection = loadAnnouncementsSection;
window.loadSettingsSection = loadSettingsSection;