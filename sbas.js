function togglePassword(type = '') {
    const passwordField = document.getElementById(`${type ? 'reg-' : ''}password`);
    const confirmPasswordField = document.getElementById('confirm-password');
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        if (confirmPasswordField) confirmPasswordField.type = "text";
    } else {
        passwordField.type = "password";
        if (confirmPasswordField) confirmPasswordField.type = "password";
    }
}

function showRegisterPage() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('register-page').classList.remove('hidden');
}

function showLoginPage() {
    document.getElementById('register-page').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Logged in successfully!');
        } else {
            alert('Login failed: ' + data.message);
        }
    });
}

function register() {
    const email = document.getElementById('reg-email').value;
    const fullName = document.getElementById('full-name').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
            showLoginPage();
        } else {
            alert('Registration failed: ' + data.message);
        }
    });
}

function forgotPassword() {
    const email = prompt("Please enter your email for password reset:");

    if (email) {
        fetch('/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Password reset link sent to your email!');
            } else {
                alert('Error: ' + data.message);
            }
        });
    }
}
