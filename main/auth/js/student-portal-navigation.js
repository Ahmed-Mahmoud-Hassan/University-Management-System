/**
 * University Management System - Student Portal Navigation
 * Handles navigation between different sections of the student portal
 */

// Initialize the navigation system
document.addEventListener('DOMContentLoaded', () => {
    initPageNavigation();
    initBreadcrumbNavigation();
    initWidgetLinks();
    initSlidingPanel();
});

// Function to initialize page navigation
function initPageNavigation() {
    const menuLinks = document.querySelectorAll('.sidebar-menu-link[data-page]');
    const pageSections = document.querySelectorAll('.page-section');
    const headerTitle = document.querySelector('.header-left h1');
    const breadcrumb = document.querySelector('.breadcrumb');
    
    // Store current active page
    let currentPage = 'dashboard';
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target page
            const targetPage = link.getAttribute('data-page');
            
            // Skip if already on the page
            if (targetPage === currentPage) return;
            
            // Update current page
            currentPage = targetPage;
            
            // Update active menu item
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Hide all sections with fade-out animation
            pageSections.forEach(section => {
                if (section.classList.contains('active')) {
                    section.classList.add('fade-out');
                    setTimeout(() => {
                        section.classList.remove('active', 'fade-out');
                    }, 300);
                } else {
                section.classList.remove('active');
                }
            });
            
            // Show target section with fade-in animation
            setTimeout(() => {
                const targetSection = document.getElementById(targetPage + 'Section');
                if (targetSection) {
                    targetSection.classList.add('active', 'fade-in');
                    
                    // Update header title
                    const pageTitle = link.querySelector('.sidebar-menu-text').textContent;
                    headerTitle.textContent = pageTitle;
                    
                    // Update breadcrumb
                    breadcrumb.innerHTML = `Home / Student Portal / ${pageTitle}`;
                    
                    // Initialize section if needed
                    initializeSection(targetPage);
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 300);
        });
    });
}

// Function to initialize breadcrumb navigation
function initBreadcrumbNavigation() {
    const breadcrumb = document.querySelector('.breadcrumb');
    
    if (breadcrumb) {
        breadcrumb.addEventListener('click', (e) => {
            const text = e.target.textContent.trim();
            
            if (text === 'Home') {
                // Redirect to dashboard
                window.location.href = 'index.html';
            } else if (text === 'Student Portal') {
                // Activate dashboard
                const dashboardLink = document.querySelector('.sidebar-menu-link[data-page="dashboard"]');
                if (dashboardLink) {
                    dashboardLink.click();
                }
            }
        });
    }
}

// Function to initialize widget links
function initWidgetLinks() {
    const widgetLinks = document.querySelectorAll('.widget-link[data-page]');
    
    widgetLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetPage = link.getAttribute('data-page');
            const sidebarLink = document.querySelector(`.sidebar-menu-link[data-page="${targetPage}"]`);
            
            if (sidebarLink) {
                sidebarLink.click();
            }
        });
    });
}
    
// Function to initialize section specific functionality
    function initializeSection(sectionId) {
    switch (sectionId) {
        case 'dashboard':
            // Dashboard already initialized on page load
            break;
            case 'courses':
            // Load courses data if not already loaded
            if (!document.querySelector('.course-grid .course-card')) {
                window.loadCoursesSection();
                }
                break;
            case 'assignments':
            // Load assignments if not already loaded
            if (!document.querySelector('.assignments-container')) {
                window.loadAssignmentsSection();
                }
                break;
            case 'grades':
            // Load grades if not already loaded
            if (!document.querySelector('.grades-container')) {
                window.loadGradesSection();
            }
            break;
        case 'schedule':
            // Load schedule if not already loaded
            if (!document.querySelector('.calendar-container')) {
                window.loadScheduleSection();
            }
            break;
        case 'planner':
            // Load planner if not already loaded
            if (!document.querySelector('.planner-container')) {
                window.loadPlannerSection();
                }
                break;
        case 'announcements':
            // Load announcements if not already loaded
            if (!document.querySelector('.announcements-panel')) {
                loadAnnouncementsSection();
                }
                break;
        }
    }
    
