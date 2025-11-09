/**
 * University Management System - Admin Portal
 * Handles functionality for the admin interface
 */

// Sample data for testing
const systemData = {
    users: {
        total: 1234,
        students: 980,
        professors: 145,
        admins: 12,
        recentRegistrations: 97
    },
    courses: {
        total: 86,
        active: 72,
        upcoming: 14,
        archived: 45
    },
    departments: {
        total: 12,
        active: 10
    },
    system: {
        load: 24,
        uptime: '99.9%',
        lastBackup: '2024-03-15 09:30:00',
        storageUsed: '45%'
    }
};

// Sample users data
const usersData = {
    users: [
        { id: 'STU001', name: 'John Doe', email: 'john.doe@university.edu', role: 'student', status: 'active', department: 'Computer Science', joinDate: '2023-09-01' },
        { id: 'PRF001', name: 'Sarah Wilson', email: 'sarah.wilson@university.edu', role: 'professor', status: 'active', department: 'Mathematics', joinDate: '2023-08-15' },
        { id: 'STU002', name: 'Michael Brown', email: 'michael.b@university.edu', role: 'student', status: 'pending', department: 'Physics', joinDate: '2023-09-05' },
        { id: 'ADM001', name: 'Emily Davis', email: 'emily.d@university.edu', role: 'admin', status: 'active', department: 'Administration', joinDate: '2023-07-01' },
        { id: 'PRF002', name: 'James Miller', email: 'james.m@university.edu', role: 'professor', status: 'inactive', department: 'Chemistry', joinDate: '2023-08-20' }
    ]
};

// Local Storage User Management for Admin Portal
const USERS_KEY = 'ums_users';

function getUsersFromStorage() {
    let users = JSON.parse(localStorage.getItem(USERS_KEY));
    if (!users) {
        // Seed with a default admin if not present
        users = [{
            id: 'ADMIN001',
            name: 'System Admin',
            email: 'admin@university.edu',
            role: 'admin',
            status: 'active',
            department: 'Administration',
            password: 'admin123',
            joinDate: new Date().toISOString().slice(0, 10)
        }];
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return users;
}

function setUsersToStorage(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function renderUsersTable() {
    const users = getUsersFromStorage();
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    users.forEach(user => {
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
        const row = document.createElement('tr');
        row.className = 'user-row fade-in';
        row.innerHTML = `
            <td><input type="checkbox" class="user-select"></td>
            <td>
                <div class="user-name-cell">
                    <div class="user-avatar">${initials}</div>
                    <div>
                        <div class="user-name">${user.name}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                </div>
            </td>
            <td><span class="user-role ${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
            <td>${user.department || ''}</td>
            <td><span class="user-status ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td>${user.lastActive || user.joinDate || ''}</td>
            <td>
                <div class="user-actions">
                    <button class="user-action-btn" type="button" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="user-action-btn" type="button" title="Reset Password"><i class="fas fa-key"></i></button>
                    <button class="user-action-btn" type="button" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    attachUserManagementListeners();
}

function attachUserManagementListeners() {
    const selectAllCheckbox = document.getElementById('selectAllUsers');
    const userCheckboxes = document.querySelectorAll('.user-select');
    const bulkActionBtn = document.getElementById('bulkActionBtn');
    const bulkActionsPanel = document.getElementById('bulkActionsPanel');
    // Update bulk actions panel
    function updateBulkActions() {
        const selectedCount = document.querySelectorAll('.user-select:checked').length;
        const selectedCountText = document.querySelector('.selected-count');
        if (selectedCount > 0) {
            bulkActionBtn.removeAttribute('disabled');
            bulkActionsPanel.classList.add('active');
            selectedCountText.textContent = `${selectedCount} users selected`;
        } else {
            bulkActionBtn.setAttribute('disabled', 'true');
            bulkActionsPanel.classList.remove('active');
            selectedCountText.textContent = '0 users selected';
        }
    }
    selectAllCheckbox?.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        updateBulkActions();
    });
    userCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBulkActions);
    });
    // Bulk action buttons logic
    const bulkButtons = bulkActionsPanel.querySelectorAll('.bulk-buttons .quick-action-btn');
    if (bulkButtons.length >= 3) {
        // Remove previous listeners by cloning
        for (let i = 0; i < 3; i++) {
            const oldBtn = bulkButtons[i];
            const newBtn = oldBtn.cloneNode(true);
            oldBtn.parentNode.replaceChild(newBtn, oldBtn);
        }
        const newBulkButtons = bulkActionsPanel.querySelectorAll('.bulk-buttons .quick-action-btn');
        // 0: Activate, 1: Deactivate, 2: Delete
        newBulkButtons[0].addEventListener('click', () => {
            let users = getUsersFromStorage();
            const checkboxes = document.querySelectorAll('.user-select:checked');
            if (checkboxes.length === 0) return;
            const emails = Array.from(checkboxes).map(cb => cb.closest('tr').querySelector('.user-email').textContent);
            users = users.map(u => emails.includes(u.email) ? { ...u, status: 'active' } : u);
            setUsersToStorage(users);
            renderUsersTable();
            attachUserManagementListeners();
            showNotification('Selected users activated!', 'success');
        });
        newBulkButtons[1].addEventListener('click', () => {
            let users = getUsersFromStorage();
            const checkboxes = document.querySelectorAll('.user-select:checked');
            if (checkboxes.length === 0) return;
            const emails = Array.from(checkboxes).map(cb => cb.closest('tr').querySelector('.user-email').textContent);
            users = users.map(u => emails.includes(u.email) ? { ...u, status: 'inactive' } : u);
            setUsersToStorage(users);
            renderUsersTable();
            attachUserManagementListeners();
            showNotification('Selected users deactivated!', 'success');
        });
        newBulkButtons[2].addEventListener('click', () => {
            let users = getUsersFromStorage();
            const checkboxes = document.querySelectorAll('.user-select:checked');
            if (checkboxes.length === 0) return;
            const emails = Array.from(checkboxes).map(cb => cb.closest('tr').querySelector('.user-email').textContent);
            users = users.filter(u => !emails.includes(u.email));
            setUsersToStorage(users);
            renderUsersTable();
            attachUserManagementListeners();
            showNotification('Selected users deleted!', 'success');
        });
    }
    // Initial update
    updateBulkActions();
}

// Initialize admin portal
function initAdminPortal() {
    initUserManagement();
    initCharts();
    initNotifications();
    initSystemSettingsPanel();
    initReportsPanel();
    initAnnouncementsPanel();
}

// Initialize navigation
function initNavigation() {
    console.log('[AdminPortal] Initializing navigation...');
    const menuLinks = document.querySelectorAll('.sidebar-menu-link');
    const pageSections = document.querySelectorAll('.page-section');
    const headerTitle = document.querySelector('.header-left h1');
    const breadcrumb = document.querySelector('.breadcrumb');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('onclick')) return; // Skip for logout
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            console.log(`[AdminPortal] Sidebar link clicked: data-page="${pageId}"`);
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
                console.log(`[AdminPortal] Showing section: #${pageId}Section`);
                selectedSection.style.display = 'block';
                selectedSection.style.opacity = '0';
                setTimeout(() => {
                    selectedSection.style.opacity = '1';
                    selectedSection.classList.add('active');
                }, 50);
                // Initialize section content
                initializeSection(pageId);
            } else {
                console.warn(`[AdminPortal] Section not found: #${pageId}Section`);
            }
            // Update page title with smooth transition
            const pageTitle = link.querySelector('.sidebar-menu-text').textContent;
            headerTitle.style.opacity = '0';
            setTimeout(() => {
                headerTitle.textContent = pageTitle;
                headerTitle.style.opacity = '1';
            }, 200);
            // Update breadcrumb
            breadcrumb.textContent = `Home / Admin Portal / ${pageTitle}`;
        });
    });
    console.log('[AdminPortal] Navigation initialized.');
}

