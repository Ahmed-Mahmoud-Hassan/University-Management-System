/**
 * University Management System - Student Portal (Part 2)
 * Advanced functionality for the student interface
 */

// Initialize additional student portal features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize financial management features
    initFinancialManagement();
    
    // Initialize library & resources features
    initLibraryResources();
    
    // Initialize campus life features
    initCampusLife();
    
    // Initialize communication tools
    initCommunicationTools();
    
    // Initialize additional academic features
    initAdvancedAcademics();
});

// Sample data for financial management
const financialData = {
    currentBalance: 1250.00,
    dueDate: 'Nov 15, 2023',
    semesterFees: [
        {
            id: 'fee1',
            description: 'Tuition Fee',
            amount: 3500.00,
            paid: 2500.00,
            dueDate: 'Nov 15, 2023',
            status: 'partially_paid'
        },
        {
            id: 'fee2',
            description: 'Library Fee',
            amount: 150.00,
            paid: 150.00,
            dueDate: 'Sep 30, 2023',
            status: 'paid'
        },
        {
            id: 'fee3',
            description: 'Technology Fee',
            amount: 300.00,
            paid: 300.00,
            dueDate: 'Sep 30, 2023',
            status: 'paid'
        },
        {
            id: 'fee4',
            description: 'Student Activity Fee',
            amount: 100.00,
            paid: 0.00,
            dueDate: 'Nov 15, 2023',
            status: 'unpaid'
        }
    ],
    paymentHistory: [
        {
            id: 'pay1',
            date: 'Sep 15, 2023',
            amount: 2500.00,
            method: 'Credit Card',
            description: 'Partial Tuition Payment',
            reference: 'TRX-2023091501'
        },
        {
            id: 'pay2',
            date: 'Sep 5, 2023',
            amount: 450.00,
            method: 'Bank Transfer',
            description: 'Library & Technology Fee',
            reference: 'TRX-2023090502'
        }
    ],
    financialAid: [
        {
            id: 'aid1',
            type: 'Scholarship',
            name: 'Academic Excellence Award',
            amount: 1500.00,
            status: 'Approved',
            disbursementDate: 'Nov 1, 2023'
        }
    ]
};

// Sample data for library resources
const libraryData = {
    borrowedBooks: [
        {
            id: 'book1',
            title: 'Data Structures and Algorithms',
            author: 'Robert Sedgewick',
            dueDate: 'Oct 25, 2023',
            renewable: true
        },
        {
            id: 'book2',
            title: 'Introduction to Machine Learning',
            author: 'Ethem Alpaydin',
            dueDate: 'Nov 5, 2023',
            renewable: true
        }
    ],
    reservedBooks: [
        {
            id: 'book3',
            title: 'Computer Networks',
            author: 'Andrew S. Tanenbaum',
            availableDate: 'Oct 18, 2023',
            status: 'pending'
        }
    ],
    recommendations: [
        {
            id: 'rec1',
            title: 'Artificial Intelligence: A Modern Approach',
            author: 'Stuart Russell, Peter Norvig',
            available: true
        },
        {
            id: 'rec2',
            title: 'Clean Code',
            author: 'Robert C. Martin',
            available: false
        }
    ]
};

// Sample data for campus events
const campusEventsData = {
    upcomingEvents: [
        {
            id: 'event1',
            title: 'Tech Career Fair',
            date: 'Oct 28, 2023',
            time: '10:00 AM - 4:00 PM',
            location: 'Student Center, Grand Hall',
            category: 'career',
            registered: false
        },
        {
            id: 'event2',
            title: 'Fall Concert',
            date: 'Nov 5, 2023',
            time: '7:00 PM - 10:00 PM',
            location: 'University Amphitheater',
            category: 'social',
            registered: true
        },
        {
            id: 'event3',
            title: 'Research Symposium',
            date: 'Nov 12, 2023',
            time: '9:00 AM - 5:00 PM',
            location: 'Science Building, Conference Hall',
            category: 'academic',
            registered: false
        }
    ],
    clubs: [
        {
            id: 'club1',
            name: 'Computer Science Club',
            members: 87,
            joined: true,
            meetings: 'Wednesdays, 5:00 PM'
        },
        {
            id: 'club2',
            name: 'Debate Society',
            members: 45,
            joined: false,
            meetings: 'Mondays, 6:00 PM'
        },
        {
            id: 'club3',
            name: 'Photography Club',
            members: 32,
            joined: false,
            meetings: 'Fridays, 4:30 PM'
        }
    ]
};

