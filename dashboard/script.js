/**
 * ==========================================================================
 * CORA ACADEMIC WORKSPACE - DASHBOARD JAVASCRIPT
 * ==========================================================================
 * Clear, modular, and easy-to-read script for Cora Workspace.
 * 
 * MODULES:
 * 1. View Navigation & Screen Switcher (Dashboard <-> Subjects)
 * 2. Header Dropdowns (Notifications & Profile)
 * 3. Add New Subject Modal (Open, Close, Form Submit)
 * 4. Filter Tabs & Dynamic Real-Time Year
 * 5. Global Search Handler
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. VIEW NAVIGATION & SCREEN SWITCHER
       Handles switching between Dashboard Overview and Subjects page seamlessly
       ========================================================================== */
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const dashboardSection = document.getElementById('dashboardSection');
    const subjectsSection = document.getElementById('subjectsSection');

    /**
     * Switch the visible workspace screen
     * @param {string} viewName - 'dashboard' or 'subjects'
     */
    function switchView(viewName) {
        if (viewName === 'subjects') {
            if (dashboardSection && subjectsSection) {
                dashboardSection.style.display = 'none';
                subjectsSection.style.display = 'block';
                
                // Update active sidebar pill
                navItems.forEach(item => item.classList.remove('active'));
                const subjNav = document.querySelector('.sidebar-nav .nav-item[data-title="Subjects"]');
                if (subjNav) subjNav.classList.add('active');
                
                window.location.hash = 'subjects';
                return true;
            } else {
                window.location.href = 'subjects.html';
                return true;
            }
        } 
        
        if (viewName === 'dashboard') {
            if (dashboardSection && subjectsSection) {
                subjectsSection.style.display = 'none';
                dashboardSection.style.display = 'block';
                
                // Update active sidebar pill
                navItems.forEach(item => item.classList.remove('active'));
                const dashNav = document.querySelector('.sidebar-nav .nav-item[data-title="Dashboard"]');
                if (dashNav) dashNav.classList.add('active');
                
                window.location.hash = 'dashboard';
                return true;
            } else {
                window.location.href = 'dashboard.html';
                return true;
            }
        }

        return false;
    }

    // Attach click listeners to sidebar links
    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const title = item.getAttribute('data-title');
            
            if (title === 'Subjects') {
                event.preventDefault();
                switchView('subjects');
            } else if (title === 'Dashboard') {
                event.preventDefault();
                switchView('dashboard');
            } else {
                const href = item.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('javascript:')) {
                    return; // Normal external/page navigation
                }
                event.preventDefault();
                navItems.forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // Auto-open Subjects if URL has #subjects on page load
    if (window.location.hash === '#subjects') {
        switchView('subjects');
    }


    /* ==========================================================================
       2. HEADER DROPDOWNS (NOTIFICATIONS & PROFILE)
       ========================================================================== */
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const profileDropdownBtn = document.getElementById('profileDropdownBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    // Toggle Notifications
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (profileDropdown) profileDropdown.classList.remove('show');
            notificationDropdown.classList.toggle('show');
        });
    }

    // Toggle User Profile Menu
    if (profileDropdownBtn && profileDropdown) {
        profileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (notificationDropdown) notificationDropdown.classList.remove('show');
            profileDropdown.classList.toggle('show');
        });
    }

    // Close open dropdowns when clicking anywhere outside
    document.addEventListener('click', () => {
        if (notificationDropdown) notificationDropdown.classList.remove('show');
        if (profileDropdown) profileDropdown.classList.remove('show');
    });


    /* ==========================================================================
       3. ADD NEW SUBJECT MODAL
       ========================================================================== */
    const quickAddBtn = document.getElementById('quickAddBtn');
    const openAddSubjectBtn = document.getElementById('openAddSubjectBtn');
    const quickAddModal = document.getElementById('quickAddModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const addSubjectForm = document.getElementById('addSubjectForm');

    // Open Modal
    function openSubjectModal() {
        if (quickAddModal) {
            quickAddModal.classList.add('show');
            const firstInput = document.getElementById('subjectName');
            if (firstInput) setTimeout(() => firstInput.focus(), 80);
        }
    }

    // Close Modal and Reset Input Form
    function closeSubjectModal() {
        if (quickAddModal) {
            quickAddModal.classList.remove('show');
            if (addSubjectForm) addSubjectForm.reset();
        }
    }

    // Expose functions globally for cross-element triggers
    window.openSubjectModal = openSubjectModal;
    window.closeSubjectModal = closeSubjectModal;

    // Attach open triggers
    if (quickAddBtn) quickAddBtn.addEventListener('click', openSubjectModal);
    if (openAddSubjectBtn) openAddSubjectBtn.addEventListener('click', openSubjectModal);

    // Attach close triggers (X button and Cancel text button)
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeSubjectModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeSubjectModal);

    // Close when clicking on the dimmed backdrop
    if (quickAddModal) {
        quickAddModal.addEventListener('click', (e) => {
            if (e.target === quickAddModal) closeSubjectModal();
        });
    }

    // Close when pressing the ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quickAddModal && quickAddModal.classList.contains('show')) {
            closeSubjectModal();
        }
    });

    // Handle Form Submission: Increment total subjects & close
    if (addSubjectForm) {
        addSubjectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const countEl = document.getElementById('countSubjects');
            if (countEl) {
                const currentCount = parseInt(countEl.textContent || '0', 10);
                countEl.textContent = currentCount + 1;
            }
            closeSubjectModal();
        });
    }


    /* ==========================================================================
       4. FILTER TABS & DYNAMIC REAL-TIME YEAR
       ========================================================================== */
    // Set dynamic current year in subtitles (e.g. "Spring 2026")
    const yearEl = document.getElementById('academicYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Filter pill tabs (All, Active, Completed)
    const filterTabs = document.querySelectorAll('.filter-tab-btn');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });


    /* ==========================================================================
       5. GLOBAL SEARCH HANDLER
       ========================================================================== */
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log(`[Search query]: ${globalSearch.value.trim()}`);
            }
        });
    }

});