/**
 * University Management System - Professor Portal Phase 7
 * This file contains the implementation for the Calendar, Settings, and Messages
 */

// Initialize Phase 7 functionality
document.addEventListener('DOMContentLoaded', () => {
    // Update navigation to initialize proper functionality for each section
    const menuLinks = document.querySelectorAll('.sidebar-menu-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('onclick') || link.getAttribute('href')?.includes('html')) {
                return; // Skip for logout and external links
            }
            
            const pageId = link.getAttribute('data-page');
            
            // Initialize Phase 7 sections if selected
            if (pageId === 'calendar' && typeof window.initCalendar === 'function') {
                window.initCalendar();
            } else if (pageId === 'settings' && typeof window.initSettings === 'function') {
                window.initSettings();
            } else if (pageId === 'messages' && typeof window.initMessages === 'function') {
                window.initMessages();
            }
        });
    });
});

// Initialize the calendar section
function initCalendarSection() {
    // Create a monthly calendar widget for the dashboard
    const dashboardSection = document.getElementById('dashboardSection');
    if (!dashboardSection) return;
    
    // Check if calendar widget already exists
    const existingWidget = dashboardSection.querySelector('.dashboard-calendar-widget');
    if (existingWidget) return;
    
    // Create the calendar widget
    const calendarWidget = document.createElement('div');
    calendarWidget.className = 'dashboard-calendar-widget slide-panel';
    
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    
    calendarWidget.innerHTML = `
        <h3 class="widget-title">
            <i class="fas fa-calendar-alt"></i>
            ${currentMonth} ${currentYear}
        </h3>
        <div class="mini-calendar">
            <div class="mini-calendar-header">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div class="mini-calendar-days">
                <!-- Calendar days will be added here -->
            </div>
        </div>
        <div class="upcoming-events">
            <h4>Upcoming Events</h4>
            <div class="event-item">
                <div class="event-date">Oct 5</div>
                <div class="event-details">
                    <div class="event-title">Faculty Meeting</div>
                    <div class="event-time">10:00 AM</div>
                </div>
            </div>
            <div class="event-item">
                <div class="event-date">Oct 12</div>
                <div class="event-details">
                    <div class="event-title">Midterm Exam - CS101</div>
                    <div class="event-time">2:00 PM</div>
                </div>
            </div>
        </div>
        <button class="view-all-btn" id="viewCalendarBtn">
            <i class="fas fa-calendar-week"></i> View Full Calendar
        </button>
    `;
    
    // Add the widget to the dashboard
    dashboardSection.appendChild(calendarWidget);
    
    // Populate mini calendar days
    const daysContainer = calendarWidget.querySelector('.mini-calendar-days');
    
    // Get first day of current month
    const firstDay = new Date(currentYear, currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'mini-day empty';
        daysContainer.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'mini-day';
        
        // Highlight current day
        if (i === currentDate.getDate()) {
            dayElement.classList.add('current');
        }
        
        // Highlight days with events
        if (i === 5 || i === 12 || i === 20) {
            dayElement.classList.add('has-event');
        }
        
        dayElement.textContent = i;
        daysContainer.appendChild(dayElement);
    }
    
    // Add view calendar button handler
    calendarWidget.querySelector('#viewCalendarBtn').addEventListener('click', () => {
        // Navigate to calendar section
        const calendarLink = document.querySelector('.sidebar-menu-link[data-page="calendar"]');
        if (calendarLink) {
            calendarLink.click();
        }
    });
}

