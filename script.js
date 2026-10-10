document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchAlert = document.getElementById('searchAlert');
    const menuToggle = document.getElementById('menuToggle');
    const wikiSidebar = document.getElementById('wikiSidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    // Mobile sidebar drawer: hamburger opens it, backdrop/outside click closes it
    function openSidebar() {
        if (wikiSidebar) wikiSidebar.classList.add('sidebar-open');
        if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    }
    function closeSidebar() {
        if (wikiSidebar) wikiSidebar.classList.remove('sidebar-open');
        if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    }
    if (menuToggle && wikiSidebar) {
        menuToggle.addEventListener('click', () => {
            if (wikiSidebar.classList.contains('sidebar-open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }
    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', closeSidebar);
    }
    // Close the drawer automatically if the screen is resized back to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeSidebar();
    });

    // Modal உள்ளே Login ചെയ്യുന്ന Form-ഉം Error Message காட்டுவதற்கான Element-ഉം സെറ്റ് ചെയ്യുക
    const modalBox = document.querySelector('.modal-box');
    
    // Error message-നുള്ള div അല്ലെങ്കിൽ paragraph ഡൈനാമിക് ആയി ക്രിയേറ്റ് ചെയ്യുന്നു
    let errorMsg = document.getElementById('loginErrorMsg');
    if (!errorMsg) {
        errorMsg = document.createElement('p');
        errorMsg.id = 'loginErrorMsg';
        errorMsg.style.color = '#d33';
        errorMsg.style.fontSize = '12px';
        errorMsg.style.marginBottom = '10px';
        errorMsg.style.display = 'none';
        // Password input-ന് തൊട്ടുമുകളിലായി ചേർക്കുന്നു
        const passwordInput = modalBox.querySelectorAll('.modal-input')[1];
        modalBox.insertBefore(errorMsg, passwordInput);
    }

    // Open modal on Login click
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            if(searchAlert) searchAlert.style.display = 'none';
            if(errorMsg) errorMsg.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }

    // Close modal
    if (closeModal && loginModal) {
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    // Close when clicking outside the modal box
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Redirect any search input submission to Login Modal
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            if (searchInput.value.trim() !== "") {
                searchInput.value = ""; 
            }
            if (searchAlert) searchAlert.style.display = 'block'; 
            if (errorMsg) errorMsg.style.display = 'none';
            if (loginModal) loginModal.style.display = 'flex'; 
        });
    }

    // Handle Login Button Click inside Modal -> Show Incorrect Password Error
    const modalLoginBtn = modalBox.querySelector('.wiki-btn');
    if (modalLoginBtn) {
        modalLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // പാസ്‌വേർഡ് തെറ്റാണെന്ന മെസ്സേജ് കാണിക്കുക
            errorMsg.textContent = "Password was incorrect, please try again.";
            errorMsg.style.display = 'block';
        });
    }
});