// Initialize financial management features
function initFinancialManagement() {
    // Get financial section
    const financialSection = document.getElementById('financialSection');
    if (!financialSection) return;
    
    // Create financial dashboard if it doesn't exist
    if (!financialSection.querySelector('.financial-dashboard')) {
        // Create financial dashboard
        const financialDashboard = document.createElement('div');
        financialDashboard.className = 'financial-dashboard';
        
        // Add financial overview card
        const overviewCard = createFinancialOverviewCard();
        financialDashboard.appendChild(overviewCard);
        
        // Add fee breakdown container
        const feeBreakdown = createFeeBreakdownSection();
        financialDashboard.appendChild(feeBreakdown);
        
        // Add payment history
        const paymentHistory = createPaymentHistorySection();
        financialDashboard.appendChild(paymentHistory);
        
        // Add financial aid information
        const financialAid = createFinancialAidSection();
        financialDashboard.appendChild(financialAid);
        
        // Add payment options
        const paymentOptions = createPaymentOptionsSection();
        financialDashboard.appendChild(paymentOptions);
        
        // Append dashboard to section
        financialSection.appendChild(financialDashboard);
        
        // Initialize payment form events
        initPaymentFormEvents();
    }
}

// Create financial overview card
function createFinancialOverviewCard() {
    const card = document.createElement('div');
    card.className = 'financial-overview-card';
    
    // Calculate paid amount and total amount
    const totalAmount = financialData.semesterFees.reduce((total, fee) => total + fee.amount, 0);
    const paidAmount = financialData.semesterFees.reduce((total, fee) => total + fee.paid, 0);
    const remainingAmount = totalAmount - paidAmount;
    const paymentPercentage = Math.round((paidAmount / totalAmount) * 100);
    
    card.innerHTML = `
        <div class="card-header">
            <h2>Financial Overview</h2>
            <div class="semester-label">Fall 2023</div>
        </div>
        <div class="financial-stats">
            <div class="financial-stat">
                <div class="stat-value">$${remainingAmount.toFixed(2)}</div>
                <div class="stat-label">Outstanding Balance</div>
            </div>
            <div class="financial-stat">
                <div class="stat-value">${financialData.dueDate}</div>
                <div class="stat-label">Next Due Date</div>
            </div>
            <div class="financial-stat">
                <div class="stat-value">$${totalAmount.toFixed(2)}</div>
                <div class="stat-label">Total Fees</div>
            </div>
        </div>
        <div class="payment-progress">
            <div class="progress-label">
                <span>Payment Progress</span>
                <span>${paymentPercentage}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${paymentPercentage}%"></div>
            </div>
        </div>
        <div class="quick-actions">
            <button class="btn-primary" id="makePaymentBtn">
                <i class="fas fa-credit-card"></i> Make a Payment
            </button>
            <button class="btn-secondary" id="viewStatementBtn">
                <i class="fas fa-file-invoice-dollar"></i> View Statement
            </button>
        </div>
    `;
    
    return card;
}

// Create fee breakdown section
function createFeeBreakdownSection() {
    const section = document.createElement('div');
    section.className = 'fee-breakdown-section';
    
    section.innerHTML = `
        <div class="section-header">
            <h3>Fee Breakdown</h3>
            <button class="btn-text" id="downloadFeeBtn">
                <i class="fas fa-download"></i> Download
            </button>
        </div>
        <div class="fee-table-container">
            <table class="fee-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Paid</th>
                        <th>Remaining</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${financialData.semesterFees.map(fee => {
                        const remaining = fee.amount - fee.paid;
                        const statusClass = fee.status === 'paid' ? 'paid' : fee.status === 'partially_paid' ? 'partially-paid' : 'unpaid';
                        const statusText = fee.status === 'paid' ? 'Paid' : fee.status === 'partially_paid' ? 'Partially Paid' : 'Unpaid';
                        
                        return `
                            <tr>
                                <td>${fee.description}</td>
                                <td>$${fee.amount.toFixed(2)}</td>
                                <td>$${fee.paid.toFixed(2)}</td>
                                <td>$${remaining.toFixed(2)}</td>
                                <td>${fee.dueDate}</td>
                                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    return section;
}

// Create payment history section
function createPaymentHistorySection() {
    const section = document.createElement('div');
    section.className = 'payment-history-section';
    
    section.innerHTML = `
        <div class="section-header">
            <h3>Payment History</h3>
        </div>
        <div class="payment-history-container">
            ${financialData.paymentHistory.map(payment => `
                <div class="payment-record">
                    <div class="payment-date">${payment.date}</div>
                    <div class="payment-details">
                        <div class="payment-description">${payment.description}</div>
                        <div class="payment-reference">Ref: ${payment.reference}</div>
                    </div>
                    <div class="payment-method">${payment.method}</div>
                    <div class="payment-amount">$${payment.amount.toFixed(2)}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    return section;
}