// Initialize Phase 7 notifications
function initNotifications() {
    // Get notification elements
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (!notificationBtn || !notificationDropdown) return;
    
    // Update notification data
    const notifications = [
        {
            title: 'Calendar Event',
            message: 'Faculty meeting tomorrow at 10:00 AM',
            type: 'info',
            time: '1 hour ago'
        },
        {
            title: 'New Message',
            message: 'You have 3 unread messages',
            type: 'warning',
            time: '2 hours ago'
        },
        {
            title: 'Settings Updated',
            message: 'Your profile settings have been updated',
            type: 'success',
            time: 'Yesterday'
        }
    ];
    
    // Update notification content
    const dropdownContent = notificationDropdown.querySelector('.dropdown-content');
    
    if (dropdownContent) {
        dropdownContent.innerHTML = '';
        
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.type}`;
            notificationItem.innerHTML = `
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <span class="notification-time">${notification.time}</span>
            `;
            dropdownContent.appendChild(notificationItem);
        });
    }
    
    // Update notification badge
    const notificationBadge = notificationBtn.querySelector('.notification-badge');
    if (notificationBadge) {
        notificationBadge.textContent = notifications.length;
    }
    
    // Add click handler if not already added
    if (!notificationBtn.getAttribute('data-initialized')) {
        notificationBtn.setAttribute('data-initialized', 'true');
        
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            notificationDropdown.classList.remove('active');
        });
        
        // Prevent dropdown from closing when clicking inside
        notificationDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close button
        const closeBtn = notificationDropdown.querySelector('.dropdown-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notificationDropdown.classList.remove('active');
            });
        }
    }
}

// Create an integrated calendar view with class schedules
function createIntegratedCalendarView() {
    const calendarSection = document.getElementById('calendarSection');
    if (!calendarSection || calendarSection.querySelector('.integrated-calendar')) return;
    
    // Clear current content
    calendarSection.innerHTML = '';
    
    // Create integrated view
    const integratedView = document.createElement('div');
    integratedView.className = 'integrated-calendar';
    
    // Create tabs for different views
    integratedView.innerHTML = `
        <div class="calendar-view-tabs">
            <button class="calendar-tab active" data-view="month">Month</button>
            <button class="calendar-tab" data-view="week">Week</button>
            <button class="calendar-tab" data-view="day">Day</button>
            <button class="calendar-tab" data-view="schedule">Class Schedule</button>
        </div>
        <div class="calendar-toolbar">
            <div class="calendar-navigation">
                <button class="course-btn secondary" id="prevPeriodBtn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h2 id="currentPeriod">October 2023</h2>
                <button class="course-btn secondary" id="nextPeriodBtn">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="calendar-actions">
                <button class="course-btn primary" id="addEventBtn">
                    <i class="fas fa-plus"></i> Add Event
                </button>
                <div class="calendar-filters">
                    <select class="form-control" id="calendarFilterSelect">
                        <option value="all">All Events</option>
                        <option value="classes">Classes Only</option>
                        <option value="meetings">Meetings Only</option>
                        <option value="exams">Exams Only</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="calendar-view-container">
            <!-- Calendar content will be loaded here -->
        </div>
    `;
    
    calendarSection.appendChild(integratedView);
    
    // Initialize default view (month)
    loadCalendarView('month');
    
    // Add tab switching event listeners
    const tabs = integratedView.querySelectorAll('.calendar-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loadCalendarView(tab.getAttribute('data-view'));
        });
    });
    
    // Add navigation handlers
    document.getElementById('prevPeriodBtn').addEventListener('click', () => {
        showNotification('Navigated to previous period', 'info');
    });
    
    document.getElementById('nextPeriodBtn').addEventListener('click', () => {
        showNotification('Navigated to next period', 'info');
    });
    
    // Add event button handler
    document.getElementById('addEventBtn').addEventListener('click', () => {
        showEventCreationModal();
    });
    
    // Add filter handler
    document.getElementById('calendarFilterSelect').addEventListener('change', (e) => {
        showNotification(`Filtered to show ${e.target.value} events`, 'info');
    });
}

// Load different calendar views
function loadCalendarView(viewType) {
    const container = document.querySelector('.calendar-view-container');
    if (!container) return;
    
    // Update title
    const currentPeriod = document.getElementById('currentPeriod');
    if (currentPeriod) {
        if (viewType === 'day') {
            currentPeriod.textContent = 'October 5, 2023';
        } else if (viewType === 'week') {
            currentPeriod.textContent = 'October 2-8, 2023';
        } else {
            currentPeriod.textContent = 'October 2023';
        }
    }
    
    // Clear container
    container.innerHTML = '';
    
    if (viewType === 'schedule') {
        // Load class schedule view
        container.innerHTML = `
            <div class="class-schedule">
                <div class="schedule-days">
                    <div class="schedule-time-labels">
                        <div class="time-label">8:00 AM</div>
                        <div class="time-label">9:00 AM</div>
                        <div class="time-label">10:00 AM</div>
                        <div class="time-label">11:00 AM</div>
                        <div class="time-label">12:00 PM</div>
                        <div class="time-label">1:00 PM</div>
                        <div class="time-label">2:00 PM</div>
                        <div class="time-label">3:00 PM</div>
                        <div class="time-label">4:00 PM</div>
                        <div class="time-label">5:00 PM</div>
                    </div>
                    <div class="schedule-day-column">
                        <div class="day-header">Monday</div>
                        <div class="day-schedule">
                            <div class="class-block" style="top: 60px; height: 90px;">
                                <div class="class-title">CS101</div>
                                <div class="class-time">9:00 AM - 10:30 AM</div>
                                <div class="class-location">Science Building, Rm 302</div>
                            </div>
                            <div class="class-block" style="top: 240px; height: 90px;">
                                <div class="class-title">CS201</div>
                                <div class="class-time">1:00 PM - 2:30 PM</div>
                                <div class="class-location">Engineering Building, Rm 105</div>
                            </div>
                        </div>
                    </div>
                    <div class="schedule-day-column">
                        <div class="day-header">Tuesday</div>
                        <div class="day-schedule">
                            <div class="meeting-block" style="top: 120px; height: 60px;">
                                <div class="meeting-title">Faculty Meeting</div>
                                <div class="meeting-time">10:00 AM - 11:00 AM</div>
                                <div class="meeting-location">Admin Building, Rm 200</div>
                            </div>
                        </div>
                    </div>
                    <div class="schedule-day-column">
                        <div class="day-header">Wednesday</div>
                        <div class="day-schedule">
                            <div class="class-block" style="top: 60px; height: 90px;">
                                <div class="class-title">CS101</div>
                                <div class="class-time">9:00 AM - 10:30 AM</div>
                                <div class="class-location">Science Building, Rm 302</div>
                            </div>
                            <div class="class-block" style="top: 240px; height: 90px;">
                                <div class="class-title">CS201</div>
                                <div class="class-time">1:00 PM - 2:30 PM</div>
                                <div class="class-location">Engineering Building, Rm 105</div>
                            </div>
                        </div>
                    </div>
                    <div class="schedule-day-column">
                        <div class="day-header">Thursday</div>
                        <div class="day-schedule">
                            <div class="office-block" style="top: 180px; height: 120px;">
                                <div class="office-title">Office Hours</div>
                                <div class="office-time">12:00 PM - 2:00 PM</div>
                                <div class="office-location">Science Building, Rm 305</div>
                            </div>
                        </div>
                    </div>
                    <div class="schedule-day-column">
                        <div class="day-header">Friday</div>
                        <div class="day-schedule">
                            <div class="class-block" style="top: 60px; height: 90px;">
                                <div class="class-title">CS101</div>
                                <div class="class-time">9:00 AM - 10:30 AM</div>
                                <div class="class-location">Science Building, Rm 302</div>
                            </div>
                            <div class="exam-block" style="top: 300px; height: 90px;">
                                <div class="exam-title">CS201 Midterm</div>
                                <div class="exam-time">2:00 PM - 3:30 PM</div>
                                <div class="exam-location">Engineering Building, Rm 105</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (viewType === 'day') {
        // Day view
        container.innerHTML = `
            <div class="day-view">
                <div class="day-timeline">
                    <div class="timeline-hours">
                        ${Array.from({length: 14}, (_, i) => i + 8).map(hour => `
                            <div class="timeline-hour">
                                <div class="hour-label">${hour > 12 ? (hour - 12) + ' PM' : hour + ' AM'}</div>
                                <div class="hour-line"></div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="day-events">
                        <div class="day-event meeting" style="top: 60px; height: 60px; left: 20px; right: 20px;">
                            <div class="event-time">9:00 AM - 10:00 AM</div>
                            <div class="event-title">Department Meeting</div>
                            <div class="event-location">Admin Building, Room 200</div>
                        </div>
                        <div class="day-event class" style="top: 180px; height: 90px; left: 20px; right: 20px;">
                            <div class="event-time">11:00 AM - 12:30 PM</div>
                            <div class="event-title">CS101 Lecture</div>
                            <div class="event-location">Science Building, Room 302</div>
                        </div>
                        <div class="day-event office" style="top: 300px; height: 120px; left: 20px; right: 20px;">
                            <div class="event-time">1:00 PM - 3:00 PM</div>
                            <div class="event-title">Office Hours</div>
                            <div class="event-location">Science Building, Room 305</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (viewType === 'week') {
        // Week view
        container.innerHTML = `
            <div class="week-view">
                <div class="week-header">
                    <div class="week-day-header"></div>
                    <div class="week-day-header">Sun<br>Oct 2</div>
                    <div class="week-day-header">Mon<br>Oct 3</div>
                    <div class="week-day-header">Tue<br>Oct 4</div>
                    <div class="week-day-header">Wed<br>Oct 5</div>
                    <div class="week-day-header">Thu<br>Oct 6</div>
                    <div class="week-day-header">Fri<br>Oct 7</div>
                    <div class="week-day-header">Sat<br>Oct 8</div>
                </div>
                <div class="week-body">
                    <div class="week-times">
                        ${Array.from({length: 14}, (_, i) => i + 8).map(hour => `
                            <div class="week-time">${hour > 12 ? (hour - 12) + ' PM' : hour + ' AM'}</div>
                        `).join('')}
                    </div>
                    <div class="week-grid">
                        ${Array.from({length: 7}).map(() => `
                            <div class="week-day-column">
                                ${Array.from({length: 14}).map(() => `
                                    <div class="week-cell"></div>
                                `).join('')}
                            </div>
                        `).join('')}
                        
                        <!-- Events (positioned absolutely) -->
                        <div class="week-event meeting" style="top: 60px; height: 60px; left: calc(3 * 14.28% + 1px); width: calc(14.28% - 2px);">
                            <div class="event-title">Faculty Meeting</div>
                            <div class="event-time">9:00 AM</div>
                        </div>
                        <div class="week-event class" style="top: 120px; height: 90px; left: calc(1 * 14.28% + 1px); width: calc(14.28% - 2px);">
                            <div class="event-title">CS101</div>
                            <div class="event-time">10:00 AM</div>
                        </div>
                        <div class="week-event class" style="top: 120px; height: 90px; left: calc(3 * 14.28% + 1px); width: calc(14.28% - 2px);">
                            <div class="event-title">CS201</div>
                            <div class="event-time">10:00 AM</div>
                        </div>
                        <div class="week-event class" style="top: 120px; height: 90px; left: calc(5 * 14.28% + 1px); width: calc(14.28% - 2px);">
                            <div class="event-title">CS101</div>
                            <div class="event-time">10:00 AM</div>
                        </div>
                        <div class="week-event office" style="top: 240px; height: 120px; left: calc(4 * 14.28% + 1px); width: calc(14.28% - 2px);">
                            <div class="event-title">Office Hours</div>
                            <div class="event-time">12:00 PM</div>
                        </div>
                        <div class="week-event exam" style="top: 360px; height: 90px; left: calc(5 * 14.28% + 1px); width: calc(14.28% - 2px);">
                            <div class="event-title">Midterm</div>
                            <div class="event-time">2:00 PM</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Month view (default)
        // Generate days for the month
        const daysInMonth = 31; // October 2023
        const firstDay = 0; // Sunday (0) for October 1, 2023
        
        let monthDaysHTML = '';
        
        // Add empty cells for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            monthDaysHTML += '<div class="month-day empty"></div>';
        }
        
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            let events = '';
            
            // Add sample events
            if (i === 5) {
                events = `
                    <div class="month-event meeting">
                        <span>10:00 AM</span> Faculty Meeting
                    </div>
                `;
            } else if (i === 12) {
                events = `
                    <div class="month-event exam">
                        <span>2:00 PM</span> CS101 Midterm
                    </div>
                `;
            } else if (i === 20) {
                events = `
                    <div class="month-event seminar">
                        <span>11:30 AM</span> Research Seminar
                    </div>
                `;
            }
            
            monthDaysHTML += `
                <div class="month-day">
                    <div class="month-day-number">${i}</div>
                    <div class="month-day-events">
                        ${events}
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = `
            <div class="month-view">
                <div class="month-grid">
                    <div class="month-weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div class="month-days">
                        ${monthDaysHTML}
                    </div>
                </div>
            </div>
        `;
    }
}

// Show event creation modal
function showEventCreationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Create New Event</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="createEventForm">
                    <div class="form-group">
                        <label class="form-label">Event Title</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Start Date</label>
                            <input type="date" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Start Time</label>
                            <input type="time" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">End Date</label>
                            <input type="date" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">End Time</label>
                            <input type="time" class="form-control" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Event Type</label>
                        <select class="form-control" required>
                            <option value="class">Class</option>
                            <option value="meeting">Meeting</option>
                            <option value="office">Office Hours</option>
                            <option value="exam">Exam</option>
                            <option value="seminar">Seminar</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description (Optional)</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Notify Students</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" name="notifyEmail" value="true">
                                Send email notification
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" name="notifyPortal" value="true" checked>
                                Post to course portal
                            </label>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelEventBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    document.getElementById('cancelEventBtn').onclick = () => modal.remove();

    // Form submission
    document.getElementById('createEventForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Event created successfully', 'success');
        modal.remove();
    };
}

