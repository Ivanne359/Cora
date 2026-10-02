document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sidebar Navigation Active State Toggle ---
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
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

    // --- 4. Quick Add (+) Modal Functionality ---
    const quickAddBtn = document.getElementById('quickAddBtn');
    const quickAddModal = document.getElementById('quickAddModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (quickAddBtn && quickAddModal) {
        quickAddBtn.addEventListener('click', () => {
            quickAddModal.classList.add('show');
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                quickAddModal.classList.remove('show');
            });
        }

        // Close on background click
        quickAddModal.addEventListener('click', (e) => {
            if (e.target === quickAddModal) {
                quickAddModal.classList.remove('show');
            }
        });

        // Quick Action Buttons click handler
        const actionButtons = quickAddModal.querySelectorAll('.quick-action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                if (action === 'subject') {
                    const countEl = document.getElementById('countSubjects');
                    if (countEl) countEl.textContent = parseInt(countEl.textContent || '0', 10) + 1;
                } else if (action === 'note') {
                    const countEl = document.getElementById('countNotes');
                    if (countEl) countEl.textContent = parseInt(countEl.textContent || '0', 10) + 1;
                    const notesBody = document.querySelector('.notes-body');
                    if (notesBody) {
                        notesBody.innerHTML = `
                            <div style="padding: 10px 0; border-bottom: 1px solid #ECEFF3;">
                                <h4 style="font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 4px;">Sample Research Note</h4>
                                <p style="font-size: 12px; color: #6B7280;">Centralized academic notes and lesson summary.</p>
                            </div>
                        `;
                    }
                } else if (action === 'task') {
                    const countEl = document.getElementById('countTasks');
                    if (countEl) countEl.textContent = parseInt(countEl.textContent || '0', 10) + 1;
                }
                quickAddModal.classList.remove('show');
            });
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