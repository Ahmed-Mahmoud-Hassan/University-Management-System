// Admin data
const adminUsers = {
    'admin': { password: 'admin123', name: 'System Administrator' },
    'superadmin': { password: 'super123', name: 'Super Admin' }
};

// Admin login modal
const adminLink = document.getElementById('adminLink');
const adminLoginModal = document.getElementById('adminLoginModal');
const closeModal = document.querySelector('.close');

adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    adminLoginModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    adminLoginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === adminLoginModal) {
        adminLoginModal.style.display = 'none';
    }
});

// Admin Dashboard
function showAdminDashboard(admin) {
    // Create dashboard HTML
    const dashboardHTML = `
        <div class="admin-dashboard" id="adminDashboard">
            <header class="admin-header">
                <h2>Admin Dashboard</h2>
                <div>
                    <span>Welcome, ${admin.name}</span>
                    <button id="logoutAdmin" style="margin-left: 15px;">Logout</button>
                </div>
            </header>
            <nav class="admin-nav">
                <ul>
                    <li class="active" data-section="dashboard">Dashboard</li>
                    <li data-section="users">User Management</li>
                    <li data-section="courses">Course Management</li>
                    <li data-section="settings">System Settings</li>
                </ul>
            </nav>
            <main class="admin-main">
                <div id="dashboardSection" class="admin-section">
                    <h3>System Overview</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h4>Total Students</h4>
                            <div class="value" id="totalStudents">0</div>
                            <p>Registered in system</p>
                        </div>
                        <div class="stat-card">
                            <h4>Total Professors</h4>
                            <div class="value" id="totalProfessors">0</div>
                            <p>Teaching staff</p>
                        </div>
                        <div class="stat-card">
                            <h4>Active Courses</h4>
                            <div class="value" id="totalCourses">0</div>
                            <p>This semester</p>
                        </div>
                    </div>
                    
                    <div class="admin-card">
                        <h3>Recent Activity</h3>
                        <div id="recentActivity">
                            <p>Loading recent activity...</p>
                        </div>
                    </div>
                </div>
                
                <div id="usersSection" class="admin-section" style="display: none;">
                    <h3>User Management</h3>
                    <div class="admin-card">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <h4 style="margin: 0;">All Users</h4>
                            <button id="addUserBtn">Add New User</button>
                        </div>
                        <table class="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="usersTableBody">
                                <!-- Users will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div id="coursesSection" class="admin-section" style="display: none;">
                    <h3>Course Management</h3>
                    <div class="admin-card">
                        <p>Course management functionality will be implemented here.</p>
                    </div>
                </div>
                
                <div id="settingsSection" class="admin-section" style="display: none;">
                    <h3>System Settings</h3>
                    <div class="admin-card">
                        <p>System configuration options will be available here.</p>
                    </div>
                </div>
            </main>
        </div>
    `;
    
    // Add dashboard to body
    document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    
    // Initialize dashboard functionality
    initAdminDashboard();
}

function initAdminDashboard() {
    // Navigation
    const navItems = document.querySelectorAll('.admin-nav li');
    const sections = document.querySelectorAll('.admin-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active nav item
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.getAttribute('data-section') + 'Section';
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(sectionId).style.display = 'block';
        });
    });
    
    // Logout button
    document.getElementById('logoutAdmin').addEventListener('click', () => {
        document.getElementById('adminDashboard').remove();
    });
    
    // Load user data
    loadUserData();
    
    // Add user button
    document.getElementById('addUserBtn')?.addEventListener('click', () => {
        showAddUserModal();
    });
}

function loadUserData() {
    // In a real app, this would come from an API
    // For demo, we'll use our existing users object
    
    // Update stats
    document.getElementById('totalStudents').textContent = Object.keys(users.students).length;
    document.getElementById('totalProfessors').textContent = Object.keys(users.professors).length;
    document.getElementById('totalCourses').textContent = '12'; // Hardcoded for demo
    
    // Load users table
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';
    
    // Add students
    for (const [id, user] of Object.entries(users.students)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td>${user.name}</td>
            <td>${user.email || 'N/A'}</td>
            <td>Student</td>
            <td>
                <button class="action-btn edit-btn" data-id="${id}" data-role="student">Edit</button>
                <button class="action-btn delete-btn" data-id="${id}" data-role="student">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    
    // Add professors
    for (const [id, user] of Object.entries(users.professors)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td>${user.name}</td>
            <td>${user.email || 'N/A'}</td>
            <td>Professor</td>
            <td>
                <button class="action-btn edit-btn" data-id="${id}" data-role="professor">Edit</button>
                <button class="action-btn delete-btn" data-id="${id}" data-role="professor">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    
    // Add admin users
    for (const [id, user] of Object.entries(adminUsers)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${id}</td>
            <td>${user.name}</td>
            <td>N/A</td>
            <td>Admin</td>
            <td>
                <button class="action-btn edit-btn" data-id="${id}" data-role="admin">Edit</button>
                <button class="action-btn delete-btn" data-id="${id}" data-role="admin">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const role = e.target.getAttribute('data-role');
            editUser(id, role);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const role = e.target.getAttribute('data-role');
            if (confirm(`Are you sure you want to delete ${role} ${id}?`)) {
                deleteUser(id, role);
            }
        });
    });
}

function editUser(id, role) {
    // In a real app, this would open an edit modal
    alert(`Edit ${role} ${id} - This would open an edit form in a real implementation`);
}

function deleteUser(id, role) {
    // In a real app, this would call an API
    if (role === 'student') {
        delete users.students[id];
    } else if (role === 'professor') {
        delete users.professors[id];
    } else if (role === 'admin') {
        delete adminUsers[id];
    }
    
    // Reload user data
    loadUserData();
    alert(`${role} ${id} has been deleted`);
}

function showAddUserModal() {
    const modal = document.getElementById('addUserModal');
    if (modal) modal.style.display = 'flex';
}

// Modal close/cancel logic
window.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('addUserModal');
    const closeBtn = document.getElementById('closeAddUserModal');
    const cancelBtn = document.getElementById('cancelAddUser');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };
    if (cancelBtn) cancelBtn.onclick = () => { modal.style.display = 'none'; };

    // Form submission
    const form = document.getElementById('addUserForm');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            const role = document.getElementById('userRole').value;
            const id = document.getElementById('userId').value.trim();
            const name = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const password = document.getElementById('userPassword').value;
            if (!role || !id || !name || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }
            // Check for duplicate ID
            if ((role === 'student' && users.students[id]) || (role === 'professor' && users.professors[id])) {
                alert('User ID already exists!');
                return;
            }
            // Add user
            if (role === 'student') {
                users.students[id] = { password, name, email };
            } else if (role === 'professor') {
                users.professors[id] = { password, name, email };
            }
            modal.style.display = 'none';
            form.reset();
            loadUserData();
            alert('User added successfully!');
        };
    }
});

// Sample recent activity data
function loadRecentActivity() {
    const activity = [
        'New student registered: STU124',
        'Professor Williams updated course CS101',
        'System backup completed at 03:00 AM',
        '5 new login attempts recorded'
    ];
    
    const activityList = activity.map(item => `<p><i class="fas fa-circle" style="font-size: 8px; color: #3498db; margin-right: 10px;"></i> ${item}</p>`).join('');
    document.getElementById('recentActivity').innerHTML = activityList;
}