// Initialize dashboard
function initDashboard() {
    // Update stat cards
    updateStatCards();
    
    // Initialize charts
    initCharts();
    
    // Load recent activity
    loadRecentActivity();
}

// Update dashboard stat cards
function updateStatCards() {
    document.getElementById('totalUsersCount').textContent = systemData.users.total.toLocaleString();
    document.getElementById('activeCoursesCount').textContent = systemData.courses.active.toLocaleString();
    document.getElementById('departmentsCount').textContent = systemData.departments.total.toLocaleString();
    document.getElementById('systemLoadValue').textContent = systemData.system.load + '%';
}

// Initialize charts
function initCharts() {
    // User Distribution Chart
    const userDistributionCtx = document.getElementById('userDistributionChart')?.getContext('2d');
    if (userDistributionCtx) {
        new Chart(userDistributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Students', 'Professors', 'Administrators'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(217, 119, 6, 0.8)',
                        'rgba(5, 150, 105, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // System Performance Chart
    const systemPerformanceCtx = document.getElementById('systemPerformanceChart')?.getContext('2d');
    if (systemPerformanceCtx) {
        new Chart(systemPerformanceCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    label: 'System Load',
                    data: [15, 10, 25, 40, 30, 20],
                    borderColor: 'rgba(59, 130, 246, 1)',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    }

    // User Growth Over Time Chart
    const userGrowthCtx = document.getElementById('userGrowthChart')?.getContext('2d');
    if (userGrowthCtx) {
        new Chart(userGrowthCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [{
                    label: 'New Users',
                    data: [120, 150, 180, 220, 200, 250, 300, 280],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderRadius: 8,
                    maxBarThickness: 36
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => `New Users: ${ctx.parsed.y}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 50
                        }
                    }
                }
            }
        });
    }
}

// Initialize dropdowns
function initDropdowns() {
    // Notification dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const notificationClose = notificationDropdown.querySelector('.dropdown-close');
    
    notificationBtn.addEventListener('click', () => {
        notificationDropdown.classList.toggle('active');
    });
    
    notificationClose.addEventListener('click', () => {
        notificationDropdown.classList.remove('active');
    });
    
    // Profile dropdown
    const userProfile = document.getElementById('userProfile');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileClose = profileDropdown.querySelector('.dropdown-close');
    
    userProfile.addEventListener('click', () => {
        profileDropdown.classList.toggle('active');
    });
    
    profileClose.addEventListener('click', () => {
        profileDropdown.classList.remove('active');
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-dropdown') && !e.target.closest('.user-profile')) {
            notificationDropdown.classList.remove('active');
            profileDropdown.classList.remove('active');
        }
    });
}

// Initialize section content
function initializeSection(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            // Re-initialize dashboard widgets, charts, and activity
            initDashboard();
            break;
        case 'users': {
            const usersSection = document.getElementById('usersSection');
            // Only load placeholder if section is empty
            if (!usersSection.innerHTML.trim()) {
                loadUserManagement();
            }
            break;
        }
        case 'departments': {
            const departmentsSection = document.getElementById('departmentsSection');
            if (!departmentsSection.innerHTML.trim()) {
                loadDepartments();
            }
            break;
        }
        case 'courses': {
            const coursesSection = document.getElementById('coursesSection');
            if (!coursesSection.innerHTML.trim()) {
                loadCourses();
            }
            break;
        }
        case 'reports': {
            const reportsSection = document.getElementById('reportsSection');
            if (!reportsSection.innerHTML.trim()) {
                loadReports();
            }
            break;
        }
        case 'settings': {
            const settingsSection = document.getElementById('settingsSection');
            if (!settingsSection.innerHTML.trim()) {
                loadSettings();
            }
            break;
        }
        case 'logs': {
            const logsSection = document.getElementById('logsSection');
            if (!logsSection.innerHTML.trim()) {
                loadLogs();
            }
            break;
        }
    }
}

// Load recent activity
function loadRecentActivity() {
    const activity = [
        { type: 'warning', icon: 'exclamation-triangle', text: 'High system load detected', time: '2 min ago' },
        { type: 'info', icon: 'user-plus', text: 'New user registration: John Doe (Student)', time: '15 min ago' },
        { type: 'success', icon: 'check-circle', text: 'Database backup completed successfully', time: '1 hour ago' }
    ];
    
    const activityList = document.querySelector('.activity-list');
    activityList.innerHTML = activity.map(item => `
        <li class="activity-item fade-in">
            <span class="activity-icon ${item.type}"><i class="fas fa-${item.icon}"></i></span>
            <span class="activity-text">${item.text}</span>
            <span class="activity-time">${item.time}</span>
        </li>
    `).join('');
}

// Placeholder functions for other sections
function loadUserManagement() {
    const usersSection = document.getElementById('usersSection');
    usersSection.innerHTML = '<h2>User Management</h2><p>User management interface will be implemented here.</p>';
}

function loadDepartments() {
    const departmentsSection = document.getElementById('departmentsSection');
    departmentsSection.innerHTML = '<h2>Departments</h2><p>Department management interface will be implemented here.</p>';
}

function loadCourses() {
    const coursesSection = document.getElementById('coursesSection');
    coursesSection.innerHTML = '<h2>Courses</h2><p>Course management interface will be implemented here.</p>';
}

function loadReports() {
    const reportsSection = document.getElementById('reportsSection');
    reportsSection.innerHTML = '<h2>Reports</h2><p>Reporting interface will be implemented here.</p>';
}

function loadSettings() {
    const settingsSection = document.getElementById('settingsSection');
    settingsSection.innerHTML = '<h2>Settings</h2><p>System settings interface will be implemented here.</p>';
}

function loadLogs() {
    const logsSection = document.getElementById('logsSection');
    logsSection.innerHTML = '<h2>Activity Logs</h2><p>System logs interface will be implemented here.</p>';
}

// Authentication check
function checkAuth() {
    // Check if user is logged in and is an admin
    const userData = SessionManager.getSession();
    
    if (!userData) {
        // Redirect to login page
        NavigationController.navigateTo('login');
        return;
    }
    
    if (userData.role !== 'admin') {
        // Show unauthorized message
        alert('You are not authorized to access the admin portal.');
        // Redirect to appropriate page based on role
        NavigationController.navigateByRole();
        return;
    }
    
    // Update UI with admin data
    updateAdminUI(userData);
}

// Update UI with admin data
function updateAdminUI(userData) {
    // Update name and initials
    const userNameElement = document.getElementById('userName');
    const profileNameElement = document.getElementById('profileName');
    const userInitialsElement = document.getElementById('userInitials');
    const profileInitialsElement = document.getElementById('profileInitials');
    const profileIdElement = document.getElementById('profileId');
    
    // Validate userData
    if (!userData || !userData.name) {
        console.error('Invalid user data');
        return;
    }
    
    if (userNameElement) userNameElement.textContent = userData.name;
    if (profileNameElement) profileNameElement.textContent = userData.name;
    
    // Get initials from name
    const initials = userData.name.trim()
        .split(' ')
        .filter(part => part.length > 0)
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
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                          type === 'warning' ? 'fa-exclamation-triangle' : 
                          'fa-info-circle'}"></i>
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
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Add close button handler
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
}

// User Management
function initUserManagement() {
    renderUsersTable();
    attachUserManagementListeners();
    const userSearch = document.getElementById('userSearch');
    const roleFilter = document.getElementById('roleFilter');
    const statusFilter = document.getElementById('statusFilter');
    const addUserForm = document.getElementById('addUserForm');

    // Initialize Add User form submission
    addUserForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const roleInput = addUserForm.querySelector('[name="userRole"]');
        const idInput = addUserForm.querySelector('[name="userId"]');
        const nameInput = addUserForm.querySelector('[name="userName"]');
        const emailInput = addUserForm.querySelector('[name="userEmail"]');
        const passwordInput = addUserForm.querySelector('[name="userPassword"]');
        if (!roleInput || !idInput || !nameInput || !emailInput || !passwordInput) {
            showNotification('Form error: Required elements not found', 'error');
            return;
        }
        const role = roleInput.value.trim();
        const id = idInput.value.trim();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        if (!name || !email || !role || !id || !password) {
            showNotification('Please fill in all required fields', 'warning');
            return;
        }
        let users = getUsersFromStorage();
        if (users.some(u => u.id === id)) {
            showNotification('User ID already exists.', 'error');
            return;
        }
        users.unshift({
            id,
            name,
            email,
            role,
            status: 'pending',
            department: 'Demo Dept',
            password,
            joinDate: new Date().toISOString().slice(0, 10)
        });
        setUsersToStorage(users);
        renderUsersTable();
        attachUserManagementListeners();
        addUserForm.reset();
        const modal = document.getElementById('addUserModal');
        modal.style.display = 'none';
        modal.classList.remove('active');
        showNotification(`User '${name}' added!`, 'success');
    });

    // Search functionality
    userSearch?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const userRows = document.querySelectorAll('.user-row');
        
        userRows.forEach(row => {
            const userName = row.querySelector('.user-name').textContent.toLowerCase();
            const userEmail = row.querySelector('.user-email').textContent.toLowerCase();
            const matches = userName.includes(searchTerm) || userEmail.includes(searchTerm);
            
            row.style.display = matches ? '' : 'none';
        });
    });

    // Filter functionality
    function applyFilters() {
        const selectedRole = roleFilter.value;
        const selectedStatus = statusFilter.value;
        const userRows = document.querySelectorAll('.user-row');
        
        userRows.forEach(row => {
            const roleMatch = !selectedRole || row.querySelector('.user-role').classList.contains(selectedRole);
            const statusMatch = !selectedStatus || row.querySelector('.user-status').classList.contains(selectedStatus);
            
            row.style.display = roleMatch && statusMatch ? '' : 'none';
        });
    }

    roleFilter?.addEventListener('change', applyFilters);
    statusFilter?.addEventListener('change', applyFilters);

    // Edit/Delete logic for User Management with Local Storage
    let editingUserRow = null;
    let editingUserId = null;
    const usersTable = document.getElementById('usersTableBody');
    usersTable?.addEventListener('click', (e) => {
        const editBtn = e.target.closest('button[title="Edit"]');
        if (editBtn) {
            editingUserRow = editBtn.closest('tr.user-row');
            // Get user ID from row (by email, since ID is not shown, or by index)
            const email = editingUserRow.querySelector('.user-email').textContent;
            let users = getUsersFromStorage();
            const user = users.find(u => u.email === email);
            if (!user) return;
            editingUserId = user.id;
            document.getElementById('editUserName').value = user.name;
            document.getElementById('editUserEmail').value = user.email;
            document.getElementById('editUserRole').value = user.role;
            document.getElementById('editUserDept').value = user.department || '';
            document.getElementById('editUserStatus').value = user.status;
            const modal = document.getElementById('editUserModal');
            modal.style.display = 'block';
            modal.classList.add('active');
        }
        const deleteBtn = e.target.closest('button[title="Delete"]');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr.user-row');
            const email = row.querySelector('.user-email').textContent;
            let users = getUsersFromStorage();
            users = users.filter(u => u.email !== email);
            setUsersToStorage(users);
            row.classList.add('fade-out');
            setTimeout(() => {
                renderUsersTable();
            }, 300);
            showNotification(`User deleted!`, 'success');
        }
    });
    // Edit User form submission
    const editUserForm = document.getElementById('editUserForm');
    editUserForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!editingUserRow || !editingUserId) return;
        const name = document.getElementById('editUserName').value;
        const email = document.getElementById('editUserEmail').value;
        const role = document.getElementById('editUserRole').value;
        const dept = document.getElementById('editUserDept').value;
        const status = document.getElementById('editUserStatus').value;
        let users = getUsersFromStorage();
        const idx = users.findIndex(u => u.id === editingUserId);
        if (idx === -1) return;
        users[idx] = {
            ...users[idx],
            name,
            email,
            role,
            department: dept,
            status
        };
        setUsersToStorage(users);
        renderUsersTable();
        attachUserManagementListeners();
        const modal = document.getElementById('editUserModal');
        modal.style.display = 'none';
        modal.classList.remove('active');
        showNotification(`User '${name}' updated!`, 'success');
        editingUserRow = null;
        editingUserId = null;
    });
}

// Modal Functions
function openAddUserModal() {
    const modal = document.getElementById('addUserModal');
    modal.style.display = 'block';
    modal.classList.add('active');
}

function closeAddUserModal() {
    const modal = document.getElementById('addUserModal');
    modal.style.display = 'none';
    modal.classList.remove('active');
}

// Edit User Modal Logic
let editingUserRow = null;

function openEditUserModal(row) {
    editingUserRow = row;
    const name = row.querySelector('.user-name').textContent;
    const email = row.querySelector('.user-email').textContent;
    const role = row.querySelector('.user-role').classList.contains('student') ? 'student' : row.querySelector('.user-role').classList.contains('professor') ? 'professor' : 'admin';
    const dept = row.children[3].textContent;
    const status = row.querySelector('.user-status').classList.contains('active') ? 'active' : row.querySelector('.user-status').classList.contains('pending') ? 'pending' : 'inactive';
    document.getElementById('editUserName').value = name;
    document.getElementById('editUserEmail').value = email;
    document.getElementById('editUserRole').value = role;
    document.getElementById('editUserDept').value = dept;
    document.getElementById('editUserStatus').value = status;
    const modal = document.getElementById('editUserModal');
    modal.style.display = 'block';
    modal.classList.add('active');
}

function closeEditUserModal() {
    const modal = document.getElementById('editUserModal');
    modal.style.display = 'none';
    modal.classList.remove('active');
    editingUserRow = null;
}

// Edit Department Modal Logic
let editingDeptRow = null;

document.addEventListener('DOMContentLoaded', () => {
    // Open modal on button click
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.onclick = openAddUserModal;
    }
    // Close modal on close button
    const modalClose = document.getElementById('closeAddUserModal');
    modalClose?.addEventListener('click', closeAddUserModal);
    // Close modal when clicking outside
    const modal = document.getElementById('addUserModal');
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAddUserModal();
        }
    });
    // Cancel button
    const cancelBtn = document.getElementById('cancelAddUser');
    cancelBtn?.addEventListener('click', closeAddUserModal);
    // Handle form submission
    const addUserForm = document.getElementById('addUserForm');
    // Edit User modal close/cancel
    const closeEditBtn = document.getElementById('closeEditUserModal');
    closeEditBtn?.addEventListener('click', closeEditUserModal);
    const cancelEditBtn = document.getElementById('cancelEditUser');
    cancelEditBtn?.addEventListener('click', closeEditUserModal);
    const editModal = document.getElementById('editUserModal');
    editModal?.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditUserModal();
    });

    // Handle edit form submission
    const editUserForm = document.getElementById('editUserForm');
    editUserForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!editingUserRow) return;

        // Get form elements
        const nameInput = document.getElementById('editUserName');
        const emailInput = document.getElementById('editUserEmail');
        const roleInput = document.getElementById('editUserRole');
        const deptInput = document.getElementById('editUserDept');
        const statusInput = document.getElementById('editUserStatus');

        // Validate form elements exist
        if (!nameInput || !emailInput || !roleInput || !deptInput || !statusInput) {
            console.error('Required form elements not found');
            showNotification('Form error: Required elements not found', 'error');
            return;
        }

        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const role = roleInput.value.trim();
        const dept = deptInput.value.trim();
        const status = statusInput.value.trim();

        // Validate required fields
        if (!name || !email || !role || !dept || !status) {
            showNotification('Please fill in all required fields', 'warning');
            return;
        }

        // Update the row with new values
        editingUserRow.querySelector('.user-name').textContent = name;
        editingUserRow.querySelector('.user-email').textContent = email;
        editingUserRow.querySelector('.user-role').className = `user-role ${role}`;
        editingUserRow.querySelector('.user-role').textContent = role.charAt(0).toUpperCase() + role.slice(1);
        editingUserRow.children[3].textContent = dept;
        editingUserRow.querySelector('.user-status').className = `user-status ${status}`;
        editingUserRow.querySelector('.user-status').textContent = status.charAt(0).toUpperCase() + status.slice(1);

        // Generate initials for avatar (handle single names as well)
        const nameParts = name.split(' ').filter(part => part.length > 0);
        const initials = nameParts.length > 0 ? 
            nameParts.map(n => n[0]).join('').toUpperCase().slice(0,2) :
            name.slice(0,2).toUpperCase();
        editingUserRow.querySelector('.user-avatar').textContent = initials;

        // Close modal and show notification
        const modal = document.getElementById('editUserModal');
        modal.style.display = 'none';
        modal.classList.remove('active');
        editingUserRow = null;
        showNotification(`User '${name}' updated!`, 'success');
    });

    // Delegate edit button clicks in user table
    const usersTable = document.getElementById('usersTableBody');
    usersTable?.addEventListener('click', (e) => {
        const editBtn = e.target.closest('button[title="Edit"]');
        if (editBtn) {
            e.preventDefault();
            const row = editBtn.closest('tr.user-row');
            openEditUserModal(row);
        }
        const deleteBtn = e.target.closest('button[title="Delete"]');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr.user-row');
            const name = row.querySelector('.user-name').textContent;
                        row.classList.add('fade-out');
                        setTimeout(() => row.remove(), 300);
            showNotification(`User '${name}' deleted!`, 'success');
        }
    });
    // Edit Department Modal logic
    const editDeptModal = document.getElementById('editDepartmentModal');
    const closeEditDeptBtn = document.getElementById('closeEditDepartmentModal');
    const cancelEditDeptBtn = document.getElementById('cancelEditDepartment');
    const editDeptForm = document.getElementById('editDepartmentForm');
    // Delegate edit button clicks in department table
    const departmentsTable = document.querySelector('.departments-table tbody');
    departmentsTable?.addEventListener('click', (e) => {
        const editBtn = e.target.closest('button[title="Edit"]');
        if (editBtn) {
            const row = editBtn.closest('tr');
            editingDeptRow = row;
            document.getElementById('editDepartmentCode').value = row.children[0].textContent;
            document.getElementById('editDepartmentName').value = row.children[1].textContent;
            document.getElementById('editDepartmentHead').value = row.children[2].textContent;
            const statusSpan = row.querySelector('.status');
            document.getElementById('editDepartmentStatus').value = statusSpan.classList.contains('active') ? 'active' : 'inactive';
            editDeptModal.style.display = 'flex';
            editDeptModal.classList.add('active');
        }
        const deleteBtn = e.target.closest('button[title="Delete"]');
        if (deleteBtn) {
            const row = deleteBtn.closest('tr');
            const name = row.children[1].textContent;
            row.classList.add('fade-out');
            setTimeout(() => row.remove(), 300);
            showNotification(`Department '${name}' deleted!`, 'success');
        }
    });
    closeEditDeptBtn?.addEventListener('click', () => {
        editDeptModal.style.display = 'none';
        editDeptModal.classList.remove('active');
        editingDeptRow = null;
    });
    cancelEditDeptBtn?.addEventListener('click', () => {
        editDeptModal.style.display = 'none';
        editDeptModal.classList.remove('active');
        editingDeptRow = null;
                });
    editDeptModal?.addEventListener('click', (e) => {
        if (e.target === editDeptModal) {
            editDeptModal.style.display = 'none';
            editDeptModal.classList.remove('active');
            editingDeptRow = null;
        }
    });
    editDeptForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!editingDeptRow) return;
        const code = document.getElementById('editDepartmentCode').value;
        const name = document.getElementById('editDepartmentName').value;
        const head = document.getElementById('editDepartmentHead').value;
        const status = document.getElementById('editDepartmentStatus').value;
        editingDeptRow.children[0].textContent = code;
        editingDeptRow.children[1].textContent = name;
        editingDeptRow.children[2].textContent = head;
        const statusSpan = editingDeptRow.querySelector('.status');
        statusSpan.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        statusSpan.className = 'status ' + status;
        editDeptModal.style.display = 'none';
        editDeptModal.classList.remove('active');
        showNotification(`Department '${name}' updated!`, 'success');
        editingDeptRow = null;
    });
    // Add Department Modal logic
    const addDeptBtn = document.getElementById('addDepartmentBtn');
    const addDeptModal = document.getElementById('addDepartmentModal');
    const closeAddDeptBtn = document.getElementById('closeAddDepartmentModal');
    const cancelAddDeptBtn = document.getElementById('cancelAddDepartment');
    const addDeptForm = document.getElementById('addDepartmentForm');
    if (addDeptBtn) {
        addDeptBtn.onclick = () => {
            addDeptModal.style.display = 'flex';
            addDeptModal.classList.add('active');
        };
    }
    closeAddDeptBtn?.addEventListener('click', () => {
        addDeptModal.style.display = 'none';
        addDeptModal.classList.remove('active');
    });
    cancelAddDeptBtn?.addEventListener('click', () => {
        addDeptModal.style.display = 'none';
        addDeptModal.classList.remove('active');
    });
    addDeptModal?.addEventListener('click', (e) => {
        if (e.target === addDeptModal) {
            addDeptModal.style.display = 'none';
            addDeptModal.classList.remove('active');
        }
    });
    addDeptForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = document.getElementById('departmentCode').value;
        const name = document.getElementById('departmentName').value;
        const head = document.getElementById('departmentHead').value;
        const status = document.getElementById('departmentStatus').value;
        // Create new row
        const newRow = document.createElement('tr');
        newRow.className = 'department-row';
        newRow.innerHTML = `
            <td>${code}</td>
            <td>${name}</td>
            <td>${head}</td>
            <td><span class="status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
            <td>
                <button class="user-action-btn" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="user-action-btn" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        const tbody = document.querySelector('.departments-table tbody');
        if (tbody) {
            tbody.insertBefore(newRow, tbody.firstChild);
        }
        addDeptForm.reset();
        addDeptModal.style.display = 'none';
        addDeptModal.classList.remove('active');
        showNotification(`Department '${name}' added!`, 'success');
        });
});

function initDepartmentManagement() {
    // Implementation coming soon
}

function initCourseManagement() {
    // Implementation coming soon
}

function initReports() {
    // Implementation coming soon
}

function initSettings() {
    // Implementation coming soon
}

function initActivityLogs() {
    // Implementation coming soon
}

// Notifications
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const dropdownClose = notificationDropdown?.querySelector('.dropdown-close');

    notificationBtn?.addEventListener('click', () => {
        notificationDropdown.classList.toggle('active');
    });

    dropdownClose?.addEventListener('click', () => {
        notificationDropdown.classList.remove('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-dropdown')) {
            notificationDropdown?.classList.remove('active');
        }
    });
}

// System Settings Panel Demo Logic
function initSystemSettingsPanel() {
    const form = document.getElementById('systemSettingsForm');
    const portalName = document.getElementById('portalName');
    const maintenanceMode = document.getElementById('maintenanceMode');
    const themeSelect = document.getElementById('themeSelect');
    const languageSelect = document.getElementById('languageSelect');
    const cancelBtn = document.getElementById('cancelSettingsBtn');

    // Demo: initial values
    let initialSettings = {
        portalName: portalName.value,
        maintenanceMode: maintenanceMode.checked,
        theme: themeSelect.value,
        language: languageSelect.value
    };

    // Cancel resets to initial demo values
    cancelBtn.addEventListener('click', () => {
        portalName.value = initialSettings.portalName;
        maintenanceMode.checked = initialSettings.maintenanceMode;
        themeSelect.value = initialSettings.theme;
        languageSelect.value = initialSettings.language;
    });

    // Save: show notification (demo)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        initialSettings = {
            portalName: portalName.value,
            maintenanceMode: maintenanceMode.checked,
            theme: themeSelect.value,
            language: languageSelect.value
        };
        showSettingsSavedNotification();
    });
}

