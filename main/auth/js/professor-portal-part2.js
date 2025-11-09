/**
 * Professor Portal Part 2 - Student Roster, Grading Interface, and Material Upload
 */

// Sample assignments data
const assignments = [
    {
        id: 'assign1',
        courseId: 'cs101',
        name: 'Programming Basics',
        dueDate: '2023-10-15',
        totalSubmissions: 40,
        gradedSubmissions: 35,
        avgScore: 85
    },
    {
        id: 'assign2',
        courseId: 'cs101',
        name: 'Algorithms Quiz',
        dueDate: '2023-10-22',
        totalSubmissions: 42,
        gradedSubmissions: 30,
        avgScore: 78
    },
    {
        id: 'assign3',
        courseId: 'cs201',
        name: 'Data Structures Implementation',
        dueDate: '2023-10-18',
        totalSubmissions: 30,
        gradedSubmissions: 25,
        avgScore: 82
    }
];

// Initialize student roster
function initStudentRoster() {
    // Get the students section
    const studentsSection = document.getElementById('studentsSection');
    if (!studentsSection) {
        console.error('Students section not found');
        return;
    }
    
    // Clear current content
    studentsSection.innerHTML = '';
    
    // Create quick actions
    const quickActions = document.createElement('div');
    quickActions.className = 'quick-actions';
    quickActions.innerHTML = `
        <button class="quick-action-btn" id="addStudentBtn" style="display: none;">
            <i class="fas fa-user-plus"></i>
            Add Student
        </button>
        <button class="quick-action-btn">
            <i class="fas fa-envelope"></i>
            Email Students
        </button>
        <button class="quick-action-btn">
            <i class="fas fa-file-export"></i>
            Export Roster
        </button>
        <button class="quick-action-btn">
            <i class="fas fa-cog"></i>
            Roster Settings
        </button>
    `;
    studentsSection.appendChild(quickActions);
    
    // Create section title
    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'section-title';
    sectionTitle.textContent = 'Student Roster';
    studentsSection.appendChild(sectionTitle);
    
    // Create student roster container
    const studentRoster = document.createElement('div');
    studentRoster.className = 'student-roster';
    
    // Create roster header
    const rosterHeader = document.createElement('div');
    rosterHeader.className = 'student-roster-header';
    rosterHeader.innerHTML = `
        <div class="student-filter-group">
            <div class="student-search">
                <input type="text" placeholder="Search students..." id="studentSearchInput">
                <i class="fas fa-search"></i>
            </div>
            <select id="statusFilter" class="form-control">
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
            </select>
            <select id="courseFilter" class="form-control">
                <option value="all">All Courses</option>
                <option value="cs101">CS101</option>
                <option value="cs201">CS201</option>
                <option value="cs350">CS350</option>
            </select>
        </div>
        <div>
            <button class="course-btn secondary">
                <i class="fas fa-filter"></i>
                More Filters
            </button>
        </div>
    `;
    studentRoster.appendChild(rosterHeader);
    
    // Create student table
    const table = document.createElement('table');
    table.className = 'student-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th data-sort="name">Name <i class="fas fa-sort"></i></th>
                <th data-sort="id">Student ID <i class="fas fa-sort"></i></th>
                <th data-sort="major">Major <i class="fas fa-sort"></i></th>
                <th data-sort="year">Year <i class="fas fa-sort"></i></th>
                <th data-sort="gpa">GPA <i class="fas fa-sort"></i></th>
                <th data-sort="status">Status <i class="fas fa-sort"></i></th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="studentTableBody">
            <!-- Student rows will be added here dynamically -->
        </tbody>
    `;
    studentRoster.appendChild(table);
    
    // Add to the section
    studentsSection.appendChild(studentRoster);
    
    // Populate student table
    populateStudentTable(students);
    
    // Add event listeners for sorting and filtering
    setupStudentTableEvents();
    
    // Add quick action functionality
    const emailBtn = quickActions.querySelector('button:nth-child(2)');
    const exportBtn = quickActions.querySelector('button:nth-child(3)');
    const settingsBtn = quickActions.querySelector('button:nth-child(4)');
    if (emailBtn) emailBtn.onclick = () => showEmailStudentsModal();
    if (exportBtn) exportBtn.onclick = () => exportStudentRoster();
    if (settingsBtn) settingsBtn.onclick = () => showRosterSettingsModal();
    // More Filters button
    const moreFiltersBtn = studentRoster.querySelector('.course-btn.secondary');
    if (moreFiltersBtn) {
        moreFiltersBtn.onclick = () => showMoreFiltersModal();
    }
}

// Populate student table with data
function populateStudentTable(studentData) {
    const tableBody = document.getElementById('studentTableBody');
    if (!tableBody) return;
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add student rows
    studentData.forEach((student, idx) => {
        const row = document.createElement('tr');
        
        // Get initials for avatar
        const initials = student.name
            .split(' ')
            .map(part => part.charAt(0))
            .join('')
            .toUpperCase();
        
        // Status class
        const statusClass = student.status;
        
        // Create row content
        row.innerHTML = `
            <td>
                <div class="student-name">
                    <div class="student-avatar">${initials}</div>
                    <div>${student.name}</div>
                </div>
            </td>
            <td>${student.id}</td>
            <td>${student.major}</td>
            <td>${student.year}</td>
            <td>${student.gpa}</td>
            <td><span class="student-status ${statusClass}">${student.status.charAt(0).toUpperCase() + student.status.slice(1)}</span></td>
            <td>
                <div class="student-actions">
                    <button class="student-action-btn view-details-btn" data-idx="${idx}" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="student-action-btn edit-student-btn" data-idx="${idx}" title="Edit Student">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="student-action-btn email-student-btn" data-idx="${idx}" title="Email Student">
                        <i class="fas fa-envelope"></i>
                    </button>
                </div>
            </td>
        `;
        
        // Add to table
        tableBody.appendChild(row);
    });
    
    // Add action button functionality
    tableBody.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            showStudentDetailsModal(students[idx]);
        };
    });
    tableBody.querySelectorAll('.edit-student-btn').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            showEditStudentModal(students[idx]);
        };
    });
    tableBody.querySelectorAll('.email-student-btn').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            showEmailStudentModal(students[idx]);
        };
    });
}

// Setup student table events for sorting and filtering
function setupStudentTableEvents() {
    // Sort headers
    const sortHeaders = document.querySelectorAll('th[data-sort]');
    sortHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortBy = header.getAttribute('data-sort');
            const isCurrentlySorted = header.classList.contains('sorted');
            
            // Remove sorted class from all headers
            sortHeaders.forEach(h => h.classList.remove('sorted', 'sorted-asc', 'sorted-desc'));
            
            // Sort students
            let sortedStudents;
            if (isCurrentlySorted && header.classList.contains('sorted-asc')) {
                // Sort descending
                sortedStudents = [...students].sort((a, b) => 
                    typeof a[sortBy] === 'string' ? 
                    b[sortBy].localeCompare(a[sortBy]) : 
                    b[sortBy] - a[sortBy]
                );
                header.classList.add('sorted', 'sorted-desc');
            } else {
                // Sort ascending
                sortedStudents = [...students].sort((a, b) => 
                    typeof a[sortBy] === 'string' ? 
                    a[sortBy].localeCompare(b[sortBy]) : 
                    a[sortBy] - b[sortBy]
                );
                header.classList.add('sorted', 'sorted-asc');
            }
            
            // Update table
            populateStudentTable(sortedStudents);
        });
    });
    
    // Filter functionality
    const searchInput = document.getElementById('studentSearchInput');
    const statusFilter = document.getElementById('statusFilter');
    const courseFilter = document.getElementById('courseFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterStudents);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterStudents);
    }
    
    if (courseFilter) {
        courseFilter.addEventListener('change', filterStudents);
    }
}

// Filter students based on search and filters
function filterStudents() {
    const searchValue = document.getElementById('studentSearchInput').value.toLowerCase();
    const statusValue = document.getElementById('statusFilter').value;
    
    // Filter students array
    const filteredStudents = students.filter(student => {
        // Check name match
        const nameMatch = student.name.toLowerCase().includes(searchValue) || 
                          student.id.toLowerCase().includes(searchValue);
        
        // Check status match
        const statusMatch = statusValue === 'all' || student.status === statusValue;
        
        return nameMatch && statusMatch;
    });
    
    // Update table with filtered data
    populateStudentTable(filteredStudents);
}

// Initialize grading interface
function initGradingInterface() {
    // Get the grading section
    const gradingSection = document.getElementById('gradingSection');
    if (!gradingSection) {
        console.error('Grading section not found');
        return;
    }
    
    // Clear current content
    gradingSection.innerHTML = '';
    
    // Create quick actions
    const quickActions = document.createElement('div');
    quickActions.className = 'quick-actions';
    quickActions.innerHTML = `
        <button class="quick-action-btn primary" id="createAssignmentBtn">
            <i class="fas fa-plus"></i>
            Create Assignment
        </button>
        <button class="quick-action-btn" id="importGradesBtn">
            <i class="fas fa-file-import"></i>
            Import Grades
        </button>
        <button class="quick-action-btn" id="exportGradesBtn">
            <i class="fas fa-file-export"></i>
            Export Grades
        </button>
        <button class="quick-action-btn">
            <i class="fas fa-cog"></i>
            Grading Settings
        </button>
    `;
    gradingSection.appendChild(quickActions);
    
    // Create section title
    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'section-title';
    sectionTitle.textContent = 'Grading Interface';
    gradingSection.appendChild(sectionTitle);
    
    // Create grading interface
    const gradingInterface = document.createElement('div');
    gradingInterface.className = 'grading-interface';
    
    // Create grading header
    const gradingHeader = document.createElement('div');
    gradingHeader.className = 'grading-header';
    gradingHeader.innerHTML = `
        <h3>Assignment Grading</h3>
        <div class="grading-filters">
            <div class="grading-filter">
                <label>Course</label>
                <select id="gradesCourseFilter">
                    <option value="all">All Courses</option>
                    <option value="cs101">CS101 - Intro to Computer Science</option>
                    <option value="cs201">CS201 - Data Structures</option>
                    <option value="cs350">CS350 - Database Systems</option>
                </select>
            </div>
            <div class="grading-filter">
                <label>Status</label>
                <select id="gradesStatusFilter">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="graded">Graded</option>
                </select>
            </div>
            <div class="grading-filter">
                <label>Due Date</label>
                <select id="gradesDueDateFilter">
                    <option value="all">All Dates</option>
                    <option value="past">Past Due</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
        </div>
    `;
    gradingInterface.appendChild(gradingHeader);
    
    // Create grading overview
    const gradingOverview = document.createElement('div');
    gradingOverview.className = 'grading-overview';
    gradingOverview.innerHTML = `
        <div class="grading-stat">
            <div class="grading-stat-value">8</div>
            <div class="grading-stat-label">Total Assignments</div>
        </div>
        <div class="grading-stat">
            <div class="grading-stat-value">112</div>
            <div class="grading-stat-label">Total Submissions</div>
        </div>
        <div class="grading-stat">
            <div class="grading-stat-value">90</div>
            <div class="grading-stat-label">Graded</div>
        </div>
        <div class="grading-stat">
            <div class="grading-stat-value">22</div>
            <div class="grading-stat-label">Pending</div>
        </div>
    `;
    gradingInterface.appendChild(gradingOverview);
    
    // Create assignment list
    const assignmentList = document.createElement('div');
    assignmentList.className = 'assignment-list';
    
    // Add assignments
    assignments.forEach(assignment => {
        // Calculate progress percentage
        const progressPercentage = Math.round((assignment.gradedSubmissions / assignment.totalSubmissions) * 100);
        
        // Format due date
        const dueDate = new Date(assignment.dueDate);
        const formattedDate = dueDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Create assignment item
        const assignmentItem = document.createElement('div');
        assignmentItem.className = 'assignment-item';
        assignmentItem.innerHTML = `
            <div class="assignment-info">
                <div class="assignment-name">${assignment.name}</div>
                <div class="assignment-meta">
                    <span>${assignment.courseId.toUpperCase()}</span>
                    <span>Due: ${formattedDate}</span>
                    <span>Avg Score: ${assignment.avgScore}%</span>
                </div>
            </div>
            
            <div class="assignment-progress">
                <div class="assignment-progress-label">
                    <span>Grading Progress</span>
                    <span>${assignment.gradedSubmissions}/${assignment.totalSubmissions}</span>
                </div>
                <div class="assignment-progress-bar">
                    <div class="assignment-progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
            
            <div class="assignment-action">
                <button class="course-btn primary" data-assignment-id="${assignment.id}">
                    <i class="fas fa-clipboard-check"></i>
                    Grade
                </button>
            </div>
        `;
        
        // Add to list
        assignmentList.appendChild(assignmentItem);
    });
    
    gradingInterface.appendChild(assignmentList);
    
    gradingSection.appendChild(gradingInterface);

    // Add event listeners for buttons
    document.getElementById('createAssignmentBtn').addEventListener('click', createAssignment);
    document.getElementById('importGradesBtn').addEventListener('click', importGrades);
    document.getElementById('exportGradesBtn').addEventListener('click', exportGrades);
    // Grading Settings button
    gradingSection.querySelector('.quick-action-btn:last-child').onclick = showGradingSettingsModal;

    // Filtering logic
    function renderAssignmentList() {
        // Get filter values
        const courseVal = gradingHeader.querySelector('#gradesCourseFilter').value;
        const statusVal = gradingHeader.querySelector('#gradesStatusFilter').value;
        const dueVal = gradingHeader.querySelector('#gradesDueDateFilter').value;
        // Filter assignments
        let filtered = assignments.filter(a => {
            let match = true;
            if (courseVal !== 'all') match = match && a.courseId === courseVal;
            if (statusVal !== 'all') {
                if (statusVal === 'pending') match = match && a.gradedSubmissions < a.totalSubmissions;
                if (statusVal === 'graded') match = match && a.gradedSubmissions === a.totalSubmissions;
            }
            if (dueVal !== 'all') {
                const now = new Date();
                const due = new Date(a.dueDate);
                if (dueVal === 'past') match = match && due < now;
                if (dueVal === 'upcoming') match = match && due >= now;
            }
            return match;
        });
        assignmentList.innerHTML = '';
        filtered.forEach((assignment, idx) => {
            const progressPercentage = Math.round((assignment.gradedSubmissions / assignment.totalSubmissions) * 100);
            const dueDate = new Date(assignment.dueDate);
            const formattedDate = dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            const assignmentItem = document.createElement('div');
            assignmentItem.className = 'assignment-item';
            assignmentItem.innerHTML = `
                <div class="assignment-info">
                    <div class="assignment-name">${assignment.name}</div>
                    <div class="assignment-meta">
                        <span>${assignment.courseId.toUpperCase()}</span>
                        <span>Due: ${formattedDate}</span>
                        <span>Avg Score: ${assignment.avgScore}%</span>
                    </div>
                </div>
                <div class="assignment-progress">
                    <div class="assignment-progress-label">
                        <span>Grading Progress</span>
                        <span>${assignment.gradedSubmissions}/${assignment.totalSubmissions}</span>
                    </div>
                    <div class="assignment-progress-bar">
                        <div class="assignment-progress-fill" style="width: ${progressPercentage}%"></div>
                    </div>
                </div>
                <div class="assignment-action">
                    <button class="course-btn primary" data-assignment-id="${assignment.id}">
                        <i class="fas fa-clipboard-check"></i>
                        Grade
                    </button>
                </div>
            `;
            assignmentList.appendChild(assignmentItem);
        });
        // Grade buttons
        assignmentList.querySelectorAll('.assignment-action .course-btn.primary').forEach((btn, idx) => {
            btn.onclick = () => showGradeAssignmentModal(filtered[idx]);
        });
    }
    // Initial render
    renderAssignmentList();
    // Grading filters
    gradingHeader.querySelectorAll('select').forEach(sel => {
        sel.onchange = renderAssignmentList;
    });
}

// Modal: Grading Settings
function showGradingSettingsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content grading-settings-modal-content">
            <div class="modal-header">
                <h2>Grading Settings</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
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
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelGradingSettingsBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Save Settings</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.querySelector('#cancelGradingSettingsBtn').onclick = () => modal.remove();
    modal.querySelector('#gradingSettingsForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Grading settings saved!', 'success');
        modal.remove();
    };
}

// Modal: Grade Assignment
function showGradeAssignmentModal(assignment) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content grade-assignment-modal-content">
            <div class="modal-header">
                <h2>Grade Assignment</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="assignment-details-modal">
                    <div><strong>Assignment:</strong> ${assignment.name}</div>
                    <div><strong>Due Date:</strong> ${assignment.dueDate}</div>
                    <div><strong>Total Submissions:</strong> ${assignment.totalSubmissions}</div>
                    <div><strong>Graded Submissions:</strong> ${assignment.gradedSubmissions}</div>
                </div>
                <div style="margin-top:18px;">
                    <label class="form-label">Enter Grade for a Student (simulated):</label>
                    <input type="number" class="form-control" min="0" max="100" placeholder="Grade">
                    <textarea class="form-control" rows="2" placeholder="Feedback (optional)" style="margin-top:8px;"></textarea>
                    <button class="course-btn primary" style="margin-top:12px;">Save Grade</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.querySelector('.course-btn.primary').onclick = () => {
        showNotification('Grade saved (simulated)', 'success');
        modal.remove();
    };
}

// Initialize material upload interface
function initMaterialUpload() {
    // Get the materials section
    const materialsSection = document.getElementById('materialsSection');
    if (!materialsSection) {
        console.error('Materials section not found');
        return;
    }
    // Clear current content
    materialsSection.innerHTML = '';
    // Create material tabs
    const materialTabs = document.createElement('div');
    materialTabs.className = 'material-tabs';
    materialTabs.innerHTML = `
        <div class="material-tab active" data-tab="upload">Upload Material</div>
        <div class="material-tab" data-tab="manage">Manage Materials</div>
        <div class="material-tab" data-tab="resources">External Resources</div>
    `;
    materialsSection.appendChild(materialTabs);
    // Create tab contents
    const uploadContent = document.createElement('div');
    uploadContent.className = 'material-tab-content active';
    uploadContent.setAttribute('data-tab', 'upload');
    // Create material uploader
    const materialUploader = document.createElement('div');
    materialUploader.className = 'material-uploader';
    // Create upload area
    const uploadArea = document.createElement('div');
    uploadArea.className = 'material-upload-area';
    uploadArea.innerHTML = `
        <div class="material-upload-icon">
            <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <div class="material-upload-text">Drag and drop your file here</div>
        <div class="material-upload-subtext">or click to browse your device</div>
        <input type="file" class="material-upload-input" id="materialUploadInput">
    `;
    uploadContent.appendChild(uploadArea);
    // Create material details form
    const materialDetailsForm = document.createElement('form');
    materialDetailsForm.className = 'material-details-form';
    materialDetailsForm.innerHTML = `
        <div class="form-group">
            <label class="form-label" for="materialTitle">Material Title</label>
            <input type="text" class="form-control" id="materialTitle" placeholder="Enter title...">
        </div>
        <div class="form-group">
            <label class="form-label" for="materialCourse">Course</label>
            <select class="form-control" id="materialCourse">
                <option value="cs101">CS101 - Intro to Computer Science</option>
                <option value="cs201">CS201 - Data Structures</option>
                <option value="cs350">CS350 - Database Systems</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label" for="materialDescription">Description</label>
            <textarea class="form-control" id="materialDescription" rows="3" placeholder="Enter description..."></textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Visibility</label>
            <div style="display: flex; gap: 15px;">
                <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="radio" name="materialVisibility" value="all" checked>
                    <span>All Students</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="radio" name="materialVisibility" value="selected">
                    <span>Selected Students</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="radio" name="materialVisibility" value="hidden">
                    <span>Hidden (Draft)</span>
                </label>
            </div>
        </div>
        <div id="filePreviewContainer" style="display: none;">
            <!-- File preview will be added here -->
        </div>
        <div id="uploadProgressContainer" style="display: none;">
            <!-- Upload progress will be added here -->
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
            <button type="button" class="course-btn secondary">Cancel</button>
            <button type="submit" class="course-btn primary">Upload Material</button>
        </div>
    `;
    uploadContent.appendChild(materialDetailsForm);
    // Add upload content to material uploader
    materialUploader.appendChild(uploadContent);
    // Add to the section
    materialsSection.appendChild(materialUploader);
    // Add event listeners
    setupMaterialUploadEvents();
    // Manage Materials tab content
    const manageContent = document.createElement('div');
    manageContent.className = 'material-tab-content';
    manageContent.setAttribute('data-tab', 'manage');
    manageContent.innerHTML = `
        <div class="manage-materials-panel" style="background:#f8fafc; border-radius:12px; padding:28px; box-shadow:0 2px 8px rgba(30,58,138,0.06);">
            <h3 style="color:var(--primary-navy);margin-bottom:18px;">Manage Materials</h3>
            <div class="materials-list">
                <div class="material-item" style="display:flex;align-items:center;gap:18px;margin-bottom:16px;background:#fff;padding:16px 20px;border-radius:10px;box-shadow:0 1px 4px rgba(30,58,138,0.04);">
                    <div class="material-icon" style="font-size:2rem;background:var(--primary-light);color:var(--primary-navy);border-radius:8px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-file-pdf"></i></div>
                    <div style="flex:1;">
                        <div style="font-weight:600;">Lecture 1 - Syllabus</div>
                        <div style="color:#666;font-size:0.97rem;">PDF · 2.1MB · Uploaded 2 weeks ago</div>
                    </div>
                    <button class="course-btn secondary">Preview</button>
                    <button class="course-btn danger">Delete</button>
                </div>
                <div class="material-item" style="display:flex;align-items:center;gap:18px;margin-bottom:16px;background:#fff;padding:16px 20px;border-radius:10px;box-shadow:0 1px 4px rgba(30,58,138,0.04);">
                    <div class="material-icon" style="font-size:2rem;background:var(--primary-light);color:var(--primary-navy);border-radius:8px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-file-powerpoint"></i></div>
                    <div style="flex:1;">
                        <div style="font-weight:600;">Lecture 2 - Data Types</div>
                        <div style="color:#666;font-size:0.97rem;">PPT · 3.4MB · Uploaded 1 week ago</div>
                    </div>
                    <button class="course-btn secondary">Preview</button>
                    <button class="course-btn danger">Delete</button>
                </div>
            </div>
        </div>
    `;
    // External Resources tab content
    const resourcesContent = document.createElement('div');
    resourcesContent.className = 'material-tab-content';
    resourcesContent.setAttribute('data-tab', 'resources');
    resourcesContent.innerHTML = `
        <div class="external-resources-panel" style="background:#f8fafc; border-radius:12px; padding:28px; box-shadow:0 2px 8px rgba(30,58,138,0.06);">
            <h3 style="color:var(--primary-navy);margin-bottom:18px;">External Resources</h3>
            <button class="course-btn primary" id="addExternalResourceBtn" style="margin-bottom:18px;"><i class="fas fa-plus"></i> Add Resource</button>
            <div class="resources-list">
                <div class="resource-item" style="display:flex;align-items:center;gap:18px;margin-bottom:16px;background:#fff;padding:16px 20px;border-radius:10px;box-shadow:0 1px 4px rgba(30,58,138,0.04);">
                    <div class="material-icon" style="font-size:2rem;background:var(--primary-light);color:var(--primary-navy);border-radius:8px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-link"></i></div>
                    <div style="flex:1;">
                        <div style="font-weight:600;">MDN Web Docs</div>
                        <div style="color:#666;font-size:0.97rem;">https://developer.mozilla.org/</div>
                    </div>
                    <button class="course-btn primary">Open</button>
                </div>
                <div class="resource-item" style="display:flex;align-items:center;gap:18px;margin-bottom:16px;background:#fff;padding:16px 20px;border-radius:10px;box-shadow:0 1px 4px rgba(30,58,138,0.04);">
                    <div class="material-icon" style="font-size:2rem;background:var(--primary-light);color:var(--primary-navy);border-radius:8px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-link"></i></div>
                    <div style="flex:1;">
                        <div style="font-weight:600;">W3Schools</div>
                        <div style="color:#666;font-size:0.97rem;">https://w3schools.com/</div>
                    </div>
                    <button class="course-btn primary">Open</button>
                </div>
            </div>
        </div>
    `;
    // Add tab contents
    materialsSection.appendChild(uploadContent);
    materialsSection.appendChild(manageContent);
    materialsSection.appendChild(resourcesContent);
    // Hide inactive tab contents initially
    manageContent.style.display = 'none';
    resourcesContent.style.display = 'none';
    // Tab switching
    const tabs = materialTabs.querySelectorAll('.material-tab');
    const tabContents = materialsSection.querySelectorAll('.material-tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Show only the selected tab's content
            tabContents.forEach(c => {
                if (c.getAttribute('data-tab') === tab.getAttribute('data-tab')) {
                    c.style.display = '';
                } else {
                    c.style.display = 'none';
                }
            });
        });
    });
    // Add button functionality for Manage Materials tab
    manageContent.addEventListener('click', function(e) {
        if (e.target.closest('.course-btn.secondary')) {
            // Preview button
            const item = e.target.closest('.material-item');
            if (item) {
                const title = item.querySelector('div[style*="font-weight:600;"]').textContent;
                const meta = item.querySelector('div[style*="color:#666"]').textContent;
                showMaterialPreviewModalCustom(title, meta);
            }
        } else if (e.target.closest('.course-btn.danger')) {
            // Delete button
            const item = e.target.closest('.material-item');
            if (item) {
                item.remove();
                showNotification('Material deleted successfully', 'success');
            }
        }
    });
    // Add button functionality for External Resources tab
    resourcesContent.addEventListener('click', function(e) {
        if (e.target.closest('#addExternalResourceBtn')) {
            // Show modal to add resource
            showAddExternalResourceModal();
        } else if (e.target.closest('.course-btn.primary')) {
            const item = e.target.closest('.resource-item');
            if (item) {
                const url = item.querySelector('div[style*="color:#666"]').textContent;
                window.open(url, '_blank');
            }
        }
    });
}
// Custom modal for previewing material in Manage Materials tab
function showMaterialPreviewModalCustom(title, meta) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content" style="max-width:420px;padding:0;">
            <div class="modal-header" style="padding:18px 24px 10px 24px;">
                <h2 style="font-size:1.2rem;">Material Preview</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body" style="padding:18px 24px 24px 24px;">
                <div class="assignment-details-modal">
                    <div><strong>Title:</strong> ${title}</div>
                    <div><strong>Details:</strong> ${meta}</div>
                </div>
                <div style="margin-top:18px; text-align:center; color:#888;">(File preview not available in demo)</div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Setup material upload events
function setupMaterialUploadEvents() {
    // Material type selection
    const materialTypes = document.querySelectorAll('.material-type');
    materialTypes.forEach(type => {
        type.addEventListener('click', () => {
            // Remove selected class from all types
            materialTypes.forEach(t => t.classList.remove('selected'));
            
            // Add selected class to clicked type
            type.classList.add('selected');
        });
    });
    
    // Material tabs
    const materialTabs = document.querySelectorAll('.material-tab');
    materialTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            materialTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding tab content
            const tabId = tab.getAttribute('data-tab');
            document.querySelectorAll('.material-tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-tab') === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Upload area
    const uploadArea = document.querySelector('.material-upload-area');
    const uploadInput = document.getElementById('materialUploadInput');
    
    if (uploadArea && uploadInput) {
        // Click on upload area to trigger file input
        uploadArea.addEventListener('click', () => {
            uploadInput.click();
        });
        
        // Handle file selection
        uploadInput.addEventListener('change', handleFileSelection);
        
        // Drag and drop events
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            // Get the files
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                // Update file input
                uploadInput.files = files;
                handleFileSelection();
            }
        });
    }
    
    // Form submission
    const materialForm = document.querySelector('.material-details-form');
    if (materialForm) {
        materialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate upload
            simulateUpload();
        });
    }
}

// Handle file selection
function handleFileSelection() {
    const fileInput = document.getElementById('materialUploadInput');
    const previewContainer = document.getElementById('filePreviewContainer');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Show preview container
        previewContainer.style.display = 'block';
        
        // Create preview
        previewContainer.innerHTML = `
            <div class="file-preview">
                <div class="file-preview-icon">
                    <i class="fas fa-file"></i>
                </div>
                <div class="file-preview-info">
                    <div class="file-preview-name">${file.name}</div>
                    <div class="file-preview-meta">${formatFileSize(file.size)} · ${file.type || 'Unknown type'}</div>
                </div>
                <div class="file-preview-remove" id="removeFileBtn">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        `;
        
        // Add remove button event
        document.getElementById('removeFileBtn').addEventListener('click', () => {
            fileInput.value = '';
            previewContainer.style.display = 'none';
        });
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Simulate file upload
function simulateUpload() {
    const progressContainer = document.getElementById('uploadProgressContainer');
    
    // Show progress container
    progressContainer.style.display = 'block';
    
    // Create progress bar
    progressContainer.innerHTML = `
        <div class="upload-progress">
            <div class="upload-progress-bar">
                <div class="upload-progress-fill" style="width: 0%"></div>
            </div>
            <div class="upload-progress-text">
                <span>Uploading...</span>
                <span>0%</span>
            </div>
        </div>
    `;
    
    // Get progress elements
    const progressFill = progressContainer.querySelector('.upload-progress-fill');
    const progressText = progressContainer.querySelector('.upload-progress-text span:last-child');
    
    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Show success message
            progressContainer.innerHTML = `
                <div class="upload-success">
                    <i class="fas fa-check-circle"></i>
                    <span>Upload completed successfully!</span>
                </div>
            `;
            
            // Reset form after delay
            setTimeout(() => {
                // Reset form
                document.querySelector('.material-details-form').reset();
                document.getElementById('filePreviewContainer').style.display = 'none';
                progressContainer.style.display = 'none';
                
                // Show notification
                showNotification('Material uploaded successfully!', 'success');
            }, 2000);
        }
    }, 200);
}

// Enhanced course management functionality
function loadCourseManagement(courseId) {
    const course = professorCourses.find(c => c.id === courseId);
    if (!course) return;

    // Create detailed course view
    const courseSection = document.getElementById('coursesSection');
    courseSection.innerHTML = '';

    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'quick-action-btn';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Courses';
    backButton.onclick = () => {
    const coursesSection = document.getElementById('coursesSection');
        coursesSection.innerHTML = `
            <div class="quick-actions">
                <button class="quick-action-btn primary" id="createCourseBtn">
                    <i class="fas fa-plus"></i>
                    Create New Course
                </button>
                <button class="quick-action-btn">
                    <i class="fas fa-calendar-alt"></i>
                    Course Schedule
                </button>
                <button class="quick-action-btn">
                    <i class="fas fa-users"></i>
                    Manage Students
                </button>
                <button class="quick-action-btn">
                    <i class="fas fa-cog"></i>
                    Course Settings
                </button>
            </div>
            <h2 class="section-title">My Courses</h2>
            <div class="course-management-grid"></div>
        `;
        
        // Re-initialize course management
        if (typeof window.initCourseManagement === 'function') {
            window.initCourseManagement();
        }
        
        // Re-attach event listener to create course button
        const newCreateCourseBtn = document.getElementById('createCourseBtn');
        if (newCreateCourseBtn) {
            newCreateCourseBtn.addEventListener('click', () => {
                if (window.createCourseModal) {
                    window.createCourseModal.classList.add('active');
    
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
                        createCourseForm.addEventListener('submit', window.handleCreateCourse);
                        
                        // Add cancel button handler
                        const cancelBtn = document.getElementById('cancelCourseBtn');
                        if (cancelBtn) {
                            cancelBtn.addEventListener('click', () => {
                                window.createCourseModal.classList.remove('active');
    });
                        }
                    }
                }
            });
        }
    };
    courseSection.appendChild(backButton);
    
    // Create course management interface
    const courseManagement = document.createElement('div');
    courseManagement.className = 'course-management-detail';
    courseManagement.innerHTML = `
        <div class="course-header-detail">
            <div class="course-header-content">
                <h2>${course.code} - ${course.title}</h2>
                <span class="course-status ${course.status}">${course.status.charAt(0).toUpperCase() + course.status.slice(1)}</span>
            </div>
            <div class="course-actions-detail">
                <button class="course-btn primary" id="editCourseBtn">
                    <i class="fas fa-edit"></i> Edit Course
                </button>
                <button class="course-btn secondary" id="courseSettingsBtn">
                    <i class="fas fa-cog"></i> Settings
                </button>
            </div>
        </div>

        <div class="course-tabs">
            <button class="course-tab active" data-tab="overview">Overview</button>
            <button class="course-tab" data-tab="assignments">Assignments</button>
            <button class="course-tab" data-tab="students">Students</button>
            <button class="course-tab" data-tab="materials">Materials</button>
            <button class="course-tab" data-tab="grades">Grades</button>
        </div>

        <div class="course-tab-content">
            <div class="tab-panel active" id="overviewPanel">
                <div class="course-stats-detail">
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-user-graduate"></i></div>
                        <div class="stat-info">
                            <span class="stat-value">${course.students}</span>
                            <span class="stat-label">Enrolled Students</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-tasks"></i></div>
                        <div class="stat-info">
                            <span class="stat-value">${course.assignments}</span>
                            <span class="stat-label">Assignments</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i class="fas fa-file-alt"></i></div>
                        <div class="stat-info">
                            <span class="stat-value">${course.materials}</span>
                            <span class="stat-label">Course Materials</span>
                        </div>
                    </div>
                </div>
                <!-- Removed static course-description-detail here -->
                <div class="course-timeline">
                    <h3>Recent Activity</h3>
                    <div class="timeline">
                        <!-- Timeline items will be added dynamically -->
                    </div>
                </div>
            </div>

            <div class="tab-panel" id="assignmentsPanel">
                <div class="panel-header">
                    <h3>Assignments</h3>
                    <button class="course-btn primary" id="createAssignmentBtn">
                        <i class="fas fa-plus"></i> Create Assignment
                    </button>
                </div>
                <div class="assignments-grid">
                    <!-- Assignments will be added dynamically -->
                </div>
            </div>

            <div class="tab-panel" id="studentsPanel">
                <div class="panel-header">
                    <h3>Enrolled Students</h3>
                    <button class="course-btn primary" id="enrollStudentsBtn">
                        <i class="fas fa-user-plus"></i> Enroll Students
                    </button>
                </div>
                <div class="enrolled-students-table">
                    <!-- Student table will be added dynamically -->
                </div>
            </div>

            <div class="tab-panel" id="materialsPanel">
                <div class="panel-header">
                    <h3>Course Materials</h3>
                    <button class="course-btn primary" id="uploadMaterialBtn">
                        <i class="fas fa-upload"></i> Upload Materials
                    </button>
                </div>
                <div class="materials-grid">
                    <!-- Materials will be added dynamically -->
                </div>
            </div>

            <div class="tab-panel" id="gradesPanel">
                <div class="panel-header">
                    <h3>Grade Overview</h3>
                    <button class="course-btn primary" id="exportGradesBtn">
                        <i class="fas fa-download"></i> Export Grades
                    </button>
                </div>
                <div class="grades-overview">
                    <!-- Grade overview will be added dynamically -->
                </div>
            </div>
        </div>
    `;
    courseSection.appendChild(courseManagement);
    
    // Initialize course management events
    initCourseManagementEvents(course);
}

function initCourseManagementEvents(course) {
    // Tab switching
    const tabs = document.querySelectorAll('.course-tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.getAttribute('data-tab');
            
            // Update active states
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${targetPanel}Panel`).classList.add('active');

            // Load panel content
            loadPanelContent(targetPanel, course);
        });
    });

    // Edit course button
    document.getElementById('editCourseBtn').addEventListener('click', () => {
        showEditCourseModal(course);
    });

    // Settings button
    document.getElementById('courseSettingsBtn').addEventListener('click', () => {
        showCourseSettings(course);
    });

    // Load initial content
    loadPanelContent('overview', course);
}

