/**
 * Professor Portal Extra Functionality
 * Implements missing functionality for the professor portal
 */

// Make sure the DOM is loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    // Setup event listeners for all sections
    setupCourseSectionEvents();
    setupStudentSectionEvents();
    setupGradingSectionEvents();
    setupMaterialSectionEvents();
});

// ============= COURSES SECTION FUNCTIONALITY =============

// Setup event listeners for the courses section
function setupCourseSectionEvents() {
    // Course Schedule button
    const courseScheduleBtn = document.querySelector('#coursesSection .quick-action-btn:nth-child(2)');
    if (courseScheduleBtn) {
        courseScheduleBtn.addEventListener('click', () => {
            showCourseScheduleModal();
        });
    }

    // Manage Students button
    const manageStudentsBtn = document.querySelector('#coursesSection .quick-action-btn:nth-child(3)');
    if (manageStudentsBtn) {
        manageStudentsBtn.addEventListener('click', () => {
            navigateToSection('students');
        });
    }

    // Course Settings button
    const courseSettingsBtn = document.querySelector('#coursesSection .quick-action-btn:nth-child(4)');
    if (courseSettingsBtn) {
        courseSettingsBtn.addEventListener('click', () => {
            showCourseSettingsModal();
        });
    }
}

// Show Course Schedule Modal
function showCourseScheduleModal() {
    // Create modal if it doesn't exist
    let scheduleModal = document.getElementById('courseScheduleModal');
    
    if (!scheduleModal) {
        scheduleModal = document.createElement('div');
        scheduleModal.id = 'courseScheduleModal';
        scheduleModal.className = 'modal';
        
        scheduleModal.innerHTML = `
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
                            <div>Sun</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                        </div>
                        <div class="schedule-days">
                            <!-- Calendar days will be added here -->
                        </div>
                    </div>
                    <div class="schedule-events">
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
                        <button class="course-btn primary" style="margin-top: 15px;">
                            <i class="fas fa-plus"></i> Add New Event
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(scheduleModal);
        
        // Add event listeners for modal
        const closeBtn = scheduleModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                scheduleModal.classList.remove('active');
            });
        }
        
        // Close modal on outside click
        scheduleModal.addEventListener('click', (e) => {
            if (e.target === scheduleModal) {
                scheduleModal.classList.remove('active');
            }
        });
    }
    
    // Show the modal
    scheduleModal.classList.add('active');
}

// Show Course Settings Modal
function showCourseSettingsModal() {
    // Create modal if it doesn't exist
    let settingsModal = document.getElementById('courseSettingsModal');
    
    if (!settingsModal) {
        settingsModal = document.createElement('div');
        settingsModal.id = 'courseSettingsModal';
        settingsModal.className = 'modal';
        
        settingsModal.innerHTML = `
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
                                <button type="button" class="course-btn primary">Save Changes</button>
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
                                <button type="button" class="course-btn primary">Save Changes</button>
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
                                <button type="button" class="course-btn primary">Save Changes</button>
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
                                <button type="button" class="course-btn primary">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(settingsModal);
        
        // Add event listeners for modal
        const closeBtn = settingsModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                settingsModal.classList.remove('active');
            });
        }
        
        // Close modal on outside click
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('active');
            }
        });
        
        // Tab switching
        const tabs = settingsModal.querySelectorAll('.settings-tab');
        const panels = settingsModal.querySelectorAll('.settings-panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetPanel = tab.getAttribute('data-tab');
                
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                settingsModal.querySelector(`#${targetPanel}Panel`).classList.add('active');
            });
        });
    }
    
    // Show the modal
    settingsModal.classList.add('active');
}

// Helper function to navigate to another section
function navigateToSection(sectionId) {
    const menuLink = document.querySelector(`.sidebar-menu-link[data-page="${sectionId}"]`);
    if (menuLink) {
        menuLink.click();
    }
}

// ============= STUDENTS SECTION FUNCTIONALITY =============

// Setup event listeners for the students section
function setupStudentSectionEvents() {
    // These event listeners will be set up when the section is loaded
    document.addEventListener('sectionLoaded', (e) => {
        if (e.detail.section !== 'students') return;
        
        // Email Students button
        const emailStudentsBtn = document.querySelector('#studentsSection .quick-action-btn:nth-child(2)');
        if (emailStudentsBtn) {
            emailStudentsBtn.addEventListener('click', () => {
                showEmailStudentsModal();
            });
        }
        
        // Export Roster button
        const exportRosterBtn = document.querySelector('#studentsSection .quick-action-btn:nth-child(3)');
        if (exportRosterBtn) {
            exportRosterBtn.addEventListener('click', () => {
                exportStudentRoster();
            });
        }
        
        // Roster Settings button
        const rosterSettingsBtn = document.querySelector('#studentsSection .quick-action-btn:nth-child(4)');
        if (rosterSettingsBtn) {
            rosterSettingsBtn.addEventListener('click', () => {
                showRosterSettingsModal();
            });
        }
    });
}