function showSettingsSavedNotification() {
    let notif = document.createElement('div');
    notif.className = 'settings-saved-notification';
    notif.textContent = 'Settings saved!';
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.classList.add('show');
    }, 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 400);
    }, 1800);
}

// Export functions
window.openAddUserModal = openAddUserModal;
window.closeAddUserModal = closeAddUserModal;

function initReportsPanel() {
    const generateBtns = document.querySelectorAll('.generate-report-btn');
    const loading = document.getElementById('reportLoading');
    const download = document.getElementById('reportDownload');
    const downloadLink = document.getElementById('downloadReportLink');

    // Demo data for reports
    function getUserReportCSV() {
        return [
            'ID,Name,Email,Role,Status,Department',
            'STU001,John Doe,john.doe@university.edu,Student,Active,Computer Science',
            'PRF001,Sarah Wilson,sarah.wilson@university.edu,Professor,Active,Mathematics',
            'ADM001,Emily Davis,emily.d@university.edu,Admin,Active,Administration',
        ].join('\n');
    }
    function getCourseReportCSV() {
        return [
            'Code,Name,Department,Instructor,Status',
            'CS101,Intro to Programming,Computer Science,Dr. Sarah Wilson,Active',
            'ENG201,Thermodynamics,Engineering,Dr. James Miller,Active',
            'BUS301,Marketing Principles,Business,Dr. Emily Davis,Inactive',
        ].join('\n');
    }
    function getActivityLogCSV() {
        return [
            'Timestamp,User,Action,Status',
            '2024-06-01 09:30,John Doe (Student),Logged in,Success',
            '2024-06-01 09:32,Sarah Wilson (Professor),Uploaded grades,Success',
            '2024-06-01 09:35,Emily Davis (Admin),Changed system settings,Warning',
            '2024-06-01 09:40,James Miller (Professor),Failed login attempt,Error',
        ].join('\n');
    }

    generateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hide download, show loading
            download.style.display = 'none';
            loading.style.display = 'flex';
            // Simulate report generation
            setTimeout(() => {
                loading.style.display = 'none';
                download.style.display = 'flex';
                // Generate CSV based on report type
                let csv = '';
                let filename = '';
                if (btn.dataset.report === 'user') {
                    csv = getUserReportCSV();
                    filename = 'user-report.csv';
                } else if (btn.dataset.report === 'course') {
                    csv = getCourseReportCSV();
                    filename = 'course-report.csv';
                } else if (btn.dataset.report === 'activity') {
                    csv = getActivityLogCSV();
                    filename = 'activity-log.csv';
                }
                // Create Blob and set download link
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = filename;
                showNotification('Report is ready for download!', 'success');
            }, 1500);
        });
    });
}

