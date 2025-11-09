const authContainer = document.getElementById('authContainer');
const professorBtn = document.getElementById('professorBtn');
const studentBtn = document.getElementById('studentBtn');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const studentLoginForm = document.getElementById('studentLoginForm');
const professorLoginForm = document.getElementById('professorLoginForm');
const registerForm = document.getElementById('registerForm');

// Demo user data
const users = {
    students: {
        'STU001': { password: 'password123', name: 'John Doe' },
        'STU002': { password: 'student456', name: 'Jane Smith' },
        'STU123': { password: 'demo123', name: 'Demo Student' }
    },
    professors: {
        'PROF001': { password: 'prof123', name: 'Dr. Johnson' },
        'PROF002': { password: 'faculty456', name: 'Dr. Williams' },
        'PROF456': { password: 'demo456', name: 'Demo Professor' }
    },
    admins: {
        'ADMIN001': { password: 'admin123', name: 'System Administrator' },
        'ADMIN002': { password: 'test456', name: 'Test Admin' }
    }
};

// Toggle between student and professor login
professorBtn.addEventListener('click', () => {
    authContainer.classList.add('active');
    authContainer.classList.remove('register-mode');
});

studentBtn.addEventListener('click', () => {
    authContainer.classList.remove('active');
    authContainer.classList.remove('register-mode');
});

// Toggle between login and register
registerBtn.addEventListener('click', () => {
    authContainer.classList.add('register-mode');
});

loginBtn.addEventListener('click', () => {
    authContainer.classList.remove('register-mode');
});

// --- Student Registration and Login with Local Storage ---
function getUsersFromStorage() {
    let users = JSON.parse(localStorage.getItem('ums_users'));
    if (!users) users = [];
    return users;
}
function setUsersToStorage(users) {
    localStorage.setItem('ums_users', JSON.stringify(users));
}

// Student login form submission
studentLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('studentId').value.trim();
    const password = document.getElementById('studentPassword').value;
    if (!id || !password) {
        alert('Please fill in all fields');
        return;
    }
    // Check credentials in Local Storage
    const users = getUsersFromStorage();
    const user = users.find(u => u.id === id && u.password === password && u.role === 'student');
    if (user) {
        // Save user info in session storage for persistence across pages
        const userData = {
            id: user.id,
            name: user.name,
            role: 'student'
        };
        SessionManager.saveSession(userData);
        // Show brief loading message
        const submitBtn = studentLoginForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;
        setTimeout(() => {
            NavigationController.navigateTo('studentPortal');
        }, 800);
    } else {
        alert('Invalid Student ID or Password');
    }
});

// Professor login form submission
professorLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('professorId').value.trim();
    const password = document.getElementById('professorPassword').value;
    if (!id || !password) {
        alert('Please fill in all fields');
        return;
    }
    // Check credentials in Local Storage
    const users = getUsersFromStorage();
    const user = users.find(u => u.id === id && u.password === password && u.role === 'professor');
    if (user) {
        // Save user info in session storage
        const userData = {
            id: user.id,
            name: user.name,
            role: 'professor'
        };
        SessionManager.saveSession(userData);
        // Show brief loading message
        const submitBtn = professorLoginForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;
        setTimeout(() => {
            NavigationController.navigateTo('professorPortal');
        }, 800);
    } else {
        alert('Invalid Professor ID or Password');
    }
});

// Registration form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get all form data
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const studentId = document.getElementById('regStudentId').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const department = document.getElementById('regDepartment').value;
    const year = document.getElementById('regYear').value;
    // Basic validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    // Check if student ID already exists in Local Storage
    let users = getUsersFromStorage();
    if (users.some(u => u.id === studentId)) {
        alert('Student ID already exists. Please choose another.');
        return;
    }
    // Add new student to Local Storage
    users.push({
        id: studentId,
        password: password,
        name: name,
        email: email,
        phone: phone,
        department: department,
        year: year,
        role: 'student',
        status: 'active',
        joinDate: new Date().toISOString().slice(0, 10)
    });
    setUsersToStorage(users);
    alert(`Registration successful!\nWelcome ${name}!\nYou can now login with your credentials.`);
    resetRegistrationForm();
    authContainer.classList.remove('register-mode');
});
// --- End Student Registration/Login Local Storage Migration ---