// Create financial aid section
function createFinancialAidSection() {
    const section = document.createElement('div');
    section.className = 'financial-aid-section';
    
    section.innerHTML = `
        <div class="section-header">
            <h3>Financial Aid</h3>
            <button class="btn-text" id="applyAidBtn">
                <i class="fas fa-plus"></i> Apply for Aid
            </button>
        </div>
        <div class="financial-aid-container">
            ${financialData.financialAid.length > 0 ? 
                financialData.financialAid.map(aid => `
                    <div class="aid-record">
                        <div class="aid-type">${aid.type}</div>
                        <div class="aid-details">
                            <div class="aid-name">${aid.name}</div>
                            <div class="aid-status">Status: ${aid.status}</div>
                        </div>
                        <div class="aid-date">Disbursement: ${aid.disbursementDate}</div>
                        <div class="aid-amount">$${aid.amount.toFixed(2)}</div>
                    </div>
                `).join('') : 
                `<div class="empty-state">
                    <i class="fas fa-hand-holding-usd"></i>
                    <p>No financial aid information available. Click "Apply for Aid" to explore options.</p>
                </div>`
            }
        </div>
    `;
    
    return section;
}

// Create payment options section
function createPaymentOptionsSection() {
    const section = document.createElement('div');
    section.className = 'payment-options-section';
    
    section.innerHTML = `
        <div class="section-header">
            <h3>Payment Options</h3>
        </div>
        <div class="payment-options-container">
            <div class="payment-option-card">
                <div class="option-icon"><i class="fas fa-credit-card"></i></div>
                <h4>Credit/Debit Card</h4>
                <p>Pay securely with your card. No additional fees.</p>
                <button class="btn-option" data-method="card">Pay with Card</button>
            </div>
            <div class="payment-option-card">
                <div class="option-icon"><i class="fas fa-university"></i></div>
                <h4>Bank Transfer</h4>
                <p>Direct transfer from your bank account.</p>
                <button class="btn-option" data-method="bank">Bank Transfer</button>
            </div>
            <div class="payment-option-card">
                <div class="option-icon"><i class="fas fa-money-check-alt"></i></div>
                <h4>Payment Plan</h4>
                <p>Divide your payments across the semester.</p>
                <button class="btn-option" data-method="plan">Setup Plan</button>
            </div>
        </div>
        
        <!-- Payment Form (hidden by default) -->
        <div class="payment-form-container" id="paymentFormContainer" style="display: none;">
            <div class="payment-form-header">
                <h3>Make a Payment</h3>
                <button class="form-close" id="closePaymentForm">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form id="paymentForm" class="payment-form">
                <div class="form-group">
                    <label for="paymentAmount">Payment Amount ($)</label>
                    <input type="number" id="paymentAmount" class="form-control" value="${financialData.currentBalance.toFixed(2)}" step="0.01" min="1" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="cardNumber">Card Number</label>
                        <input type="text" id="cardNumber" class="form-control" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="form-group">
                        <label for="cardExpiry">Expiry Date</label>
                        <input type="text" id="cardExpiry" class="form-control" placeholder="MM/YY" required>
                    </div>
                    <div class="form-group">
                        <label for="cardCvv">CVV</label>
                        <input type="text" id="cardCvv" class="form-control" placeholder="123" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="cardName">Name on Card</label>
                    <input type="text" id="cardName" class="form-control" placeholder="John Doe" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" id="cancelPayment">Cancel</button>
                    <button type="submit" class="btn-primary" id="submitPayment">Process Payment</button>
                </div>
            </form>
        </div>
    `;
    
    return section;
}

// Initialize payment form events
function initPaymentFormEvents() {
    // Event delegation for payment buttons
    document.addEventListener('click', function(e) {
        // Make payment button in overview card
        if (e.target.id === 'makePaymentBtn' || e.target.closest('#makePaymentBtn')) {
            showPaymentForm();
        }
        // View statement button
        else if (e.target.id === 'viewStatementBtn' || e.target.closest('#viewStatementBtn')) {
            showFinancialStatement();
        }
        // Download fee button
        else if (e.target.id === 'downloadFeeBtn' || e.target.closest('#downloadFeeBtn')) {
            downloadFeeBreakdown();
        }
        // Apply for aid button
        else if (e.target.id === 'applyAidBtn' || e.target.closest('#applyAidBtn')) {
            showFinancialAidApplication();
        }
        // Payment option buttons
        else if (e.target.classList.contains('btn-option') || e.target.closest('.btn-option')) {
            const button = e.target.classList.contains('btn-option') ? e.target : e.target.closest('.btn-option');
            const method = button.getAttribute('data-method');
            showPaymentForm(method);
        }
        // Close payment form
        else if (e.target.id === 'closePaymentForm' || e.target.closest('#closePaymentForm') || 
                 e.target.id === 'cancelPayment') {
            hidePaymentForm();
        }
    });
    
    // Payment form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processPayment();
        });
    }
}