function loadPanelContent(panelId, course) {
    switch(panelId) {
        case 'overview':
            loadCourseOverview(course);
            break;
        case 'assignments':
            loadCourseAssignments(course);
            break;
        case 'students':
            loadEnrolledStudents(course);
            break;
        case 'materials':
            loadCourseMaterials(course);
            break;
        case 'grades':
            loadGradeOverview(course);
            break;
    }
}

// Panel content loading functions
function loadCourseOverview(course) {
    // Description editing UI
    const overviewPanel = document.getElementById('overviewPanel');
    if (overviewPanel) {
        // Remove any existing course description section
        const oldDesc = overviewPanel.querySelector('#courseDescriptionDetail');
        if (oldDesc) oldDesc.remove();
        // Add editable description area
        let descHtml = `
            <div class="course-description-detail" id="courseDescriptionDetail">
                <h3>Course Description</h3>
                <div id="courseDescriptionText">${course.description}</div>
                <button class="course-btn secondary" id="editDescriptionBtn"><i class="fas fa-edit"></i> Edit Description</button>
            </div>
        `;
        // Insert before timeline
        const timeline = overviewPanel.querySelector('.course-timeline');
        if (timeline) {
            timeline.insertAdjacentHTML('beforebegin', descHtml);
        } else {
            overviewPanel.innerHTML = descHtml + overviewPanel.innerHTML;
        }
        // Edit button handler
        const editBtn = document.getElementById('editDescriptionBtn');
        editBtn.onclick = () => {
            const descDiv = document.getElementById('courseDescriptionDetail');
            descDiv.innerHTML = `
                <h3>Course Description</h3>
                <textarea id="editDescriptionTextarea" class="form-control" rows="4">${course.description}</textarea>
                <div style="margin-top: 12px; display: flex; gap: 10px;">
                    <button class="course-btn primary" id="saveDescriptionBtn">Save</button>
                    <button class="course-btn secondary" id="cancelDescriptionBtn">Cancel</button>
                </div>
            `;
            document.getElementById('saveDescriptionBtn').onclick = () => {
                const newDesc = document.getElementById('editDescriptionTextarea').value;
                course.description = newDesc;
                showNotification('Description updated!', 'success');
                loadPanelContent('overview', course);
            };
            document.getElementById('cancelDescriptionBtn').onclick = () => {
                loadPanelContent('overview', course);
            };
        };
    }
    // Load recent activity timeline
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        timeline.innerHTML = `
            <div class="timeline-item">
                <div class="timeline-icon success">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="timeline-content">
                    <h4>Assignment Graded</h4>
                    <p>You graded 15 submissions for "Programming Basics"</p>
                    <span class="timeline-time">2 hours ago</span>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-icon info">
                    <i class="fas fa-upload"></i>
                </div>
                <div class="timeline-content">
                    <h4>Materials Added</h4>
                    <p>New lecture slides uploaded for Week 5</p>
                    <span class="timeline-time">Yesterday</span>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-icon warning">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="timeline-content">
                    <h4>Assignment Due Soon</h4>
                    <p>"Data Structures Implementation" due in 2 days</p>
                    <span class="timeline-time">2 days ago</span>
                </div>
            </div>
        `;
    }
}

