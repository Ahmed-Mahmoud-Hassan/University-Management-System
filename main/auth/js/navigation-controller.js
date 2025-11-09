/**
 * University Management System - Navigation Controller
 * Handles navigation and session management across all pages
 */

// Navigation URLs for the different parts of the system
const APP_ROUTES = {
    login: 'login-advanced.html',
    studentPortal: 'student-portal.html',
    professorPortal: 'professor-portal.html',
    adminPortal: 'admin-portal.html', // Updated route name to match quickLogin function
    dashboard: 'university_dashboard_prototype.html'
};

// Get base URL for navigation
function getBaseUrl() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('auth/')) {
        return '../'; // We're in a subdirectory, need to go up one level
    }
    return './'; // We're at the root
}

// Session management functions
const SessionManager = {
    /**
     * Save user session data
     * @param {Object} userData User data to save in session
     */
    saveSession: (userData) => {
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
    },
    
    /**
     * Get current logged in user data
     * @returns {Object|null} User data or null if not logged in
     */
    getSession: () => {
        const userData = sessionStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },
    
    /**
     * Clear user session data (logout)
     */
    clearSession: () => {
        sessionStorage.removeItem('currentUser');
    },
    
    /**
     * Check if user is logged in
     * @returns {Boolean} True if logged in, false otherwise
     */
    isLoggedIn: () => {
        return sessionStorage.getItem('currentUser') !== null;
    },
    
    /**
     * Check if user has a specific role
     * @param {String} role Role to check ('student', 'professor', 'admin')
     * @returns {Boolean} True if user has the role, false otherwise
     */
    hasRole: (role) => {
        const userData = SessionManager.getSession();
        return userData && userData.role === role;
    }
};

// Navigation controller functions
const NavigationController = {
    /**
     * Navigate to a specific page
     * @param {String} route Route key from APP_ROUTES
     */
    navigateTo: (route) => {
        if (APP_ROUTES[route]) {
            const baseUrl = getBaseUrl();
            window.location.href = baseUrl + APP_ROUTES[route];
        } else {
            console.error(`Route ${route} not found`);
        }
    },
    
    /**
     * Direct link to a page
     * @param {String} page Page name to navigate to
     */
    directLink: (page) => {
        const baseUrl = getBaseUrl();
        window.location.href = baseUrl + page;
    },
    
    /**
     * Navigate to the appropriate page based on user role
     */
    navigateByRole: () => {
        const userData = SessionManager.getSession();
        
        if (!userData) {
            NavigationController.navigateTo('login');
            return;
        }
        
        switch (userData.role) {
            case 'student':
                NavigationController.navigateTo('studentPortal');
                break;
            case 'professor':
                NavigationController.navigateTo('professorPortal');
                break;
            case 'admin':
                NavigationController.navigateTo('adminPortal'); // Updated to match route name
                break;
            default:
                NavigationController.navigateTo('dashboard');
        }
    },
    
    /**
     * Perform logout and redirect to login page
     */
    logout: () => {
        SessionManager.clearSession();
        NavigationController.navigateTo('login');
    },
    
    /**
     * Check login status and redirect if not authenticated
     * @returns {Boolean} True if authenticated, false otherwise
     */
    checkAuth: () => {
        const userData = SessionManager.getSession();
        
        if (!userData) {
            NavigationController.navigateTo('login');
            return false;
        }
        
        return true;
    },
    
    /**
     * Update the UI based on the current user's data
     */
    updateUserUI: () => {
        const userData = SessionManager.getSession();
        
        if (!userData) return;
        
        // Update name displays
        const userNameElement = document.getElementById('userName');
        const profileNameElement = document.getElementById('profileName');
        if (userNameElement) userNameElement.textContent = userData.name;
        if (profileNameElement) profileNameElement.textContent = userData.name;
        
        // Update ID
        const profileIdElement = document.getElementById('profileId');
        if (profileIdElement) profileIdElement.textContent = userData.id;
        
        // Update role
        const userRoleElement = document.getElementById('userRole');
        const profileRoleElement = document.getElementById('profileRole');
        if (userRoleElement) userRoleElement.textContent = userData.role.charAt(0).toUpperCase() + userData.role.slice(1);
        if (profileRoleElement) {
            const roleText = userData.role === 'professor' ? 'Professor' : 'Student';
            profileRoleElement.textContent = roleText;
        }
        
        // Update user initials
        const initials = getUserInitials(userData.name);
        const userInitialsElement = document.getElementById('userInitials');
        const profileInitialsElement = document.getElementById('profileInitials');
        if (userInitialsElement) userInitialsElement.textContent = initials;
        if (profileInitialsElement) profileInitialsElement.textContent = initials;
    }
};

// Helper functions
/**
 * Get initials from a name
 * @param {String} name Full name
 * @returns {String} Initials
 */
function getUserInitials(name) {
    return name.split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase();
}

// Export objects for use in other scripts
window.SessionManager = SessionManager;
window.NavigationController = NavigationController;

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Update UI with user data if available
    NavigationController.updateUserUI();
    
    // Add navigation event listeners to links
    addNavigationListeners();
});

// Add navigation event listeners to specific links
function addNavigationListeners() {
    // Add click handlers for common navigation elements
    const dashboardLinks = document.querySelectorAll('a[href*="university_dashboard_prototype.html"]');
    const studentPortalLinks = document.querySelectorAll('a[href*="student-portal.html"]');
    const logoutButtons = document.querySelectorAll('button.profile-logout, a[onclick*="logout()"]');
    
    // Dashboard links
    dashboardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            NavigationController.directLink('university_dashboard_prototype.html');
        });
    });
    
    // Student portal links
    studentPortalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            NavigationController.directLink('student-portal.html');
        });
    });
    
    // Logout buttons
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            NavigationController.logout();
        });
    });
}

// Global logout function
function logout() {
    NavigationController.logout();
} 