// Show payment form
function showPaymentForm(method = 'card') {
    const container = document.getElementById('paymentFormContainer');
    if (container) {
        container.style.display = 'block';
        
        // Scroll to the form
        container.scrollIntoView({ behavior: 'smooth' });
        
        // Set focus on the amount field
        const amountInput = document.getElementById('paymentAmount');
        if (amountInput) {
            setTimeout(() => {
                amountInput.focus();
            }, 300);
        }
    }
}

// Hide payment form
function hidePaymentForm() {
    const container = document.getElementById('paymentFormContainer');
    if (container) {
        container.style.display = 'none';
    }
}

// Process payment
function processPayment() {
    // Get payment amount
    const amountInput = document.getElementById('paymentAmount');
    const amount = amountInput ? parseFloat(amountInput.value) : 0;
    
    if (amount <= 0) {
        showNotification('Please enter a valid payment amount', 'error');
        return;
    }
    
    // Simulate payment processing
    showNotification('Processing payment...', 'info');
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Hide the form
        hidePaymentForm();
        
        // Show success message
        showNotification(`Payment of $${amount.toFixed(2)} processed successfully!`, 'success');
        
        // Update UI with new payment
        updatePaymentUI(amount);
    }, 1500);
}

// Update UI after payment
function updatePaymentUI(amount) {
    // In a real app, we would fetch updated data from the server
    // For this demo, we'll just update the current data
    
    // Add to payment history
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const newPayment = {
        id: 'pay' + (financialData.paymentHistory.length + 1),
        date: dateStr,
        amount: amount,
        method: 'Credit Card',
        description: 'Tuition Payment',
        reference: 'TRX-' + today.getTime().toString().substring(0, 10)
    };
    
    // Update data
    financialData.paymentHistory.unshift(newPayment);
    financialData.currentBalance -= amount;
    
    // Apply payment to fees (starting with oldest unpaid)
    let remainingAmount = amount;
    financialData.semesterFees.forEach(fee => {
        const unpaidAmount = fee.amount - fee.paid;
        if (unpaidAmount > 0 && remainingAmount > 0) {
            const paymentToApply = Math.min(unpaidAmount, remainingAmount);
            fee.paid += paymentToApply;
            remainingAmount -= paymentToApply;
            
            // Update status
            if (fee.paid >= fee.amount) {
                fee.status = 'paid';
            } else if (fee.paid > 0) {
                fee.status = 'partially_paid';
            }
        }
    });
    
    // Refresh the financial management section
    initFinancialManagement();
}