function loadCourseAssignments(course) {
    const assignmentsGrid = document.querySelector('.assignments-grid');
    const courseAssignments = assignments.filter(a => a.courseId === course.id);
    // Add Create Assignment button event
    const createBtn = document.getElementById('createAssignmentBtn');
    if (createBtn) {
        createBtn.onclick = () => createAssignment();
    }
    assignmentsGrid.innerHTML = courseAssignments.map((assignment, idx) => `
        <div class="assignment-card" data-idx="${idx}">
            <div class="assignment-card-header">
                <h4>${assignment.name}</h4>
                <span class="due-date">Due: ${assignment.dueDate}</span>
            </div>
            <div class="assignment-card-body">
                <div class="assignment-stats">
                    <div class="stat">
                        <span class="stat-value">${assignment.totalSubmissions}</span>
                        <span class="stat-label">Submissions</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${assignment.gradedSubmissions}</span>
                        <span class="stat-label">Graded</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${assignment.avgScore}%</span>
                        <span class="stat-label">Average</span>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(assignment.gradedSubmissions / assignment.totalSubmissions) * 100}%"></div>
                </div>
                <div class="assignment-actions">
                    <button class="course-btn secondary view-details-btn" data-idx="${idx}">View Details</button>
                    <button class="course-btn primary grade-submissions-btn" data-idx="${idx}">Grade Submissions</button>
                </div>
            </div>
        </div>
    `).join('');
    // Add event listeners for assignment actions
    assignmentsGrid.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.onclick = (e) => {
            const idx = btn.getAttribute('data-idx');
            const assignment = courseAssignments[idx];
            showAssignmentDetailsModal(assignment);
        };
    });
    assignmentsGrid.querySelectorAll('.grade-submissions-btn').forEach(btn => {
        btn.onclick = (e) => {
            const idx = btn.getAttribute('data-idx');
            const assignment = courseAssignments[idx];
            showGradeSubmissionsModal(assignment);
        };
    });
}