// Function to load announcements section
function loadAnnouncementsSection() {
    const announcementsSection = document.getElementById('announcementsSection');
    
    if (announcementsSection && !announcementsSection.querySelector('.announcements-panel')) {
        // Create announcements panel
        const panel = document.createElement('div');
        panel.className = 'announcements-panel';
        
        panel.innerHTML = `
            <h2>Announcements</h2>
            <form class="announcement-form">
                <input type="text" class="form-control" placeholder="Type your announcement...">
                <button type="submit" class="btn-submit">Post Announcement</button>
            </form>
            <div class="announcements-feed">
                <div class="announcement-item">
                    <div class="announcement-meta">
                        <span class="announcement-author">System Admin</span>
                        <span class="announcement-time">2 hours ago</span>
                    </div>
                    <p class="announcement-text">Welcome to the new University Management System! We've updated the interface to make it more intuitive and responsive.</p>
                </div>
                <div class="announcement-item">
                    <div class="announcement-meta">
                        <span class="announcement-author">Dr. Johnson</span>
                        <span class="announcement-time">Yesterday</span>
                    </div>
                    <p class="announcement-text">CS101 class will be held online this Friday due to building maintenance. Please check your email for the meeting link.</p>
                </div>
                <div class="announcement-item">
                    <div class="announcement-meta">
                        <span class="announcement-author">Academic Affairs</span>
                        <span class="announcement-time">3 days ago</span>
                    </div>
                    <p class="announcement-text">Registration for the Spring semester opens next week. Please review your degree requirements before selecting courses.</p>
                </div>
            </div>
        `;
        
        // Add submit handler for the form
        const form = panel.querySelector('.announcement-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = form.querySelector('input');
            const text = input.value.trim();
            
            if (text) {
                const feed = panel.querySelector('.announcements-feed');
                const newAnnouncement = document.createElement('div');
                newAnnouncement.className = 'announcement-item';
                
                // Get current user from profile
                const userName = document.getElementById('userName').textContent;
                
                newAnnouncement.innerHTML = `
                    <div class="announcement-meta">
                        <span class="announcement-author">${userName}</span>
                        <span class="announcement-time">Just now</span>
                    </div>
                    <p class="announcement-text">${text}</p>
                `;
                
                // Add to the beginning of the feed with animation
                feed.insertBefore(newAnnouncement, feed.firstChild);
                newAnnouncement.style.animation = 'fadeIn 0.4s cubic-bezier(0.25,0.8,0.25,1)';
                
                // Clear input
                input.value = '';
                
                // Show notification
                showNotification('Announcement posted successfully!', 'success');
            }
        });
        
        announcementsSection.appendChild(panel);
    }
}

// Function to show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Helper function to get notification icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Expose functions to window for access from other scripts
window.initializeSection = initializeSection;
window.showNotification = showNotification;

// Function to initialize sliding panel
    function initSlidingPanel() {
    // Create sliding panel container if it doesn't exist
    let slidingPanel = document.querySelector('.sliding-panel');
    if (!slidingPanel) {
        slidingPanel = document.createElement('div');
        slidingPanel.className = 'sliding-panel';
        slidingPanel.innerHTML = `
            <div class="sliding-panel-header">
                <h3 class="sliding-panel-title">Details</h3>
                <button class="sliding-panel-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="sliding-panel-content"></div>
        `;
        document.body.appendChild(slidingPanel);
        
        // Add close button functionality
        const closeBtn = slidingPanel.querySelector('.sliding-panel-close');
        closeBtn.addEventListener('click', () => {
            slidingPanel.classList.remove('active');
            document.body.classList.remove('panel-open');
        });
        
        // Close panel when clicking outside
        slidingPanel.addEventListener('click', (e) => {
            if (e.target === slidingPanel) {
                slidingPanel.classList.remove('active');
                document.body.classList.remove('panel-open');
            }
        });
    }
    
    // Add CSS for sliding panel if not already present
    if (!document.querySelector('#sliding-panel-styles')) {
        const style = document.createElement('style');
        style.id = 'sliding-panel-styles';
        style.textContent = `
            .sliding-panel {
                position: fixed;
                top: 0;
                right: 0;
                width: 450px;
                max-width: 100%;
                height: 100vh;
                background: var(--neutral-white);
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                transform: translateX(100%);
                transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                overflow-y: auto;
            }
            
            .sliding-panel.active {
                transform: translateX(0);
            }
            
            .sliding-panel-header {
                padding: 20px;
                border-bottom: 1px solid var(--neutral-light);
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                background: var(--neutral-white);
                z-index: 1;
            }
            
            .sliding-panel-title {
                margin: 0;
                font-size: var(--text-xl);
                color: var(--neutral-charcoal);
            }
            
            .sliding-panel-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                color: var(--neutral-gray);
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }
            
            .sliding-panel-close:hover {
                background: var(--neutral-light);
                color: var(--neutral-dark);
            }
            
            .sliding-panel-content {
                padding: 20px;
            }
            
            body.panel-open::after {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.3);
                z-index: 9998;
                backdrop-filter: blur(2px);
            }
            
            @media (max-width: 576px) {
                .sliding-panel {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to open the sliding panel with content
function openSlidingPanel(title, content) {
    const slidingPanel = document.querySelector('.sliding-panel');
    if (slidingPanel) {
        // Set title
        const titleEl = slidingPanel.querySelector('.sliding-panel-title');
        if (titleEl) {
            titleEl.textContent = title;
        }
        
        // Set content
        const contentEl = slidingPanel.querySelector('.sliding-panel-content');
        if (contentEl) {
            contentEl.innerHTML = '';
            
            if (typeof content === 'string') {
                contentEl.innerHTML = content;
            } else if (content instanceof Element) {
                contentEl.appendChild(content);
            }
        }
        
        // Open panel
        slidingPanel.classList.add('active');
        document.body.classList.add('panel-open');
        }
    }

    // Add CSS for section transitions
    const style = document.createElement('style');
    style.textContent = `
        .page-section {
            display: none;
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        
        .page-section.active {
            display: block;
            opacity: 1;
        }
        
        .section-title {
            font-size: var(--text-2xl);
            font-weight: 600;
            color: var(--neutral-charcoal);
            margin-bottom: 24px;
            position: relative;
            padding-left: 16px;
        }
        
        .section-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 24px;
            background: var(--primary-blue);
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);