// Add global search functionality
function initGlobalSearch() {
    // Get the header to add search
    const header = document.querySelector('.header-right');
    if (!header || document.querySelector('.global-search')) return;
    
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'global-search';
    
    // Create search input
    searchContainer.innerHTML = `
        <div class="search-wrapper">
            <input type="text" class="search-input" placeholder="Search...">
            <button class="search-btn">
                <i class="fas fa-search"></i>
            </button>
        </div>
        <div class="search-results" id="searchResults"></div>
    `;
    
    // Insert before the notification dropdown
    const firstChild = header.firstChild;
    header.insertBefore(searchContainer, firstChild);
    
    // Add event listeners
    const searchInput = searchContainer.querySelector('.search-input');
    const searchResults = searchContainer.querySelector('.search-results');
    
    searchInput.addEventListener('focus', () => {
        searchContainer.classList.add('active');
    });
    
    searchInput.addEventListener('blur', () => {
        // Delay to allow clicking on results
        setTimeout(() => {
            searchContainer.classList.remove('active');
        }, 200);
    });
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        // Perform search
        performGlobalSearch(query, searchResults);
    });
}

// Perform global search
function performGlobalSearch(query, resultsContainer) {
    // Get searchable data from various sources
    const searchData = [];
    
    // Add courses to search data
    if (typeof professorCourses !== 'undefined') {
        professorCourses.forEach(course => {
            searchData.push({
                type: 'course',
                id: course.id,
                title: course.title,
                subtitle: course.code,
                icon: 'fas fa-book',
                color: 'var(--primary-blue)'
            });
        });
    }
    
    // Add students to search data
    if (typeof students !== 'undefined') {
        students.forEach(student => {
            searchData.push({
                type: 'student',
                id: student.id,
                title: student.name,
                subtitle: student.email,
                icon: 'fas fa-user-graduate',
                color: 'var(--secondary-green)'
            });
        });
    }
    
    // Add assignments to search data
    if (typeof assignments !== 'undefined') {
        assignments.forEach(assignment => {
            searchData.push({
                type: 'assignment',
                id: assignment.id,
                title: assignment.name,
                subtitle: `Due: ${assignment.dueDate}`,
                icon: 'fas fa-clipboard-check',
                color: 'var(--secondary-gold)'
            });
        });
    }
    
    // Filter data based on query
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.subtitle.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to 5 results
    
    // Update results container
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No results found for "${query}"</p>
            </div>
        `;
        return;
    }
    
    // Group results by type
    const groupedResults = {};
    results.forEach(result => {
        if (!groupedResults[result.type]) {
            groupedResults[result.type] = [];
        }
        groupedResults[result.type].push(result);
    });
    
    // Build results HTML
    let resultsHTML = '';
    
    Object.keys(groupedResults).forEach(type => {
        resultsHTML += `
            <div class="result-group">
                <div class="result-group-header">${type.charAt(0).toUpperCase() + type.slice(1)}s</div>
        `;
        
        groupedResults[type].forEach(result => {
            resultsHTML += `
                <div class="result-item" data-id="${result.id}" data-type="${result.type}">
                    <div class="result-icon" style="background: ${result.color}">
                        <i class="${result.icon}"></i>
                    </div>
                    <div class="result-content">
                        <div class="result-title">${result.title}</div>
                        <div class="result-subtitle">${result.subtitle}</div>
                    </div>
                </div>
            `;
        });
        
        resultsHTML += `</div>`;
    });
    
    resultsContainer.innerHTML = resultsHTML;
    
    // Add animation classes to results
    const resultItems = resultsContainer.querySelectorAll('.result-item');
    resultItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate-in');
        }, index * 50);
    });
    
    // Add click handlers to results
    resultItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.getAttribute('data-id');
            const itemType = item.getAttribute('data-type');
            
            handleSearchResultClick(itemType, itemId);
            
            // Clear search
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = '';
                resultsContainer.innerHTML = '';
            }
        });
    });
}

// Handle search result click
function handleSearchResultClick(type, id) {
    switch (type) {
        case 'course':
            // Navigate to course management
            loadCourseManagement(id);
            // Switch to courses section
            const coursesLink = document.querySelector('.sidebar-menu-link[data-page="courses"]');
            if (coursesLink) {
                coursesLink.click();
            }
            break;
            
        case 'student':
            // Navigate to student view
            const studentsLink = document.querySelector('.sidebar-menu-link[data-page="students"]');
            if (studentsLink) {
                studentsLink.click();
                // Highlight the student in the table (add logic if needed)
                setTimeout(() => {
                    // Find and highlight the student row
                    const studentRows = document.querySelectorAll('#studentTableBody tr');
                    studentRows.forEach(row => {
                        const studentId = row.querySelector('td:nth-child(2)').textContent;
                        if (studentId === id) {
                            row.classList.add('highlighted');
                            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            
                            // Remove highlight after a few seconds
                            setTimeout(() => {
                                row.classList.remove('highlighted');
                            }, 3000);
                        }
                    });
                }, 200);
            }
            break;
            
        case 'assignment':
            // Navigate to grading section
            const gradingLink = document.querySelector('.sidebar-menu-link[data-page="grading"]');
            if (gradingLink) {
                gradingLink.click();
                // Highlight the assignment (add logic if needed)
                setTimeout(() => {
                    // Find and highlight the assignment
                    const assignmentItems = document.querySelectorAll('.assignment-item');
                    assignmentItems.forEach(item => {
                        const assignmentBtn = item.querySelector('.assignment-action button');
                        if (assignmentBtn && assignmentBtn.getAttribute('data-assignment-id') === id) {
                            item.classList.add('highlighted');
                            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            
                            // Remove highlight after a few seconds
                            setTimeout(() => {
                                item.classList.remove('highlighted');
                            }, 3000);
                        }
                    });
                }, 200);
            }
            break;
    }
    
    // Show notification
    showNotification(`Navigated to ${type}: ${id}`, 'info');
}

// Update enhanceProfessorUI function to include global search
function enhanceProfessorUI() {
    initCalendarSection();
    initNotifications();
    initGlobalSearch();
    
    // Initialize calendar section if it's currently visible
    const calendarSection = document.getElementById('calendarSection');
    if (calendarSection && calendarSection.classList.contains('active')) {
        createIntegratedCalendarView();
    }
    
    // Add listeners for sidebar navigation
    const calendarLink = document.querySelector('.sidebar-menu-link[data-page="calendar"]');
    if (calendarLink) {
        calendarLink.addEventListener('click', () => {
            setTimeout(() => {
                createIntegratedCalendarView();
            }, 100);
        });
    }
}

// Initialize Phase 7 on page load
document.addEventListener('DOMContentLoaded', enhanceProfessorUI);

// Expose global functions
window.initCalendarSection = initCalendarSection;
window.initNotifications = initNotifications;
window.createIntegratedCalendarView = createIntegratedCalendarView;
window.initGlobalSearch = initGlobalSearch; 