// Multi-step registration functions
function nextStep(currentStep) {
    // Validate current step
    if (currentStep === 1) {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        
        if (!name || !email || !phone) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simple email validation
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
    } else if (currentStep === 2) {
        const studentId = document.getElementById('regStudentId').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        if (!studentId || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Check if student ID already exists
        if (users.students[studentId]) {
            alert('Student ID already exists. Please choose another.');
            return;
        }
    }
    
    // Hide current step
    document.getElementById(`step${currentStep}`).style.display = 'none';
    
    // Show next step
    document.getElementById(`step${currentStep + 1}`).style.display = 'block';
    
    // Update progress bar
    const progress = document.getElementById('registerProgress');
    progress.style.width = `${(currentStep + 1) * 33.33}%`;
    
    // Update step indicators
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
    document.querySelector(`.step[data-step="${currentStep + 1}"]`).classList.add('active');
}

function prevStep(currentStep) {
    // Hide current step
    document.getElementById(`step${currentStep}`).style.display = 'none';
    
    // Show previous step
    document.getElementById(`step${currentStep - 1}`).style.display = 'block';
    
    // Update progress bar
    const progress = document.getElementById('registerProgress');
    progress.style.width = `${(currentStep - 1) * 33.33}%`;
    
    // Update step indicators
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep - 1}"]`).classList.remove('completed');
    document.querySelector(`.step[data-step="${currentStep - 1}"]`).classList.add('active');
}

function resetRegistrationForm() {
    // Reset all form fields
    registerForm.reset();
    
    // Reset progress bar and steps
    document.getElementById('registerProgress').style.width = '33.33%';
    
    // Reset step indicators
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    document.querySelector('.step[data-step="1"]').classList.add('active');
    
    // Show step 1 and hide others
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
}

// Quick login function
function quickLogin(role, id, password) {
    let userGroup;
    let redirectTarget;
    
    switch(role) {
        case 'student':
            userGroup = users.students;
            redirectTarget = 'studentPortal';
            break;
        case 'professor':
            userGroup = users.professors;
            redirectTarget = 'professorPortal';
            break;
        case 'admin':
            userGroup = users.admins;
            redirectTarget = 'adminPortal';
            break;
        default:
            alert('Invalid role');
            return;
    }
    
    if (userGroup[id] && userGroup[id].password === password) {
        const user = userGroup[id];
        
        // Save user info
        const userData = {
            id: id,
            name: user.name,
            role: role
        };
        
        SessionManager.saveSession(userData);
        
        // Show loading state for admin login
        if (role === 'admin') {
            const modal = document.getElementById('adminLoginModal');
            const form = document.getElementById('adminLoginForm');
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            
            // Add a slight delay for the loading state to be visible
            setTimeout(() => {
                modal.style.display = 'none';
                NavigationController.navigateTo(redirectTarget);
            }, 800);
        } else {
            // Redirect using the NavigationController
            NavigationController.navigateTo(redirectTarget);
        }
    } else {
        alert('Invalid demo credentials');
    }
}

// Input focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// Admin portal link
document.querySelector('.admin-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Admin portal access requires special permissions.');
});

// Initialize session check
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (SessionManager.isLoggedIn()) {
        // Get user data
        const userData = SessionManager.getSession();
        
        // Redirect based on user role
        if (userData.role === 'student') {
            NavigationController.navigateTo('studentPortal');
        } else if (userData.role === 'professor') {
            NavigationController.navigateTo('professorPortal');
        }
    }
});

// Admin login form submission using Local Storage
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('adminUsername').value.trim();
        const password = document.getElementById('adminPassword').value;
        const submitBtn = adminLoginForm.querySelector('button[type="submit"]');
        if (!id || !password) {
            alert('Please fill in all fields');
            return;
        }
        // Load users from Local Storage
        let users = JSON.parse(localStorage.getItem('ums_users')) || [];
        const user = users.find(u => u.id === id && u.password === password && u.role === 'admin');
        if (user) {
            // Save user info in session
            const userData = {
                id: user.id,
                name: user.name,
                role: user.role
            };
            SessionManager.saveSession(userData);
            // Show loading spinner
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            setTimeout(() => {
                document.getElementById('adminLoginModal').style.display = 'none';
                NavigationController.navigateTo('adminPortal');
            }, 800);
        } else {
            alert('Invalid Admin ID or Password');
        }
    });
}