function loadEnrolledStudents(course) {
    const studentsTable = document.querySelector('.enrolled-students-table');
    const courseStudents = students.slice(0, 3); // Simulating enrolled students
    studentsTable.innerHTML = `
            <div class="student-roster-header">
                <div class="student-filter-group">
                    <div class="student-search">
                    <input type="text" placeholder="Search students..." id="enrolledStudentSearch">
                        <i class="fas fa-search"></i>
                    </div>
                <select class="form-control">
                    <option>All Grades</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>F</option>
                </select>
                </div>
            </div>
            <table class="student-table">
                <thead>
                    <tr>
                        <th>Name</th>
                    <th>ID</th>
                        <th>Grade</th>
                    <th>Assignments</th>
                    <th>Attendance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                ${courseStudents.map((student, idx) => `
                    <tr>
                        <td>
                            <div class="student-name">
                                <div class="student-avatar">${student.name.split(' ').map(n => n[0]).join('')}</div>
                                <div>${student.name}</div>
                            </div>
                        </td>
                        <td>${student.id}</td>
                        <td>A-</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 85%"></div>
                            </div>
                        </td>
                        <td>90%</td>
                        <td>
                            <div class="student-actions">
                                <button class="student-action-btn view-student-btn" data-idx="${idx}" title="View Details">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="student-action-btn grade-student-btn" data-idx="${idx}" title="Grade Student">
                                    <i class="fas fa-clipboard-check"></i>
                                </button>
                                <button class="student-action-btn email-student-btn" data-idx="${idx}" title="Email Student">
                                    <i class="fas fa-envelope"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
                </tbody>
            </table>
    `;
    // Add event listeners for student actions
    studentsTable.querySelectorAll('.view-student-btn').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            showStudentDetailsModal(courseStudents[idx]);
        };
    });
    studentsTable.querySelectorAll('.grade-student-btn').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            showGradeStudentModal(courseStudents[idx]);
        };
    });
    studentsTable.querySelectorAll('.email-student-btn').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            showEmailStudentModal(courseStudents[idx]);
        };
    });
}

function loadCourseMaterials(course) {
    const materialsGrid = document.querySelector('.materials-grid');
    materialsGrid.innerHTML = `
        <div class="material-card enhanced-material-card">
            <div class="material-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <div class="material-content">
                <h4>Week 1 - Introduction</h4>
                <p>Course overview and syllabus</p>
                <div class="material-meta">
                    <span><i class="fas fa-clock"></i> Added 2 weeks ago</span>
                    <span><i class="fas fa-download"></i> 45 downloads</span>
                </div>
            </div>
            <div class="material-actions">
                <button class="course-btn secondary preview-material-btn">Preview</button>
                <button class="course-btn primary download-material-btn">Download</button>
            </div>
        </div>
        <div class="material-card enhanced-material-card">
            <div class="material-icon">
                <i class="fas fa-file-powerpoint"></i>
            </div>
            <div class="material-content">
                <h4>Lecture Slides - Data Types</h4>
                <p>Comprehensive guide to programming basics</p>
                <div class="material-meta">
                    <span><i class="fas fa-clock"></i> Added 1 week ago</span>
                    <span><i class="fas fa-download"></i> 38 downloads</span>
                </div>
            </div>
            <div class="material-actions">
                <button class="course-btn secondary preview-material-btn">Preview</button>
                <button class="course-btn primary download-material-btn">Download</button>
            </div>
        </div>
    `;
    // Add event listener to Upload Materials button
    const uploadBtn = document.getElementById('uploadMaterialBtn');
    if (uploadBtn) {
        uploadBtn.classList.remove('gradient'); // Remove gradient if present
        uploadBtn.style.background = 'var(--primary-blue)';
        uploadBtn.style.color = '#fff';
        uploadBtn.onclick = () => uploadMaterial();
    }
    // Add functionality to Preview and Download buttons
    materialsGrid.querySelectorAll('.preview-material-btn').forEach((btn, idx) => {
        btn.onclick = () => {
            showMaterialPreviewModal(idx);
        };
    });
    materialsGrid.querySelectorAll('.download-material-btn').forEach((btn, idx) => {
        btn.onclick = () => {
            showNotification('Material downloaded!', 'success');
        };
    });
}

// Modal: Material Preview
function showMaterialPreviewModal(idx) {
    // Simulate material data
    const materials = [
        {
            title: 'Week 1 - Introduction',
            description: 'Course overview and syllabus',
            type: 'PDF',
            added: '2 weeks ago',
            downloads: 45
        },
        {
            title: 'Lecture Slides - Data Types',
            description: 'Comprehensive guide to programming basics',
            type: 'PowerPoint',
            added: '1 week ago',
            downloads: 38
        }
    ];
    const material = materials[idx];
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content">
            <div class="modal-header">
                <h2>Material Preview</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="assignment-details-modal">
                    <div><strong>Title:</strong> ${material.title}</div>
                    <div><strong>Description:</strong> ${material.description}</div>
                    <div><strong>Type:</strong> ${material.type}</div>
                    <div><strong>Added:</strong> ${material.added}</div>
                    <div><strong>Downloads:</strong> ${material.downloads}</div>
                </div>
                <div style="margin-top:18px; text-align:center; color:#888;">(File preview not available in demo)</div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function loadGradeOverview(course) {
    const gradesOverview = document.querySelector('.grades-overview');
    gradesOverview.innerHTML = `
        <div class="grades-summary">
            <div class="grade-stat-cards">
                <div class="grade-stat-card">
                    <div class="grade-stat-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="grade-stat-info">
                        <span class="grade-stat-value">85.2</span>
                        <span class="grade-stat-label">Class Average</span>
                    </div>
                </div>
                <div class="grade-stat-card">
                    <div class="grade-stat-icon">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <div class="grade-stat-info">
                        <span class="grade-stat-value">92.5</span>
                        <span class="grade-stat-label">Highest Grade</span>
                    </div>
                </div>
                <div class="grade-stat-card">
                    <div class="grade-stat-icon">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="grade-stat-info">
                        <span class="grade-stat-value">75%</span>
                        <span class="grade-stat-label">Assignments Graded</span>
                    </div>
                </div>
            </div>
            <div class="grade-distribution">
                <h4>Grade Distribution</h4>
                <div class="grade-bars">
                    <div class="grade-bar">
                        <div class="bar-fill" style="height: 60%"></div>
                        <span class="bar-label">A</span>
                    </div>
                    <div class="grade-bar">
                        <div class="bar-fill" style="height: 75%"></div>
                        <span class="bar-label">B</span>
                    </div>
                    <div class="grade-bar">
                        <div class="bar-fill" style="height: 45%"></div>
                        <span class="bar-label">C</span>
                    </div>
                    <div class="grade-bar">
                        <div class="bar-fill" style="height: 25%"></div>
                        <span class="bar-label">D</span>
                    </div>
                    <div class="grade-bar">
                        <div class="bar-fill" style="height: 15%"></div>
                        <span class="bar-label">F</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    // Add event listener to Export Grades button
    const exportBtn = document.getElementById('exportGradesBtn');
    if (exportBtn) {
        exportBtn.onclick = () => exportGrades();
    }
}

