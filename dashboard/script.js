document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Seamless Section Switching & Navigation (Dashboard <-> Subjects) ---
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const dashboardSection = document.getElementById('dashboardSection');
    const subjectsSection = document.getElementById('subjectsSection');

    function switchView(viewName) {
        if (viewName === 'subjects') {
            if (dashboardSection && subjectsSection) {
                dashboardSection.style.display = 'none';
                subjectsSection.style.display = 'block';
                navItems.forEach(el => el.classList.remove('active'));
                const subjNav = document.querySelector('.sidebar-nav .nav-item[data-title="Subjects"]');
                if (subjNav) subjNav.classList.add('active');
                window.location.hash = 'subjects';
                return true;
            } else {
                window.location.href = 'subjects.html';
                return true;
            }
        } else if (viewName === 'dashboard') {
            if (dashboardSection && subjectsSection) {
                subjectsSection.style.display = 'none';
                dashboardSection.style.display = 'block';
                navItems.forEach(el => el.classList.remove('active'));
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

    // Attach click listeners to sidebar navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const title = item.getAttribute('data-title');
            if (title === 'Subjects') {
                e.preventDefault();
                switchView('subjects');
            } else if (title === 'Dashboard') {
                e.preventDefault();
                switchView('dashboard');
            } else {
                const href = item.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('javascript:')) {
                    return; // Normal link navigation
                }
                e.preventDefault();
                navItems.forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // Check URL hash on page load (e.g. dashboard.html#subjects)
    if (window.location.hash === '#subjects') {
        switchView('subjects');
    }

    // Dynamic real-time year
    const yearEl = document.getElementById('academicYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Filter tab toggle for subjects
    const filterTabs = document.querySelectorAll('.filter-tab-btn');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // --- 2. Notification Bell Dropdown Toggle ---
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close profile dropdown if open
            if (profileDropdown) profileDropdown.classList.remove('show');
            
            notificationDropdown.classList.toggle('show');
        });
    }

    // --- 3. Profile Avatar Dropdown Toggle ---
    const profileDropdownBtn = document.getElementById('profileDropdownBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileDropdownBtn && profileDropdown) {
        profileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close notification dropdown if open
            if (notificationDropdown) notificationDropdown.classList.remove('show');
            
            profileDropdown.classList.toggle('show');
        });
    }

    // --- Close dropdowns when clicking outside ---
    document.addEventListener('click', () => {
        if (notificationDropdown) notificationDropdown.classList.remove('show');
        if (profileDropdown) profileDropdown.classList.remove('show');
    });

    // --- 4. Add New Subject Modal Functionality ---
    const quickAddBtn = document.getElementById('quickAddBtn');
    const quickAddModal = document.getElementById('quickAddModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const addSubjectForm = document.getElementById('addSubjectForm');

    function openSubjectModal() {
        if (quickAddModal) {
            quickAddModal.classList.add('show');
            const firstInput = document.getElementById('subjectName');
            if (firstInput) setTimeout(() => firstInput.focus(), 100);
        }
    }

    function closeSubjectModal() {
        if (quickAddModal) {
            quickAddModal.classList.remove('show');
            if (addSubjectForm) addSubjectForm.reset();
        }
    }

    window.openSubjectModal = openSubjectModal;
    window.closeSubjectModal = closeSubjectModal;

    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', openSubjectModal);
    }

    const openAddSubjectBtn = document.getElementById('openAddSubjectBtn');
    if (openAddSubjectBtn) {
        openAddSubjectBtn.addEventListener('click', openSubjectModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeSubjectModal);
    }

    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeSubjectModal);
    }

    // Close on backdrop click
    if (quickAddModal) {
        quickAddModal.addEventListener('click', (e) => {
            if (e.target === quickAddModal) {
                closeSubjectModal();
            }
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quickAddModal && quickAddModal.classList.contains('show')) {
            closeSubjectModal();
        }
    });

    // Handle Add Subject Form Submit
    if (addSubjectForm) {
        addSubjectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const countEl = document.getElementById('countSubjects');
            if (countEl) {
                countEl.textContent = parseInt(countEl.textContent || '0', 10) + 1;
            }
            closeSubjectModal();
        });
    }

    // --- 5. Global Search Input Interaction ---
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log(`Searching for: ${globalSearch.value.trim()}`);
            }
        });
    }

});