// Show financial statement
function showFinancialStatement() {
    // Create content for the statement
    const content = document.createElement('div');
    content.className = 'financial-statement';
    
    // Calculate totals
    const totalAmount = financialData.semesterFees.reduce((total, fee) => total + fee.amount, 0);
    const paidAmount = financialData.semesterFees.reduce((total, fee) => total + fee.paid, 0);
    const remainingAmount = totalAmount - paidAmount;
    
    content.innerHTML = `
        <div class="statement-header">
            <div class="university-logo">
                <i class="fas fa-university"></i>
                <h2>University Hub</h2>
            </div>
            <div class="statement-title">
                <h1>Financial Statement</h1>
                <p>Fall Semester 2023</p>
            </div>
        </div>
        
        <div class="student-info">
            <div class="info-group">
                <label>Student ID:</label>
                <span>STU002</span>
            </div>
            <div class="info-group">
                <label>Name:</label>
                <span>Jane Smith</span>
            </div>
            <div class="info-group">
                <label>Program:</label>
                <span>Computer Science</span>
            </div>
            <div class="info-group">
                <label>Issue Date:</label>
                <span>${new Date().toLocaleDateString()}</span>
            </div>
        </div>
        
        <table class="statement-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Remaining</th>
                    <th>Due Date</th>
                </tr>
            </thead>
            <tbody>
                ${financialData.semesterFees.map(fee => `
                    <tr>
                        <td>${fee.description}</td>
                        <td>$${fee.amount.toFixed(2)}</td>
                        <td>$${fee.paid.toFixed(2)}</td>
                        <td>$${(fee.amount - fee.paid).toFixed(2)}</td>
                        <td>${fee.dueDate}</td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>$${totalAmount.toFixed(2)}</strong></td>
                    <td><strong>$${paidAmount.toFixed(2)}</strong></td>
                    <td><strong>$${remainingAmount.toFixed(2)}</strong></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        
        <div class="statement-summary">
            <h3>Payment History</h3>
            <table class="payment-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Method</th>
                        <th>Reference</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${financialData.paymentHistory.map(payment => `
                        <tr>
                            <td>${payment.date}</td>
                            <td>${payment.description}</td>
                            <td>${payment.method}</td>
                            <td>${payment.reference}</td>
                            <td>$${payment.amount.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="statement-footer">
            <p>For any questions regarding this statement, please contact the Bursar's Office at bursar@university.edu or (555) 123-4567.</p>
            <div class="statement-actions">
                <button class="btn-primary" id="printStatement">
                    <i class="fas fa-print"></i> Print Statement
                </button>
                <button class="btn-secondary" id="downloadStatement">
                    <i class="fas fa-download"></i> Download PDF
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const printButton = content.querySelector('#printStatement');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }
    
    const downloadButton = content.querySelector('#downloadStatement');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            showNotification('Statement downloaded successfully!', 'success');
        });
    }
    
    // Show the content in a sliding panel
    openSlidingPanel('Financial Statement', content);
}

// Download fee breakdown
function downloadFeeBreakdown() {
    showNotification('Fee breakdown downloaded successfully!', 'success');
}

// Show financial aid application
function showFinancialAidApplication() {
    // Create content for the application
    const content = document.createElement('div');
    content.className = 'financial-aid-application';
    
    content.innerHTML = `
        <div class="application-header">
            <h2>Financial Aid Application</h2>
            <p>Complete the form below to apply for financial assistance.</p>
        </div>
        
        <form id="aidApplicationForm" class="aid-form">
            <div class="form-section">
                <h3>Personal Information</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="studentName">Full Name</label>
                        <input type="text" id="studentName" class="form-control" value="Jane Smith" readonly>
                    </div>
                    <div class="form-group">
                        <label for="studentId">Student ID</label>
                        <input type="text" id="studentId" class="form-control" value="STU002" readonly>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="studentEmail">Email</label>
                        <input type="email" id="studentEmail" class="form-control" value="jane.smith@university.edu" readonly>
                    </div>
                    <div class="form-group">
                        <label for="studentPhone">Phone Number</label>
                        <input type="tel" id="studentPhone" class="form-control" placeholder="(555) 123-4567" required>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>Aid Type</h3>
                <div class="form-group">
                    <label>Select the type of aid you are applying for:</label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="aidType" value="scholarship" checked>
                            Scholarship
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="aidType" value="grant">
                            Grant
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="aidType" value="loan">
                            Student Loan
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="aidType" value="workStudy">
                            Work-Study Program
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>Financial Information</h3>
                <div class="form-group">
                    <label for="householdIncome">Annual Household Income</label>
                    <select id="householdIncome" class="form-control" required>
                        <option value="">Select income range</option>
                        <option value="under30k">Under $30,000</option>
                        <option value="30k-50k">$30,000 - $50,000</option>
                        <option value="50k-70k">$50,000 - $70,000</option>
                        <option value="70k-100k">$70,000 - $100,000</option>
                        <option value="over100k">Over $100,000</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="dependents">Number of Dependents in Household</label>
                    <input type="number" id="dependents" class="form-control" min="0" required>
                </div>
                <div class="form-group">
                    <label for="otherAid">Are you receiving any other financial aid?</label>
                    <div class="radio-group inline">
                        <label class="radio-label">
                            <input type="radio" name="otherAid" value="yes">
                            Yes
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="otherAid" value="no" checked>
                            No
                        </label>
                    </div>
                </div>
                <div class="form-group" id="otherAidDetails" style="display: none;">
                    <label for="aidDetails">Please provide details about other aid:</label>
                    <textarea id="aidDetails" class="form-control" rows="3"></textarea>
                </div>
            </div>
            
            <div class="form-section">
                <h3>Personal Statement</h3>
                <div class="form-group">
                    <label for="personalStatement">Please explain why you are applying for financial aid and how it will help you achieve your academic goals. (300-500 words)</label>
                    <textarea id="personalStatement" class="form-control" rows="6" required></textarea>
                    <div class="character-count">0/500 words</div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>Document Upload</h3>
                <div class="form-group">
                    <label>Please upload supporting documents:</label>
                    <div class="file-upload">
                        <input type="file" id="financialDocuments" multiple>
                        <label for="financialDocuments" class="file-upload-label">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span>Drag files here or click to browse</span>
                        </label>
                    </div>
                    <div class="upload-help">
                        <p>Accepted formats: PDF, JPG, PNG (Max 5MB each)</p>
                        <p>Required documents: Tax returns, proof of income, and other relevant financial information.</p>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn-secondary" id="cancelAidApplication">Cancel</button>
                <button type="submit" class="btn-primary">Submit Application</button>
            </div>
        </form>
    `;
    
    // Add event listeners
    const form = content.querySelector('#aidApplicationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Close the panel
            document.querySelector('.sliding-panel').classList.remove('active');
            document.body.classList.remove('panel-open');
            
            // Show success message
            showNotification('Financial aid application submitted successfully!', 'success');
        });
    }
    
    const cancelButton = content.querySelector('#cancelAidApplication');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            // Close the panel
            document.querySelector('.sliding-panel').classList.remove('active');
            document.body.classList.remove('panel-open');
        });
    }
    
    // Toggle other aid details
    const otherAidRadios = content.querySelectorAll('input[name="otherAid"]');
    const otherAidDetails = content.querySelector('#otherAidDetails');
    
    otherAidRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'yes') {
                otherAidDetails.style.display = 'block';
            } else {
                otherAidDetails.style.display = 'none';
            }
        });
    });
    
    // Add word counter for personal statement
    const personalStatement = content.querySelector('#personalStatement');
    const characterCount = content.querySelector('.character-count');
    
    if (personalStatement && characterCount) {
        personalStatement.addEventListener('input', () => {
            const words = personalStatement.value.trim().split(/\s+/).filter(Boolean).length;
            characterCount.textContent = `${words}/500 words`;
            
            if (words > 500) {
                characterCount.classList.add('error');
            } else {
                characterCount.classList.remove('error');
            }
        });
    }
    
    // Show the content in a sliding panel
    openSlidingPanel('Financial Aid Application', content);
}

// Initialize library & resources features
function initLibraryResources() {
    const section = document.getElementById('librarySection');
    if (!section) return;
    if (section.querySelector('.library-dashboard')) return;

    const dashboard = document.createElement('div');
    dashboard.className = 'library-dashboard';
    dashboard.innerHTML = `
        <div class="section-header"><h2>Library & Digital Resources</h2></div>
        <div class="library-cards">
            <div class="library-card">
                <h3>Borrowed Books</h3>
                <ul class="borrowed-books-list">
                    ${libraryData.borrowedBooks.map(book => `
                        <li>
                            <strong>${book.title}</strong> by ${book.author}<br>
                            Due: ${book.dueDate} ${book.renewable ? `<button class='btn-renew' data-id='${book.id}'>Renew</button>` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="library-card">
                <h3>Reserved Books</h3>
                <ul class="reserved-books-list">
                    ${libraryData.reservedBooks.length ? libraryData.reservedBooks.map(book => `
                        <li>
                            <strong>${book.title}</strong> by ${book.author}<br>
                            Available: ${book.availableDate} (${book.status})
                        </li>
                    `).join('') : '<li>No reserved books.</li>'}
                </ul>
            </div>
            <div class="library-card">
                <h3>Recommendations</h3>
                <ul class="recommendations-list">
                    ${libraryData.recommendations.map(rec => `
                        <li>
                            <strong>${rec.title}</strong> by ${rec.author} ${rec.available ? '<span class="available">Available</span>' : '<span class="unavailable">Unavailable</span>'}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
        <div class="library-actions">
            <button class="btn-primary" id="searchLibraryBtn"><i class="fas fa-search"></i> Search Library Catalog</button>
            <button class="btn-secondary" id="reserveBookBtn"><i class="fas fa-bookmark"></i> Reserve a Book</button>
        </div>
    `;
    section.appendChild(dashboard);

    // Add event listeners for renew buttons
    section.querySelectorAll('.btn-renew').forEach(btn => {
        btn.addEventListener('click', e => {
            showNotification('Book renewed successfully!', 'success');
        });
    });
    // Search and reserve actions
    section.querySelector('#searchLibraryBtn').addEventListener('click', () => {
        showNotification('Library search coming soon!', 'info');
    });
    section.querySelector('#reserveBookBtn').addEventListener('click', () => {
        showNotification('Book reservation coming soon!', 'info');
    });
}

// Initialize campus life features
function initCampusLife() {
    const section = document.getElementById('campusLifeSection');
    if (!section) return;
    if (section.querySelector('.campus-life-dashboard')) return;

    const dashboard = document.createElement('div');
    dashboard.className = 'campus-life-dashboard';
    dashboard.innerHTML = `
        <div class="section-header"><h2>Campus Life & Events</h2></div>
        <div class="events-list">
            <h3>Upcoming Events</h3>
            <ul>
                ${campusEventsData.upcomingEvents.map(event => `
                    <li>
                        <strong>${event.title}</strong> - ${event.date} (${event.time})<br>
                        Location: ${event.location}<br>
                        <button class="btn-event-register" data-id="${event.id}" ${event.registered ? 'disabled' : ''}>${event.registered ? 'Registered' : 'Register'}</button>
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="clubs-list">
            <h3>Student Clubs</h3>
            <ul>
                ${campusEventsData.clubs.map(club => `
                    <li>
                        <strong>${club.name}</strong> (${club.members} members)<br>
                        Meetings: ${club.meetings}<br>
                        <button class="btn-club-join" data-id="${club.id}" ${club.joined ? 'disabled' : ''}>${club.joined ? 'Joined' : 'Join'}</button>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    section.appendChild(dashboard);

    // Register event listeners
    section.querySelectorAll('.btn-event-register').forEach(btn => {
        btn.addEventListener('click', e => {
            btn.textContent = 'Registered';
            btn.disabled = true;
            showNotification('Event registration successful!', 'success');
        });
    });
    section.querySelectorAll('.btn-club-join').forEach(btn => {
        btn.addEventListener('click', e => {
            btn.textContent = 'Joined';
            btn.disabled = true;
            showNotification('Club joined successfully!', 'success');
        });
    });
}

// Initialize communication tools
function initCommunicationTools() {
    const section = document.getElementById('communicationSection');
    if (!section) return;
    if (section.querySelector('.communication-dashboard')) return;

    const dashboard = document.createElement('div');
    dashboard.className = 'communication-dashboard';
    dashboard.innerHTML = `
        <div class="section-header"><h2>Communication Tools</h2></div>
        <div class="comm-actions">
            <button class="btn-primary" id="msgProfessorBtn"><i class="fas fa-envelope"></i> Message Professor</button>
            <button class="btn-secondary" id="studentForumBtn"><i class="fas fa-comments"></i> Student Forum</button>
            <button class="btn-secondary" id="studyGroupBtn"><i class="fas fa-users"></i> Study Group</button>
        </div>
        <div class="comm-history">
            <h3>Recent Messages</h3>
            <ul>
                <li><strong>Prof. Williams:</strong> Please review the assignment feedback I posted.</li>
                <li><strong>CS Club:</strong> Meeting this Wednesday at 5:00 PM in Room 101.</li>
            </ul>
        </div>
    `;
    section.appendChild(dashboard);
    section.querySelector('#msgProfessorBtn').addEventListener('click', () => {
        showNotification('Messaging professor feature coming soon!', 'info');
    });
    section.querySelector('#studentForumBtn').addEventListener('click', () => {
        showNotification('Student forum coming soon!', 'info');
    });
    section.querySelector('#studyGroupBtn').addEventListener('click', () => {
        showNotification('Study group feature coming soon!', 'info');
    });
}

// Initialize advanced academic features
function initAdvancedAcademics() {
    const section = document.getElementById('advancedAcademicsSection');
    if (!section) return;
    if (section.querySelector('.advanced-academics-dashboard')) return;

    const dashboard = document.createElement('div');
    dashboard.className = 'advanced-academics-dashboard';
    dashboard.innerHTML = `
        <div class="section-header"><h2>Advanced Academic Tools</h2></div>
        <div class="advanced-actions">
            <button class="btn-primary" id="transcriptBtn"><i class="fas fa-file-alt"></i> Generate Transcript</button>
            <button class="btn-secondary" id="reportCardBtn"><i class="fas fa-chart-line"></i> Semester Report Card</button>
            <button class="btn-secondary" id="analyticsBtn"><i class="fas fa-chart-pie"></i> Performance Analytics</button>
        </div>
        <div class="advanced-info">
            <h3>Academic Standing</h3>
            <p>Status: <span class="status-good">Good Standing</span></p>
            <h3>Degree Progress</h3>
            <div class="progress-bar-container">
                <div class="progress-bar"><div class="progress-fill" style="width: 70%"></div></div>
                <div class="progress-label">70% completed</div>
            </div>
        </div>
    `;
    section.appendChild(dashboard);
    section.querySelector('#transcriptBtn').addEventListener('click', () => {
        showNotification('Transcript generation coming soon!', 'info');
    });
    section.querySelector('#reportCardBtn').addEventListener('click', () => {
        showNotification('Report card feature coming soon!', 'info');
    });
    section.querySelector('#analyticsBtn').addEventListener('click', () => {
        showNotification('Performance analytics coming soon!', 'info');
    });
}

// Messages Section
window.loadMessagesSection = function() {
    const section = document.getElementById('messagesSection');
    if (!section) return;
    section.innerHTML = '';
    
    // Header and compose button
    const header = document.createElement('div');
    header.className = 'messages-header';
    header.innerHTML = `
        <h2 class="section-title">Messages</h2>
        <button class="btn-primary" id="composeMsgBtn"><i class="fas fa-edit"></i> Compose</button>
    `;
    section.appendChild(header);
    
    // Message list
    const messages = [
        { id: 1, from: 'Prof. Williams', subject: 'Assignment Feedback', date: '2024-06-01', snippet: 'Please review the feedback...' },
        { id: 2, from: 'Registrar', subject: 'Registration Reminder', date: '2024-05-28', snippet: 'Course registration opens next week.' },
        { id: 3, from: 'CS Club', subject: 'Club Meeting', date: '2024-05-25', snippet: 'Join us for our next meeting...' }
    ];
    const msgList = document.createElement('ul');
    msgList.className = 'messages-list';
    messages.forEach(msg => {
        const li = document.createElement('li');
        li.className = 'message-item';
        li.innerHTML = `
            <div class="msg-from">${msg.from}</div>
            <div class="msg-subject">${msg.subject}</div>
            <div class="msg-date">${msg.date}</div>
            <div class="msg-snippet">${msg.snippet}</div>
            <button class="btn-view-msg" data-id="${msg.id}"><i class="fas fa-eye"></i> View</button>
        `;
        msgList.appendChild(li);
    });
    section.appendChild(msgList);
    // Compose button event
    section.querySelector('#composeMsgBtn').onclick = () => openComposeMsgPanel();
    // View message event
    section.querySelectorAll('.btn-view-msg').forEach(btn => {
        btn.onclick = (e) => {
            const id = Number(btn.dataset.id);
            const msg = messages.find(m => m.id === id);
            openMsgDetailPanel(msg);
        };
    });
    // Compose panel
    function openComposeMsgPanel() {
        const content = document.createElement('div');
        content.innerHTML = `
            <h2>Compose Message</h2>
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
        `;
        content.querySelector('#composeMsgForm').onsubmit = (e) => {
            e.preventDefault();
            showNotification('Message sent!', 'success');
            document.querySelector('.sliding-panel').classList.remove('active');
            document.body.classList.remove('panel-open');
        };
        openSlidingPanel('Compose Message', content);
    }
    // Message detail panel
    function openMsgDetailPanel(msg) {
        const content = document.createElement('div');
        content.innerHTML = `
            <h2>${msg.subject}</h2>
            <div><strong>From:</strong> ${msg.from}</div>
            <div><strong>Date:</strong> ${msg.date}</div>
            <div class="msg-body">${msg.snippet} (Full message...)</div>
        `;
        openSlidingPanel('Message Details', content);
    }
};

// Resources Section
window.loadResourcesSection = function() {
    const section = document.getElementById('resourcesSection');
    if (!section) return;
    section.innerHTML = '';
    // Header
    const header = document.createElement('div');
    header.className = 'resources-header';
    header.innerHTML = `<h2 class="section-title">Resources</h2>`;
    section.appendChild(header);
    // Resource list
    const resources = [
        { id: 1, name: 'CS101 Syllabus', type: 'PDF', link: '#', desc: 'Course outline and policies.' },
        { id: 2, name: 'Library Portal', type: 'Link', link: '#', desc: 'Access digital library.' },
        { id: 3, name: 'Research Paper Template', type: 'DOCX', link: '#', desc: 'Template for academic papers.' }
    ];
    const resList = document.createElement('ul');
    resList.className = 'resources-list';
    resources.forEach(res => {
        const li = document.createElement('li');
        li.className = 'resource-item';
        li.innerHTML = `
            <div class="res-name">${res.name}</div>
            <div class="res-type">${res.type}</div>
            <div class="res-desc">${res.desc}</div>
            <button class="btn-download-res" data-link="${res.link}"><i class="fas fa-download"></i> Download</button>
        `;
        resList.appendChild(li);
    });
    section.appendChild(resList);
    // Download event
    section.querySelectorAll('.btn-download-res').forEach(btn => {
        btn.onclick = (e) => {
            showNotification('Download started!', 'info');
        };
    });
};

// Settings Section
window.loadSettingsSection = function() {
    const section = document.getElementById('settingsSection');
    if (!section) return;
    section.innerHTML = '';
    // Header
    const header = document.createElement('div');
    header.className = 'settings-header';
    header.innerHTML = `<h2 class="section-title">Settings</h2>`;
    section.appendChild(header);
    // Settings form
    const form = document.createElement('form');
    form.className = 'settings-form';
    form.innerHTML = `
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" value="Jane Smith" />
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" value="jane.smith@university.edu" />
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" value="" placeholder="Change password" />
        </div>
        <div class="form-group">
            <label>Notification Preferences</label>
            <select class="form-control">
                <option selected>Email & SMS</option>
                <option>Email Only</option>
                <option>SMS Only</option>
                <option>None</option>
            </select>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn-primary">Save Changes</button>
        </div>
    `;
    form.onsubmit = (e) => {
        e.preventDefault();
        showNotification('Settings saved!', 'success');
    };
    section.appendChild(form);
}; 