function createAssignment() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Create New Assignment</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="createAssignmentForm">
                    <div class="form-group">
                        <label class="form-label">Assignment Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Course</label>
                        <select class="form-control" required>
                            ${professorCourses.map(course => `
                                <option value="${course.id}">${course.code} - ${course.title}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Due Date</label>
                        <input type="date" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Total Points</label>
                        <input type="number" class="form-control" min="1" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelAssignmentBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Create Assignment</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    document.getElementById('cancelAssignmentBtn').onclick = () => modal.remove();

    // Form submission
    document.getElementById('createAssignmentForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Assignment created successfully', 'success');
        modal.remove();
    };
}

function importGrades() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Import Grades</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="file-upload-area">
                    <input type="file" id="gradesFileInput" accept=".csv,.xlsx" style="display:none;">
                    <div class="material-upload-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div class="material-upload-text">Drag and drop your grade file here</div>
                    <div class="material-upload-subtext">or click to browse (.csv, .xlsx)</div>
                    <button class="course-btn primary" id="selectGradesFileBtn">Select File</button>
                </div>
                <div id="filePreviewContainer" style="margin-top: 20px;"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.modal-close').onclick = () => modal.remove();

    // File selection
    const selectFileBtn = document.getElementById('selectGradesFileBtn');
    const fileInput = document.getElementById('gradesFileInput');
    const previewContainer = document.getElementById('filePreviewContainer');

    selectFileBtn.onclick = () => fileInput.click();

    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            previewContainer.innerHTML = `
                <div class="file-preview">
                    <div class="file-preview-icon">
                        <i class="fas fa-file-csv"></i>
                    </div>
                    <div class="file-preview-info">
                        <div class="file-preview-name">${file.name}</div>
                        <div class="file-preview-meta">${(file.size / 1024).toFixed(2)} KB</div>
                    </div>
                    <button class="course-btn primary" id="importGradesConfirmBtn">Import</button>
                </div>
            `;

            document.getElementById('importGradesConfirmBtn').onclick = () => {
                showNotification('Grades imported successfully', 'success');
                modal.remove();
            };
        }
    };
}

function exportGrades() {
    // Generate CSV of grades
    const csvContent = [
        "Student ID,Student Name,Course,Assignment,Grade",
        ...students.flatMap(student => 
            assignments.map(assignment => 
                `${student.id},${student.name},${assignment.courseId},${assignment.name},${Math.floor(Math.random() * 100)}`
            )
        ).join('\n')
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'grades_export.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show notification
    showNotification('Grades exported successfully', 'success');
}

function editStudentGrade(student, assignment) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Edit Grade</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="student-grade-info">
                    <div class="student-avatar">${student.name.split(' ').map(n => n[0]).join('')}</div>
                    <div class="student-details">
                        <h3>${student.name}</h3>
                        <p>${student.id} | ${student.major}</p>
                    </div>
                </div>
                <form id="editGradeForm">
                    <div class="form-group">
                        <label class="form-label">Assignment</label>
                        <input type="text" class="form-control" value="${assignment.name}" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Current Grade</label>
                        <input type="number" class="form-control" value="${Math.floor(Math.random() * 100)}" min="0" max="100" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Feedback (Optional)</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelGradeEditBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Save Grade</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    document.getElementById('cancelGradeEditBtn').onclick = () => modal.remove();

    // Form submission
    document.getElementById('editGradeForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Grade updated successfully', 'success');
        modal.remove();
    };
}

function uploadMaterial() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Upload Course Material</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="material-upload-area">
                    <input type="file" id="materialFileInput" style="display:none;">
                    <div class="material-upload-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <div class="material-upload-text">Drag and drop your file here</div>
                    <div class="material-upload-subtext">or click to browse</div>
                    <button class="course-btn primary" id="selectMaterialFileBtn">Select File</button>
                </div>
                <div id="filePreviewContainer" style="margin-top: 20px;"></div>
                <form id="materialDetailsForm" style="display:none; margin-top: 20px;">
                    <div class="form-group">
                        <label class="form-label">Material Title</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Course</label>
                        <select class="form-control" required>
                            ${professorCourses.map(course => `
                                <option value="${course.id}">${course.code} - ${course.title}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Material Type</label>
                        <select class="form-control" required>
                            <option value="document">Document</option>
                            <option value="presentation">Presentation</option>
                            <option value="video">Video</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description (Optional)</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelMaterialUploadBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Upload Material</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.modal-close').onclick = () => modal.remove();

    // File selection
    const selectFileBtn = document.getElementById('selectMaterialFileBtn');
    const fileInput = document.getElementById('materialFileInput');
    const previewContainer = document.getElementById('filePreviewContainer');
    const materialDetailsForm = document.getElementById('materialDetailsForm');
    const cancelBtn = document.getElementById('cancelMaterialUploadBtn');

    selectFileBtn.onclick = () => fileInput.click();
    cancelBtn.onclick = () => modal.remove();

    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            previewContainer.innerHTML = `
                <div class="file-preview">
                    <div class="file-preview-icon">
                        <i class="fas fa-file"></i>
                    </div>
                    <div class="file-preview-info">
                        <div class="file-preview-name">${file.name}</div>
                        <div class="file-preview-meta">${(file.size / 1024).toFixed(2)} KB</div>
                    </div>
                </div>
            `;
            materialDetailsForm.style.display = 'block';
        }
    };

    // Form submission
    materialDetailsForm.onsubmit = (e) => {
        e.preventDefault();
        showNotification('Material uploaded successfully', 'success');
        modal.remove();
    };
}