function initAnnouncementsPanel() {
    const form = document.getElementById('announcementForm');
    const input = document.getElementById('announcementInput');
    const feed = document.getElementById('announcementsFeed');
    if (!form || !input || !feed) return;

    // Add 'Clear All Announcements' button if not present
    let clearBtn = document.getElementById('clearAnnouncementsBtn');
    if (!clearBtn) {
        clearBtn = document.createElement('button');
        clearBtn.id = 'clearAnnouncementsBtn';
        clearBtn.className = 'btn-cancel';
        clearBtn.textContent = 'Clear All Announcements';
        clearBtn.style.margin = '10px 0 15px 0';
        form.parentNode.insertBefore(clearBtn, form);
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all announcements?')) {
                localStorage.removeItem('announcements');
                renderAnnouncements();
            }
        });
    }

    // Helper to render all announcements from localStorage
    function renderAnnouncements() {
        let announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        feed.innerHTML = '';
        if (announcements.length === 0) {
            feed.innerHTML = '<div class="empty-state">No announcements yet.</div>';
            return;
        }
        // Show most recent first
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

    // Initial render
    renderAnnouncements();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        // Get current user (admin) name
        let userData = null;
        try { userData = SessionManager.getSession(); } catch {}
        const author = userData && userData.name ? userData.name : 'System Admin';
        const now = new Date();
        const time = now.toLocaleString();
        // Get existing announcements
        let announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        // Add new announcement
        announcements.push({
            id: Date.now(),
            author,
            time,
            text
        });
        localStorage.setItem('announcements', JSON.stringify(announcements));
        // Re-render feed
        renderAnnouncements();
        // Clear input
        input.value = '';
    });
} 

