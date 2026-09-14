let authMode = 'signin';

const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const fullNameGroup = document.getElementById('fullNameGroup');
const fullNameInput = document.getElementById('fullName');
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const submitBtn = document.getElementById('submitBtn');
const altPrompt = document.getElementById('altPrompt');
const altActionLink = document.getElementById('altActionLink');
const authToast = document.getElementById('authToast');

function switchAuthMode(mode) {
    authMode = mode;
    document.getElementById('tabSignIn').classList.toggle('active', mode === 'signin');
    document.getElementById('tabSignUp').classList.toggle('active', mode === 'signup');

    if (mode === 'signin') {
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Enter your credentials to access your developer workbench.';
        fullNameGroup.style.display = 'none';
        submitBtn.textContent = 'Sign In to Dashboard';
        altPrompt.textContent = 'Need an account?';
        altActionLink.textContent = 'Create one now';
        userPassword.autocomplete = 'current-password';
    } else {
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Start building your engineering projects with NexusID.';
        fullNameGroup.style.display = 'block';
        submitBtn.textContent = 'Complete Registration';
        altPrompt.textContent = 'Already registered?';
        altActionLink.textContent = 'Sign in instead';
        userPassword.autocomplete = 'new-password';
    }
}

function toggleAlternativeMode() {
    switchAuthMode(authMode === 'signin' ? 'signup' : 'signin');
}

function togglePasswordVisibility() {
    const isPwd = userPassword.type === 'password';
    userPassword.type = isPwd ? 'text' : 'password';
    event.target.textContent = isPwd ? 'Hide' : 'Show';
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const email = userEmail.value.trim();
    const password = userPassword.value;
    const name = fullNameInput.value.trim();

    if (authMode === 'signup') {
        const userAccount = { name: name || 'Developer', email: email, token: 'mock_jwt_token_' + Date.now() };
        localStorage.setItem('nexus_auth_user', JSON.stringify(userAccount));
        showToast(`Account created for ${email}! You are now signed in.`);
    } else {
        localStorage.setItem('nexus_auth_last_email', email);
        showToast(`Welcome back, ${email}! Session authenticated.`);
    }
}

function showToast(message) {
    authToast.textContent = message;
    authToast.style.display = 'block';
    setTimeout(() => {
        authToast.style.display = 'none';
    }, 4000);
}