function manageMaterials() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Manage Course Materials</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="materials-management">
                    <div class="materials-filters">
                        <select class="form-control" id="courseFilter">
                            <option value="all">All Courses</option>
                            ${professorCourses.map(course => `
                                <option value="${course.id}">${course.code} - ${course.title}</option>
                            `).join('')}
                        </select>
                        <select class="form-control" id="typeFilter">
                            <option value="all">All Types</option>
                            <option value="document">Documents</option>
                            <option value="presentation">Presentations</option>
                            <option value="video">Videos</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="materials-list">
                        ${[1, 2, 3].map((_, index) => `
                            <div class="material-item">
                                <div class="material-icon">
                                    <i class="fas fa-${index % 2 === 0 ? 'file-pdf' : 'file-powerpoint'}"></i>
                                </div>
                                <div class="material-details">
                                    <h4>Lecture ${index + 1} Materials</h4>
                                    <p>CS101 - Introduction to Computer Science</p>
                                    <div class="material-meta">
                                        <span>PDF</span>
                                        <span>2.5 MB</span>
                                        <span>Uploaded 2 weeks ago</span>
                                    </div>
                                </div>
                                <div class="material-actions">
                                    <button class="course-btn secondary">View</button>
                                    <button class="course-btn danger">Delete</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.modal-close').onclick = () => modal.remove();

    // Filter functionality
    const courseFilter = document.getElementById('courseFilter');
    const typeFilter = document.getElementById('typeFilter');

    [courseFilter, typeFilter].forEach(filter => {
        filter.onchange = () => {
            // Simulate filtering (in a real app, this would filter actual materials)
            showNotification('Filters applied', 'info');
        };
    });

    // Delete buttons
    modal.querySelectorAll('.course-btn.danger').forEach(btn => {
        btn.onclick = () => {
            showNotification('Material deleted successfully', 'success');
            btn.closest('.material-item').remove();
        };
    });
}

function addExternalResource() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content" style="max-width:420px;padding:0;">
            <div class="modal-header" style="padding:18px 24px 10px 24px;">
                <h2 style="font-size:1.2rem;">Add External Resource</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body" style="padding:18px 24px 24px 24px;">
                <form id="addResourceForm">
                    <div class="form-group">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control" id="resourceTitle" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">URL</label>
                        <input type="url" class="form-control" id="resourceUrl" required>
                    </div>
                    <div class="form-actions" style="margin-top:18px;">
                        <button type="button" class="course-btn secondary" id="cancelAddResourceBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Add Resource</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.querySelector('#cancelAddResourceBtn').onclick = () => modal.remove();
    modal.querySelector('#addResourceForm').onsubmit = function(e) {
        e.preventDefault();
        const title = document.getElementById('resourceTitle').value.trim();
        const url = document.getElementById('resourceUrl').value.trim();
        if (title && url) {
            // Add new resource to the list
            const resourcesList = document.querySelector('.resources-list');
            const newItem = document.createElement('div');
            newItem.className = 'resource-item';
            newItem.style = 'display:flex;align-items:center;gap:18px;margin-bottom:16px;background:#fff;padding:16px 20px;border-radius:10px;box-shadow:0 1px 4px rgba(30,58,138,0.04);';
            newItem.innerHTML = `
                <div class="material-icon" style="font-size:2rem;background:var(--primary-light);color:var(--primary-navy);border-radius:8px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-link"></i></div>
                <div style="flex:1;">
                    <div style="font-weight:600;">${title}</div>
                    <div style="color:#666;font-size:0.97rem;">${url}</div>
                </div>
                <button class="course-btn primary">Open</button>
            `;
            resourcesList.appendChild(newItem);
            showNotification('External resource added!', 'success');
            modal.remove();
        }
    };
}

// Calendar Functionality
function initCalendar() {
    // Get the calendar section
    const calendarSection = document.getElementById('calendarSection');
    if (!calendarSection) {
        console.error('Calendar section not found');
        return;
    }
    
    // Clear current content
    calendarSection.innerHTML = '';
    
    // Create calendar container
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'academic-calendar';
    
    // Create calendar header with navigation
    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar-header';
    calendarHeader.innerHTML = `
        <div class="calendar-navigation">
            <button class="course-btn secondary" id="prevMonthBtn">
                <i class="fas fa-chevron-left"></i>
            </button>
            <h2 id="currentMonthYear">October 2023</h2>
            <button class="course-btn secondary" id="nextMonthBtn">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="calendar-actions">
            <button class="course-btn primary" id="addEventBtn">
                <i class="fas fa-plus"></i> Add Event
            </button>
            <select id="calendarViewSelect" class="form-control">
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
            </select>
        </div>
    `;
    calendarContainer.appendChild(calendarHeader);
    
    // Create calendar grid
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    
    // Create week days header
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekHeader = document.createElement('div');
    weekHeader.className = 'calendar-week-header';
    weekHeader.innerHTML = weekDays.map(day => `<div>${day}</div>`).join('');
    calendarGrid.appendChild(weekHeader);
    
    // Create calendar days
    const daysContainer = document.createElement('div');
    daysContainer.className = 'calendar-days';
    
    // Generate sample events
    const sampleEvents = [
        { date: '2023-10-05', title: 'Faculty Meeting', time: '10:00 AM', type: 'meeting' },
        { date: '2023-10-12', title: 'Midterm Exam - CS101', time: '2:00 PM', type: 'exam' },
        { date: '2023-10-20', title: 'Research Seminar', time: '11:30 AM', type: 'seminar' }
    ];
    
    // Generate days for October 2023
    for (let i = 1; i <= 31; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.innerHTML = `<span class="day-number">${i}</span>`;
        
        // Add events to specific days
        const dayEvents = sampleEvents.filter(event => 
            new Date(event.date).getDate() === i
        );
        
        if (dayEvents.length > 0) {
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'day-events';
            
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = `day-event ${event.type}`;
                eventElement.innerHTML = `
                    <span class="event-time">${event.time}</span>
                    <span class="event-title">${event.title}</span>
                `;
                eventsContainer.appendChild(eventElement);
            });
            
            dayElement.appendChild(eventsContainer);
        }
        
        daysContainer.appendChild(dayElement);
    }
    
    calendarGrid.appendChild(daysContainer);
    calendarContainer.appendChild(calendarGrid);
    
    // Add to the section
    calendarSection.appendChild(calendarContainer);
    
    // Add event listeners
    document.getElementById('addEventBtn').onclick = addCalendarEvent;
    document.getElementById('calendarViewSelect').onchange = changeCalendarView;
    document.getElementById('prevMonthBtn').onclick = navigateCalendar;
    document.getElementById('nextMonthBtn').onclick = navigateCalendar;
}

function addCalendarEvent() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Event</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="addEventForm">
                    <div class="form-group">
                        <label class="form-label">Event Title</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Date</label>
                        <input type="date" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Time</label>
                        <input type="time" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Event Type</label>
                        <select class="form-control" required>
                            <option value="meeting">Meeting</option>
                            <option value="exam">Exam</option>
                            <option value="seminar">Seminar</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description (Optional)</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelEventBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Add Event</button>
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
    document.getElementById('addEventForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Event added successfully', 'success');
        modal.remove();
    };
}

function changeCalendarView(e) {
    const view = e.target.value;
    showNotification(`Switched to ${view} view`, 'info');
}

function navigateCalendar(e) {
    const direction = e.target.closest('button').id === 'prevMonthBtn' ? 'Previous' : 'Next';
    showNotification(`Navigated to ${direction} month`, 'info');
}

// Settings Functionality
function initSettings() {
    // Get the settings section
    const settingsSection = document.getElementById('settingsSection');
    if (!settingsSection) {
        console.error('Settings section not found');
        return;
    }
    
    // Clear current content
    settingsSection.innerHTML = '';
    
    // Create settings container
    const settingsContainer = document.createElement('div');
    settingsContainer.className = 'professor-settings';
    
    // Settings sections
    const settingsSections = [
        {
            title: 'Profile Settings',
            icon: 'user',
            fields: [
                { label: 'Full Name', type: 'text', value: 'Dr. Johnson' },
                { label: 'Email', type: 'email', value: 'dr.johnson@university.edu' },
                { label: 'Phone Number', type: 'tel', value: '+1 (555) 123-4567' }
            ]
        },
        {
            title: 'Notification Preferences',
            icon: 'bell',
            fields: [
                { 
                    label: 'Email Notifications', 
                    type: 'checkbox', 
                    options: [
                        'New Assignments', 
                        'Student Submissions', 
                        'Grade Updates'
                    ]
                },
                { 
                    label: 'Push Notifications', 
                    type: 'checkbox', 
                    options: [
                        'Urgent Messages', 
                        'Course Announcements'
                    ]
                }
            ]
        },
        {
            title: 'Security',
            icon: 'lock',
            fields: [
                { label: 'Change Password', type: 'password' },
                { label: 'Confirm New Password', type: 'password' }
            ]
        },
        {
            title: 'Appearance',
            icon: 'palette',
            fields: [
                { 
                    label: 'Theme', 
                    type: 'select', 
                    options: ['Light', 'Dark', 'System Default']
                },
                { 
                    label: 'Font Size', 
                    type: 'select', 
                    options: ['Small', 'Medium', 'Large']
                }
            ]
        }
    ];
    
    // Create settings sections
    settingsSections.forEach(section => {
        const sectionElement = document.createElement('div');
        sectionElement.className = 'settings-section';
        
        sectionElement.innerHTML = `
            <div class="settings-section-header">
                <i class="fas fa-${section.icon}"></i>
                <h3>${section.title}</h3>
            </div>
            <form class="settings-form">
                ${section.fields.map(field => {
                    if (field.type === 'checkbox') {
                        return `
                            <div class="form-group">
                                <label class="form-label">${field.label}</label>
                                <div class="checkbox-group">
                                    ${field.options.map(option => `
                                        <label class="checkbox-label">
                                            <input type="checkbox" name="${field.label.replace(/\s+/g, '')}" value="${option}">
                                            ${option}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    } else if (field.type === 'select') {
                        return `
                            <div class="form-group">
                                <label class="form-label">${field.label}</label>
                                <select class="form-control" name="${field.label.replace(/\s+/g, '')}">
                                    ${field.options.map(option => `
                                        <option value="${option}">${option}</option>
                                    `).join('')}
                                </select>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="form-group">
                                <label class="form-label">${field.label}</label>
                                <input 
                                    type="${field.type}" 
                                    class="form-control" 
                                    name="${field.label.replace(/\s+/g, '')}"
                                    ${field.value ? `value="${field.value}"` : ''}
                                >
                            </div>
                        `;
                    }
                }).join('')}
                <div class="form-actions">
                    <button type="submit" class="course-btn primary">Save Changes</button>
                </div>
            </form>
        `;
        
        // Add form submission handler
        sectionElement.querySelector('form').onsubmit = (e) => {
            e.preventDefault();
            showNotification('Settings saved successfully', 'success');
        };
        
        settingsContainer.appendChild(sectionElement);
    });
    
    // Add to the section
    settingsSection.appendChild(settingsContainer);
}

// Messages Functionality
function initMessages() {
    // Get the messages section
    const messagesSection = document.getElementById('messagesSection');
    if (!messagesSection) {
        console.error('Messages section not found');
        return;
    }
    
    // Clear current content
    messagesSection.innerHTML = '';
    
    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.className = 'messages-interface';
    
    // Sample message data
    const sampleMessages = [
        {
            id: 1,
            sender: 'Alex Rodriguez',
            subject: 'Assignment Clarification',
            excerpt: 'Could you provide more details about the upcoming project?',
            timestamp: '2 hours ago',
            read: false
        },
        {
            id: 2,
            sender: 'Department Admin',
            subject: 'Faculty Meeting Reminder',
            excerpt: 'Reminder: Department meeting this Friday at 3 PM.',
            timestamp: 'Yesterday',
            read: true
        },
        {
            id: 3,
            sender: 'Jane Smith',
            subject: 'Research Collaboration',
            excerpt: 'I wanted to discuss a potential research collaboration...',
            timestamp: '3 days ago',
            read: false
        }
    ];
    
    // Create messages layout
    messagesContainer.innerHTML = `
        <div class="messages-sidebar">
            <div class="messages-header">
                <h2>Messages</h2>
                <button class="course-btn primary" id="composeMessageBtn">
                    <i class="fas fa-plus"></i> Compose
                </button>
            </div>
            <div class="messages-list" id="messagesList">
                ${sampleMessages.map(message => `
                    <div class="message-item ${message.read ? 'read' : 'unread'}" data-message-id="${message.id}">
                        <div class="message-sender">${message.sender}</div>
                        <div class="message-content">
                            <div class="message-subject">${message.subject}</div>
                            <div class="message-excerpt">${message.excerpt}</div>
                        </div>
                        <div class="message-timestamp">${message.timestamp}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="messages-detail" id="messagesDetail">
            <div class="messages-detail-placeholder">
                <i class="fas fa-envelope-open"></i>
                <p>Select a message to view its contents</p>
            </div>
        </div>
    `;
    
    // Add to the section
    messagesSection.appendChild(messagesContainer);
    
    // Add event listeners
    document.getElementById('composeMessageBtn').onclick = composeMessage;
    
    // Message selection
    document.getElementById('messagesList').addEventListener('click', (e) => {
        const messageItem = e.target.closest('.message-item');
        if (messageItem) {
            // Mark as read
            messageItem.classList.remove('unread');
            // Remove 'active' from all, add to clicked
            document.querySelectorAll('.message-item').forEach(item => item.classList.remove('active'));
            messageItem.classList.add('active');
            // Show message details
            const messageId = messageItem.getAttribute('data-message-id');
            showMessageDetails(messageId);
        }
    });
}

function composeMessage() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Compose New Message</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="composeMessageForm">
                    <div class="form-group">
                        <label class="form-label">To</label>
                        <select multiple class="form-control" id="messageRecipients">
                            ${students.map(student => `
                                <option value="${student.id}">${student.name} (${student.email})</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Message</label>
                        <textarea class="form-control" rows="5" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelMessageBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal functionality
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    document.getElementById('cancelMessageBtn').onclick = () => modal.remove();

    // Form submission
    document.getElementById('composeMessageForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Message sent successfully', 'success');
        modal.remove();
    };
}

function showMessageDetails(messageId) {
    const messagesDetail = document.getElementById('messagesDetail');
    // Find the message from the sampleMessages array
    const msgId = parseInt(messageId, 10);
    let message = sampleMessages.find(m => m.id === msgId);
    if (!message) {
        message = {
            sender: 'Unknown',
            subject: 'No Subject',
            body: '',
            timestamp: ''
        };
    }
    if (!message.body) message.body = message.excerpt || '';
    messagesDetail.innerHTML = `
        <div class="message-detail-header">
            <h3>${message.subject}</h3>
            <div class="message-meta">
                <span class="message-sender">From: ${message.sender}</span>
                <span class="message-timestamp">${message.timestamp}</span>
            </div>
        </div>
        <div class="message-detail-body">
            ${message.body.replace(/\n/g, '<br>') }
        </div>
        <div class="message-actions">
            <button class="course-btn primary" id="replyMessageBtn">
                <i class="fas fa-reply"></i> Reply
            </button>
            <button class="course-btn secondary" id="deleteMessageBtn">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    document.getElementById('replyMessageBtn').onclick = () => {
        composeMessage();
    };
    document.getElementById('deleteMessageBtn').onclick = () => {
        showNotification('Message deleted', 'success');
        messagesDetail.innerHTML = `
            <div class="messages-detail-placeholder">
                <i class="fas fa-envelope-open"></i>
                <p>Select a message to view its contents</p>
            </div>
        `;
    };
}

// Modal for assignment details
function showAssignmentDetailsModal(assignment) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content">
            <div class="modal-header">
                <h2>Assignment Details</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="assignment-details-modal">
                    <div><strong>Name:</strong> ${assignment.name}</div>
                    <div><strong>Due Date:</strong> ${assignment.dueDate}</div>
                    <div><strong>Total Submissions:</strong> ${assignment.totalSubmissions}</div>
                    <div><strong>Graded Submissions:</strong> ${assignment.gradedSubmissions}</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Modal for grading submissions
function showGradeSubmissionsModal(assignment) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    // Simulate enrolled students (in real app, filter by course/assignment)
    const enrolledStudents = students.filter(s => s.status === 'active' || s.status === 'pending');
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content">
            <div class="modal-header">
                <h2>Grade Submissions</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="assignment-details-modal">
                    <div><strong>Assignment:</strong> ${assignment.name}</div>
                    <div><strong>Due Date:</strong> ${assignment.dueDate}</div>
                    <div><strong>Total Submissions:</strong> ${assignment.totalSubmissions}</div>
                    <div><strong>Graded Submissions:</strong> ${assignment.gradedSubmissions}</div>
                </div>
                <div class="grading-interface-modal" style="margin-top: 18px;">
                    <div class="grading-table-scroll">
                        <table class="student-table" style="margin-bottom: 0;">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Grade</th>
                                    <th>Feedback</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${enrolledStudents.map((student, idx) => `
                                    <tr>
                                        <td>${student.name}</td>
                                        <td>${student.id}</td>
                                        <td><input type="number" min="0" max="100" class="form-control" id="gradeInput_${idx}" style="width: 70px;" value=""></td>
                                        <td><input type="text" class="form-control" id="feedbackInput_${idx}" style="width: 120px;"></td>
                                        <td><button class="course-btn primary save-grade-btn" data-idx="${idx}">Save</button></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    // Save button logic
    modal.querySelectorAll('.save-grade-btn').forEach(btn => {
        btn.onclick = () => {
            const idx = btn.getAttribute('data-idx');
            const student = enrolledStudents[idx];
            const grade = modal.querySelector(`#gradeInput_${idx}`).value;
            const feedback = modal.querySelector(`#feedbackInput_${idx}`).value;
            // Simulate saving grade (in real app, send to backend)
            showNotification(`Grade saved for ${student.name}: ${grade}${feedback ? ' (Feedback: ' + feedback + ')' : ''}`, 'success');
        };
    });
}

// Modal: Student Details
function showStudentDetailsModal(student) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content student-modal-content">
            <div class="modal-header">
                <h2>Student Details</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="assignment-details-modal">
                    <div><strong>Name:</strong> ${student.name}</div>
                    <div><strong>ID:</strong> ${student.id}</div>
                    <div><strong>Email:</strong> ${student.email}</div>
                    <div><strong>Major:</strong> ${student.major}</div>
                    <div><strong>Year:</strong> ${student.year}</div>
                    <div><strong>GPA:</strong> ${student.gpa}</div>
                    <div><strong>Status:</strong> ${student.status}</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Modal: Grade Student
function showGradeStudentModal(student) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content student-modal-content">
            <div class="modal-header">
                <h2>Grade Student</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="assignment-details-modal">
                    <div><strong>Name:</strong> ${student.name}</div>
                    <div><strong>ID:</strong> ${student.id}</div>
                    <div><strong>Major:</strong> ${student.major}</div>
                </div>
                <form id="gradeStudentForm" style="margin-top: 18px;">
                    <div class="form-group">
                        <label class="form-label">Grade</label>
                        <input type="number" min="0" max="100" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Feedback (Optional)</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelGradeStudentBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Save Grade</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.querySelector('#cancelGradeStudentBtn').onclick = () => modal.remove();
    modal.querySelector('#gradeStudentForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Grade saved for ' + student.name, 'success');
        modal.remove();
    };
}