// Add Course Modal logic
const addCourseBtn = document.getElementById('addCourseBtn');
const addCourseModal = document.getElementById('addCourseModal');
const closeAddCourseBtn = document.getElementById('closeAddCourseModal');
const cancelAddCourseBtn = document.getElementById('cancelAddCourse');
const addCourseForm = document.getElementById('addCourseForm');
if (addCourseBtn) {
    addCourseBtn.onclick = () => {
        addCourseModal.style.display = 'flex';
        addCourseModal.classList.add('active');
    };
}
closeAddCourseBtn?.addEventListener('click', () => {
    addCourseModal.style.display = 'none';
    addCourseModal.classList.remove('active');
});
cancelAddCourseBtn?.addEventListener('click', () => {
    addCourseModal.style.display = 'none';
    addCourseModal.classList.remove('active');
});
addCourseModal?.addEventListener('click', (e) => {
    if (e.target === addCourseModal) {
        addCourseModal.style.display = 'none';
        addCourseModal.classList.remove('active');
    }
});
addCourseForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Always select fields relative to the form
    const codeInput = addCourseForm.querySelector('[name="courseCode"]');
    const nameInput = addCourseForm.querySelector('[name="courseName"]');
    const deptInput = addCourseForm.querySelector('[name="courseDepartment"]');
    const instructorInput = addCourseForm.querySelector('[name="courseInstructor"]');
    const statusInput = addCourseForm.querySelector('[name="courseStatus"]');
    if (!codeInput || !nameInput || !deptInput || !instructorInput || !statusInput) {
        showNotification('Form error: Required elements not found', 'error');
        return;
    }
    const code = codeInput.value.trim();
    const name = nameInput.value.trim();
    const dept = deptInput.value.trim();
    const instructor = instructorInput.value.trim();
    const status = statusInput.value.trim();
    if (!code || !name || !dept || !instructor || !status) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    // Create new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${code}</td>
        <td>${name}</td>
        <td>${dept}</td>
        <td>${instructor}</td>
        <td><span class="status ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span></td>
        <td>
            <button class="user-action-btn" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="user-action-btn" title="Delete"><i class="fas fa-trash"></i></button>
        </td>
    `;
    const tbody = document.querySelector('.courses-table tbody');
    if (tbody) {
        tbody.insertBefore(newRow, tbody.firstChild);
    }
    addCourseForm.reset();
    addCourseModal.style.display = 'none';
    addCourseModal.classList.remove('active');
    showNotification(`Course '${name}' added!`, 'success');
});

// Edit Course Modal logic
let editingCourseRow = null;
const editCourseModal = document.getElementById('editCourseModal');
const closeEditCourseBtn = document.getElementById('closeEditCourseModal');
const cancelEditCourseBtn = document.getElementById('cancelEditCourse');
const editCourseForm = document.getElementById('editCourseForm');
// Delegate edit button clicks in course table
const coursesTable = document.querySelector('.courses-table tbody');
coursesTable?.addEventListener('click', (e) => {
    const editBtn = e.target.closest('button[title="Edit"]');
    if (editBtn) {
        editingCourseRow = editBtn.closest('tr');
        // Fill modal fields with row data
        const code = editingCourseRow.children[0].textContent;
        const name = editingCourseRow.children[1].textContent;
        const dept = editingCourseRow.children[2].textContent;
        const instructor = editingCourseRow.children[3].textContent;
        const statusSpan = editingCourseRow.querySelector('.status');
        const status = statusSpan.classList.contains('active') ? 'active' : 'inactive';
        editCourseForm.querySelector('[name="editCourseCode"]').value = code;
        editCourseForm.querySelector('[name="editCourseName"]').value = name;
        editCourseForm.querySelector('[name="editCourseDepartment"]').value = dept;
        editCourseForm.querySelector('[name="editCourseInstructor"]').value = instructor;
        editCourseForm.querySelector('[name="editCourseStatus"]').value = status;
        editCourseModal.style.display = 'flex';
        editCourseModal.classList.add('active');
    }
    const deleteBtn = e.target.closest('button[title="Delete"]');
    if (deleteBtn) {
        const row = deleteBtn.closest('tr');
        const name = row.children[1].textContent;
        row.classList.add('fade-out');
        setTimeout(() => row.remove(), 300);
        showNotification(`Course '${name}' deleted!`, 'success');
    }
});
closeEditCourseBtn?.addEventListener('click', () => {
    editCourseModal.style.display = 'none';
    editCourseModal.classList.remove('active');
    editingCourseRow = null;
});
cancelEditCourseBtn?.addEventListener('click', () => {
    editCourseModal.style.display = 'none';
    editCourseModal.classList.remove('active');
    editingCourseRow = null;
});
editCourseModal?.addEventListener('click', (e) => {
    if (e.target === editCourseModal) {
        editCourseModal.style.display = 'none';
        editCourseModal.classList.remove('active');
        editingCourseRow = null;
    }
});
editCourseForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!editingCourseRow) return;
    // Always select fields relative to the form
    const codeInput = editCourseForm.querySelector('[name="editCourseCode"]');
    const nameInput = editCourseForm.querySelector('[name="editCourseName"]');
    const deptInput = editCourseForm.querySelector('[name="editCourseDepartment"]');
    const instructorInput = editCourseForm.querySelector('[name="editCourseInstructor"]');
    const statusInput = editCourseForm.querySelector('[name="editCourseStatus"]');
    if (!codeInput || !nameInput || !deptInput || !instructorInput || !statusInput) {
        showNotification('Form error: Required elements not found', 'error');
        return;
    }
    const code = codeInput.value.trim();
    const name = nameInput.value.trim();
    const dept = deptInput.value.trim();
    const instructor = instructorInput.value.trim();
    const status = statusInput.value.trim();
    if (!code || !name || !dept || !instructor || !status) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    // Update the row
    editingCourseRow.children[0].textContent = code;
    editingCourseRow.children[1].textContent = name;
    editingCourseRow.children[2].textContent = dept;
    editingCourseRow.children[3].textContent = instructor;
    const statusSpan = editingCourseRow.querySelector('.status');
    statusSpan.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    statusSpan.className = 'status ' + status;
    editCourseModal.style.display = 'none';
    editCourseModal.classList.remove('active');
    showNotification(`Course '${name}' updated!`, 'success');
    editingCourseRow = null;
}); 

// Edit Profile Modal logic
const editProfileModal = document.getElementById('editProfileModal');
const closeEditProfileBtn = document.getElementById('closeEditProfileModal');
const cancelEditProfileBtn = document.getElementById('cancelEditProfile');
const editProfileForm = document.getElementById('editProfileForm');
// Open Edit Profile modal and pre-fill fields
const editProfileBtn = document.getElementById('editProfileBtn');
editProfileBtn?.addEventListener('click', () => {
    // Get current profile info
    const name = document.getElementById('profileName')?.textContent || '';
    const email = document.getElementById('profileRole')?.textContent.includes('@') ? document.getElementById('profileRole').textContent : 'admin@university.edu';
    // Try to get email from profile details if available
    const emailDetail = profileDropdown.querySelector('.profile-detail label')?.textContent === 'Email' ? profileDropdown.querySelector('.profile-detail p')?.textContent : null;
    const emailValue = emailDetail || email;
    editProfileForm.querySelector('[name="editProfileName"]').value = name;
    editProfileForm.querySelector('[name="editProfileEmail"]').value = emailValue;
    editProfileForm.querySelector('[name="editProfileCurrentPassword"]').value = '';
    editProfileForm.querySelector('[name="editProfileNewPassword"]').value = '';
    editProfileForm.querySelector('[name="editProfileConfirmPassword"]').value = '';
    editProfileModal.style.display = 'flex';
    editProfileModal.classList.add('active');
});
closeEditProfileBtn?.addEventListener('click', () => {
    editProfileModal.style.display = 'none';
    editProfileModal.classList.remove('active');
});
cancelEditProfileBtn?.addEventListener('click', () => {
    editProfileModal.style.display = 'none';
    editProfileModal.classList.remove('active');
});
editProfileModal?.addEventListener('click', (e) => {
    if (e.target === editProfileModal) {
        editProfileModal.style.display = 'none';
        editProfileModal.classList.remove('active');
    }
});
editProfileForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Always select fields relative to the form
    const nameInput = editProfileForm.querySelector('[name="editProfileName"]');
    const emailInput = editProfileForm.querySelector('[name="editProfileEmail"]');
    const currentPwInput = editProfileForm.querySelector('[name="editProfileCurrentPassword"]');
    const newPwInput = editProfileForm.querySelector('[name="editProfileNewPassword"]');
    const confirmPwInput = editProfileForm.querySelector('[name="editProfileConfirmPassword"]');
    if (!nameInput || !emailInput || !currentPwInput || !newPwInput || !confirmPwInput) {
        showNotification('Form error: Required elements not found', 'error');
        return;
    }
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const currentPw = currentPwInput.value;
    const newPw = newPwInput.value;
    const confirmPw = confirmPwInput.value;
    if (!name || !email) {
        showNotification('Please fill in all required fields', 'warning');
        return;
    }
    // Password change logic (demo)
    if (newPw || confirmPw) {
        if (!currentPw) {
            showNotification('Enter your current password to change password.', 'warning');
            return;
        }
        if (newPw !== confirmPw) {
            showNotification('New passwords do not match.', 'error');
            return;
        }
    }
    // Update profile UI (name, email, initials)
    const profileName = document.getElementById('profileName');
    const userName = document.getElementById('userName');
    const welcomeAdminName = document.getElementById('welcomeAdminName');
    const profileInitials = document.getElementById('profileInitials');
    const userInitials = document.getElementById('userInitials');
    if (profileName) profileName.textContent = name;
    if (userName) userName.textContent = name;
    if (welcomeAdminName) welcomeAdminName.textContent = name;
    // Update initials
    const initials = name.split(' ').filter(part => part.length > 0).map(n => n[0]).join('').toUpperCase().slice(0,2);
    if (profileInitials) profileInitials.textContent = initials;
    if (userInitials) userInitials.textContent = initials;
    // Update email in profile details (if present)
    const emailDetail = profileDropdown.querySelector('.profile-detail label')?.textContent === 'Email' ? profileDropdown.querySelector('.profile-detail p') : null;
    if (emailDetail) emailDetail.textContent = email;
    editProfileModal.style.display = 'none';
    editProfileModal.classList.remove('active');
    showNotification('Profile updated successfully!', 'success');
}); 

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

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    if (typeof initProfileDropdown === 'function') {
        initProfileDropdown();
    }
    // ... existing code ...
}); 

// --- Reset Password Modal Logic ---
let resettingUserEmail = null;
const resetPasswordModal = document.getElementById('resetPasswordModal');
const closeResetPasswordBtn = document.getElementById('closeResetPasswordModal');
const cancelResetPasswordBtn = document.getElementById('cancelResetPassword');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const resetPasswordUserInput = document.getElementById('resetPasswordUser');
const resetPasswordNewInput = document.getElementById('resetPasswordNew');

// Open modal on Reset Password button click in user table
const usersTable = document.getElementById('usersTableBody');
usersTable?.addEventListener('click', (e) => {
    const resetBtn = e.target.closest('button[title="Reset Password"]');
    if (resetBtn) {
        const row = resetBtn.closest('tr.user-row');
        const userName = row.querySelector('.user-name').textContent;
        const userEmail = row.querySelector('.user-email').textContent;
        resettingUserEmail = userEmail;
        resetPasswordUserInput.value = `${userName} (${userEmail})`;
        resetPasswordNewInput.value = '';
        resetPasswordModal.style.display = 'block';
        resetPasswordModal.classList.add('active');
    }
});

closeResetPasswordBtn?.addEventListener('click', () => {
    resetPasswordModal.style.display = 'none';
    resetPasswordModal.classList.remove('active');
    resettingUserEmail = null;
});
cancelResetPasswordBtn?.addEventListener('click', () => {
    resetPasswordModal.style.display = 'none';
    resetPasswordModal.classList.remove('active');
    resettingUserEmail = null;
});
resetPasswordModal?.addEventListener('click', (e) => {
    if (e.target === resetPasswordModal) {
        resetPasswordModal.style.display = 'none';
        resetPasswordModal.classList.remove('active');
        resettingUserEmail = null;
    }
});
resetPasswordForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPassword = resetPasswordNewInput.value.trim();
    if (!resettingUserEmail || !newPassword) return;
    let users = getUsersFromStorage();
    const idx = users.findIndex(u => u.email === resettingUserEmail);
    if (idx !== -1) {
        users[idx].password = newPassword;
        setUsersToStorage(users);
        showNotification('Password reset successfully!', 'success');
    }
    resetPasswordModal.style.display = 'none';
    resetPasswordModal.classList.remove('active');
    resettingUserEmail = null;
}); 