// Show Email Students Modal
function showEmailStudentsModal() {
    // Create modal if it doesn't exist
    let emailModal = document.getElementById('emailStudentsModal');
    
    if (!emailModal) {
        emailModal = document.createElement('div');
        emailModal.id = 'emailStudentsModal';
        emailModal.className = 'modal';
        
        emailModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Email Students</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="emailStudentsForm">
                        <div class="form-group">
                            <label class="form-label">Recipients</label>
                            <select class="form-control" id="emailRecipients">
                                <option value="all">All Students</option>
                                <option value="cs101">CS101 Students</option>
                                <option value="cs201">CS201 Students</option>
                                <option value="cs350">CS350 Students</option>
                                <option value="selected">Selected Students</option>
                            </select>
                        </div>
                        <div class="form-group" id="selectedStudentsGroup" style="display: none;">
                            <label class="form-label">Select Students</label>
                            <div class="selected-students-list">
                                <div class="selected-student">
                                    <input type="checkbox" id="stu1" checked>
                                    <label for="stu1">John Doe (STU001)</label>
                                </div>
                                <div class="selected-student">
                                    <input type="checkbox" id="stu2" checked>
                                    <label for="stu2">Jane Smith (STU002)</label>
                                </div>
                                <div class="selected-student">
                                    <input type="checkbox" id="stu3">
                                    <label for="stu3">Alex Johnson (STU003)</label>
                                </div>
                                <div class="selected-student">
                                    <input type="checkbox" id="stu4">
                                    <label for="stu4">Maria Garcia (STU004)</label>
                                </div>
                                <div class="selected-student">
                                    <input type="checkbox" id="stu5">
                                    <label for="stu5">David Lee (STU005)</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Subject</label>
                            <input type="text" class="form-control" placeholder="Enter email subject...">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Message</label>
                            <textarea class="form-control" rows="6" placeholder="Enter your message..."></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Attachments</label>
                            <div class="file-upload-area">
                                <button type="button" class="course-btn secondary">
                                    <i class="fas fa-paperclip"></i> Attach Files
                                </button>
                                <span style="margin-left: 10px; font-size: 14px; color: #6b7280;">No files attached</span>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                            <button type="button" class="course-btn secondary" id="cancelEmailBtn">Cancel</button>
                            <button type="submit" class="course-btn primary">Send Email</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(emailModal);
        
        // Add event listeners for modal
        const closeBtn = emailModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                emailModal.classList.remove('active');
            });
        }
        
        // Close modal on outside click
        emailModal.addEventListener('click', (e) => {
            if (e.target === emailModal) {
                emailModal.classList.remove('active');
            }
        });
        
        // Cancel button
        const cancelBtn = emailModal.querySelector('#cancelEmailBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                emailModal.classList.remove('active');
            });
        }
        
        // Show/hide selected students group based on recipient selection
        const recipientSelect = emailModal.querySelector('#emailRecipients');
        const selectedStudentsGroup = emailModal.querySelector('#selectedStudentsGroup');
        
        if (recipientSelect && selectedStudentsGroup) {
            recipientSelect.addEventListener('change', () => {
                if (recipientSelect.value === 'selected') {
                    selectedStudentsGroup.style.display = 'block';
                } else {
                    selectedStudentsGroup.style.display = 'none';
                }
            });
        }
        
        // Form submission
        const emailForm = emailModal.querySelector('#emailStudentsForm');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Show success message
                showNotification('Email sent successfully!', 'success');
                
                // Close modal
                emailModal.classList.remove('active');
            });
        }
    }
    
    // Show the modal
    emailModal.classList.add('active');
}

// Export Student Roster
function exportStudentRoster() {
    // Show notification
    showNotification('Student roster exported successfully!', 'success');
}

// Show Roster Settings Modal
function showRosterSettingsModal() {
    // Create modal if it doesn't exist
    let settingsModal = document.getElementById('rosterSettingsModal');
    
    if (!settingsModal) {
        settingsModal = document.createElement('div');
        settingsModal.id = 'rosterSettingsModal';
        settingsModal.className = 'modal';
        
        settingsModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Roster Settings</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="rosterSettingsForm">
                        <div class="form-group">
                            <label class="form-label">Display Columns</label>
                            <div class="settings-checkboxes">
                                <div class="setting-checkbox">
                                    <input type="checkbox" id="colName" checked>
                                    <label for="colName">Name</label>
                                </div>
                                <div class="setting-checkbox">
                                    <input type="checkbox" id="colId" checked>
                                    <label for="colId">Student ID</label>
                                </div>
                                <div class="setting-checkbox">
                                    <input type="checkbox" id="colMajor" checked>
                                    <label for="colMajor">Major</label>
                                </div>
                                <div class="setting-checkbox">
                                    <input type="checkbox" id="colYear" checked>
                                    <label for="colYear">Year</label>
                                </div>
                                <div class="setting-checkbox">
                                    <input type="checkbox" id="colGpa" checked>
                                    <label for="colGpa">GPA</label>
                                </div>
                                <div class="setting-checkbox">
                                    <input type="checkbox" id="colStatus" checked>
                                    <label for="colStatus">Status</label>
                                </div>
                                <div class="setting-checkbox">
                                    <input type="checkbox" id="colEmail">
                                    <label for="colEmail">Email</label>
                                </div>
                                <div class="setting-checkbox">
                                    <input type="checkbox" id="colPhone">
                                    <label for="colPhone">Phone</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Default Sort</label>
                            <div style="display: flex; gap: 10px;">
                                <select class="form-control" style="flex: 2;">
                                    <option value="name">Name</option>
                                    <option value="id">Student ID</option>
                                    <option value="major">Major</option>
                                    <option value="year">Year</option>
                                    <option value="gpa">GPA</option>
                                    <option value="status">Status</option>
                                </select>
                                <select class="form-control" style="flex: 1;">
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Items Per Page</label>
                            <select class="form-control">
                                <option value="10">10</option>
                                <option value="25" selected>25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                        <button type="button" class="course-btn primary">Save Changes</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(settingsModal);
        
        // Add event listeners for modal
        const closeBtn = settingsModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                settingsModal.classList.remove('active');
            });
        }
        
        // Close modal on outside click
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('active');
            }
        });
        
        // Form submission
        const settingsForm = settingsModal.querySelector('#rosterSettingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Show success message
                showNotification('Roster settings saved successfully!', 'success');
                
                // Close modal
                settingsModal.classList.remove('active');
            });
        }
    }
    
    // Show the modal
    settingsModal.classList.add('active');
} 