// Modal: Email Student
function showEmailStudentModal(student) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content student-modal-content">
            <div class="modal-header">
                <h2>Email Student</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="emailStudentForm">
                    <div class="form-group">
                        <label class="form-label">To</label>
                        <input type="email" class="form-control" value="${student.email}" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Message</label>
                        <textarea class="form-control" rows="4" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelEmailStudentBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Send Email</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.querySelector('#cancelEmailStudentBtn').onclick = () => modal.remove();
    modal.querySelector('#emailStudentForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Email sent to ' + student.name, 'success');
        modal.remove();
    };
}

// Modal: Email Students
function showEmailStudentsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content">
            <div class="modal-header">
                <h2>Email Students</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="emailStudentsForm">
                    <div class="form-group">
                        <label class="form-label">To</label>
                        <input type="text" class="form-control" value="All Students" readonly>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Subject</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Message</label>
                        <textarea class="form-control" rows="4" required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelEmailStudentsBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Send Email</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.querySelector('#cancelEmailStudentsBtn').onclick = () => modal.remove();
    modal.querySelector('#emailStudentsForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Email sent to all students!', 'success');
        modal.remove();
    };
}

// Export Roster
function exportStudentRoster() {
    const csvContent = [
        'Student ID,Name,Email,Status,Major,Year,GPA',
        ...students.map(s => `${s.id},${s.name},${s.email},${s.status},${s.major},${s.year},${s.gpa}`)
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_roster.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Student roster exported!', 'success');
}

// Modal: Roster Settings
function showRosterSettingsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content">
            <div class="modal-header">
                <h2>Roster Settings</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="rosterSettingsForm">
                    <div class="form-group">
                        <label class="form-label">Allow Self-Enrollment</label>
                        <select class="form-control">
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Default Status for New Students</label>
                        <select class="form-control">
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelRosterSettingsBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Save Settings</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.querySelector('#cancelRosterSettingsBtn').onclick = () => modal.remove();
    modal.querySelector('#rosterSettingsForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Roster settings saved!', 'success');
        modal.remove();
    };
}

