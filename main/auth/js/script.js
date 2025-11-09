/**
 * University Management System - Navigation & Layout Functionality
 * Implements interactive features for Phase 2 and Phase 3 development
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== Sidebar Toggle Functionality =====
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainLayout = document.getElementById('mainLayout');
    const toggleIcon = document.getElementById('toggleIcon');

    sidebarToggle.addEventListener('click', () => {
        mainLayout.classList.toggle('sidebar-collapsed');
        
        if (mainLayout.classList.contains('sidebar-collapsed')) {
            toggleIcon.className = 'fas fa-chevron-right';
        } else {
            toggleIcon.className = 'fas fa-chevron-left';
        }
    });

    // ===== Navigation Menu Functionality =====
    const menuLinks = document.querySelectorAll('.sidebar-menu-link');
    
    if (menuLinks && menuLinks.length > 0) {
        menuLinks.forEach(link => {
            if (!link) return;
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                menuLinks.forEach(l => {
                    if (l) l.classList.remove('active');
                });
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Update header title with smooth transition
                const pageTitle = link.querySelector('.sidebar-menu-text');
                const headerTitle = document.querySelector('.header-left h1');
                
                if (pageTitle && pageTitle.textContent && headerTitle) {
                    // Fade out, change text, fade in
                    headerTitle.style.opacity = '0';
                    setTimeout(() => {
                        headerTitle.textContent = pageTitle.textContent;
                        headerTitle.style.opacity = '1';
                    }, 200);
                    
                    // Update breadcrumb
                    const breadcrumb = document.querySelector('.breadcrumb');
                    if (breadcrumb) {
                        breadcrumb.textContent = `Home / ${pageTitle.textContent}`;
                    }
                    
                    // Add page transition animation
                    const content = document.querySelector('.content');
                    if (content) {
                        content.style.animation = 'none';
                        content.offsetHeight; // Trigger reflow
                        content.style.animation = 'slideInRight 0.4s ease-out';
                    }
                    
                    // Close sidebar on mobile (if implemented)
                    if (window.innerWidth < 768 && mainLayout && !mainLayout.classList.contains('sidebar-collapsed')) {
                        mainLayout.classList.add('sidebar-collapsed');
                        if (toggleIcon) {
                            toggleIcon.className = 'fas fa-chevron-right';
                        }
                    }
                }
            });
        });
    }

    // ===== Dropdown Menus =====
    
    // Notification Dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');
        
        // Close profile dropdown if open
        if (profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
            userProfile.classList.remove('active');
        }
    });
    
    // Close notification dropdown when clicking its close button
    const notificationCloseBtn = notificationDropdown.querySelector('.dropdown-close');
    notificationCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.remove('active');
    });
    
    // User Profile Dropdown
    const userProfile = document.getElementById('userProfile');
    const profileDropdown = document.getElementById('profileDropdown');
    
    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        userProfile.classList.toggle('active');
        
        // Close notification dropdown if open
        if (notificationDropdown.classList.contains('active')) {
            notificationDropdown.classList.remove('active');
        }
    });
    
    // Close profile dropdown when clicking its close button
    const profileCloseBtn = profileDropdown.querySelector('.dropdown-close');
    profileCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.remove('active');
        userProfile.classList.remove('active');
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (notificationDropdown.classList.contains('active')) {
            notificationDropdown.classList.remove('active');
        }
        
        if (profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
            userProfile.classList.remove('active');
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    notificationDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    profileDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // ===== Sliding Panel Functionality =====
    const slidingPanel = document.getElementById('slidingPanel');
    const panelOverlay = document.getElementById('panelOverlay');
    const panelClose = document.getElementById('panelClose');
    const panelTitle = document.getElementById('panelTitle');
    const panelContent = document.getElementById('panelContent');
    
    // Dashboard cards open corresponding panels
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    
    if (dashboardCards && dashboardCards.length > 0) {
        dashboardCards.forEach((card, index) => {
            if (!card) return;
            
            card.addEventListener('click', () => {
                const titleElement = card.querySelector('.card-title');
                if (titleElement && titleElement.textContent) {
                    const title = titleElement.textContent;
                    const content = generatePanelContent(title, index);
                    
                    openPanel(title, content);
                }
            });
        });
    }
    
    // Quick action buttons open corresponding panels
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    
    if (quickActionBtns && quickActionBtns.length > 0) {
        quickActionBtns.forEach((btn, index) => {
            if (!btn) return;
            
            btn.addEventListener('click', () => {
                if (btn.textContent) {
                    const title = btn.textContent.trim();
                    const content = generatePanelContent(title, index);
                    
                    openPanel(title, content);
                }
            });
        });
    }
    
    // Open panel function
    function openPanel(title, content) {
        if (panelTitle && panelContent && slidingPanel && panelOverlay) {
            panelTitle.textContent = title;
            panelContent.innerHTML = content;
            
            slidingPanel.classList.add('active');
            panelOverlay.classList.add('active');
            
            // Prevent body scrolling when panel is open
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close panel when clicking the close button
    if (panelClose) {
        panelClose.addEventListener('click', closePanel);
    }
    
    // Close panel when clicking the overlay
    if (panelOverlay) {
        panelOverlay.addEventListener('click', closePanel);
    }
    
    // Close panel function
    function closePanel() {
        if (slidingPanel && panelOverlay) {
            slidingPanel.classList.remove('active');
            panelOverlay.classList.remove('active');
            
            // Restore body scrolling
            document.body.style.overflow = 'auto';
        }
    }
    
    // Generate dynamic panel content based on title
    function generatePanelContent(title, index) {
        // Sample dynamic content generation
        let content = '';
        
        switch(title) {
            case 'Active Courses':
                content = `
                    <div class="panel-section">
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Introduction to Computer Science</h3>
                                <span class="panel-card-badge blue">In Progress</span>
                            </div>
                            <p>Professor: Dr. Johnson</p>
                            <p>Schedule: Mon, Wed 10:00 AM - 11:30 AM</p>
                            <p>Completion: 75%</p>
                            <div class="panel-card-progress">
                                <div class="panel-card-progress-bar" style="width: 75%"></div>
                            </div>
                        </div>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Calculus II</h3>
                                <span class="panel-card-badge blue">In Progress</span>
                            </div>
                            <p>Professor: Dr. Martinez</p>
                            <p>Schedule: Tue, Thu 1:00 PM - 2:30 PM</p>
                            <p>Completion: 60%</p>
                            <div class="panel-card-progress">
                                <div class="panel-card-progress-bar" style="width: 60%"></div>
                            </div>
                        </div>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Data Structures</h3>
                                <span class="panel-card-badge blue">In Progress</span>
                            </div>
                            <p>Professor: Dr. Chen</p>
                            <p>Schedule: Mon, Wed, Fri 2:00 PM - 3:00 PM</p>
                            <p>Completion: 80%</p>
                            <div class="panel-card-progress">
                                <div class="panel-card-progress-bar" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'Pending Tasks':
                content = `
                    <div class="panel-section">
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Database Project</h3>
                                <span class="panel-card-badge red">Due Tomorrow</span>
                            </div>
                            <p>Course: Database Systems</p>
                            <p>Due Date: April 15, 2023 11:59 PM</p>
                            <p>Status: In Progress</p>
                        </div>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Math Assignment #5</h3>
                                <span class="panel-card-badge gold">Due in 3 days</span>
                            </div>
                            <p>Course: Calculus II</p>
                            <p>Due Date: April 18, 2023 11:59 PM</p>
                            <p>Status: Not Started</p>
                        </div>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Programming Lab</h3>
                                <span class="panel-card-badge gold">Due in 5 days</span>
                            </div>
                            <p>Course: Data Structures</p>
                            <p>Due Date: April 20, 2023 11:59 PM</p>
                            <p>Status: In Progress</p>
                        </div>
                    </div>
                `;
                break;

            case 'Overall GPA':
                content = `
                    <div class="panel-section">
                        <div style="text-align: center; margin-bottom: 24px;">
                            <div class="circular-progress">
                                <svg viewBox="0 0 36 36">
                                    <circle class="background" cx="18" cy="18" r="15" stroke-dasharray="94.2" stroke-dashoffset="0"></circle>
                                    <circle class="progress green" cx="18" cy="18" r="15" stroke-dasharray="94.2" stroke-dashoffset="4.71"></circle>
                                </svg>
                                <div class="circular-progress-text">3.8</div>
                            </div>
                            <p style="font-weight: 600; margin-top: 8px; color: var(--neutral-charcoal);">out of 4.0</p>
                        </div>

                        <h3 style="margin-bottom: 16px; font-size: var(--text-xl);">Semester Breakdown</h3>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Current Semester</h3>
                                <span class="panel-card-badge green">3.8 GPA</span>
                            </div>
                            <p>Credits: 15</p>
                            <p>Standing: Dean's List</p>
                        </div>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Previous Semester</h3>
                                <span class="panel-card-badge blue">3.6 GPA</span>
                            </div>
                            <p>Credits: 16</p>
                            <p>Standing: Good</p>
                        </div>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Cumulative</h3>
                                <span class="panel-card-badge gold">3.7 GPA</span>
                            </div>
                            <p>Total Credits: 63</p>
                            <p>Standing: Good</p>
                        </div>
                    </div>
                `;
                break;
                
            case 'Download Materials':
                content = `
                    <div class="panel-section">
                        <h3 style="margin-bottom: 16px; font-size: var(--text-xl);">Course Materials</h3>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Introduction to Computer Science</h3>
                            </div>
                            <p style="margin-bottom: 16px;">Latest Materials</p>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <button class="download-btn">
                                    <i class="fas fa-file-pdf"></i>
                                    Lecture Notes - Week 8.pdf
                                </button>
                                <button class="download-btn">
                                    <i class="fas fa-file-code"></i>
                                    Lab Exercise 5.zip
                                </button>
                                <button class="download-btn">
                                    <i class="fas fa-file-powerpoint"></i>
                                    Sorting Algorithms.pptx
                                </button>
                            </div>
                        </div>
                        
                        <div class="panel-card">
                            <div class="panel-card-header">
                                <h3>Calculus II</h3>
                            </div>
                            <p style="margin-bottom: 16px;">Latest Materials</p>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <button class="download-btn">
                                    <i class="fas fa-file-pdf"></i>
                                    Integration Techniques.pdf
                                </button>
                                <button class="download-btn">
                                    <i class="fas fa-file-alt"></i>
                                    Practice Problems - Week 7.pdf
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                break;
            
            // Add more cases for other panels
            
            default:
                content = `
                    <div class="panel-section">
                        <p>Content for ${title} will be available soon.</p>
                    </div>
                `;
        }
        
        return content;
    }

    // ===== Keyboard Navigation =====
    document.addEventListener('keydown', (e) => {
        // ESC key closes panels and dropdowns
        if (e.key === 'Escape') {
            if (slidingPanel && slidingPanel.classList.contains('active')) {
                closePanel();
            }
            
            if (notificationDropdown && notificationDropdown.classList.contains('active')) {
                notificationDropdown.classList.remove('active');
            }
            
            if (profileDropdown && profileDropdown.classList.contains('active')) {
                profileDropdown.classList.remove('active');
                if (userProfile) {
                    userProfile.classList.remove('active');
                }
            }
        }
    });

    // ===== Phase 3: Dashboard Components Animations =====
    
    // Animate stats counter
    function animateCounters() {
        const statValues = document.querySelectorAll('.stat-value');
        
        statValues.forEach(statValue => {
            if (!statValue) return;
            
            const value = statValue.textContent;
            if (!value) return;
            
            // Check if it's a simple number or a fraction
            if (value.includes('/')) {
                // For fractions like 18/24, don't animate
                return;
            }
            
            // For percentage or decimal numbers
            let finalValue = parseFloat(value);
            let startValue = 0;
            let duration = 1500;
            let startTime = null;
            
            function updateCount(timestamp) {
                if (!startTime) startTime = timestamp;
                let progress = timestamp - startTime;
                let percentage = Math.min(progress / duration, 1);
                
                // Use easeOutQuad for smoother animation
                percentage = 1 - (1 - percentage) * (1 - percentage);
                
                let currentValue = startValue + (finalValue - startValue) * percentage;
                
                // Format based on whether it's a percentage or a decimal
                if (value.includes('%')) {
                    statValue.textContent = Math.round(currentValue) + '%';
                } else if (finalValue < 10) {
                    // For GPA or small numbers, show one decimal place
                    statValue.textContent = currentValue.toFixed(1);
                } else {
                    // For larger numbers, round to integer
                    statValue.textContent = Math.round(currentValue);
                }
                
                if (progress < duration) {
                    requestAnimationFrame(updateCount);
                }
            }
            
            requestAnimationFrame(updateCount);
        });
    }
    
    // Initialize circular progress animations
    function initCircularProgress() {
        const circles = document.querySelectorAll('.circular-progress circle.progress');
        
        circles.forEach(circle => {
            if (!circle) return;
            
            // Get the value from the text element
            const parent = circle.closest('.circular-progress');
            if (!parent) return;
            
            const textElement = parent.querySelector('.circular-progress-text');
            if (!textElement || !textElement.textContent) return;
            
            const percentage = parseInt(textElement.textContent);
            
            // Calculate the stroke-dashoffset
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            
            // Use stroke-dasharray and stroke-dashoffset for the animation
            circle.style.strokeDasharray = circumference;
            
            // Start with full circle (0% visible)
            circle.style.strokeDashoffset = circumference;
            
            // Animate to the target percentage
            setTimeout(() => {
                const offset = circumference - (percentage / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }, 300);
        });
    }
    
    // Animate progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.animate-progress');
        
        progressBars.forEach(bar => {
            if (!bar) return;
            
            const width = bar.style.width;
            
            // Start with 0 width
            bar.style.width = '0';
            
            // Animate to target width
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Highlight active stat cards
    function highlightStatCards() {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach((card, index) => {
            if (!card) return;
            
            // Add a slight delay for each card
            setTimeout(() => {
                card.classList.add('animate-pulse');
                
                // Remove the animation after a short time
                setTimeout(() => {
                    card.classList.remove('animate-pulse');
                }, 1500);
            }, index * 200);
        });
    }
    
    // Initialize dashboard animations
    function initDashboardAnimations() {
        // Wait for content to be visible
        setTimeout(() => {
            animateCounters();
            initCircularProgress();
            animateProgressBars();
            highlightStatCards();
        }, 500);
    }
    
    // Hover effects for chart action buttons
    const chartActionBtns = document.querySelectorAll('.chart-action-btn');
    chartActionBtns.forEach(btn => {
        if (!btn) return;
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
    
    // Add interactive hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        if (!item) return;
        
        item.addEventListener('mouseenter', () => {
            // Add hover effect to the dot
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            // Remove hover effect
            const dot = item.querySelector('.timeline-dot');
            if (dot) {
                dot.style.transform = 'scale(1)';
            }
        });
    });

    // ===== Add page load animation =====
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.animation = 'fadeInScale 0.5s ease-out forwards';
            
            // Initialize dashboard animations after the page has loaded
            initDashboardAnimations();
        }, 100);
    }
    
    // Reinitialize animations when navigating between pages
    if (menuLinks && menuLinks.length > 0) {
        menuLinks.forEach(link => {
            if (!link) return;
            
            link.addEventListener('click', () => {
                // Reset and reinitialize animations after page transition
                setTimeout(() => {
                    initDashboardAnimations();
                }, 500);
            });
        });
    }

    // Add styles for download buttons
    const style = document.createElement('style');
    style.textContent = `
        .download-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: var(--neutral-light);
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: var(--text-sm);
            text-align: left;
            color: var(--neutral-dark);
        }
        
        .download-btn:hover {
            background: var(--primary-light);
            color: var(--primary-navy);
        }
        
        .download-btn i {
            color: var(--primary-blue);
        }
    `;
    document.head.appendChild(style);
}); 