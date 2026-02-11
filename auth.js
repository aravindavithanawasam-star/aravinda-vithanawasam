// auth.js

class AuthenticationManager {
    constructor() {
        this.loginForm = document.getElementById('login-form');
        this.registerForm = document.getElementById('register-form');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }

    validateEmail(email) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 8;
    }

    validatePhoneNumber(phone) {
        const phoneRegex = /^\\d{10}$/;
        return phoneRegex.test(phone.replace(/\\D/g, ''));
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = this.loginForm.querySelector('input[type="email"]').value;
        const password = this.loginForm.querySelector('input[type="password"]').value;
        const messageDiv = this.loginForm.querySelector('.form-message');

        if (!this.validateEmail(email)) {
            this.showMessage(messageDiv, 'Invalid email format', 'error');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                this.showMessage(messageDiv, 'Login successful! Redirecting...', 'success');
                
                setTimeout(() => {
                    window.location.href = '/dashboard.html';
                }, 2000);
            } else {
                this.showMessage(messageDiv, data.message || 'Login failed', 'error');
            }
        } catch (error) {
            this.showMessage(messageDiv, 'Error: ' + error.message, 'error');
        }
    }

    async handleRegister(e) {
        e.preventDefault();

        const fullName = this.registerForm.querySelector('input[type="text"]').value;
        const email = this.registerForm.querySelectorAll('input[type="email"]')[0].value;
        const password = this.registerForm.querySelectorAll('input[type="password"][0]').value;
        const confirmPassword = this.registerForm.querySelectorAll('input[type="password"][1]').value;
        const phone = this.registerForm.querySelector('input[type="tel"]').value;
        const messageDiv = this.registerForm.querySelector('.form-message');

        if (!fullName || fullName.length < 3) {
            this.showMessage(messageDiv, 'Full name must be at least 3 characters', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showMessage(messageDiv, 'Invalid email format', 'error');
            return;
        }

        if (!this.validatePassword(password)) {
            this.showMessage(messageDiv, 'Password must be at least 8 characters', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage(messageDiv, 'Passwords do not match', 'error');
            return;
        }

        if (!this.validatePhoneNumber(phone)) {
            this.showMessage(messageDiv, 'Invalid phone number format', 'error');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    phone
                })
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage(messageDiv, 'Registration successful! Please log in.', 'success');
                this.registerForm.reset();
                setTimeout(() => {
                    switchTab('login');
                }, 1500);
            } else {
                this.showMessage(messageDiv, data.message || 'Registration failed', 'error');
            }
        } catch (error) {
            this.showMessage(messageDiv, 'Error: ' + error.message, 'error');
        }
    }

    showMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;
    }
}

function switchTab(tabName) {
    const forms = document.querySelectorAll('.auth-form');
    const tabs = document.querySelectorAll('.auth-tabs a');

    forms.forEach(form => form.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    if (tabName === 'login') {
        document.getElementById('login-form').classList.add('active');
        document.querySelector('[onclick="switchTab(\'login\')"]').classList.add('active');
    } else {
        document.getElementById('register-form').classList.add('active');
        document.querySelector('[onclick="switchTab(\'register\')"]').classList.add('active');
    }
}

function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (token) {
        window.location.href = '/dashboard.html';
    }
}

function logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/auth.html';
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    new AuthenticationManager();
});