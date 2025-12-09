// Simple Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.init();
    }

    init() {
        this.setupForms();
        this.checkProtectedPages();
    }

    setupForms() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }
    }

    handleLogin() {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Simple validation
        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }

        // Check user credentials
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = { name: user.name, email: user.email };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password');
        }
    }

    handleSignup() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Simple validation
        if (!name || !email || !password) {
            alert('Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Check if user exists
        if (this.users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }

        // Create new user
        const newUser = { name, email, password };
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));

        // Auto login
        this.currentUser = { name, email };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        // Initialize user data
        localStorage.setItem('userData', JSON.stringify({ recentActivity: [] }));

        window.location.href = 'index.html';
    }

    // Check if user can access protected pages
    checkProtectedPages() {
        const protectedPages = ['videos.html', 'tutorials.html']; // About is NOT protected
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage) && !this.currentUser) {
            window.location.href = 'login.html';
        }
        // Note: about.html is NOT in protectedPages, so it's accessible to all
    }
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new AuthSystem();
});