// Modal: Edit Student
function showEditStudentModal(student) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content">
            <div class="modal-header">
                <h2>Edit Student</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="editStudentForm">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" class="form-control" value="${student.name}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" value="${student.email}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Major</label>
                        <input type="text" class="form-control" value="${student.major}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Year</label>
                        <input type="text" class="form-control" value="${student.year}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">GPA</label>
                        <input type="number" class="form-control" value="${student.gpa}" min="0" max="4" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <select class="form-control">
                            <option${student.status === 'active' ? ' selected' : ''}>active</option>
                            <option${student.status === 'pending' ? ' selected' : ''}>pending</option>
                            <option${student.status === 'inactive' ? ' selected' : ''}>inactive</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelEditStudentBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.querySelector('#cancelEditStudentBtn').onclick = () => modal.remove();
    modal.querySelector('#editStudentForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Student info updated (simulated)', 'success');
        modal.remove();
    };
}

// Modal: More Filters
function showMoreFiltersModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content">
            <div class="modal-header">
                <h2>More Filters</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="moreFiltersForm">
                    <div class="form-group">
                        <label class="form-label">GPA Range</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="number" class="form-control" placeholder="Min" min="0" max="4" step="0.01">
                            <input type="number" class="form-control" placeholder="Max" min="0" max="4" step="0.01">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Year</label>
                        <select class="form-control">
                            <option value="all">All</option>
                            <option>Freshman</option>
                            <option>Sophomore</option>
                            <option>Junior</option>
                            <option>Senior</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="course-btn secondary" id="cancelMoreFiltersBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Apply Filters</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.querySelector('#cancelMoreFiltersBtn').onclick = () => modal.remove();
    modal.querySelector('#moreFiltersForm').onsubmit = (e) => {
        e.preventDefault();
        showNotification('Filters applied (simulated)', 'success');
        modal.remove();
    };
}

// Expose functions to window object
window.initStudentRoster = initStudentRoster;
window.initCalendar = initCalendar;
window.initSettings = initSettings;
window.initMessages = initMessages;

// Add modal and logic for adding a new external resource
function showAddExternalResourceModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content assignment-modal-content" style="max-width:420px;padding:0;">
            <div class="modal-header" style="padding:18px 24px 10px 24px;">
                <h2 style="font-size:1.2rem;">Add External Resource</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body" style="padding:18px 24px 24px 24px;">
                <form id="addResourceForm">
                    <div class="form-group">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control" id="resourceTitle" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">URL</label>
                        <input type="url" class="form-control" id="resourceUrl" required>
                    </div>
                    <div class="form-actions" style="margin-top:18px;">
                        <button type="button" class="course-btn secondary" id="cancelAddResourceBtn">Cancel</button>
                        <button type="submit" class="course-btn primary">Add Resource</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.querySelector('#cancelAddResourceBtn').onclick = () => modal.remove();
    modal.querySelector('#addResourceForm').onsubmit = function(e) {
        e.preventDefault();
        const title = document.getElementById('resourceTitle').value.trim();
        const url = document.getElementById('resourceUrl').value.trim();
        if (title && url) {
            // Add new resource to the list
            const resourcesList = document.querySelector('.resources-list');
            const newItem = document.createElement('div');
            newItem.className = 'resource-item';
            newItem.style = 'display:flex;align-items:center;gap:18px;margin-bottom:16px;background:#fff;padding:16px 20px;border-radius:10px;box-shadow:0 1px 4px rgba(30,58,138,0.04);';
            newItem.innerHTML = `
                <div class="material-icon" style="font-size:2rem;background:var(--primary-light);color:var(--primary-navy);border-radius:8px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-link"></i></div>
                <div style="flex:1;">
                    <div style="font-weight:600;">${title}</div>
                    <div style="color:#666;font-size:0.97rem;">${url}</div>
                </div>
                <button class="course-btn primary">Open</button>
            `;
            resourcesList.appendChild(newItem);
            showNotification('External resource added!', 'success');
            modal.remove();
        }
    };
}

// Move sampleMessages to top-level scope so all functions can access it
const sampleMessages = [
    {
        id: 1,
        sender: 'Alex Rodriguez',
        subject: 'Assignment Clarification',
        excerpt: 'Could you provide more details about the upcoming project?',
        body: `Dear Professor,\n\nCould you provide more details about the upcoming project? I'm having trouble understanding the requirements.\n\nBest regards,\nAlex Rodriguez`,
        timestamp: '2 hours ago',
        read: false
    },
    {
        id: 2,
        sender: 'Department Admin',
        subject: 'Faculty Meeting Reminder',
        excerpt: 'Reminder: Department meeting this Friday at 3 PM.',
        body: `Dear Faculty,\n\nThis is a reminder for the department meeting this Friday at 3 PM in Room 204.\n\nBest,\nAdmin`,
        timestamp: 'Yesterday',
        read: true
    },
    {
        id: 3,
        sender: 'Jane Smith',
        subject: 'Research Collaboration',
        excerpt: 'I wanted to discuss a potential research collaboration...',
        body: `Hello,\n\nI wanted to discuss a potential research collaboration opportunity with you.\n\nThanks,\nJane`,
        timestamp: '3 days ago',
        read: false
    }
];

// Robust notification dropdown initialization
function ensureNotificationsInitialized() {
    if (typeof window.initNotifications === 'function') {
        window.initNotifications();
    } else if (typeof initNotifications === 'function') {
        initNotifications();
    }
}
document.addEventListener('DOMContentLoaded', ensureNotificationsInitialized);
// Also observe for dynamic changes to the notification button/dropdown
const notifObserver = new MutationObserver(() => {
    const btn = document.getElementById('notificationBtn');
    const dd = document.getElementById('notificationDropdown');
    if (btn && dd && !btn.getAttribute('data-initialized')) {
        ensureNotificationsInitialized();
    }
});
notifObserver.observe(document.body, { childList: true, subtree: true });